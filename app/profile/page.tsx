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
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);
  const [cvData, setCvData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      if (!currentUser?.uid) { setLoading(false); return; }
      const [userStats, userProfile, aiRec] = await Promise.all([
        getUserStats(currentUser.uid),
        getUserProfile(currentUser.uid),
        getAIRecommendation(currentUser.uid),
      ]);
      setStats(userStats);
      setProfile(userProfile);
      setRec(aiRec);
      setLoading(false);
    }
    load();
  }, [currentUser]);

  const handleGenerateCV = async () => {
    if (!currentUser?.uid) return;
    setIsGeneratingCV(true);
    try {
      const res = await fetch('/api/generate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile?.displayName || currentUser.displayName,
          career: rec?.careerTitle || '',
          skills: rec?.skills || [],
          points: stats?.points || 0,
          projectCount: stats?.projectCount || 0,
          completedTasks: stats?.completedTasks || 0,
        })
      });
      const data = await res.json();
      setCvData(data);
    } catch (err) {
      console.error('CV generation error:', err);
    }
    setIsGeneratingCV(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Login Diperlukan</h2>
          <p className="text-gray-600 mb-8">Login untuk melihat profil dan statistikmu.</p>
          <button onClick={() => router.push('/')} className="btn-primary px-8 py-3">Kembali</button>
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
    <div className="min-h-screen pb-16">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-8">
        {loading ? (
          <div className="flex flex-col gap-6 w-full">
            <Skeleton className="w-full h-[200px] rounded-lg bg-gray-200" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">
              <div className="flex flex-col gap-6">
                <Skeleton className="h-[250px] rounded-lg bg-gray-200" />
                <Skeleton className="h-[200px] rounded-lg bg-gray-200" />
              </div>
              <Skeleton className="h-[450px] rounded-lg bg-gray-200" />
            </div>
          </div>
        ) : (
          <>
            {/* Hero Profile Banner */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-8">
              {/* Banner */}
              <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-500 relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              </div>

              <div className="px-8 pb-8 -mt-12 flex flex-col md:flex-row items-center md:items-end gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-xl bg-white border-4 border-white shadow-lg shrink-0">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="" className="w-full h-full rounded-lg object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-orange-500 flex items-center justify-center text-3xl font-bold text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Name & career */}
                <div className="flex-1 text-center md:text-left pt-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{displayName}</h1>
                  <div className="flex items-center gap-2 mt-1 justify-center md:justify-start flex-wrap">
                    <span className="badge-orange">
                      <Briefcase size={12} />
                      {typeof window !== 'undefined' ? localStorage.getItem('skillpath_target_career') || rec?.careerTitle || 'Explorer' : rec?.careerTitle || 'Explorer'}
                    </span>
                    <span className="badge-gray">
                      Level {level} · {level >= 5 ? 'Expert' : level >= 3 ? 'Intermediate' : 'Beginner'}
                    </span>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="flex items-center gap-5 shrink-0">
                  {[
                    { value: points, label: 'XP', icon: <Star size={14} className="text-orange-500 fill-current" /> },
                    { value: completedTasks, label: 'Tasks', icon: <CheckCircle2 size={14} className="text-green-500" /> },
                    { value: streak, label: 'Streak', icon: <Flame size={14} className="text-orange-500" /> },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <div className="text-xl font-bold flex items-center justify-center gap-1 text-gray-900">
                        {s.icon} {s.value}
                      </div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider font-medium mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">

              {/* Left Column */}
              <div className="flex flex-col gap-6">

                {/* Skills Card */}
                {rec?.skills && (
                  <div className="card-plain border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 text-sm mb-5 flex items-center gap-2">
                      <Zap size={16} className="text-orange-500" /> Skill Utama
                    </h3>
                    <div className="space-y-3">
                      {rec.skills.map((skill: string, i: number) => {
                        const pct = Math.min(95, 60 + i * 12 + completedTasks * 2);
                        return (
                          <div key={skill}>
                            <div className="flex justify-between mb-1.5">
                              <span className="text-sm font-medium text-gray-700">{skill}</span>
                              <span className="text-sm font-bold text-gray-800">{pct}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1, delay: 0.2 + i * 0.15 }}
                                className="h-full rounded-full bg-orange-500"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* CV Generator Card */}
                <div className="card-elevated p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                      <FileText size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">AI Resume Builder</h4>
                      <p className="text-xs text-gray-500">Export PDF Standar Industri</p>
                    </div>
                  </div>

                  {!cvData ? (
                    <button onClick={handleGenerateCV} disabled={isGeneratingCV} className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                      {isGeneratingCV ? <><Loader2 size={14} className="animate-spin" /> Menyiapkan...</> : 'Generate CV'}
                    </button>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                        <CheckCircle2 className="text-green-600" size={20} />
                        <div className="text-sm font-semibold text-green-800">CV Siap!</div>
                      </div>
                      <p className="text-xs text-gray-600">Role: <span className="font-bold text-gray-900">{cvData.recommendedRole || rec?.careerTitle}</span></p>
                      <button className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                        <Download size={16} /> Download PDF
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Right Column — Achievements */}
              <div className="card-plain border border-gray-200 p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <Trophy size={20} className="text-orange-500" /> Pencapaian
                  </h3>
                  <span className="text-sm text-gray-500 font-medium">{totalBadges}/5 Unlocked</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { title: 'First Step', desc: 'Selesaikan 1 task', unlocked: completedTasks > 0, icon: <CheckCircle2 size={24} /> },
                    { title: 'Builder', desc: 'Submit 1 proyek', unlocked: projectCount > 0, icon: <Award size={24} /> },
                    { title: 'On Fire', desc: '3 hari streak', unlocked: streak >= 3, icon: <Zap size={24} /> },
                    { title: 'Dedicated', desc: '200 XP', unlocked: points >= 200, icon: <Star size={24} /> },
                    { title: 'Power User', desc: '10 tasks selesai', unlocked: completedTasks >= 10, icon: <Shield size={24} /> },
                    { title: 'Pro Builder', desc: '5 proyek submit', unlocked: projectCount >= 5, icon: <TrendingUp size={24} /> },
                  ].map(badge => (
                    <div
                      key={badge.title}
                      className={cn(
                        "rounded-lg border p-5 flex flex-col items-center justify-center text-center transition-all duration-200 min-h-[130px]",
                        badge.unlocked
                          ? "bg-white border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                          : "bg-gray-50 border-gray-100 opacity-50 grayscale"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 mb-3 rounded-lg flex items-center justify-center",
                        badge.unlocked
                          ? "bg-orange-100 text-orange-600"
                          : "bg-gray-100 text-gray-300"
                      )}>
                        {badge.icon}
                      </div>
                      <h4 className="font-bold text-xs uppercase tracking-wider mb-0.5 text-gray-800">{badge.title}</h4>
                      <p className="text-[10px] text-gray-500">{badge.desc}</p>
                      {badge.unlocked && (
                        <span className="mt-2 badge-orange text-[9px]">✓ Unlocked</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
