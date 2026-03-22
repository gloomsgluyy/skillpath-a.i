'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Ubah motion/react menjadi framer-motion jika Anda pakai framer-motion
import { Navbar } from '@/components/layout/Navbar';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Flame, Trophy, Calendar, ChevronRight, Zap, Target, Award, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

export default function LearningJourney() {
   const router = useRouter();
   const [activeCareer, setActiveCareer] = useState<any>(null);
   const [taskList, setTaskList] = useState<any[]>([]);
   const [streak, setStreak] = useState(1); // Default streak

   // Mengambil data dari localStorage saat halaman dimuat
   useEffect(() => {
      const savedJourney = localStorage.getItem('activeJourney');
      if (savedJourney) {
         const parsedCareer = JSON.parse(savedJourney);
         setActiveCareer(parsedCareer);

         // Konversi roadmap dari Groq AI menjadi format Task List
         const mappedTasks = parsedCareer.roadmap.map((step: any, index: number) => ({
            id: index + 1,
            title: step.label,
            time: "Fleksibel", // Bisa disesuaikan
            done: step.status === 'completed'
         }));
         setTaskList(mappedTasks);
      } else {
         // Fallback jika tidak ada data (langsung akses /journey)
         setTaskList([
            { id: 1, title: "Belum ada journey yang dipilih", time: "-", done: false }
         ]);
      }
   }, []);

   const completedCount = taskList.filter(t => t.done).length;
   const progress = taskList.length > 0 ? (completedCount / taskList.length) * 100 : 0;

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

      // Opsional: Simpan progress kembali ke local storage/database
   };

   const triggerConfetti = () => {
      confetti({
         particleCount: 150,
         spread: 70,
         origin: { y: 0.6 },
         colors: ['#8B2252', '#F5A623', '#FFD700']
      });
   };

   if (!activeCareer) {
      return <div className="min-h-screen flex items-center justify-center">Memuat Journey...</div>;
   }

   return (
      <div className="relative min-h-screen bg-[#FAFAFA] text-slate-900">
         <Navbar />

         <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            {/* Tombol Kembali */}
            <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-slate-900 font-medium mb-8 transition-colors">
               <ArrowLeft size={18} /> Kembali ke Eksplorasi
            </button>

            <div className="mb-10">
               <h1 className="text-3xl font-bold text-slate-900 mb-2">Learning Journey: <span className="text-orange-500">{activeCareer.title}</span></h1>
               <p className="text-gray-500">Selesaikan roadmap ini untuk meningkatkan kecocokan profilmu ({activeCareer.matchScore}% Match).</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
               {/* Left Column: Stats & Motivation */}
               <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center">
                     <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">Progress Belajar</h3>

                     {/* Radial Progress Ring */}
                     <div className="relative w-48 h-48 mb-6">
                        <svg className="w-full h-full -rotate-90">
                           <circle cx="96" cy="96" r="80" stroke="#F3F4F6" strokeWidth="12" fill="none" />
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
                                 <stop offset="0%" stopColor="#f97316" /> {/* orange-500 */}
                                 <stop offset="100%" stopColor="#10b981" /> {/* emerald-500 */}
                              </linearGradient>
                           </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-5xl font-black text-slate-900">{Math.round(progress)}%</span>
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Selesai</span>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                           <div className="flex items-center justify-center gap-2 text-orange-500 mb-1">
                              <Flame size={16} className="animate-pulse" />
                              <span className="text-lg font-black">{streak}</span>
                           </div>
                           <p className="text-[10px] font-bold text-gray-500 uppercase">Day Streak</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                           <div className="flex items-center justify-center gap-2 text-emerald-600 mb-1">
                              <Zap size={16} />
                              <span className="text-lg font-black">{completedCount}/{taskList.length}</span>
                           </div>
                           <p className="text-[10px] font-bold text-gray-500 uppercase">Tasks Done</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-4 group cursor-pointer hover:border-gray-200 transition-all">
                     <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                        <Trophy size={28} />
                     </div>
                     <div className="flex-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Target Peran</p>
                        <h4 className="font-bold text-sm text-slate-900">{activeCareer.title}</h4>
                     </div>
                     <ChevronRight className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
               </div>

               {/* Center Column: Tasks Dashboard */}
               <div className="lg:col-span-5 space-y-6">
                  <div className="flex justify-between items-center mb-2 px-2">
                     <h2 className="text-2xl font-black text-slate-900">Tugas Hari Ini</h2>
                     <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Roadmap Aktif</span>
                  </div>

                  <div className="space-y-4">
                     {taskList.map((task) => (
                        <motion.div
                           key={task.id}
                           layout
                           onClick={() => toggleTask(task.id)}
                           className={cn(
                              "bg-white border p-5 rounded-2xl flex items-center gap-4 cursor-pointer group transition-all shadow-sm",
                              task.done ? "border-emerald-100 bg-emerald-50/30 opacity-70" : "border-gray-100 hover:border-orange-200 hover:shadow-md"
                           )}
                        >
                           <div className={cn(
                              "w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all",
                              task.done ? "bg-emerald-500 border-emerald-500 text-white scale-110" : "border-gray-200 group-hover:border-orange-300"
                           )}>
                              {task.done ? <CheckCircle2 size={16} /> : <Circle size={16} className="text-transparent" />}
                           </div>
                           <div className="flex-1">
                              <h4 className={cn("font-bold text-sm transition-all", task.done ? "line-through text-gray-500" : "text-slate-800")}>
                                 {task.title}
                              </h4>
                           </div>
                           <span className={cn(
                              "text-[10px] font-bold px-2 py-1 rounded-lg",
                              task.done ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"
                           )}>
                              {task.time}
                           </span>
                        </motion.div>
                     ))}

                     {completedCount === taskList.length && taskList.length > 0 && (
                        <motion.div
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="p-10 flex flex-col items-center text-center text-gray-500"
                        >
                           <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
                              <CheckCircle2 size={32} />
                           </div>
                           <p className="text-sm font-bold text-slate-800">Semua tugas di roadmap ini selesai! Kamu luar biasa.</p>
                        </motion.div>
                     )}
                  </div>
               </div>

               {/* Right Column: Mini Info */}
               <div className="lg:col-span-3 space-y-6">
                  <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-lg">
                     <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                        <Award size={14} className="text-orange-400" /> Tujuan Akhir
                     </h4>
                     <p className="text-sm mb-6 text-gray-300 leading-relaxed">
                        Selesaikan seluruh modul {activeCareer.title} untuk menguasai skill seperti <span className="text-emerald-400">{activeCareer.tags.join(', ')}</span>.
                     </p>
                     <div className="flex items-center gap-2 p-3 bg-white/10 rounded-xl border border-white/10">
                        <Target size={16} className="text-orange-400" />
                        <span className="text-[11px] font-bold text-gray-200">{taskList.length - completedCount} Tahap Lagi</span>
                     </div>
                  </div>
               </div>

            </div>
         </main>
      </div>
   );
}