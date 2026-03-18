'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Bot, Send, Sparkles, CheckCircle2, Loader2, Map } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { getSkillPath, saveSkillPath, updateSkillPathNode, getAIRecommendation, type SkillPathNode } from '@/lib/firestore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

      // Get current target career from URL param or AI recommendation
      const careerParam = searchParams.get('career');
      let targetCareer = careerParam || '';

      if (!targetCareer) {
        const rec = await getAIRecommendation(currentUser.uid);
        if (rec) targetCareer = rec.careerTitle;
      }

      if (!targetCareer) {
        targetCareer = 'Full-Stack Developer'; // fallback
      }

      // Check if there's an existing skill path that matches CURRENT target career
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
      updateSkillPathNode(currentUser.uid, node.id, 'completed').catch(console.warn);
      if (nextLocked) {
        saveSkillPath(currentUser.uid, career, updatedNodes).catch(console.warn);
      }
      setMessages(prev => [...prev, { role: 'ai', content: `Hebat! Kamu sudah menyelesaikan "${node.title}". ${nextLocked ? `Selanjutnya: "${nextLocked.title}"` : 'Semua tahapan selesai!'}` }]);
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
              <div className="flex items-center gap-2 text-slate-500 text-sm"><Loader2 size={16} className="animate-spin" /> Mengetik...</div>
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

        {/* Right: Roadmap Canvas */}
        <div className="hidden lg:flex flex-1 flex-col relative overflow-auto">
          {/* Subtle dot grid — matches landing page's aesthetic */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {loading || generating ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Loader2 size={48} className="text-amber-400 animate-spin mx-auto mb-4" />
                <p className="text-slate-500 font-bold">{generating ? 'AI sedang membuat roadmap...' : 'Memuat...'}</p>
              </div>
            </div>
          ) : (
            <div className="relative p-8 min-h-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Roadmap: {career}</h2>
                  <p className="text-slate-500 text-sm font-medium mt-1">{nodes.filter(n => n.status === 'completed').length}/{nodes.length} tahapan selesai</p>
                </div>
                <Badge variant="outline" className="text-slate-600 border-slate-300 font-bold">
                  {nodes.filter(n => n.status === 'completed').length}/{nodes.length}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {nodes.map((node, i) => (
                  <HoverCard key={node.id}>
                    <HoverCardTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: i * 0.06, type: 'spring', bounce: 0.3 }}
                        onClick={() => handleNodeClick(node)}
                        className={cn(
                          "p-5 rounded-[1.5rem] border cursor-pointer transition-all duration-500 group",
                          node.status === 'completed'
                            ? "bg-white border-emerald-200 shadow-[0_8px_30px_rgba(16,185,129,0.08)]"
                            : node.status === 'active'
                              ? "bg-white/50 backdrop-blur-2xl border-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1"
                              : "bg-slate-50/50 border-slate-200/50 opacity-60"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black",
                            node.status === 'completed' ? "bg-emerald-500 text-white shadow-md" :
                            node.status === 'active' ? "bg-slate-900 text-white shadow-lg" :
                            "bg-slate-200 text-slate-400"
                          )}>
                            {node.status === 'completed' ? <CheckCircle2 size={16} /> : i + 1}
                          </div>
                          <h4 className={cn("font-black text-sm flex-1 tracking-tight", node.status === 'completed' ? "text-emerald-900" : node.status === 'active' ? "text-slate-900" : "text-slate-400")}>{node.title}</h4>
                        </div>
                        <p className={cn("text-xs line-clamp-2 leading-relaxed", node.status === 'active' ? "text-slate-600" : "text-slate-400")}>{node.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 font-medium">{node.estimatedHours}h estimasi</span>
                          <Badge className={cn(
                            "text-[9px] font-bold px-2 py-0.5 border-0",
                            node.status === 'completed' ? "bg-emerald-100 text-emerald-700" :
                            node.status === 'active' ? "bg-amber-100 text-amber-700" :
                            "bg-slate-100 text-slate-500"
                          )}>
                            {node.status === 'completed' ? 'Selesai' : node.status === 'active' ? 'Aktif' : 'Terkunci'}
                          </Badge>
                        </div>
                      </motion.div>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-white/95 backdrop-blur-xl border-white/70 text-slate-900 w-72 shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-2xl p-5">
                      <h4 className="font-black text-sm mb-2 text-slate-900">{node.title}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed">{node.description}</p>
                      <p className="text-slate-500 text-xs mt-2 font-medium">Estimasi: {node.estimatedHours} jam</p>
                      {node.status === 'active' && <p className="text-amber-600 text-xs mt-1 font-bold">Klik untuk menyelesaikan!</p>}
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
