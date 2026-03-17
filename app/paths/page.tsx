'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Bot, Send, ArrowLeft, Save, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Node {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  prerequisites: string[];
  status: 'locked' | 'active' | 'completed';
  x: number;
  y: number;
}

export default function SkillPathsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [careerTitle, setCareerTitle] = useState("Cloud Architecture Engineer");
  
  // Chat State
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: 'Halo! Saya AI Consultant kamu. Saya telah menyusun Neural Roadmap ini untuk karir Cloud Architect. Ada bagian yang ingin dibahas?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Canvas State (Pan & Zoom)
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  
  // Nodes State (Mock data until API is fully wired)
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', title: 'Linux Basics', description: 'File systems, permissions, shell scripting', estimatedHours: 20, prerequisites: [], status: 'completed', x: 200, y: 100 },
    { id: '2', title: 'Computer Networking', description: 'OSI Model, TCP/IP, DNS, Routing', estimatedHours: 25, prerequisites: ['1'], status: 'active', x: 200, y: 250 },
    { id: '3', title: 'Docker Containers', description: 'Containerization, images, Dockerfile', estimatedHours: 15, prerequisites: ['2'], status: 'locked', x: 100, y: 400 },
    { id: '4', title: 'Cloud Concepts', description: 'IaaS, PaaS, SaaS, AWS/GCP Intro', estimatedHours: 20, prerequisites: ['2'], status: 'locked', x: 300, y: 400 },
    { id: '5', title: 'Kubernetes', description: 'Orchestration, Pods, Deployments', estimatedHours: 40, prerequisites: ['3', '4'], status: 'locked', x: 200, y: 550 },
  ]);

  useEffect(() => {
    // Look for career param
    const c = searchParams.get('career');
    if (c) {
      if (c === 'fullstack-dev') setCareerTitle("Full-Stack Developer");
      else if (c.includes('cyber')) setCareerTitle("Cyber Security Analyst");
      
      // In a real app we'd fetch from /api/generate-path here
    }
  }, [searchParams]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: inputValue }]);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'Menarik! Fokus ke keamanan siber memang krusial. Saya akan menyorot (highlight) modul Security di roadmap bagian kanan.' 
      }]);
      setIsTyping(false);
      // Simulate highlighting a node
      setNodes(prev => prev.map(n => n.id === '2' ? { ...n, status: 'active' } : n));
    }, 1500);
  };

  const handleZoom = (dz: number) => {
    setScale(s => Math.min(Math.max(0.5, s + dz), 2));
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0514] overflow-hidden text-white font-sans">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-10" 
        style={{ 
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent to-[#1a0f2e]/80 pointer-events-none" />

      {/* Left Column: AI Consultant Chatbot Panel (30%) */}
      <div className="relative z-10 w-full md:w-[30%] h-full bg-black/40 backdrop-blur-2xl border-r border-[#feb47b]/30 shadow-[10px_0_30px_rgba(254,180,123,0.05)] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-4 bg-white/5">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-full transition-colors">
             <ArrowLeft size={20} />
          </button>
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
               <Bot size={24} className="text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#0a0514]"></span>
            </span>
          </div>
          <div>
            <h2 className="font-display font-black text-lg text-white">Pathfinder AI</h2>
            <p className="text-xs font-bold text-emerald-400 tracking-widest uppercase">Consultant Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
              key={i} 
              className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}
            >
              <div className={cn(
                "max-w-[85%] p-4 text-sm font-medium leading-relaxed rounded-2xl",
                msg.role === 'user' 
                  ? "bg-white/10 border border-white/20 text-white rounded-tr-sm"
                  : "bg-gradient-to-br from-[#2a1b3d] to-[#1a0f2e] border border-[#feb47b]/20 text-slate-200 rounded-tl-sm shadow-xl"
              )}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-[#1a0f2e] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                   <div className="w-2 h-2 rounded-full bg-[#feb47b] animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-2 h-2 rounded-full bg-[#feb47b] animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-2 h-2 rounded-full bg-[#feb47b] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
             </motion.div>
          )}
        </div>

        {/* Input Field */}
        <div className="p-4 bg-black/20">
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tanya soal roadmap ini..."
              className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#feb47b] px-4 py-3 text-sm text-white focus:outline-none transition-colors placeholder:text-white/30"
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-0 p-3 text-[#feb47b] hover:text-white transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Neural Roadmap Canvas (70%) */}
      <div className="relative z-10 flex-1 h-full cursor-grab active:cursor-grabbing overflow-hidden">
         {/* Canvas Header */}
         <div className="absolute top-6 left-8 z-20 pointer-events-none">
            <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 drop-shadow-xl">
               Neural Roadmap
            </h1>
            <p className="text-[#feb47b] font-bold tracking-widest uppercase text-sm mt-2">{careerTitle}</p>
         </div>

         {/* Zoom Controls */}
         <div className="absolute top-6 right-6 z-20 flex gap-2">
            <button onClick={() => handleZoom(-0.1)} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-xl shadow-xl transition-all">-</button>
            <button onClick={() => handleZoom(0.1)} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-xl shadow-xl transition-all">+</button>
         </div>

         {/* Interactive Canvas Area */}
         <motion.div 
            drag 
            dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
            className="w-full h-full relative"
            style={{ scale }}
            animate={{ x: pan.x, y: pan.y }}
         >
            {/* Draw Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-[2000px] h-[2000px] pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-10rem, -5rem)' }}>
               {nodes.map(node => 
                  node.prerequisites.map(preId => {
                     const preNode = nodes.find(n => n.id === preId);
                     if (!preNode) return null;
                     
                     // If both are completed/active, line glows
                     const isLineActive = preNode.status !== 'locked' && node.status !== 'locked';
                     
                     return (
                        <path 
                           key={`${preId}-${node.id}`}
                           d={`M ${preNode.x} ${preNode.y} C ${preNode.x} ${(preNode.y + node.y)/2}, ${node.x} ${(preNode.y + node.y)/2}, ${node.x} ${node.y}`}
                           fill="none"
                           stroke={isLineActive ? "url(#glowGradient)" : "rgba(255,255,255,0.1)"}
                           strokeWidth={isLineActive ? 3 : 2}
                           className={isLineActive ? "drop-shadow-[0_0_8px_rgba(254,180,123,0.8)]" : ""}
                        />
                     );
                  })
               )}
               <defs>
                  <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#ff7e5f" />
                     <stop offset="100%" stopColor="#feb47b" />
                  </linearGradient>
               </defs>
            </svg>

            {/* Render Nodes */}
            <div className="absolute inset-0" style={{ left: '50%', top: '50%', transform: 'translate(-10rem, -5rem)' }}>
               {nodes.map(node => (
                 <HoverCard key={node.id} openDelay={200} closeDelay={100}>
                   <HoverCardTrigger asChild>
                     <div 
                        className={cn(
                           "absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300",
                           node.status === 'completed' 
                              ? "w-16 h-16 bg-[#FFD700] border-4 border-white shadow-[0_0_30px_rgba(255,215,0,0.6)] z-20" 
                              : node.status === 'active'
                                 ? "w-20 h-20 bg-black/40 backdrop-blur-md border-2 border-[#ccff00] shadow-[0_0_40px_rgba(204,255,0,0.5)] z-30" 
                                 : "w-14 h-14 bg-white/5 backdrop-blur-sm border border-white/20 opacity-60 hover:opacity-100 z-10"
                        )}
                        style={{ left: node.x, top: node.y }}
                     >
                        {node.status === 'completed' && <CheckCircle2 className="text-[#0a0514]" size={28} />}
                        {node.status === 'active' && (
                           <div className="absolute inset-0 rounded-full border border-[#ccff00] animate-ping opacity-50" />
                        )}
                        {node.status === 'active' && <Sparkles className="text-[#ccff00]" size={28} />}
                     </div>
                   </HoverCardTrigger>
                   <HoverCardContent side="right" sideOffset={20} className="w-80 bg-white/10 backdrop-blur-3xl border border-white/20 p-5 rounded-2xl shadow-2xl z-50 text-white">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="text-lg font-black">{node.title}</h4>
                         <span className="text-xs font-bold text-[#feb47b] bg-[#feb47b]/10 px-2 py-1 rounded-md">{node.estimatedHours} Jam</span>
                      </div>
                      <p className="text-sm text-slate-300 mb-6">{node.description}</p>
                      
                      <Button 
                         disabled={node.status === 'locked'}
                         className={cn(
                           "w-full rounded-xl font-bold",
                           node.status === 'locked' 
                              ? "bg-white/10 text-white/40"
                              : "bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-slate-900 border-none hover:shadow-[0_0_20px_rgba(254,180,123,0.5)]"
                         )}
                      >
                         {node.status === 'locked' ? 'Terkunci' : 'Pelajari Sekarang'}
                      </Button>
                   </HoverCardContent>
                 </HoverCard>
               ))}
            </div>

            {/* Timeline Markers (Approximated positions) */}
            <div className="absolute left-[-10rem] top-[50%] -translate-y-1/2 flex flex-col gap-[150px] pointer-events-none">
               <div className="flex items-center gap-4 text-white/30">
                  <span className="font-bold tracking-widest uppercase text-sm">Bulan 1</span>
                  <div className="w-full h-px bg-white/10" />
               </div>
               <div className="flex items-center gap-4 text-white/30">
                  <span className="font-bold tracking-widest uppercase text-sm">Bulan 2</span>
                  <div className="w-full h-px bg-white/10" />
               </div>
               <div className="flex items-center gap-4 text-white/30">
                  <span className="font-bold tracking-widest uppercase text-sm">Bulan 3</span>
                  <div className="w-full h-px bg-white/10" />
               </div>
            </div>
         </motion.div>

         {/* Floating Action Panel (Bottom Right) */}
         <div className="absolute bottom-8 right-8 z-30 flex gap-4">
            <Button variant="outline" className="h-14 w-14 rounded-2xl bg-white/5 hover:bg-white/10 border-white/20 text-white backdrop-blur-xl shadow-2xl">
               <Save size={24} />
            </Button>
            <Button className="h-14 px-6 rounded-2xl bg-[#5D1636] hover:bg-[#8A2150] text-[#feb47b] border border-[#feb47b]/30 shadow-[0_0_25px_rgba(93,22,54,0.8)] flex gap-3 font-bold uppercase tracking-widest text-xs transition-all hover:scale-105">
               <Download size={20} />
               Export PDF
            </Button>
         </div>
      </div>
    </div>
  );
}
