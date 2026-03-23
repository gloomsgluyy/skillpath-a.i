'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { PlayCircle, CheckCircle2, Flame, Trophy, Star, BookOpen, Sparkles, Target } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserJourney, saveUserJourney, markTaskCompleted, getAIRecommendation, type JourneyTask } from '@/lib/firestore';
import confetti from 'canvas-confetti';

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

      let targetCareer = localStorage.getItem('skillpath_target_career') || '';
      if (!targetCareer) {
        const rec = await getAIRecommendation(currentUser.uid);
        targetCareer = rec?.careerTitle || 'Full-Stack Developer';
        localStorage.setItem('skillpath_target_career', targetCareer);
      }

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

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899']
    });

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true, completedAt: new Date().toISOString() } : t));
    await markTaskCompleted(currentUser.uid, taskId);
    setStreak(prev => prev + 1);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  if (!currentUser) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-6">
            <BookOpen size={32} className="text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Login Diperlukan</h2>
          <p className="text-gray-600 mb-8">Login untuk mengakses Learning Journey.</p>
          <button onClick={() => router.push('/')} className="btn-primary px-8 py-3">Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-8">
        {loading || generating ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-[300px] flex flex-col gap-6 shrink-0">
              <Skeleton className="h-[250px] rounded-lg bg-gray-200" />
              <Skeleton className="h-[200px] rounded-lg bg-gray-200" />
            </div>
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-[200px] bg-gray-200 rounded mb-4" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-[100px] rounded-lg bg-gray-200" />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left: Stats Sidebar */}
            <div className="w-full lg:w-[300px] flex flex-col gap-6 shrink-0">

              {/* Progress Card */}
              <div className="card-plain border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 text-sm">Progress</h3>
                  <span className="text-gray-500 text-xs font-medium">{completedCount}/{tasks.length}</span>
                </div>

                {/* Progress Ring */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="#E5E7EB" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="#F97316" strokeWidth="3"
                      strokeDasharray={`${progressPct}, 100`}
                      strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{progressPct}%</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-0.5">selesai</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full bg-orange-500"
                  />
                </div>
              </div>

              {/* Streak */}
              <div className="card-plain border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mx-auto mb-3">
                  <Flame size={24} className="text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{streak}</div>
                <div className="text-xs text-gray-500 font-medium mt-1">Hari Streak</div>
              </div>

              {/* Career */}
              <div className="bg-gray-900 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={14} className="text-orange-400" />
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Target Karir</span>
                </div>
                <p className="text-lg font-bold text-white leading-tight">{career}</p>
              </div>
            </div>

            {/* Right: Task List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <BookOpen size={24} className="text-orange-500" />
                  Daily Tasks
                </h2>
                <span className="text-sm text-gray-500 font-medium">{completedCount} selesai</span>
              </div>

              <div className="space-y-3">
                {tasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.5) }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer group bg-white",
                      task.completed
                        ? "border-l-4 border-l-green-500 border-t-green-100 border-r-green-100 border-b-green-100 bg-green-50/50 opacity-70"
                        : "border-l-4 border-l-gray-200 border-t-gray-200 border-r-gray-200 border-b-gray-200 hover:border-l-orange-500 hover:shadow-md"
                    )}
                    onClick={() => handleToggleTask(task.id)}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                      task.completed ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-600"
                    )}>
                      {task.completed ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={cn("font-medium text-sm leading-tight", task.completed ? "line-through text-gray-400" : "text-gray-800")}>
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Hari {task.day} · {task.estimatedMinutes} menit</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="badge-orange text-[9px]">
                        <Star size={10} /> +15 XP
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Completion */}
              {tasks.length > 0 && completedCount === tasks.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-10 bg-gray-900 rounded-xl p-10 text-center"
                >
                  <Trophy size={48} className="text-orange-400 mx-auto mb-4" />
                  <h3 className="font-bold text-2xl text-white mb-2">Semua Task Selesai!</h3>
                  <p className="text-orange-400 font-medium text-lg">
                    Kamu sudah menyelesaikan semua learning tasks untuk {career}.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
