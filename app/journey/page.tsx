'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlayCircle, CheckCircle2, Lock, Flame, Trophy, Star, BookOpen, MessageSquare, Plus, Check, Sparkles } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Task {
  id: string;
  day: number;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
}

export default function LearningJourneyPage() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState("Dasar Cloud Computing");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 't1', day: 1, title: 'Tonton Pengenalan Cloud Platform', estimatedMinutes: 30, completed: true },
    { id: 't2', day: 2, title: 'Buat akun AWS & Setup Billing Alarm', estimatedMinutes: 45, completed: false },
    { id: 't3', day: 3, title: 'Deploy EC2 Instance Linux', estimatedMinutes: 60, completed: false },
    { id: 't4', day: 4, title: 'Konfigurasi Security Group', estimatedMinutes: 40, completed: false },
    { id: 't5', day: 5, title: 'Study Case: Web Server Sederhana', estimatedMinutes: 90, completed: false },
    { id: 't6', day: 6, title: 'Review & Quiz Akhir Minggu', estimatedMinutes: 30, completed: false },
    { id: 't7', day: 7, title: 'Proyek Mini: Host HTML Statis di S3', estimatedMinutes: 120, completed: false },
  ]);

  const [aiLoading, setAiLoading] = useState(false);
  const [streak, setStreak] = useState(3);
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = (completedCount / tasks.length) * 100;

  useEffect(() => {
    // In a full implementation, we would call /api/generate-journey here 
    // to dynamically generate tasks based on a specific node from Skill Paths.
    const customTopic = searchParams.get('topic');
    if (customTopic) {
      setTopic(customTopic);
    }
  }, [searchParams]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        if (!t.completed && streak < 4) setStreak(s => s + 1); // Reward interaction
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a0514] text-white pt-24 pb-12 overflow-x-hidden relative">
      <Navbar />

      {/* Decorative Blur Backgrounds */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5D1636]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#feb47b]/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <div className="flex items-center gap-3 mb-3">
                 <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-bold uppercase tracking-widest border border-white/20">Roadmap Terkini</span>
                 <div className="flex items-center gap-1.5 text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 text-xs font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                    <Flame size={14} className="fill-current" />
                    {streak} Hari Streak!
                 </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight">{topic}</h1>
           </div>
           
           <div className="flex-shrink-0 w-full md:w-64">
              <div className="flex justify-between text-sm font-bold mb-2">
                 <span>Progress Modul</span>
                 <span className="text-[#feb47b]">{Math.round(progressPercent)}%</span>
              </div>
              <Progress value={progressPercent} className="h-3 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-[#ff7e5f] [&>div]:to-[#feb47b] shadow-inner" />
           </div>
        </div>

        {/* 3-Column Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Progress & Mentorship (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
             {/* Profile/Stats Card */}
             <div className="glass p-6 rounded-3xl border border-white/10 shadow-xl bg-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-6 relative">
                   <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/20">
                      <div className="w-full h-full bg-[#0a0514] rounded-[14px] flex items-center justify-center font-black text-2xl">
                         U
                      </div>
                   </div>
                   <div>
                      <h3 className="font-bold text-lg leading-tight">User Explorer</h3>
                      <p className="text-xs text-white/50 tracking-widest uppercase mt-1">Level 4 Novice</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                   <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                      <Star className="text-amber-400 mb-1" size={20} />
                      <span className="font-black text-xl">1250</span>
                      <span className="text-[10px] text-white/50 uppercase tracking-widest">XP points</span>
                   </div>
                   <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                      <CheckCircle2 className="text-emerald-400 mb-1" size={20} />
                      <span className="font-black text-xl">{completedCount}</span>
                      <span className="text-[10px] text-white/50 uppercase tracking-widest">Selesai</span>
                   </div>
                </div>
             </div>

             {/* Mini AI Motivator */}
             <div className="glass p-5 rounded-3xl border border-emerald-500/20 shadow-lg shadow-emerald-500/5 bg-gradient-to-br from-emerald-500/10 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 relative">
                      <MessageSquare size={18} />
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0a0514]" />
                   </div>
                   <h4 className="font-bold text-sm">AI Motivator</h4>
                </div>
                <p className="text-sm text-emerald-100/80 italic leading-relaxed font-medium">
                  "{streak > 2 ? 'Luar biasa! Konsistensimu membangun fondasi masa depan. Terus pertahankan api belajarmu hari ini!' : 'Ayo mulai langkah pertamamu hari ini. Setiap task kecil membawamu lebih dekat ke tujuan.'}"
                </p>
             </div>
          </div>

          {/* Center Column: The Journey Track (6 cols) */}
          <div className="lg:col-span-6">
             <div className="glass p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden min-h-[600px]">
                {/* Decorative Line background */}
                <div className="absolute left-10 md:left-14 top-10 bottom-10 w-0.5 bg-white/10" />

                <div className="flex justify-between items-center mb-8 relative z-10 pl-2">
                   <h2 className="text-2xl font-black font-display">Misi Harian (7 Hari)</h2>
                   <Button variant="ghost" size="sm" className="text-xs uppercase tracking-widest font-bold text-white/50 hover:text-white">
                      Lihat Semua
                   </Button>
                </div>

                <div className="space-y-6 relative z-10">
                   {tasks.map((task, idx) => (
                      <motion.div 
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: idx * 0.1 }}
                         key={task.id} 
                         onClick={() => toggleTask(task.id)}
                         className={cn(
                            "flex items-center gap-5 md:gap-6 p-4 rounded-2xl cursor-pointer transition-all duration-300 group",
                            task.completed ? "bg-white/5 border border-white/10" : "bg-white/10 border border-white/20 hover:bg-white/15 hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                         )}
                      >
                         {/* Circle/Check */}
                         <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-500",
                            task.completed 
                               ? "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_0_20px_rgba(52,211,153,0.4)]" 
                               : "bg-[#0a0514] border-2 border-white/30 group-hover:border-[#feb47b]"
                         )}>
                            {task.completed 
                               ? <Check size={24} className="text-[#0a0514] font-black" /> 
                               : <span className="font-black text-white/50 group-hover:text-[#feb47b]">H{task.day}</span>
                            }
                         </div>

                         {/* Content */}
                         <div className="flex-1">
                            <h3 className={cn(
                               "font-bold text-lg md:text-xl leading-tight transition-colors duration-300",
                               task.completed ? "text-white/40 line-through" : "text-white group-hover:text-[#feb47b]"
                            )}>
                               {task.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-2">
                               <span className={cn(
                                  "text-xs font-bold uppercase tracking-widest flex items-center gap-1.5",
                                  task.completed ? "text-white/30" : "text-[#feb47b]"
                               )}>
                                  <PlayCircle size={14} /> {task.estimatedMinutes} Menit
                               </span>
                            </div>
                         </div>
                      </motion.div>
                   ))}
                </div>
             </div>
          </div>

          {/* Right Column: Resources & Rewards (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
             {/* Recommended Resources (Video Thumbs) */}
             <div className="glass p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="font-bold text-sm tracking-widest uppercase text-white/70 mb-5 flex items-center gap-2">
                   <BookOpen size={16} /> Referensi Belajar
                </h3>
                <div className="space-y-4">
                   <div className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10">
                      <div className="w-full h-28 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                         <PlayCircle size={32} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" />
                      </div>
                      <div className="absolute bottom-2 left-3 right-2">
                         <span className="text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded text-white backdrop-blur-sm">Video 12:45</span>
                         <p className="text-xs font-bold mt-1 text-white truncate drop-shadow-md">AWS Architecture 101</p>
                      </div>
                   </div>
                   
                   <div className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10">
                      <div className="w-full h-28 bg-gradient-to-br from-indigo-900 to-slate-900 group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                         <PlayCircle size={32} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" />
                      </div>
                      <div className="absolute bottom-2 left-3 right-2">
                         <span className="text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded text-white backdrop-blur-sm">Video 28:10</span>
                         <p className="text-xs font-bold mt-1 text-white truncate drop-shadow-md">Setup Security Groups</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Rewards / Badges */}
             <div className="glass p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="font-bold text-sm tracking-widest uppercase text-white/70 mb-5 flex items-center gap-2">
                   <Trophy size={16} /> Progress Milestone
                </h3>
                <TooltipProvider>
                   <div className="grid grid-cols-2 gap-4">
                      <Tooltip>
                         <TooltipTrigger asChild>
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#5D1636] to-slate-900 border border-[#feb47b]/30 flex flex-col items-center justify-center p-3 cursor-pointer shadow-[0_0_15px_rgba(254,180,123,0.1)] hover:shadow-[0_0_20px_rgba(254,180,123,0.3)] transition-all">
                               <Sparkles className="text-[#feb47b] mb-2" size={28} />
                               <span className="text-[10px] font-bold text-center leading-tight">First Cloud Instance</span>
                            </div>
                         </TooltipTrigger>
                         <TooltipContent side="top" className="bg-white text-slate-900 font-bold border-none shadow-xl">
                            <p>Selesaikan Task 3 untuk mengklaim badge (Terkunci)</p>
                         </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                         <TooltipTrigger asChild>
                            <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center p-3 cursor-pointer opacity-50 hover:opacity-100 transition-opacity grayscale">
                               <Lock className="text-white/50 mb-2" size={28} />
                               <span className="text-[10px] font-bold text-center leading-tight">Mastering Cloud</span>
                            </div>
                         </TooltipTrigger>
                         <TooltipContent side="top" className="bg-slate-800 text-white font-bold border-white/20 shadow-xl">
                            <p>Selesaikan semua task minggu ini</p>
                         </TooltipContent>
                      </Tooltip>
                   </div>
                </TooltipProvider>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
