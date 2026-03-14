'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Flame, Trophy, Calendar, ChevronRight, Zap, Target, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

const TASKS = [
  { id: 1, title: "Konfigurasi OpenStack Controller", time: "45 Menit", done: true },
  { id: 2, title: "Implementasi IAM Policies", time: "30 Menit", done: true },
  { id: 3, title: "Setup VPC Peering", time: "1 Jam", done: false },
  { id: 4, title: "Pelajari Dasar Terraform", time: "40 Menit", done: false },
  { id: 5, title: "Review Cloud Architecture", time: "20 Menit", done: false },
];

export default function LearningJourney() {
  const [taskList, setTaskList] = useState(TASKS);
  const [streak, setStreak] = useState(12);

  const completedCount = taskList.filter(t => t.done).length;
  const progress = (completedCount / taskList.length) * 100;

  const toggleTask = (id: number) => {
    const newList = taskList.map(t => {
      if (t.id === id) {
        if (!t.done && completedCount === taskList.length - 1) {
          triggerConfetti();
        }
        return { ...t, done: !t.done };
      }
      return t;
    });
    setTaskList(newList);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B2252', '#F5A623', '#FFD700']
    });
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stats & Motivation (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass p-8 rounded-[2rem] flex flex-col items-center text-center">
               <h3 className="font-display font-bold text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8">Progress Belajar</h3>
               
               {/* Radial Progress Ring */}
               <div className="relative w-48 h-48 mb-6">
                  <svg className="w-full h-full -rotate-90">
                     <circle 
                        cx="96" cy="96" r="80" 
                        stroke="rgba(0,0,0,0.05)" 
                        strokeWidth="12" 
                        fill="none" 
                     />
                     <motion.circle 
                        initial={{ strokeDashoffset: 502 }}
                        animate={{ strokeDashoffset: 502 - (502 * progress) / 100 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        cx="96" cy="96" r="80" 
                        stroke="url(#progressGradient)" 
                        strokeWidth="12" 
                        strokeLinecap="round" 
                        fill="none" 
                        strokeDasharray="502"
                     />
                     <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                           <stop offset="0%" stopColor="var(--sp-accent-orange)" />
                           <stop offset="100%" stopColor="var(--sp-accent-gold)" />
                        </linearGradient>
                     </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-5xl font-display font-black text-foreground">{Math.round(progress)}%</span>
                     <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Selesai</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white/40 p-4 rounded-2xl border border-white/60">
                     <div className="flex items-center justify-center gap-2 text-sp-accent-orange mb-1">
                        <Flame size={16} className="animate-pulse" />
                        <span className="text-lg font-black">{streak}</span>
                     </div>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase">Day Streak</p>
                  </div>
                  <div className="bg-white/40 p-4 rounded-2xl border border-white/60">
                     <div className="flex items-center justify-center gap-2 text-primary mb-1">
                        <Zap size={16} />
                        <span className="text-lg font-black">{completedCount}/{taskList.length}</span>
                     </div>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase">Tasks Done</p>
                  </div>
               </div>
            </div>

            <div className="glass p-6 rounded-[2rem] flex items-center gap-4 group cursor-pointer hover:bg-white/60 transition-all">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                  <Trophy size={28} />
               </div>
               <div className="flex-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Badge Saat Ini</p>
                  <h4 className="font-display font-bold text-lg">Junior Infrastructure Architect</h4>
               </div>
               <ChevronRight className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Center Column: Tasks Dashboard (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center mb-2 px-2">
               <h2 className="text-2xl font-display font-black">Tugas Hari Ini</h2>
               <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">Kamis, 13 Maret 2026</span>
            </div>

            <div className="space-y-4">
               {taskList.map((task) => (
                  <motion.div
                     key={task.id}
                     layout
                     onClick={() => toggleTask(task.id)}
                     className={cn(
                        "glass p-5 rounded-2xl flex items-center gap-4 cursor-pointer group transition-all",
                        task.done ? "opacity-60 bg-white/20" : "hover:bg-white/60"
                     )}
                  >
                     <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all",
                        task.done ? "bg-primary border-primary text-white scale-110" : "border-muted-foreground/30 group-hover:border-primary/50"
                     )}>
                        {task.done ? <CheckCircle2 size={16} /> : <Circle size={16} className="text-transparent" />}
                     </div>
                     <div className="flex-1">
                        <h4 className={cn("font-bold text-sm transition-all", task.done && "line-through text-muted-foreground")}>
                           {task.title}
                        </h4>
                     </div>
                     <span className="text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary rounded-lg">
                        {task.time}
                     </span>
                  </motion.div>
               ))}
               
               {completedCount === taskList.length && (
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="p-10 flex flex-col items-center text-center text-muted-foreground"
                  >
                     <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                        <CheckCircle2 size={32} />
                     </div>
                     <p className="text-sm font-bold">Semua tugas selesai! Kamu luar biasa.</p>
                  </motion.div>
               )}
            </div>
          </div>

          {/* Right Column: Calendar & Rewards (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass p-6 rounded-[2rem]">
               <h4 className="font-display font-bold text-xs uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                  <Calendar size={14} /> Roadmap Timeline
               </h4>
               <div className="space-y-6 relative ml-2">
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-muted shadow-inner" />
                  {[
                     { label: "Minggu 1: OS Core", status: "done" },
                     { label: "Minggu 2: Network", status: "active" },
                     { label: "Minggu 3: Docker", status: "todo" },
                     { label: "Minggu 4: CI/CD", status: "todo" },
                  ].map((m, i) => (
                     <div key={i} className="flex items-center gap-4 relative">
                        <div className={cn(
                           "w-4 h-4 rounded-full border-2 z-10",
                           m.status === 'done' ? "bg-primary border-primary" : 
                           m.status === 'active' ? "bg-white border-primary animate-pulse" : 
                           "bg-white border-muted-foreground/30"
                        )} />
                        <span className={cn(
                           "text-xs font-bold transition-colors",
                           m.status === 'active' ? "text-primary" : "text-muted-foreground"
                        )}>{m.label}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="glass p-6 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
               <h4 className="font-display font-bold text-xs uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                  <Award size={14} /> Next Milestone
               </h4>
               <p className="text-xs mb-4 text-muted-foreground leading-relaxed">
                  Selesaikan 5 tugas lagi untuk mendapatkan sertifikat <strong>Linux Expert</strong>.
               </p>
               <div className="flex items-center gap-2 p-3 bg-white/40 rounded-xl border border-white/60">
                  <Target size={16} className="text-sp-accent-gold" />
                  <span className="text-[10px] font-bold">5 Tasks to go</span>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
