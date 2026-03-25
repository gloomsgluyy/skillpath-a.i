'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Trophy, Star, Shield, Award, Zap, Download, FileText, CheckCircle2, Loader2, Briefcase, TrendingUp, Flame } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserStats, getUserProfile, getAIRecommendation } from '@/lib/firestore';

export default function ProfileDashboard() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [rec, setRec] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadedRef = React.useRef(false);

  useEffect(() => {
    async function load() {
      if (!currentUser?.uid) { setLoading(false); return; }

      // Guard after auth check to avoid blocking real loads
      if (loadedRef.current) return;
      loadedRef.current = true;

      try {
        // getUserStats already calls getUserProfile internally, so we
        // avoid a duplicate call by fetching profile + rec separately
        const [userStats, userProfile, aiRec] = await Promise.all([
          getUserStats(currentUser.uid),
          getUserProfile(currentUser.uid),
          getAIRecommendation(currentUser.uid),
        ]);
        setStats(userStats);
        setProfile(userProfile);
        setRec(aiRec);
      } catch (e) {
        console.warn('Profile load error:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [currentUser]);



  if (!currentUser) {
    return (
      <div className="min-h-screen pt-24">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <h2 className="text-3xl font-black mb-4 text-slate-900">Login Diperlukan</h2>
          <p className="text-slate-600 mb-8">Login untuk melihat profil dan statistikmu.</p>
          <Button onClick={() => router.push('/')} className="glow-pill-primary font-black px-8 py-3">Kembali</Button>
        </div>
      </div>
    );
  }

  const displayName = profile?.displayName || currentUser.displayName || 'Explorer';
  const points = stats?.points || 0;
  const level = stats?.level || 1;
  const completedTasks = stats?.completedTasks || 0;
  const projectCount = stats?.projectCount || 0;
  const streak = stats?.streak || 0;
  const totalBadges = [completedTasks > 0, projectCount > 0, streak >= 3, points >= 200, completedTasks >= 10].filter(Boolean).length;

  return (
    <div className="min-h-screen pt-24 pb-16 overflow-x-hidden relative">
      <Navbar />
      {/* Subtle mesh — matches landing page */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(255,126,95,0.06)_0%,transparent_50%),radial-gradient(circle_at_20%_80%,rgba(254,180,123,0.05)_0%,transparent_50%)]" />

      <main className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {loading ? (
          <div className="flex flex-col gap-6 w-full mb-16">
            <Skeleton className="w-full h-[220px] rounded-[2.5rem] bg-white/60" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">
              <div className="flex flex-col gap-6">
                <Skeleton className="h-[250px] rounded-[2rem] bg-white/60" />
                <Skeleton className="h-[200px] rounded-[2rem] bg-white/60" />
              </div>
              <Skeleton className="h-[450px] rounded-[2.5rem] bg-white/60" />
            </div>
          </div>
        ) : (
          <>
            {/* ── Hero Profile Banner ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-white/70 shadow-sm mb-8 overflow-hidden"
            >
              {/* Banner gradient */}
              <div className="h-32 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:20px_20px]" />
              </div>

              <div className="px-6 md:px-10 pb-8 -mt-10 flex flex-col md:flex-row md:items-end gap-6 relative z-10">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-[1.5rem] bg-white border-4 border-white p-0.5 shadow-lg shrink-0">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="" className="w-full h-full rounded-[1.2rem] object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-[1.2rem] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl font-black text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Name & career */}
                <div className="flex-1 text-center md:text-left pt-2 pb-1">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{displayName}</h1>
                  <div className="flex items-center gap-2 mt-2 justify-center md:justify-start flex-wrap">
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-0 font-bold px-3 py-1 shadow-sm">
                      <Briefcase size={14} className="mr-1.5" />
                      {rec?.careerTitle || (typeof window !== 'undefined' ? localStorage.getItem(`skillpath_career_${currentUser?.uid}`) : null) || 'Explorer'}
                    </Badge>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 font-bold px-3 py-1">
                      Level {level} · {level >= 5 ? 'Expert' : level >= 3 ? 'Intermediate' : 'Beginner'}
                    </Badge>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="flex items-center gap-6 bg-white shrink-0 px-6 py-4 rounded-2xl shadow-sm border border-slate-100 mt-4 md:mt-0">
                  {[
                    { value: points, label: 'XP', icon: <Star size={18} className="text-amber-500 fill-amber-500" /> },
                    { value: completedTasks, label: 'TASKS', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                    { value: streak, label: 'STREAK', icon: <Flame size={18} className="text-orange-500 fill-orange-500" /> },
                  ].map(s => (
                    <div key={s.label} className="text-center flex flex-col items-center">
                      <div className="text-xl font-black text-slate-900 flex items-center gap-1.5">
                        {s.icon} <span>{s.value}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Content Grid ── */}
            <div className={cn("grid grid-cols-1 gap-6", rec?.skills?.length > 0 ? "lg:grid-cols-[1fr_1.4fr]" : "lg:grid-cols-1")}>

              {/* Left Column */}
              {rec?.skills?.length > 0 && (
                <div className="flex flex-col gap-6">

                {/* Skills Card */}
                {rec?.skills?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-[2rem] bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-7"
                  >
                    <h3 className="font-extrabold text-slate-900 text-sm tracking-tight mb-5 flex items-center gap-2">
                      <Zap size={16} className="text-amber-500" /> Skill Utama
                    </h3>
                    <div className="space-y-3">
                      {rec.skills.map((skill: string, i: number) => {
                        const pct = Math.min(95, 60 + i * 12 + completedTasks * 2);
                        return (
                          <div key={skill}>
                            <div className="flex justify-between mb-1.5">
                              <span className="text-[13px] font-black text-slate-700">{skill}</span>
                              <span className="text-[13px] font-black text-slate-800">{pct}%</span>
                            </div>
                            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1, delay: 0.2 + i * 0.15 }}
                                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}


                </div>
              )}

              {/* Right Column — Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-[2.5rem] bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-8 md:p-10"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-black text-slate-900 text-xl tracking-tight flex items-center gap-2">
                    <Trophy size={20} className="text-amber-500" /> Pencapaian
                  </h3>
                  <Badge variant="outline" className="text-slate-500 border-slate-300 font-bold">
                    {totalBadges}/5 Unlocked
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  {[
                    { title: 'First Step', desc: 'Selesaikan 1 task', unlocked: completedTasks > 0, icon: <CheckCircle2 size={28} />, bgClass: 'bg-emerald-100', textClass: 'text-emerald-600' },
                    { title: 'Builder', desc: 'Submit 1 proyek', unlocked: projectCount > 0, icon: <Award size={28} />, bgClass: 'bg-blue-100', textClass: 'text-blue-600' },
                    { title: 'On Fire', desc: '3 hari streak', unlocked: streak >= 3, icon: <Zap size={28} />, bgClass: 'bg-amber-100', textClass: 'text-amber-600' },
                    { title: 'Dedicated', desc: '200 XP', unlocked: points >= 200, icon: <Star size={28} />, bgClass: 'bg-yellow-100', textClass: 'text-yellow-600' },
                    { title: 'Power User', desc: '10 tasks selesai', unlocked: completedTasks >= 10, icon: <Shield size={28} />, bgClass: 'bg-purple-100', textClass: 'text-purple-600' },
                    { title: 'Pro Builder', desc: '5 proyek submit', unlocked: projectCount >= 5, icon: <TrendingUp size={28} />, bgClass: 'bg-rose-100', textClass: 'text-rose-600' },
                  ].map(badge => (
                    <div
                      key={badge.title}
                      className={cn(
                        "rounded-[1.5rem] p-5 flex flex-col items-center justify-center text-center transition-all duration-500 min-h-[140px]",
                        badge.unlocked
                          ? "bg-white border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] cursor-default"
                          : "bg-slate-50 border border-dashed border-slate-200 opacity-80"
                      )}
                    >
                      <div className={cn(
                        "w-14 h-14 mb-3 rounded-2xl flex items-center justify-center",
                        badge.unlocked
                          ? `${badge.bgClass} ${badge.textClass}`
                          : "bg-white text-slate-400 shadow-sm border border-slate-100"
                      )}>
                        {badge.icon}
                      </div>
                      <h4 className={cn("font-black text-xs uppercase tracking-wider mb-0.5", badge.unlocked ? "text-slate-800" : "text-slate-500")}>{badge.title}</h4>
                      <p className={cn("text-[10px] font-medium", badge.unlocked ? "text-slate-500" : "text-slate-400")}>{badge.desc}</p>
                      {badge.unlocked && (
                        <Badge className="mt-2 bg-emerald-100 text-emerald-700 border-0 text-[9px] font-bold px-2 py-0.5">
                          ✓ Unlocked
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
