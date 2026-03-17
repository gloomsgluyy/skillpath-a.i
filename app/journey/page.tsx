'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { PlayCircle, CheckCircle2, Lock, Flame, Trophy, Star, BookOpen, Loader2, Sparkles } from 'lucide-react';
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

      // Check for existing journey
      const existing = await getUserJourney(currentUser.uid);
      if (existing) {
        setTasks(existing.tasks || []);
        setCareer(existing.targetCareer || '');
        setStreak(existing.streak || 0);
        setLoading(false);
        return;
      }

      // No journey — generate one
      const rec = await getAIRecommendation(currentUser.uid);
      const targetCareer = rec?.careerTitle || 'Full-Stack Developer';
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
          await saveUserJourney(currentUser.uid, targetCareer, journeyTasks);
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
    setStreak(prev => prev + 1); // Simple client-side streak
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-white pt-24">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <Sparkles size={48} className="text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl font-black mb-4">Login Diperlukan</h2>
          <p className="text-white/60 mb-8">Login untuk mengakses Learning Journey.</p>
          <Button onClick={() => router.push('/')} className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-xl">Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white pt-24 pb-12 overflow-x-hidden relative">
      <Navbar />
      <div className="fixed top-0 right-0 w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none" />

      <main className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {loading || generating ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <Loader2 size={48} className="text-amber-400 animate-spin mx-auto mb-4" />
              <p className="text-white/60 font-bold">{generating ? 'AI sedang membuat learning journey...' : 'Memuat...'}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Stats */}
            <div className="w-full lg:w-[280px] flex flex-col gap-6 shrink-0">
              {/* Progress Card */}
              <div className="glass p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-white/70">Progress</h3>
                  <span className="text-2xl font-black text-amber-400">{progressPct}%</span>
                </div>

                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="url(#progressGrad)" strokeWidth="3"
                      strokeDasharray={`${progressPct}, 100`}
                      strokeLinecap="round" />
                    <defs>
                      <linearGradient id="progressGrad"><stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#ef4444" /></linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black">{completedCount}</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest">/{tasks.length}</span>
                  </div>
                </div>

                <Progress value={progressPct} className="h-2 bg-white/10" />
              </div>

              {/* Streak */}
              <div className="glass p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl text-center">
                <Flame size={32} className="text-orange-400 mx-auto mb-2" />
                <div className="text-3xl font-black">{streak}</div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest">Hari Streak</div>
              </div>

              {/* Career */}
              <div className="glass p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5">
                <p className="text-[10px] text-amber-400 uppercase tracking-widest font-bold mb-1">Target Karir</p>
                <p className="text-sm font-black">{career}</p>
              </div>
            </div>

            {/* Center: Task List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black flex items-center gap-3">
                  <BookOpen size={24} className="text-amber-400" />
                  Daily Learning Tasks
                </h2>
                <span className="text-sm text-white/50 font-bold">{completedCount} selesai</span>
              </div>

              <div className="space-y-3">
                {tasks.map((task, i) => (
                  <TooltipProvider key={task.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: Math.min(i * 0.05, 0.5) }}
                          onClick={() => handleToggleTask(task.id)}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group",
                            task.completed
                              ? "bg-emerald-500/10 border-emerald-500/30"
                              : "bg-white/5 border-white/10 hover:border-amber-500/30 hover:bg-amber-500/5"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all",
                            task.completed ? "bg-emerald-500 text-white" : "bg-white/10 text-white/30 group-hover:bg-amber-500/20 group-hover:text-amber-400"
                          )}>
                            {task.completed ? <CheckCircle2 size={18} /> : <PlayCircle size={18} />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={cn("font-bold text-sm", task.completed && "line-through text-white/50")}>
                              {task.title}
                            </p>
                            <p className="text-[10px] text-white/30 mt-0.5">Hari {task.day} · {task.estimatedMinutes} menit</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-bold text-amber-400/60">+15 XP</span>
                            {task.completed && <Star size={14} className="text-amber-400 fill-current" />}
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{task.completed ? 'Sudah selesai! 🎉' : 'Klik untuk menyelesaikan task ini'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>

              {tasks.length > 0 && completedCount === tasks.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-center"
                >
                  <Trophy size={48} className="text-amber-400 mx-auto mb-3" />
                  <h3 className="text-xl font-black mb-2">🎉 Semua Task Selesai!</h3>
                  <p className="text-white/60 text-sm">Kamu sudah menyelesaikan semua learning tasks untuk {career}.</p>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
