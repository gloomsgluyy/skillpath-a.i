'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trophy, Star, Shield, Award, Zap, Download, FileText, CheckCircle2, Loader2 } from 'lucide-react';
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
      <div className="min-h-screen bg-[#1a1207] text-white pt-24">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <h2 className="text-3xl font-black mb-4">Login Diperlukan</h2>
          <p className="text-white/60 mb-8">Login untuk melihat profil dan statistikmu.</p>
          <Button onClick={() => router.push('/')} className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-xl">Kembali</Button>
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

  return (
    <div className="min-h-screen bg-[#1a1207] text-white pt-24 pb-12 overflow-x-hidden relative">
      <Navbar />
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-amber-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 left-[-20%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:flex-row gap-8">
        {loading ? (
          <div className="w-full flex justify-center py-20">
            <Loader2 size={48} className="text-amber-400 animate-spin" />
          </div>
        ) : (
          <>
            {/* Left Column */}
            <div className="w-full lg:w-[40%] flex flex-col gap-6">
              {/* Profile Card */}
              <div className="glass p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-amber-700 to-orange-800 opacity-60" />
                <div className="relative pt-12 flex flex-col items-center">
                  <div className="w-28 h-28 rounded-[2rem] bg-[#1a1207] border-4 border-[#1a1207] p-1 shadow-2xl relative mb-6">
                    {currentUser.photoURL ? (
                      <img src={currentUser.photoURL} alt="" className="w-full h-full rounded-[1.5rem] object-cover" />
                    ) : (
                      <div className="w-full h-full rounded-[1.5rem] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl font-black text-white">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-[#1a1207] text-white">
                      <Shield size={16} />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1 mb-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-3">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider">Impian Karir & Target</span>
                    </div>
                    <h1 className="text-3xl font-black">{displayName}</h1>
                    <p className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 uppercase tracking-tight text-center max-w-[90%]">
                      {rec?.careerTitle || profile?.pendidikan || 'Explorer'}
                    </p>
                  </div>

                  <div className="w-full h-px bg-white/10 my-8" />

                  <div className="flex w-full justify-between items-center text-center px-4">
                    <div>
                      <div className="text-2xl font-black flex items-center justify-center gap-1"><Star size={20} className="text-amber-400 fill-current" /> {points}</div>
                      <div className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Total XP</div>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div>
                      <div className="text-2xl font-black">Level {level}</div>
                      <div className="text-[10px] text-white/50 uppercase tracking-widest mt-1">{level >= 5 ? 'Expert' : level >= 3 ? 'Intermediate' : 'Beginner'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="glass p-4 rounded-2xl border border-white/10 bg-white/5 text-center">
                  <div className="text-2xl font-black text-emerald-400">{completedTasks}</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-widest mt-1">Tasks</div>
                </div>
                <div className="glass p-4 rounded-2xl border border-white/10 bg-white/5 text-center">
                  <div className="text-2xl font-black text-amber-400">{projectCount}</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-widest mt-1">Proyek</div>
                </div>
                <div className="glass p-4 rounded-2xl border border-white/10 bg-white/5 text-center">
                  <div className="text-2xl font-black text-orange-400">{streak}</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-widest mt-1">Streak</div>
                </div>
              </div>

              {/* CV Generator */}
              <div className="glass p-6 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-700/20 to-black/40 backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">AI Resume Builder</h4>
                    <p className="text-xs text-white/50">Export PDF Standar Industri</p>
                  </div>
                </div>

                {!cvData ? (
                  <Button onClick={handleGenerateCV} disabled={isGeneratingCV} className="w-full h-12 rounded-xl bg-white hover:bg-white/90 text-[#1a1207] font-black uppercase tracking-widest text-xs transition-all mt-2">
                    {isGeneratingCV ? <><Loader2 size={14} className="animate-spin mr-2" /> Menyiapkan...</> : 'Generate CV'}
                  </Button>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-4 border-t border-white/10 space-y-4">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
                      <CheckCircle2 className="text-emerald-400" size={20} />
                      <div className="text-sm font-bold text-emerald-200">CV Siap!</div>
                    </div>
                    <p className="text-xs text-white/70">Role: <span className="font-black text-amber-400">{cvData.recommendedRole || rec?.careerTitle}</span></p>
                    <Button className="w-full h-12 rounded-xl bg-amber-700 hover:bg-amber-600 text-amber-200 font-black uppercase tracking-widest text-xs border border-amber-500/30">
                      <Download size={16} className="mr-2" /> Download PDF
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[60%] flex flex-col gap-6">
              {/* Skills from recommendation */}
              {rec?.skills && (
                <div className="glass p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  <h3 className="font-bold text-sm tracking-widest uppercase text-white/70 mb-6 flex items-center gap-2">
                    <Zap size={16} /> Key Skills
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {rec.skills.map((skill: string, i: number) => (
                      <div key={skill} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-amber-500/30 transition-all">
                        <div className="text-3xl font-black text-amber-400 mb-1">{Math.min(95, 60 + i * 12 + completedTasks * 2)}%</div>
                        <div className="text-xs font-bold text-white/70">{skill}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievement Gallery */}
              <div className="glass p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-sm tracking-widest uppercase text-white/70 flex items-center gap-2">
                    <Trophy size={16} /> Pencapaian
                  </h3>
                  <span className="text-amber-400 text-xs font-bold bg-amber-400/10 px-3 py-1 rounded-full">
                    {[completedTasks > 0, projectCount > 0, streak >= 3, points >= 200, completedTasks >= 10].filter(Boolean).length} Prestasi
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { title: 'First Step', desc: 'Selesaikan 1 task', unlocked: completedTasks > 0, icon: <CheckCircle2 size={24} className={completedTasks > 0 ? "text-emerald-400" : "text-white/20"} /> },
                    { title: 'Builder', desc: 'Submit 1 proyek', unlocked: projectCount > 0, icon: <Award size={24} className={projectCount > 0 ? "text-blue-400" : "text-white/20"} /> },
                    { title: 'On Fire', desc: '3 hari streak', unlocked: streak >= 3, icon: <Zap size={24} className={streak >= 3 ? "text-amber-400" : "text-white/20"} /> },
                    { title: 'Dedicated', desc: '200 XP', unlocked: points >= 200, icon: <Star size={24} className={points >= 200 ? "text-yellow-400" : "text-white/20"} /> },
                    { title: 'Power User', desc: '10 tasks selesai', unlocked: completedTasks >= 10, icon: <Shield size={24} className={completedTasks >= 10 ? "text-purple-400" : "text-white/20"} /> },
                  ].map(badge => (
                    <div key={badge.title} className={cn(
                      "aspect-[3/4] rounded-2xl border flex flex-col items-center justify-center p-4 text-center transition-all",
                      badge.unlocked
                        ? "bg-gradient-to-b from-white/10 to-transparent border-white/20 shadow-lg hover:-translate-y-1"
                        : "bg-white/5 border-white/5 opacity-50 grayscale"
                    )}>
                      <div className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center bg-black/40 border border-white/10">{badge.icon}</div>
                      <h4 className="font-bold text-xs uppercase tracking-wider mb-1">{badge.title}</h4>
                      <p className="text-[9px] text-white/50">{badge.desc}</p>
                      {badge.unlocked && <p className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-2">✓ Unlocked</p>}
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
