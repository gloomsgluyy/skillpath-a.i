'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, Send, Sparkles, CheckCircle2, Loader2, Map } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { getSkillPath, saveSkillPath, updateSkillPathNode, getAIRecommendation, type SkillPathNode } from '@/lib/firestore';
import confetti from 'canvas-confetti';
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
      const nextLocked = updatedNodes.find(n => n.status === 'locked');
      if (nextLocked) nextLocked.status = 'active';

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });

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
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-6">
            <Map size={32} className="text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Login Diperlukan</h2>
          <p className="text-gray-600 mb-8">Kamu perlu login untuk mengakses Skill Paths yang dipersonalisasi.</p>
          <button onClick={() => router.push('/')} className="btn-primary px-8 py-3">
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left: Chat Panel */}
        <div className="w-full lg:w-[30%] flex flex-col border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">AI Consultant</h3>
              <span className="text-[10px] text-green-600 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Online
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
                  "max-w-[90%] rounded-lg px-4 py-3 text-sm",
                  msg.role === 'ai'
                    ? "bg-gray-50 border border-gray-100 mr-auto text-gray-700 prose prose-sm prose-gray prose-p:leading-relaxed prose-a:text-orange-600 max-w-none"
                    : "bg-orange-500 text-white ml-auto shadow-sm"
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
                className="max-w-[70%] bg-gray-50 border border-gray-100 mr-auto rounded-lg px-4 py-4 flex items-center gap-2"
              >
                <div className="flex gap-1.5">
                  <motion.div className="w-2 h-2 rounded-full bg-gray-300" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0 }} />
                  <motion.div className="w-2 h-2 rounded-full bg-gray-300" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0.2 }} />
                  <motion.div className="w-2 h-2 rounded-full bg-gray-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0.4 }} />
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Tanya tentang roadmap..."
                className="input-clean flex-1 text-sm"
              />
              <Button onClick={handleSendMessage} disabled={chatLoading} className="bg-orange-500 hover:bg-orange-600 rounded-lg px-4 text-white">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Roadmap Canvas */}
        <div className="hidden lg:flex flex-1 flex-col relative overflow-auto bg-gray-50">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {loading || generating ? (
            <div className="relative p-8 min-h-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <Skeleton className="h-8 w-48 mb-2 bg-gray-200 rounded-lg" />
                  <Skeleton className="h-4 w-32 bg-gray-200 rounded" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-40 rounded-lg bg-gray-200" />
                ))}
              </div>
            </div>
          ) : (
            <div className="relative p-8 min-h-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Roadmap: {career}</h2>
                  <p className="text-gray-500 text-sm mt-1">{nodes.filter(n => n.status === 'completed').length}/{nodes.length} tahapan selesai</p>
                </div>
                <Badge variant="outline" className="text-gray-600 border-gray-300 font-medium">
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
                          "p-5 rounded-lg border cursor-pointer transition-all duration-200 group bg-white",
                          node.status === 'completed'
                            ? "border-l-4 border-l-green-500 border-t-green-100 border-r-green-100 border-b-green-100 bg-green-50/50"
                            : node.status === 'active'
                              ? "border-l-4 border-l-orange-500 border-t-gray-200 border-r-gray-200 border-b-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1"
                              : "border-gray-200 opacity-60"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold",
                            node.status === 'completed' ? "bg-green-500 text-white" :
                            node.status === 'active' ? "bg-orange-500 text-white" :
                            "bg-gray-200 text-gray-400"
                          )}>
                            {node.status === 'completed' ? <CheckCircle2 size={16} /> : i + 1}
                          </div>
                          <h4 className={cn("font-bold text-sm flex-1", node.status === 'completed' ? "text-green-900" : node.status === 'active' ? "text-gray-900" : "text-gray-400")}>{node.title}</h4>
                        </div>
                        <p className={cn("text-xs line-clamp-2 leading-relaxed", node.status === 'active' ? "text-gray-600" : "text-gray-400")}>{node.description}</p>
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-200">
                          <span className="text-[10px] text-gray-500 font-medium">{node.estimatedHours}h estimasi</span>
                          <span className={cn(
                            "text-[9px] font-semibold px-2 py-0.5 rounded-full",
                            node.status === 'completed' ? "bg-green-100 text-green-700" :
                            node.status === 'active' ? "bg-orange-100 text-orange-700" :
                            "bg-gray-100 text-gray-500"
                          )}>
                            {node.status === 'completed' ? 'Selesai' : node.status === 'active' ? 'Aktif' : 'Terkunci'}
                          </span>
                        </div>
                      </motion.div>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-white border border-gray-200 text-gray-900 w-72 shadow-lg rounded-lg p-5">
                      <h4 className="font-bold text-sm mb-2 text-gray-900">{node.title}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{node.description}</p>
                      <p className="text-gray-500 text-xs mt-2 font-medium">Estimasi: {node.estimatedHours} jam</p>
                      {node.status === 'active' && <p className="text-orange-600 text-xs mt-1 font-medium">Klik untuk menyelesaikan!</p>}
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
