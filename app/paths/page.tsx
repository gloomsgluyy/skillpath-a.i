'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Bot, Send, ArrowLeft, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { getSkillPath, saveSkillPath, updateSkillPathNode, getAIRecommendation, type SkillPathNode } from '@/lib/firestore';

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

      // Check if there's an existing skill path
      const existingPath = await getSkillPath(currentUser.uid);
      if (existingPath) {
        setCareer(existingPath.targetCareer);
        setNodes(existingPath.nodes || []);
        setMessages([{ role: 'ai', content: `Selamat datang kembali! 🎯 Ini adalah roadmap ${existingPath.targetCareer}-mu. Klik pada node untuk menandai progress. Tanya saya jika butuh bantuan!` }]);
        setLoading(false);
        return;
      }

      // Get career from URL param or AI recommendation
      const careerParam = searchParams.get('career');
      let targetCareer = careerParam || '';

      if (!targetCareer) {
        const rec = await getAIRecommendation(currentUser.uid);
        if (rec) targetCareer = rec.careerTitle;
      }

      if (!targetCareer) {
        targetCareer = 'Full-Stack Developer'; // fallback
      }

      setCareer(targetCareer);
      setGenerating(true);
      setMessages([{ role: 'ai', content: `Hai! 🚀 Saya sedang membuatkan roadmap belajar untuk menjadi **${targetCareer}**. Tunggu sebentar...` }]);

      try {
        const res = await fetch('/api/generate-path', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ career: targetCareer })
        });
        const data = await res.json();

        if (data.nodes && Array.isArray(data.nodes)) {
          const pathNodes: SkillPathNode[] = data.nodes.map((n: any, i: number) => ({
            id: `node-${i}`,
            title: n.title || `Step ${i + 1}`,
            description: n.description || '',
            estimatedHours: n.estimatedHours || 10,
            prerequisites: n.prerequisites || [],
            status: i === 0 ? 'active' : 'locked',
            x: 50 + (i % 3) * 200 + (Math.random() * 40 - 20),
            y: 80 + Math.floor(i / 3) * 160,
          }));
          setNodes(pathNodes);
          await saveSkillPath(currentUser.uid, targetCareer, pathNodes);
          setMessages(prev => [...prev, { role: 'ai', content: `✅ Roadmap ${targetCareer} sudah jadi! Ada ${pathNodes.length} tahapan yang perlu kamu kuasai. Mulai dari yang paling atas ya!` }]);
        }
      } catch (err) {
        setMessages(prev => [...prev, { role: 'ai', content: '⚠️ Gagal membuat roadmap. Coba lagi nanti.' }]);
      }
      setGenerating(false);
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleNodeClick = async (node: SkillPathNode) => {
    if (!currentUser?.uid || node.status === 'locked') return;

    if (node.status === 'active') {
      const updatedNodes = nodes.map(n => {
        if (n.id === node.id) return { ...n, status: 'completed' as const };
        return n;
      });
      // Unlock next locked node
      const nextLocked = updatedNodes.find(n => n.status === 'locked');
      if (nextLocked) nextLocked.status = 'active';

      setNodes(updatedNodes);
      await updateSkillPathNode(currentUser.uid, node.id, 'completed');
      if (nextLocked) {
        await saveSkillPath(currentUser.uid, career, updatedNodes);
      }
      setMessages(prev => [...prev, { role: 'ai', content: `🎉 Hebat! Kamu sudah menyelesaikan "${node.title}". ${nextLocked ? `Selanjutnya: "${nextLocked.title}"` : 'Semua tahapan selesai! 🏆'}` }]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMsg.trim() || chatLoading) return;
    const userMsg = inputMsg.trim();
    setInputMsg('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);

    try {
      const res = await fetch('/api/generate-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ career, question: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.answer || data.nodes ? 'Roadmap telah diperbarui!' : 'Maaf, saya tidak bisa menjawab saat ini.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: 'Koneksi error. Coba lagi.' }]);
    }
    setChatLoading(false);
  };

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-white pt-24">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <Sparkles size={48} className="text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl font-black mb-4">Login Diperlukan</h2>
          <p className="text-white/60 mb-8">Kamu perlu login untuk mengakses Skill Paths yang dipersonalisasi.</p>
          <Button onClick={() => router.push('/')} className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-xl">
            Kembali ke Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />
      <div className="flex h-[calc(100vh-80px)] pt-20">
        {/* Left: Chat Panel (30%) */}
        <div className="w-full lg:w-[30%] flex flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">AI Consultant</h3>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Online
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("max-w-[90%] rounded-2xl px-4 py-3 text-sm", msg.role === 'ai' ? "bg-white/10 mr-auto" : "bg-amber-500/20 ml-auto border border-amber-500/30")}
              >
                {msg.content}
              </motion.div>
            ))}
            {chatLoading && (
              <div className="flex items-center gap-2 text-white/50 text-sm"><Loader2 size={16} className="animate-spin" /> Mengetik...</div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tanya tentang roadmap..."
                className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/30 border border-white/10 focus:border-amber-500/50"
              />
              <Button onClick={handleSendMessage} disabled={chatLoading} className="bg-amber-500 hover:bg-amber-600 rounded-xl px-4">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Roadmap Canvas (70%) */}
        <div className="hidden lg:flex flex-1 flex-col relative overflow-auto bg-[#0a0e1a]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          {loading || generating ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Loader2 size={48} className="text-amber-400 animate-spin mx-auto mb-4" />
                <p className="text-white/60 font-bold">{generating ? 'AI sedang membuat roadmap...' : 'Memuat...'}</p>
              </div>
            </div>
          ) : (
            <div className="relative p-8 min-h-full">
              <h2 className="text-2xl font-black mb-2 text-amber-400">🗺️ Roadmap: {career}</h2>
              <p className="text-white/50 text-sm mb-8">{nodes.filter(n => n.status === 'completed').length}/{nodes.length} tahapan selesai</p>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {nodes.map((node, i) => (
                  <HoverCard key={node.id}>
                    <HoverCardTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => handleNodeClick(node)}
                        className={cn(
                          "p-5 rounded-2xl border cursor-pointer transition-all duration-300 group",
                          node.status === 'completed' ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]" :
                          node.status === 'active' ? "bg-amber-500/10 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:scale-[1.03]" :
                          "bg-white/5 border-white/10 opacity-50"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black",
                            node.status === 'completed' ? "bg-emerald-500 text-white" :
                            node.status === 'active' ? "bg-amber-500 text-white" :
                            "bg-white/10 text-white/30"
                          )}>
                            {node.status === 'completed' ? <CheckCircle2 size={16} /> : i + 1}
                          </div>
                          <h4 className="font-bold text-sm flex-1">{node.title}</h4>
                        </div>
                        <p className="text-white/50 text-xs line-clamp-2">{node.description}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[10px] text-white/30 uppercase tracking-wider">{node.estimatedHours}h estimasi</span>
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full",
                            node.status === 'completed' ? "bg-emerald-500/20 text-emerald-400" :
                            node.status === 'active' ? "bg-amber-500/20 text-amber-400" :
                            "bg-white/5 text-white/20"
                          )}>
                            {node.status === 'completed' ? 'Selesai' : node.status === 'active' ? 'Aktif' : 'Terkunci'}
                          </span>
                        </div>
                      </motion.div>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-[#1a1f2e] border-white/10 text-white w-72">
                      <h4 className="font-bold mb-2">{node.title}</h4>
                      <p className="text-white/70 text-xs">{node.description}</p>
                      <p className="text-amber-400 text-xs mt-2 font-bold">Estimasi: {node.estimatedHours} jam</p>
                      {node.status === 'active' && <p className="text-emerald-400 text-xs mt-1">Klik untuk menyelesaikan!</p>}
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
