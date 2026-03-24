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

  // Load skill path from Firestore or generate new one
  useEffect(() => {
    async function load() {
      if (!currentUser?.uid) { setLoading(false); return; }

      const careerParam = searchParams.get('career');
      let targetCareer = careerParam || localStorage.getItem('skillpath_target_career') || '';

      if (!targetCareer) {
        const rec = await getAIRecommendation(currentUser.uid);
        if (rec) targetCareer = rec.careerTitle;
      }

      if (!targetCareer) {
        targetCareer = 'Full-Stack Developer';
      }

      localStorage.setItem('skillpath_target_career', targetCareer);

      const existingPath = await getSkillPath(currentUser.uid);
      if (existingPath && existingPath.targetCareer === targetCareer) {
        setCareer(existingPath.targetCareer);
        setNodes(existingPath.nodes || []);
        setMessages([{ role: 'ai', content: `Selamat datang kembali! Ini adalah roadmap ${existingPath.targetCareer}-mu. Klik pada node untuk menandai progress. Tanya saya jika butuh bantuan!` }]);
        setLoading(false);
        return;
      }

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
          saveSkillPath(currentUser.uid, targetCareer, pathNodes).catch(console.warn);
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
  }, [currentUser]);

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
        setMessages(prev => [...prev, { role: 'ai', content: data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: 'Maaf, saya tidak bisa mendeteksi jawaban. Coba tanyakan lagi.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: 'Koneksi error. Coba lagi.' }]);
    }
    setChatLoading(false);
  };

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

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
    <div className="min-h-screen text-slate-900">
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

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
                    {msg.content}
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
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-slate-200/50">
            <div className="flex gap-2">
              <input
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tanya tentang roadmap..."
                className="flex-1 bg-white rounded-xl px-4 py-3 text-sm font-medium outline-none placeholder:text-slate-400 border border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all shadow-sm text-slate-900"
              />
              <Button onClick={handleSendMessage} disabled={chatLoading} className="bg-slate-900 hover:bg-slate-800 rounded-xl px-4 shadow-md text-white">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Neural Roadmap Canvas */}
        <div className="hidden lg:flex flex-1 relative">
          {loading || generating ? (
            <div className="w-full p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <Skeleton className="h-8 w-48 mb-2 bg-slate-200/50 rounded-xl" />
                  <Skeleton className="h-4 w-32 bg-slate-200/50 rounded-md" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full bg-slate-200/50" />
              </div>
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm font-bold text-slate-500">Membangun Neural Roadmap...</p>
                  <p className="text-xs text-slate-400 mt-1">AI sedang merancang jalur belajarmu</p>
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
      </div>
    </div>
  );
}
