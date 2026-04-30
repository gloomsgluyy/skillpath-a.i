'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, Map } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { getSkillPath, saveSkillPath, getAIRecommendation, type SkillPathNode } from '@/lib/firestore';
import { CAREERS } from '@/lib/careers-database';
import { getBestKnownCareer, getLocalCareer, setLocalCareer } from '@/lib/personalization';
import confetti from 'canvas-confetti';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SkillPathLogo } from '@/components/brand/SkillPathLogo';
import { RoadmapCanvas } from '@/components/roadmap/RoadmapCanvas';
import type { NeuralNodeData } from '@/components/roadmap/NeuralNode';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

type RawSkillPathNode = Partial<Omit<SkillPathNode, 'coordinates' | 'status'>> & {
  label?: string;
  status?: SkillPathNode['status'];
  coordinates?: { x?: number; y?: number };
};

type SavedSkillPath = {
  targetCareer: string;
  nodes?: RawSkillPathNode[];
};

type GeneratePathResponse = {
  answer?: unknown;
  error?: string;
  newCareer?: string;
  shouldRegenerate?: boolean;
  nodes?: RawSkillPathNode[];
};

function normalizeSkillPathNode(node: RawSkillPathNode, index: number): SkillPathNode {
  const safeX = typeof node.coordinates?.x === 'number' && Number.isFinite(node.coordinates.x)
    ? node.coordinates.x
    : typeof node.x === 'number' && Number.isFinite(node.x)
      ? node.x
      : 300 + (index % 3) * 180;
  const safeY = typeof node.coordinates?.y === 'number' && Number.isFinite(node.coordinates.y)
    ? node.coordinates.y
    : typeof node.y === 'number' && Number.isFinite(node.y)
      ? node.y
      : 100 + index * 140;

  return {
    id: node.id || `node-${index}`,
    title: node.title || node.label || `Step ${index + 1}`,
    description: node.description || '',
    estimatedHours: node.estimatedHours || 10,
    duration: node.duration || '2 Minggu',
    difficulty: node.difficulty || 'Menengah',
    icon_type: node.icon_type || 'code',
    prerequisites: node.prerequisites || [],
    status: node.status || (index === 0 ? 'active' : 'locked'),
    coordinates: { x: safeX, y: safeY },
    connections: node.connections || [],
    learning_resources: node.learning_resources,
    x: safeX,
    y: safeY,
  };
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function SkillPathsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser } = useAuth();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [career, setCareer] = useState('');
  const [nodes, setNodes] = useState<SkillPathNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  
  const mobileChatEndRef = useRef<HTMLDivElement>(null);

  const loadedCareerRef = React.useRef<string | null>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 1023px)').matches) {
      setIsMobileChatOpen(false);
    }
  }, []);

  useEffect(() => {
    const rawCareerParam = searchParams.get('career');
    const careerParam = rawCareerParam
      ? CAREERS.find(c => c.id === rawCareerParam)?.title || rawCareerParam
      : '';
    const loadKey = careerParam || '__default__';

    async function load() {
      if (!currentUser?.uid) { setLoading(false); return; }

      if (loadedCareerRef.current === loadKey) return;
      loadedCareerRef.current = loadKey;

      try {
        const careerFromUrl = careerParam || '';
        const careerFromStorage = getLocalCareer(currentUser.uid);

        const existingPath = await getSkillPath(currentUser.uid) as SavedSkillPath | null;
        const existingNodes = existingPath?.nodes ?? [];

        const intendedCareer = careerFromUrl || careerFromStorage;
        const needsRegenForNewCareer = intendedCareer && existingPath?.targetCareer && intendedCareer !== existingPath.targetCareer;

        if (existingPath && existingNodes.length > 0 && !needsRegenForNewCareer) {
          const sanitizedNodes = existingNodes.map(normalizeSkillPathNode);

          setLocalCareer(currentUser.uid, existingPath.targetCareer);
          setCareer(existingPath.targetCareer);
          setNodes(sanitizedNodes);
          const savedChat = localStorage.getItem(`chat_${currentUser.uid}`);
          if (savedChat) {
            try { setMessages(JSON.parse(savedChat)); } catch {
              setMessages([{ role: 'ai', content: `Selamat datang kembali! Roadmap ${existingPath.targetCareer}-mu siap. Klik node untuk tandai progress!` }]);
            }
          } else {
            setMessages([{ role: 'ai', content: `Selamat datang kembali! Roadmap ${existingPath.targetCareer}-mu siap. Klik node untuk tandai progress!` }]);
          }
          return;
        }

        let targetCareer = careerFromUrl || careerFromStorage;

        if (!targetCareer || targetCareer === 'Full-Stack Developer') {
          const rec = await getAIRecommendation(currentUser.uid);
          if (rec) targetCareer = rec.careerTitle;
        }
        if (!targetCareer) targetCareer = getBestKnownCareer(currentUser.uid);

        if (!targetCareer) {
          setMessages([{ role: 'ai', content: 'Target karir belum dipersonalisasi. Balik ke halaman utama dan selesaikan personalisasi dulu supaya roadmap tidak dibuat dari default sembarang.' }]);
          setNodes([]);
          return;
        }

        setLocalCareer(currentUser.uid, targetCareer);
        setCareer(targetCareer);
        setGenerating(true);
        setMessages([{ role: 'ai', content: `Hai! Saya sedang membuatkan roadmap belajar untuk menjadi **${targetCareer}**. Tunggu sebentar...` }]);

        try {
          const res = await fetch('/api/generate-path', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ career: targetCareer })
          });
          const data = await res.json() as GeneratePathResponse;

          if (data.nodes && Array.isArray(data.nodes) && data.nodes.length > 0) {
            const pathNodes = data.nodes.map(normalizeSkillPathNode);
            setNodes(pathNodes);
            setMessages(prev => [...prev, { role: 'ai', content: `Roadmap **${targetCareer}** sudah jadi! Ada ${pathNodes.length} tahapan yang perlu kamu kuasai. Mulai dari yang paling atas ya!` }]);
            saveSkillPath(currentUser.uid, targetCareer, pathNodes).catch(e => console.error("Path save background error", e));
          } else {
             throw new Error(data.error || "Materi roadmap tidak ditemukan.");
          }
        } catch (err: unknown) {
          setMessages(prev => [...prev, { role: 'ai', content: `Gagal membuat roadmap: ${getErrorMessage(err, 'Coba lagi beberapa saat lagi.')}` }]);
        } finally {
          setGenerating(false);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [currentUser, searchParams]);

  const handleNodeClick = async (node: NeuralNodeData) => {
    if (!currentUser?.uid || node.status === 'locked') return;

    if (node.status === 'active') {
      const updatedNodes = nodes.map(n => {
        if (n.id === node.id) return { ...n, status: 'completed' as const };
        return n;
      });
      const nextLocked = updatedNodes.find(n => n.status === 'locked');
      if (nextLocked) nextLocked.status = 'active';

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6']
      });

      setNodes(updatedNodes);

      await saveSkillPath(currentUser.uid, career, updatedNodes);

      const msg = `Hebat! Kamu sudah menyelesaikan \"${node.title}\". ${nextLocked ? `Selanjutnya: \"${nextLocked.title}\"` : 'Semua tahapan selesai!'}`;
      const newMessages = [...messages, { role: 'ai' as const, content: msg }];
      setMessages(newMessages);
      localStorage.setItem(`chat_${currentUser.uid}`, JSON.stringify(newMessages));
    }
  };

  const handleSendMessage = async () => {
    if (!inputMsg.trim() || chatLoading) return;
    const userMsg = inputMsg.trim();
    setInputMsg('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);

    if (!career) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Target karir belum ditentukan. Silakan coba personalisasi ulang kariermu.' }]);
      setChatLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/generate-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ career, question: userMsg, history: messages })
      });
      const data = await res.json() as GeneratePathResponse;

      if (data.answer) {
        const answerText = typeof data.answer === 'string' ? data.answer : JSON.stringify(data.answer);
        setMessages(prev => [...prev, { role: 'ai', content: answerText }]);
      }

      if (data.shouldRegenerate && data.newCareer) {
        const newCareer = data.newCareer;
        setMessages(prev => [...prev, { role: 'ai', content: `Baik! Saya akan membuatkan roadmap baru untuk **${newCareer}**. Tunggu sebentar...` }]);
        setCareer(newCareer);
        setGenerating(true);
        if (currentUser?.uid) setLocalCareer(currentUser.uid, newCareer);

        try {
          const regenRes = await fetch('/api/generate-path', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ career: newCareer })
          });
          const regenData = await regenRes.json() as GeneratePathResponse;

          if (regenData.nodes && Array.isArray(regenData.nodes) && regenData.nodes.length > 0) {
            const pathNodes = regenData.nodes.map(normalizeSkillPathNode);
            setNodes(pathNodes);
            setMessages(prev => [...prev, { role: 'ai', content: `Roadmap **${newCareer}** sudah jadi! Ada ${pathNodes.length} tahapan. Mulai dari yang paling atas!` }]);
            if (currentUser?.uid) {
              saveSkillPath(currentUser.uid, newCareer, pathNodes).catch(console.warn);
            }
          } else {
             throw new Error(regenData.error || "Materi roadmap tidak ditemukan.");
          }
        } catch (err: unknown) {
          setMessages(prev => [...prev, { role: 'ai', content: `Gagal membuat roadmap baru: ${getErrorMessage(err, 'Coba lagi beberapa saat lagi.')}` }]);
        } finally {
           setGenerating(false);
        }
      } else if (!data.answer) {
        setMessages(prev => [...prev, { role: 'ai', content: 'Maaf, saya tidak bisa mendeteksi jawaban. Coba tanyakan lagi.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: 'Koneksi error. Coba lagi.' }]);
    }
    setChatLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    mobileChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (currentUser?.uid && messages.length > 0) {
      try { localStorage.setItem(`chat_${currentUser.uid}`, JSON.stringify(messages.slice(-50))); } catch {}
    }
  }, [messages, currentUser]);

  const neuralNodes: NeuralNodeData[] = useMemo(() => nodes.map(n => ({
    id: n.id,
    title: n.title,
    description: n.description,
    duration: n.duration || `${n.estimatedHours}h`,
    difficulty: n.difficulty || 'Menengah',
    status: n.status,
    coordinates: n.coordinates || { x: n.x, y: n.y },
    icon_type: n.icon_type || 'code',
    connections: n.connections || [],
    estimatedHours: n.estimatedHours,
    learning_resources: n.learning_resources,
  })), [nodes]);

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-24">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Map size={36} className="text-white" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-slate-900">Login Diperlukan</h2>
          <p className="text-slate-600 mb-8">Kamu perlu login untuk mengakses Skill Paths yang dipersonalisasi.</p>
          <Button onClick={() => router.push('/')} className="glow-pill-primary font-black px-8 py-3">
            Kembali ke Home
          </Button>
        </div>
      </div>
    );
  }

  const renderChatContent = (isMobile: boolean) => (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "max-w-[90%] rounded-[1.25rem] px-4 py-3 text-sm",
              msg.role === 'ai'
                ? "bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mr-auto text-slate-700 rounded-bl-lg prose prose-sm prose-slate prose-p:leading-relaxed prose-a:text-amber-600 max-w-none"
                : "bg-slate-900 text-white ml-auto rounded-br-lg shadow-md"
            )}
          >
            {msg.role === 'ai' ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {typeof msg.content === 'string' ? msg.content : String(msg.content)}
              </ReactMarkdown>
            ) : (
              msg.content
            )}
          </motion.div>
        ))}
        {chatLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[70%] bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mr-auto rounded-[1.25rem] rounded-bl-lg px-4 py-4 flex items-center gap-2"
          >
           <div className="flex gap-1.5">
             <motion.div className="w-2 h-2 rounded-full bg-slate-300" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0 }} />
             <motion.div className="w-2 h-2 rounded-full bg-slate-300" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0.2 }} />
             <motion.div className="w-2 h-2 rounded-full bg-slate-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0.4 }} />
           </div>
          </motion.div>
        )}
        <div ref={isMobile ? mobileChatEndRef : chatEndRef} />
      </div>

      <div className="p-4 border-t border-slate-200/50 shrink-0 relative bg-white/80 backdrop-blur-lg">
        <div className="flex gap-2 relative z-10">
          <Input
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Tanya info atau link materi..."
            className="h-12 flex-1 bg-white rounded-xl px-4 text-sm font-medium placeholder:text-slate-400 border border-slate-200 focus-visible:border-amber-400 focus-visible:ring-4 focus-visible:ring-amber-500/10 transition-all shadow-sm text-slate-900"
          />
          <Button onClick={handleSendMessage} disabled={chatLoading} className="bg-slate-900 hover:bg-slate-800 rounded-xl px-4 shadow-md text-white">
            <Send size={16} />
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="h-screen text-slate-900 flex flex-col overflow-hidden bg-[radial-gradient(at_0%_0%,_#fef0e6_0%,_transparent_50%),_radial-gradient(at_100%_0%,_#fde4d4_0%,_transparent_50%),_radial-gradient(at_50%_100%,_#fef5ee_0%,_transparent_50%)]">
      <div className="shrink-0">
        <Navbar />
      </div>
      <div className="flex flex-1 mt-20 p-2 sm:p-4 lg:p-6 gap-2 sm:gap-4 lg:gap-6 overflow-hidden relative">
        
        {/* Neural Roadmap Canvas - GLASS CARD ON THE RIGHT */}
        <div className="flex-1 relative bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/50 shadow-2xl overflow-hidden self-stretch transition-all duration-500 hover:shadow-amber-500/5">
          {loading || generating ? (
            <div className="absolute inset-0 p-8 flex flex-col animate-pulse">
              <div className="flex items-center justify-between mb-8 opacity-50">
                <div>
                  <div className="h-8 w-48 mb-2 bg-slate-300/30 rounded-xl" />
                  <div className="h-4 w-32 bg-slate-300/20 rounded-md" />
                </div>
                <div className="h-6 w-16 rounded-full bg-slate-300/20" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm font-bold text-slate-400">Menyusun Neural Roadmap...</p>
                </div>
              </div>
            </div>
          ) : (
            <RoadmapCanvas
              nodes={neuralNodes}
              career={career}
              onNodeClick={handleNodeClick}
            />
          )}
        </div>

        {/* Desktop Chat Panel - GLASS CARD ON THE LEFT */}
        <div className="hidden lg:flex w-[400px] flex-col bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/50 shadow-2xl lg:order-first relative overflow-hidden self-stretch transition-all duration-500 hover:shadow-amber-500/5">
          <div className="p-5 border-b border-white/20 flex items-center gap-3 shrink-0 bg-white/30 backdrop-blur-md">
            <div className="w-11 h-11 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Bot size={22} className="text-white relative z-10" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">AI Consultant</h3>
              <span className="text-[10px] text-emerald-600 flex items-center gap-1.5 font-black uppercase tracking-widest">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Online
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col min-h-0">
            {renderChatContent(false)}
          </div>
        </div>

        {/* Mobile Floating Chat Popup */}
        {isMobileChatOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden absolute bottom-0 left-0 right-0 z-40 h-[75dvh] bg-white/95 backdrop-blur-2xl rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-slate-200 overflow-hidden flex flex-col min-h-0"
          >
            <div className="p-4 border-b border-slate-200/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">AI Consultant</h3>
                  <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online
                  </span>
                </div>
              </div>
              <button onClick={() => setIsMobileChatOpen(false)} className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                 Tutup
              </button>
            </div>
            {renderChatContent(true)}
          </motion.div>
        )}

        {/* Mobile Toggle Button (when chat is closed) */}
        {!isMobileChatOpen && (
          <Button 
            onClick={() => setIsMobileChatOpen(true)}
            aria-label="Buka AI Consultant"
            className="lg:hidden fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.4)] bg-amber-500 hover:bg-amber-600 text-white p-0 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            <SkillPathLogo showWordmark={false} markClassName="size-9 drop-shadow-none" />
          </Button>
        )}
      </div>
    </div>
  );
}
