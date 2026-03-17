'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Search, Brain, Code, Server, Palette, Sparkles, Network, Database, ShieldAlert, Cpu, ChartBar, LayoutTemplate, Briefcase, Gamepad2, Shield, Zap, Globe, Laptop, Heart, GraduationCap, ShoppingCart, Film, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { CAREERS, CATEGORIES, computeMatchScore, searchCareers, type Career } from '@/lib/careers-database';
import { saveAIRecommendation, getAIRecommendation } from '@/lib/firestore';

const ICON_MAP: Record<string, React.ReactNode> = {
  "Kreatif & Desain": <Palette className="w-8 h-8 text-orange-500" />,
  "Software Development": <Code className="w-8 h-8 text-emerald-500" />,
  "Infrastruktur & Jaringan": <Server className="w-8 h-8 text-blue-500" />,
  "Data & AI": <Brain className="w-8 h-8 text-fuchsia-500" />,
  "Cyber Security": <ShieldAlert className="w-8 h-8 text-red-500" />,
  "Mobile & IoT": <Laptop className="w-8 h-8 text-indigo-500" />,
  "Game Development": <Gamepad2 className="w-8 h-8 text-yellow-500" />,
  "Product & Management": <Briefcase className="w-8 h-8 text-teal-500" />,
  "Digital Marketing": <Globe className="w-8 h-8 text-pink-500" />,
  "Cloud & DevOps": <Cpu className="w-8 h-8 text-violet-500" />,
  "Blockchain & Fintech": <Zap className="w-8 h-8 text-amber-500" />,
  "Healthcare IT": <Heart className="w-8 h-8 text-rose-500" />,
  "Education Tech": <GraduationCap className="w-8 h-8 text-sky-500" />,
  "E-Commerce": <ShoppingCart className="w-8 h-8 text-lime-600" />,
  "Media & Content": <Film className="w-8 h-8 text-cyan-500" />,
};

function getCareerIcon(career: Career) {
  return ICON_MAP[career.category] || <Sparkles className="w-8 h-8 text-amber-500" />;
}

const ITEMS_PER_PAGE = 24;

export default function ExploreCareers() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const searchParams = useSearchParams();

  // Pagination
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // AI State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{
    careerTitle: string;
    matchScore: number;
    reason: string;
    skills: string[];
  } | null>(null);
  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);

  // Load user profile for matching
  useEffect(() => {
    const storedData = localStorage.getItem('skillpath_onboarding_data');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setUserProfile(parsed);
      if (parsed.displayName) setUserName(parsed.displayName);
    }
  }, []);

  // Load saved AI recommendation from Firestore or trigger new one
  useEffect(() => {
    const showAi = searchParams.get('showAiResult');

    async function loadOrFetchRecommendation() {
      // 1. If we are explicitly told to fetch a new AI result
      if (showAi && userProfile && !aiLoading) {
        setAiLoading(true);
        // Clear any old UI state
        setAiResult(null); 
        try {
          const res = await fetch('/api/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userProfile)
          });
          const result = await res.json();
          if (result.careerTitle) {
            setAiResult(result);
            // We save it in a separate effect below once currentUser is ready
          }
        } catch (err) {
          console.error("AI Fetch Error:", err);
        } finally {
          setAiLoading(false);
          // Remove param from URL so it doesn't refetch on reload
          window.history.replaceState({}, '', '/explore');
        }
        return;
      }

      // 2. If we already have a result loaded (and not forcing a new fetch), do nothing
      if (aiResult) return;

      // 3. Try loading from Firestore first if user is logged in
      if (currentUser?.uid) {
        const saved = await getAIRecommendation(currentUser.uid);
        if (saved) {
          setAiResult({ careerTitle: saved.careerTitle, matchScore: saved.matchScore, reason: saved.reason, skills: saved.skills });
          return;
        }
      }
    }

    loadOrFetchRecommendation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, userProfile, currentUser]);

  // Save AI result to Firestore once we have BOTH the result and the user ID
  useEffect(() => {
    if (aiResult && currentUser?.uid) {
      // Check if it's already saved to prevent infinite writes
      getAIRecommendation(currentUser.uid).then(saved => {
        if (!saved || saved.careerTitle !== aiResult.careerTitle) {
          saveAIRecommendation(currentUser.uid, aiResult).catch(console.error);
        }
      });
    }
  }, [aiResult, currentUser]);

  // Compute match scores and sort
  const scoredCareers = useMemo(() => {
    return CAREERS.map(c => ({
      ...c,
      matchScore: computeMatchScore(c, userProfile),
    })).sort((a, b) => b.matchScore - a.matchScore);
  }, [userProfile]);

  // Filter
  const filteredCareers = useMemo(() => {
    let results = scoredCareers;
    if (selectedCategory !== "Semua") {
      results = results.filter(c => c.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.skills.some(s => s.toLowerCase().includes(q)) ||
        c.desc.toLowerCase().includes(q)
      );
    }
    return results;
  }, [scoredCareers, selectedCategory, searchQuery]);

  const visibleCareers = filteredCareers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCareers.length;

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto">

        {/* AI Result Section */}
        <AnimatePresence>
          {(aiLoading || aiResult) && (
            <motion.section
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="mb-12"
            >
               <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 border border-white/20 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden text-white">
                 <div className="absolute top-0 right-0 p-8 opacity-15">
                    <Sparkles size={160} className="fill-white" />
                 </div>

                 <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    {aiLoading ? (
                      <div className="flex flex-col items-center justify-center py-12 w-full">
                         <div className="relative mb-6">
                           <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                           <div className="absolute inset-0 flex items-center justify-center">
                              <Brain size={32} className="text-white animate-pulse" />
                           </div>
                         </div>
                         <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter italic text-center">
                           {userName ? `Tunggu sebentar, ${userName}...` : 'Menghitung Masa Depan...'}
                         </h3>
                         <p className="text-white/80 font-bold animate-pulse text-sm text-center">SkillPath AI sedang menganalisis arketipe dan minatmu.</p>
                      </div>
                    ) : aiResult && (
                      <>
                        <div className="flex-1 space-y-6 w-full">
                           <div className="flex items-center gap-3 flex-wrap">
                              {userName && (
                                <div className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest border border-white/20">
                                   Hai, {userName}!
                                </div>
                              )}
                              <div className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest border border-white/20">
                                 Rekomendasi Utama AI
                              </div>
                              <div className="px-4 py-1.5 rounded-full bg-white text-amber-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                 <Sparkles size={12} fill="currentColor" />
                                 {aiResult.matchScore}% Match
                              </div>
                           </div>

                           <div>
                              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 italic leading-tight">
                                {aiResult.careerTitle}
                              </h2>
                              <p className="text-white/90 text-sm md:text-lg font-bold leading-relaxed max-w-2xl">
                                &ldquo;{aiResult.reason}&rdquo;
                              </p>
                           </div>

                           <div className="flex flex-wrap gap-2 pt-2">
                              {aiResult.skills.map(skill => (
                                <span key={skill} className="px-4 py-1.5 rounded-2xl bg-white/10 border border-white/20 text-xs font-black uppercase tracking-tight backdrop-blur-sm">
                                  {skill}
                                </span>
                              ))}
                           </div>
                        </div>

                        <div className="hidden lg:block w-px h-32 bg-white/20" />

                        <div className="flex flex-col items-center gap-4 w-full md:w-auto">
                           <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-white text-amber-600 flex items-center justify-center shadow-2xl shrink-0">
                              <BotIcon size={56} />
                           </div>
                           <Button
                             onClick={() => setAiResult(null)}
                             variant="ghost"
                             className="text-white/80 hover:text-white hover:bg-white/10 font-bold uppercase tracking-widest text-[10px] w-full"
                           >
                             Tutup Analisis
                           </Button>
                        </div>
                      </>
                    )}
                 </div>
               </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Search & Filter Hub */}
        <section className="mb-12 flex flex-col items-center w-full">
          <div className="relative w-full max-w-3xl mb-8">
            <div className="absolute inset-y-0 left-5 flex items-center text-amber-500/80 pointer-events-none drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
               <Search size={24} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              placeholder="Cari profesi... (misal: UI/UX, Data Scientist, Blockchain)"
              className="w-full h-16 bg-white/40 border border-white/50 rounded-2xl pl-14 pr-6 text-base md:text-lg font-medium text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-amber-500/30 backdrop-blur-2xl shadow-xl transition-all"
            />
          </div>

          <div className="flex overflow-x-auto hide-scrollbar w-full max-w-6xl gap-2 pb-4 px-2 snap-x justify-start">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
                className={cn(
                  "shrink-0 snap-center px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 border backdrop-blur-xl",
                  selectedCategory === cat
                    ? "bg-[#5D1636] text-white border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)] scale-105"
                    : "bg-white/20 text-slate-600 border-white/40 hover:bg-white/40 hover:text-slate-900"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-slate-500 text-sm mt-2 font-bold">
            Menampilkan {Math.min(visibleCount, filteredCareers.length)} dari {filteredCareers.length} karir
          </p>
        </section>

        {/* Career Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleCareers.map((career, i) => {
            const isMatched = aiResult && (
              career.title.toLowerCase().includes(aiResult.careerTitle.toLowerCase()) ||
              aiResult.careerTitle.toLowerCase().includes(career.title.toLowerCase())
            );

            return (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.5), ease: "easeOut" }}
                onClick={() => setSelectedCareer(career)}
                className="cursor-pointer group h-full"
              >
                <div
                  className={cn(
                    "h-full flex flex-col p-6 rounded-3xl relative overflow-hidden transition-all duration-500 ease-out border shadow-lg bg-white/15 backdrop-blur-2xl",
                    isMatched
                      ? "border-amber-400 shadow-[0_8px_30px_rgba(251,191,36,0.3)] bg-gradient-to-b from-amber-50/40 to-white/10"
                      : "border-white/40 hover:border-amber-300 hover:shadow-[0_8px_30px_rgba(251,191,36,0.2)] hover:-translate-y-2 hover:scale-[1.02]"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/0 via-amber-400/0 to-amber-400/0 group-hover:to-amber-400/10 transition-colors duration-500 pointer-events-none" />

                  <div className="flex justify-between items-start mb-5 z-10">
                    <div className="p-3 rounded-2xl bg-white shadow-xl shadow-black/5 group-hover:rotate-6 transition-transform duration-500">
                      {getCareerIcon(career)}
                    </div>

                    <div className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-black tracking-wide border transition-all",
                      isMatched
                        ? "bg-amber-100 text-[#5D1636] border-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                        : (career as any).matchScore > 0
                          ? "bg-white/50 text-slate-700 border-white/60"
                          : "bg-white/30 text-slate-400 border-white/40"
                    )}>
                       {isMatched ? `${aiResult.matchScore}%` : (career as any).matchScore > 0 ? `${(career as any).matchScore}%` : '—'} Match
                    </div>
                  </div>

                  <div className="flex-1 z-10">
                    <h3 className="text-lg font-black text-slate-900 leading-tight mb-2">{career.title}</h3>
                    <p className="text-slate-600 text-xs mb-3 line-clamp-2">{career.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {career.skills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-white/40 rounded-md text-[10px] font-bold text-slate-600 border border-white/60">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-200/50 flex justify-between items-center z-10">
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white text-[8px] font-black shadow-sm">Rp</div>
                       <span className="text-xs font-bold text-slate-700">{career.salary}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100/50 px-2 py-0.5 rounded-md">{career.category}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
              className="px-8 py-3 bg-white/20 hover:bg-white/40 text-slate-700 border border-white/40 rounded-2xl font-bold backdrop-blur-xl"
              variant="ghost"
            >
              <ChevronDown size={18} className="mr-2" />
              Muat {Math.min(ITEMS_PER_PAGE, filteredCareers.length - visibleCount)} Karir Lagi
            </Button>
          </div>
        )}
      </main>

      {/* Career Detail Sheet */}
      <Sheet open={!!selectedCareer} onOpenChange={(open) => !open && setSelectedCareer(null)}>
        <SheetContent className="w-full md:max-w-md lg:max-w-lg bg-white/95 backdrop-blur-3xl border-l-white/40 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] p-0 flex flex-col">
          {selectedCareer && (
            <>
              <div className="p-8 pb-4 flex-1 overflow-y-auto">
                <SheetHeader className="mb-8 text-left">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-white shadow-xl border border-slate-100">
                      {getCareerIcon(selectedCareer)}
                    </div>
                    <div>
                      <SheetTitle className="text-3xl font-black text-slate-900 leading-tight mb-1">{selectedCareer.title}</SheetTitle>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black">
                         <Sparkles size={12} /> {(() => {
                           const sc = computeMatchScore(selectedCareer, userProfile);
                           return sc > 0 ? `${sc}% Match` : 'Lengkapi profil untuk match';
                         })()}
                      </span>
                    </div>
                  </div>

                  <p className="text-base text-slate-600 font-medium leading-relaxed">
                    {selectedCareer.desc}
                  </p>
                </SheetHeader>

                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-black text-slate-900 text-sm tracking-wide mb-4">SKILL YANG DIBUTUHKAN</h4>
                    <div className="space-y-3">
                       {selectedCareer.skills.map((skill, idx) => (
                         <div key={skill} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-white text-[10px] font-black shadow-sm">{idx + 1}</div>
                            <span className="text-sm font-bold text-slate-700">{skill}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                     <h4 className="font-black text-amber-900 text-sm tracking-wide mb-2">PROSPEK KARIR</h4>
                     <p className="text-amber-800 text-sm font-medium">Kebutuhan industri: {selectedCareer.demand}%. Estimasi gaji {selectedCareer.salary}/bulan.</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-200 bg-white">
                <Button
                  onClick={() => router.push(`/paths?career=${selectedCareer.id}`)}
                  className="w-full h-14 text-base font-black uppercase tracking-widest bg-[#5D1636] hover:bg-[#4a112b] text-white rounded-2xl shadow-[0_4px_20px_rgba(93,22,54,0.4)] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  Buat Learning Journey
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function BotIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: size, height: size }} className="fill-none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
