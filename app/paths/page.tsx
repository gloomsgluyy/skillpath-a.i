'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, Send, Sparkles, Map } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { getSkillPath, saveSkillPath, updateSkillPathNode, getAIRecommendation, getUserProfile, type SkillPathNode, type AIRecommendation } from '@/lib/firestore';
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
  const [aiRec, setAiRec] = useState<AIRecommendation | null>(null);

  const loadedCareerRef = React.useRef<string | null>(null);

  // Load skill path from Firestore or generate new one
  useEffect(() => {
    const careerParam = searchParams.get('career');
    const loadKey = careerParam || '__default__';

    // Prevent double-fire for the same career (React StrictMode)
    if (loadedCareerRef.current === loadKey) return;
    loadedCareerRef.current = loadKey;

    async function load() {
      if (!currentUser?.uid) { setLoading(false); return; }

      const careerKey = `skillpath_career_${currentUser.uid}`;

      // Check Firestore for existing path AND user profile career
      const [existingPath, profile, rec] = await Promise.all([
        getSkillPath(currentUser.uid),
        getUserProfile(currentUser.uid),
        getAIRecommendation(currentUser.uid)
      ]);

      if (rec) setAiRec(rec);

      // CRITICAL: The profile's targetCareer is the global source of truth
      const preferredCareer = careerParam || profile?.targetCareer || localStorage.getItem(careerKey) || '';

      // If user has an existing path AND it matches their preferred career → Load it
      const careerMismatch = preferredCareer && existingPath?.targetCareer && existingPath.targetCareer !== preferredCareer;

      if (existingPath && existingPath.nodes?.length > 0 && !careerMismatch && !careerParam) {
        // Load existing path from Firestore
        localStorage.setItem(careerKey, existingPath.targetCareer);
        setCareer(existingPath.targetCareer);
        setNodes(existingPath.nodes || []);
        // Restore chat history
        const savedChat = localStorage.getItem(`chat_${currentUser.uid}`);
        if (savedChat) {
          try { setMessages(JSON.parse(savedChat)); } catch {
            setMessages([{ role: 'ai', content: `Selamat datang kembali! Roadmap ${existingPath.targetCareer}-mu siap. Klik node untuk tandai progress!` }]);
          }
        } else {
          setMessages([{ role: 'ai', content: `Selamat datang kembali! Roadmap ${existingPath.targetCareer}-mu siap. Klik node untuk tandai progress!` }]);
        }
        setLoading(false);
        return;
      }

      // Need to generate: either no path exists or career changed
      let targetCareer = preferredCareer;

      if (!targetCareer && rec) {
        targetCareer = rec.careerTitle;
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

        if (data.nodes && Array.isArray(data.nodes)) {
          const pathNodes: SkillPathNode[] = data.nodes.map((n: any, i: number) => ({
            id: n.id || `node-${i}`,
            title: n.title || n.label || `Step ${i + 1}`,
            description: n.description || '',
            estimatedHours: n.estimatedHours || 10,
            duration: n.duration || '2 Minggu',
            difficulty: n.difficulty || 'Menengah',
            icon_type: n.icon_type || 'code',
            prerequisites: n.prerequisites || [],
            status: n.status || (i === 0 ? 'active' : 'locked'),
            coordinates: n.coordinates || { x: 300 + (i % 3) * 180, y: 100 + Math.floor(i / 2) * 150 },
            connections: n.connections || [],
            x: n.coordinates?.x || n.x || 300,
            y: n.coordinates?.y || n.y || 100 + i * 140,
          }));
          setNodes(pathNodes);
          await saveSkillPath(currentUser.uid, targetCareer, pathNodes);
          setMessages(prev => [...prev, { role: 'ai', content: `Roadmap ${targetCareer} sudah jadi! Ada ${pathNodes.length} tahapan yang perlu kamu kuasai. Mulai dari yang paling atas ya!` }]);
        }
      } catch (err) {
        setMessages(prev => [...prev, { role: 'ai', content: 'Gagal membuat roadmap. Coba lagi nanti.' }]);
      }
      setGenerating(false);
      setLoading(false);
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
      updateSkillPathNode(currentUser.uid, node.id, 'completed').catch(console.warn);
      if (nextLocked) {
        saveSkillPath(currentUser.uid, career, updatedNodes).catch(console.warn);
      }
      setMessages(prev => [...prev, { role: 'ai', content: `Hebat! Kamu sudah menyelesaikan \"${node.title}\". ${nextLocked ? `Selanjutnya: \"${nextLocked.title}\"` : 'Semua tahapan selesai!'}` }]);
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
        body: JSON.stringify({ career, question: userMsg })
      });
      const data = await res.json();

      if (data.answer) {
        const answerText = typeof data.answer === 'string' ? data.answer : JSON.stringify(data.answer);
        setMessages(prev => [...prev, { role: 'ai', content: answerText }]);
      }

      // If AI detected user wants to change career → regenerate roadmap
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

          if (regenData.nodes && Array.isArray(regenData.nodes)) {
            const pathNodes: SkillPathNode[] = regenData.nodes.map((n: any, i: number) => ({
              id: n.id || `node-${i}`,
              title: n.title || n.label || `Step ${i + 1}`,
              description: n.description || '',
              estimatedHours: n.estimatedHours || 10,
              duration: n.duration || '2 Minggu',
              difficulty: n.difficulty || 'Menengah',
              icon_type: n.icon_type || 'code',
              prerequisites: n.prerequisites || [],
              status: n.status || (i === 0 ? 'active' : 'locked'),
              coordinates: n.coordinates || { x: 300 + (i % 3) * 180, y: 100 + Math.floor(i / 2) * 150 },
              connections: n.connections || [],
              x: n.coordinates?.x || n.x || 300,
              y: n.coordinates?.y || n.y || 100 + i * 140,
            }));
            setNodes(pathNodes);
            if (currentUser?.uid) {
              saveSkillPath(currentUser.uid, newCareer, pathNodes).catch(console.warn);
            }
            setMessages(prev => [...prev, { role: 'ai', content: `Roadmap **${newCareer}** sudah jadi! Ada ${pathNodes.length} tahapan. Mulai dari yang paling atas!` }]);
          }
        } catch {
          setMessages(prev => [...prev, { role: 'ai', content: 'Gagal membuat roadmap baru. Coba lagi nanti.' }]);
        }
        setGenerating(false);
      } else if (!data.answer) {
        setMessages(prev => [...prev, { role: 'ai', content: 'Maaf, saya tidak bisa mendeteksi jawaban. Coba tanyakan lagi.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: 'Koneksi error. Coba lagi.' }]);
    }
    setChatLoading(false);
  };

  // Auto-save chat messages to localStorage & scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (currentUser?.uid && messages.length > 0) {
      try { localStorage.setItem(`chat_${currentUser.uid}`, JSON.stringify(messages.slice(-50))); } catch {}
    }
  }, [messages, currentUser]);

  // Convert SkillPathNode[] to NeuralNodeData[]
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

  return (
    <div className="min-h-screen text-slate-900 bg-white">
      <Navbar />
      <div className="flex h-[calc(100vh-80px)] pt-20">
        {/* Left: Chat Panel */}
        <div className="w-full lg:w-[30%] flex flex-col border-r border-slate-200/50 bg-white/50 backdrop-blur-2xl">
          <div className="p-4 border-b border-slate-200/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">AI Consultant</h3>
              <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
                <div className={cn(
                  "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-slate-900 text-white rounded-tr-none" 
                    : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200"
                )}>
                  <div className="prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-pre:bg-slate-800 prose-pre:text-white">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex items-center gap-2 text-slate-400 p-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tanyakan sesuatu..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all font-medium"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={chatLoading}
                className="absolute right-1.5 top-1.5 h-9 w-9 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-md p-0"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Neural Roadmap Canvas Area */}
        <div className="hidden lg:flex flex-1 relative bg-[#f8fafc] overflow-hidden">
          {loading || generating ? (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
              <div className="w-16 h-16 border-4 border-slate-900/10 border-t-slate-900 rounded-full animate-spin mb-6" />
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">Membangun Neural Roadmap...</h2>
              <p className="text-slate-500 font-bold animate-pulse mt-2">AI sedang merancang jalur belajarmu</p>
            </div>
          ) : (
            <>
              {/* AI Analysis Card Overlay */}
              {aiRec && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-6 right-6 z-40 max-w-sm"
                >
                  <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 border border-white/10 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <Sparkles size={16} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Analisis AI</h4>
                        <p className="text-xs font-bold text-white leading-tight">Rekomendasi Karir Anda</p>
                      </div>
                      <div className="ml-auto px-2 py-1 bg-white/10 rounded-full text-[10px] font-black text-white border border-white/10">
                        {aiRec.matchScore}% Match
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium leading-relaxed italic border-l-2 border-amber-500/50 pl-3">
                      &ldquo;{aiRec.reason.length > 120 ? aiRec.reason.substring(0, 117) + '...' : aiRec.reason}&rdquo;
                    </p>
                  </div>
                </motion.div>
              )}
              
              <RoadmapCanvas 
                nodes={neuralNodes} 
                career={career}
                onNodeClick={handleNodeClick}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
