'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, Send, Sparkles, Map } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { getSkillPath, saveSkillPath, updateSkillPathNode, getAIRecommendation, type SkillPathNode } from '@/lib/firestore';
import confetti from 'canvas-confetti';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { RoadmapCanvas } from '@/components/roadmap/RoadmapCanvas';
import type { NeuralNodeData } from '@/components/roadmap/NeuralNode';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
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
    const careerParam = searchParams.get('career');
    const loadKey = careerParam || '__default__';

    async function load() {
      if (!currentUser?.uid) { setLoading(false); return; }

      if (loadedCareerRef.current === loadKey) return;
      loadedCareerRef.current = loadKey;

      try {
        const careerKey = `skillpath_career_${currentUser.uid}`;

        const careerFromUrl = careerParam || '';
        const careerFromStorage = localStorage.getItem(careerKey) || '';

        const existingPath = await getSkillPath(currentUser.uid);

        const intendedCareer = careerFromUrl || careerFromStorage;
        const needsRegenForNewCareer = intendedCareer && existingPath?.targetCareer && intendedCareer !== existingPath.targetCareer;

        if (existingPath && existingPath.nodes?.length > 0 && !needsRegenForNewCareer) {
          const sanitizedNodes = (existingPath.nodes || []).map((n: any, i: number) => {
            const safeX = typeof n.coordinates?.x === 'number' && !isNaN(n.coordinates.x) ? n.coordinates.x : typeof n.x === 'number' && !isNaN(n.x) ? n.x : 300 + (i % 3) * 180;
            const safeY = typeof n.coordinates?.y === 'number' && !isNaN(n.coordinates.y) ? n.coordinates.y : typeof n.y === 'number' && !isNaN(n.y) ? n.y : 100 + i * 140;
            return {
              ...n,
              coordinates: { x: safeX, y: safeY },
              x: safeX,
              y: safeY,
            };
          });

          localStorage.setItem(careerKey, existingPath.targetCareer);
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

        if (!targetCareer) {
          const rec = await getAIRecommendation(currentUser.uid);
          if (rec) targetCareer = rec.careerTitle;
        }
        if (!targetCareer) targetCareer = 'Full-Stack Developer';

        localStorage.setItem(careerKey, targetCareer);
        setCareer(targetCareer);
        setGenerating(true);
        setMessages([{ role: 'ai', content: `Hai! Saya sedang membuatkan roadmap belajar untuk menjadi **${targetCareer}**. Tunggu sebentar...` }]);

        try {
          const res = await fetch('/api/generate-path', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ career: targetCareer })
          });
          const data = await res.json();

          if (data.nodes && Array.isArray(data.nodes) && data.nodes.length > 0) {
            const pathNodes: SkillPathNode[] = data.nodes.map((n: any, i: number) => {
              const safeX = typeof n.coordinates?.x === 'number' && !isNaN(n.coordinates.x) ? n.coordinates.x : typeof n.x === 'number' && !isNaN(n.x) ? n.x : 300 + (i % 3) * 180;
              const safeY = typeof n.coordinates?.y === 'number' && !isNaN(n.coordinates.y) ? n.coordinates.y : typeof n.y === 'number' && !isNaN(n.y) ? n.y : 100 + i * 140;

              return {
                id: n.id || `node-${i}`,
                title: n.title || n.label || `Step ${i + 1}`,
                description: n.description || '',
                estimatedHours: n.estimatedHours || 10,
                duration: n.duration || '2 Minggu',
                difficulty: n.difficulty || 'Menengah',
                icon_type: n.icon_type || 'code',
                prerequisites: n.prerequisites || [],
                status: n.status || (i === 0 ? 'active' : 'locked'),
                coordinates: { x: safeX, y: safeY },
                connections: n.connections || [],
                x: safeX,
                y: safeY,
              };
            });
            setNodes(pathNodes);
            setMessages(prev => [...prev, { role: 'ai', content: `Roadmap **${targetCareer}** sudah jadi! Ada ${pathNodes.length} tahapan yang perlu kamu kuasai. Mulai dari yang paling atas ya!` }]);
            saveSkillPath(currentUser.uid, targetCareer, pathNodes).catch(e => console.error("Path save background error", e));
          } else {
             throw new Error(data.error || "Materi roadmap tidak ditemukan.");
          }
        } catch (err: any) {
          setMessages(prev => [...prev, { role: 'ai', content: `Gagal membuat roadmap: ${err.message || 'Coba lagi beberapa saat lagi.'}` }]);
        } finally {
          setGenerating(false);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const data = await res.json();

      if (data.answer) {
        const answerText = typeof data.answer === 'string' ? data.answer : JSON.stringify(data.answer);
        setMessages(prev => [...prev, { role: 'ai', content: answerText }]);
      }

      if (data.shouldRegenerate && data.newCareer) {
        const newCareer = data.newCareer;
        setMessages(prev => [...prev, { role: 'ai', content: `Baik! Saya akan membuatkan roadmap baru untuk **${newCareer}**. Tunggu sebentar...` }]);
        setCareer(newCareer);
        setGenerating(true);
        localStorage.setItem(`skillpath_career_${currentUser?.uid}`, newCareer);

        try {
          const regenRes = await fetch('/api/generate-path', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ career: newCareer })
          });
          const regenData = await regenRes.json();

          if (regenData.nodes && Array.isArray(regenData.nodes) && regenData.nodes.length > 0) {
            const pathNodes: SkillPathNode[] = regenData.nodes.map((n: any, i: number) => {
              const safeX = typeof n.coordinates?.x === 'number' && !isNaN(n.coordinates.x) ? n.coordinates.x : typeof n.x === 'number' && !isNaN(n.x) ? n.x : 300 + (i % 3) * 180;
              const safeY = typeof n.coordinates?.y === 'number' && !isNaN(n.coordinates.y) ? n.coordinates.y : typeof n.y === 'number' && !isNaN(n.y) ? n.y : 100 + i * 140;

              return {
                id: n.id || `node-${i}`,
                title: n.title || n.label || `Step ${i + 1}`,
                description: n.description || '',
                estimatedHours: n.estimatedHours || 10,
                duration: n.duration || '2 Minggu',
                difficulty: n.difficulty || 'Menengah',
                icon_type: n.icon_type || 'code',
                prerequisites: n.prerequisites || [],
                status: n.status || (i === 0 ? 'active' : 'locked'),
                coordinates: { x: safeX, y: safeY },
                connections: n.connections || [],
                x: safeX,
                y: safeY,
              };
            });
            setNodes(pathNodes);
            setMessages(prev => [...prev, { role: 'ai', content: `Roadmap **${newCareer}** sudah jadi! Ada ${pathNodes.length} tahapan. Mulai dari yang paling atas!` }]);
            if (currentUser?.uid) {
              saveSkillPath(currentUser.uid, newCareer, pathNodes).catch(console.warn);
            }
          } else {
             throw new Error(regenData.error || "Materi roadmap tidak ditemukan.");
          }
        } catch (err: any) {
          setMessages(prev => [...prev, { role: 'ai', content: `Gagal membuat roadmap baru: ${err.message || 'Coba lagi beberapa saat lagi.'}` }]);
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

  const neuralNodes: NeuralNodeData[] = nodes.map(n => ({
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
  }));

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
        <div className={cn(
            "lg:hidden absolute bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-slate-200 overflow-hidden flex flex-col min-h-0 transition-transform duration-300",
            isMobileChatOpen ? "h-[75dvh] translate-y-0" : "h-[75dvh] translate-y-full"
        )}>
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
        </div>

        {/* Mobile Toggle Button (when chat is closed) */}
        {!isMobileChatOpen && (
          <Button 
            onClick={() => setIsMobileChatOpen(true)}
            className="lg:hidden fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.4)] bg-amber-500 hover:bg-amber-600 text-white p-0 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles size={28} />
          </Button>
        )}
      </div>
    </div>
  );
}
