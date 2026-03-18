'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PlayCircle, CheckCircle2, Flame, Trophy, Star, BookOpen, Loader2, Sparkles, Target } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserJourney, saveUserJourney, markTaskCompleted, getAIRecommendation, type JourneyTask } from '@/lib/firestore';

export default function LearningJourney() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<JourneyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [career, setCareer] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function load() {
      if (!currentUser?.uid) { setLoading(false); return; }

      // Get current target career from AI recommendation
      const rec = await getAIRecommendation(currentUser.uid);
      const targetCareer = rec?.careerTitle || 'Full-Stack Developer';

      // Check if there's an existing journey that matches their CURRENT target career
      const existing = await getUserJourney(currentUser.uid);
      if (existing && existing.targetCareer === targetCareer) {
        setTasks(existing.tasks || []);
        setCareer(existing.targetCareer || '');
        setStreak(existing.streak || 0);
        setLoading(false);
        return;
      }
      setCareer(targetCareer);
      setGenerating(true);

      try {
        const res = await fetch('/api/generate-journey', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ career: targetCareer })
        });
        const data = await res.json();

        if (data.tasks && Array.isArray(data.tasks)) {
          const journeyTasks: JourneyTask[] = data.tasks.map((t: any, i: number) => ({
            id: `task-${i}`,
            day: t.day || i + 1,
            title: t.title || `Task ${i + 1}`,
            estimatedMinutes: t.estimatedMinutes || 30,
            completed: false,
            completedAt: null,
          }));
          setTasks(journeyTasks);
          saveUserJourney(currentUser.uid, targetCareer, journeyTasks).catch(console.warn);
        }
      } catch (err) {
        console.error('Journey generation error:', err);
      }
      setGenerating(false);
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleToggleTask = async (taskId: string) => {
    if (!currentUser?.uid) return;
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true, completedAt: new Date().toISOString() } : t));
    await markTaskCompleted(currentUser.uid, taskId);
    setStreak(prev => prev + 1);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-24">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BookOpen size={36} className="text-white" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-slate-900">Login Diperlukan</h2>
          <p className="text-slate-600 mb-8">Login untuk mengakses Learning Journey.</p>
          <Button onClick={() => router.push('/')} className="glow-pill-primary font-black px-8 py-3">Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 overflow-x-hidden relative">
      <Navbar />
      {/* Subtle mesh — matches landing page */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(255,126,95,0.06)_0%,transparent_50%),radial-gradient(circle_at_20%_80%,rgba(254,180,123,0.05)_0%,transparent_50%)]" />

      <main className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {loading || generating ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <Loader2 size={48} className="text-amber-400 animate-spin mx-auto mb-4" />
              <p className="text-slate-500 font-bold">{generating ? 'AI sedang membuat learning journey...' : 'Memuat...'}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left: Stats Sidebar */}
            <div className="w-full lg:w-[300px] flex flex-col gap-6 shrink-0">

              {/* Progress Card — Landing page's white card style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2rem] bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-7"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">Progress</h3>
                  <Badge variant="outline" className="text-slate-600 border-slate-300 font-bold text-xs">
                    {completedCount}/{tasks.length}
                  </Badge>
                </div>

                {/* Progress Ring */}
                <div className="relative w-36 h-36 mx-auto mb-6">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="url(#progressGrad)" strokeWidth="3"
                      strokeDasharray={`${progressPct}, 100`}
                      strokeLinecap="round" />
                    <defs>
                      <linearGradient id="progressGrad"><stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#ef4444" /></linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-900">{progressPct}%</span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">selesai</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                  />
                </div>
              </motion.div>

              {/* Streak — Landing page's solid white card style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-7 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-3">
                  <Flame size={28} className="text-orange-500" />
                </div>
                <div className="text-3xl font-black text-slate-900">{streak}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Hari Streak</div>
              </motion.div>

              {/* Career — Landing page's statement card (dark) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-[1.5rem] bg-slate-900 p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={14} className="text-amber-400" />
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Target Karir</span>
                  </div>
                  <p className="text-lg font-black text-white leading-tight">{career}</p>
                </div>
              </motion.div>
            </div>

            {/* Right: Task List */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8"
              >
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <BookOpen size={24} className="text-amber-500" />
                  Daily Tasks
                </h2>
                <Badge variant="outline" className="text-slate-500 border-slate-300 font-bold">
                  {completedCount} selesai
                </Badge>
              </motion.div>

              <div className="space-y-3">
                {tasks.map((task, i) => (
                  <TooltipProvider key={task.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: Math.min(i * 0.04, 0.5) }}
                          onClick={() => handleToggleTask(task.id)}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-[1.25rem] border transition-all duration-300 cursor-pointer group",
                            task.completed
                              ? "bg-white border-emerald-200 shadow-sm"
                              : "bg-white/50 backdrop-blur-2xl border-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                            task.completed ? "bg-emerald-500 text-white shadow-md" : "bg-slate-100 text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600"
                          )}>
                            {task.completed ? <CheckCircle2 size={18} /> : <PlayCircle size={18} />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={cn("font-bold text-sm leading-tight", task.completed ? "line-through text-slate-400" : "text-slate-800")}>
                              {task.title}
                            </p>
                            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Hari {task.day} · {task.estimatedMinutes} menit</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Badge className={cn(
                              "text-[9px] font-bold px-2 py-0.5 border-0",
                              task.completed
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            )}>
                              +15 XP
                            </Badge>
                            {task.completed && <Star size={14} className="text-amber-500 fill-current" />}
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white border-slate-200 text-slate-900 shadow-lg">
                        <p className="font-bold text-xs">{task.completed ? 'Sudah selesai! 🎉' : 'Klik untuk menyelesaikan task ini'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>

              {/* Completion celebration — landing page's dark statement card */}
              {tasks.length > 0 && completedCount === tasks.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-10 rounded-[2.5rem] bg-slate-900 p-12 relative overflow-hidden text-center"
                >
                  <div className="absolute inset-0 opacity-20 pointer-events-none scale-150">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" strokeDasharray="2 4" />
                      <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="1" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </div>
                  <div className="relative z-10">
                    <Trophy size={56} className="text-amber-400 mx-auto mb-4" />
                    <h3 className="font-black text-2xl text-white mb-2">Semua Task Selesai!</h3>
                    <p className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-black italic text-lg">
                      Kamu sudah menyelesaikan semua learning tasks untuk {career}.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
