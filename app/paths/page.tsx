'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Send, Bot, User, Info, Save, Share2, Zap, LayoutGrid } from 'lucide-react';

import { Splitter, SplitterPanel } from '@/components/ui/splitter';

const NODES = [
  { id: 1, label: "Basic Linux", status: "done", x: 100, y: 150 },
  { id: 2, label: "Networking", status: "done", x: 250, y: 150 },
  { id: 3, label: "Docker Intro", status: "active", x: 400, y: 100 },
  { id: 4, label: "Cloud Security", status: "todo", x: 400, y: 200 },
  { id: 5, label: "Kubernetes", status: "todo", x: 550, y: 150 },
  { id: 6, label: "Cloud Arch", status: "todo", x: 700, y: 150 },
];

const CONNECTIONS = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
];

export default function SkillPaths() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Halo! Saya asisten AI SkillPath. Saya telah menyusun roadmap Cloud Architecture untukmu berdasarkan hasil tes bakatmu.' },
    { role: 'ai', text: 'Jalur ini fokus pada transisi dari Linux Administrator ke Cloud Architect dalam 6 bulan. Ada yang ingin kamu tanyakan tentang simpul pertama?' },
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { role: 'user', text: inputText }]);
    setInputText('');
    
    // Fake AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'Tentu! Cloud Security adalah komponen krusial. Kita akan mulai dengan Identity and Access Management (IAM).' 
      }]);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-24 h-[calc(100vh)] flex overflow-hidden">
        <Splitter defaultSize={30} className="w-full h-full">
          {/* Left: AI Chatbot Panel */}
          <SplitterPanel className="h-full">
            <div className="w-full h-full glass flex flex-col border-r border-white/20 z-10 shadow-2xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                  <Bot size={22} />
               </div>
               <div>
                  <h4 className="font-bold text-sm">SkillPath Consultant</h4>
                  <div className="flex items-center gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">AI Online</span>
                  </div>
               </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground"><Info size={18}/></Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex gap-3 max-w-[90%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md",
                  msg.role === 'ai' ? "bg-white text-primary" : "bg-primary text-white"
                )}>
                  {msg.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.role === 'ai' ? "bg-white/60 backdrop-blur-md rounded-tl-none border border-white/40" : "bg-primary text-white rounded-tr-none"
                )}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 border-t border-white/10 bg-white/20 backdrop-blur-xl">
            <form 
               onSubmit={(e) => { e.preventDefault(); handleSend(); }}
               className="relative flex items-center"
            >
               <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="w-full bg-white/50 border border-white/60 rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/60"
               />
               <button 
                  type="submit"
                  className="absolute right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-lg"
               >
                  <Send size={14} />
               </button>
            </form>
          </div>
        </div>
        </SplitterPanel>
        {/* Right: Neural Roadmap Canvas */}
          <SplitterPanel className="h-full">
            <div className="w-full h-full relative overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.97]">
              
              {/* Canvas Controls */}
              <div className="absolute top-8 right-8 flex gap-3 z-20">
                 <Button variant="outline" className="glass rounded-full px-4 text-xs font-bold gap-2"><LayoutGrid size={14}/> Grid View</Button>
                 <Button className="rounded-full px-6 bg-primary text-white text-xs font-bold gap-2 shadow-xl shadow-primary/20"><Save size={14}/> Simpan Roadmap</Button>
                 <Button variant="ghost" size="icon" className="glass rounded-full"><Share2 size={16}/></Button>
              </div>

              {/* Roadmap SVG Grid */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                 <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                       <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                 </svg>
              </div>

              {/* Interactive Graph Area */}
              <div className="absolute inset-0 flex items-center justify-center overflow-auto p-20 cursor-grab active:cursor-grabbing">
                 <div className="relative min-w-[800px] min-h-[400px]">
                    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                       {/* Connections */}
                       {CONNECTIONS.map((conn, i) => {
                          const from = NODES.find(n => n.id === conn.from)!;
                          const to = NODES.find(n => n.id === conn.to)!;
                          return (
                             <motion.path
                                key={i}
                                d={`M ${from.x} ${from.y} C ${(from.x + to.x) / 2} ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}`}
                                fill="none"
                                stroke={from.status === 'done' && to.status !== 'todo' ? "var(--sp-accent-gold)" : "rgba(0,0,0,0.1)"}
                                strokeWidth="3"
                                strokeDasharray={to.status === 'todo' ? "5 5" : "none"}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                             />
                          );
                       })}
                    </svg>

                    {/* Nodes */}
                    {NODES.map((node, i) => (
                       <motion.div
                          key={node.id}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                          style={{ left: node.x, top: node.y }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group"
                       >
                          <button className={cn(
                            "w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-xl relative",
                            node.status === 'done' ? "bg-sp-accent-gold border-white text-white scale-110" : 
                            node.status === 'active' ? "bg-white border-primary text-primary animate-pulse" : 
                            "bg-white/40 border-white/60 text-muted-foreground backdrop-blur-md"
                          )}>
                             <Zap size={24} className={cn(node.status === 'active' && "animate-bounce")} />
                             
                             {/* Status Label */}
                             <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-extrabold uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                {node.label} • {node.status.toUpperCase()}
                             </div>

                             {/* Pulse Rings for active node */}
                             {node.status === 'active' && (
                                <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
                             )}
                          </button>
                       </motion.div>
                    ))}
                 </div>
              </div>

              {/* Timeline Vertical Markers */}
              <div className="absolute left-8 top-32 flex flex-col gap-20 pointer-events-none">
                 {[1, 2, 3, 4, 5, 6].map(m => (
                    <div key={m} className="flex items-center gap-3">
                       <span className="text-[10px] font-bold text-muted-foreground/50 rotate-90">BULAN {m}</span>
                       <div className="w-10 h-[1px] bg-muted-foreground/20" />
                    </div>
                 ))}
              </div>
            </div>
          </SplitterPanel>
        </Splitter>
      </main>
    </div>
  );
}
