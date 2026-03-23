'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Search, Brain, Code, Server, Palette, Sparkles, Network, Database, ShieldAlert, Cpu, ChartBar, LayoutTemplate, Briefcase, Gamepad2, Shield, Zap, Globe, Laptop, Heart, GraduationCap, ShoppingCart, Film, ChevronDown, Bot } from 'lucide-react';
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
  const [aiOptions, setAiOptions] = useState<any[] | null>(null);
  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('skillpath_onboarding_data');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.displayName) setUserName(parsed.displayName);
          return parsed;
        } catch { return null; }
      }
    }
    return null;
  });

  // Load user profile for matching (Fallback if not picked up by initial state)
  useEffect(() => {
    if (!userProfile) {
      const storedData = localStorage.getItem('skillpath_onboarding_data');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setUserProfile(parsed);
        if (parsed.displayName) setUserName(parsed.displayName);
      }
    }
  }, [userProfile]);

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
          if (result.recommendations && Array.isArray(result.recommendations)) {
            setAiOptions(result.recommendations);
          } else if (result.careerTitle) {
            // Fallback just in case Groq hallucinates the old format
            setAiResult(result);
          }
        } catch (err) {
          console.warn("AI Fetch Error:", err);
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
      localStorage.setItem('skillpath_target_career', aiResult.careerTitle);
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

      <main className="pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto">

        {/* AI Result Section */}
        <AnimatePresence>
          {(aiLoading || aiResult || aiOptions) && (
            <motion.section
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="mb-12"
            >
               <div className="bg-gray-900 rounded-2xl p-8 md:p-10 shadow-lg relative overflow-hidden text-white">
                 <div className="absolute top-0 right-0 p-8 opacity-15">
                    <Sparkles size={160} className="fill-white" />
                 </div>

                 <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    {aiLoading ? (
                      <div className="w-full">
                        <div className="text-center mb-8">
                          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                           {userName ? `Tunggu sebentar, ${userName}...` : 'Sedang Meracik Opsi Karir...'}
                          </h2>
                          <p className="text-white/80 font-medium animate-pulse text-sm text-center">SkillPath AI sedang mencarikan 3 jalur karir terbaik untukmu.</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-6 flex flex-col h-[280px]">
                              <div className="flex justify-between items-start mb-4">
                                <Skeleton className="w-12 h-12 rounded-2xl bg-white/20" />
                                <Skeleton className="w-16 h-6 rounded-full bg-white/20" />
                              </div>
                              <Skeleton className="w-3/4 h-8 rounded-xl bg-white/20 mb-4" />
                              <Skeleton className="w-full h-4 rounded-md bg-white/20 mb-2" />
                              <Skeleton className="w-5/6 h-4 rounded-md bg-white/20 mb-6" />
                              <div className="flex gap-2 mt-auto">
                                <Skeleton className="w-16 h-6 bg-white/20 rounded-md" />
                                <Skeleton className="w-16 h-6 bg-white/20 rounded-md" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : aiOptions ? (
                      <div className="w-full">
                        <div className="text-center mb-8">
                          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Pilih Impian Karirmu</h2>
                          <p className="text-white/80 font-medium">Berdasarkan profilmu, ini 3 rekomendasi terbaik dari AI.</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {aiOptions.map((opt, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="bg-white/10 border border-white/20 rounded-xl p-6 flex flex-col hover:bg-white/15 transition-colors group"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
                                  <Sparkles size={24} className="text-amber-400" />
                                </div>
                                <div className="px-3 py-1 bg-orange-500/20 text-orange-200 rounded-full text-xs font-bold border border-orange-400/30">
                                  {opt.matchScore}% Match
                                </div>
                              </div>
                              <h3 className="text-2xl font-bold mb-2">{opt.careerTitle}</h3>
                              <p className="text-white/70 text-sm mb-6 flex-1">&ldquo;{opt.reason}&rdquo;</p>
                              
                              <div className="flex flex-wrap gap-1.5 mb-6">
                                {opt.skills.map((s: string) => (
                                  <span key={s} className="px-2.5 py-1 bg-white/10 border border-white/20 rounded text-[10px] font-medium text-white/60">{s}</span>
                                ))}
                              </div>

                              <Button 
                                onClick={() => {
                                  setAiResult(opt);
                                  setAiOptions(null);
                                }}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg"
                              >
                                Pilih Karir Ini
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : aiResult ? (
                      <>
                        <div className="flex-1 space-y-6 w-full">
                           <div className="flex items-center gap-3 flex-wrap">
                              {userName && (
                                <div className="px-4 py-1.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-widest border border-white/20">
                                   Hai, {userName}!
                                </div>
                              )}
                              <div className="px-4 py-1.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-widest border border-white/20">
                                 Rekomendasi Utama AI
                              </div>
                              <div className="px-4 py-1.5 rounded-full bg-white text-orange-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                 <Sparkles size={12} fill="currentColor" />
                                 {aiResult.matchScore}% Match
                              </div>
                           </div>

                           <div>
                              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
                                {aiResult.careerTitle}
                              </h2>
                              <p className="text-white/90 text-sm md:text-lg font-medium leading-relaxed max-w-2xl">
                                &ldquo;{aiResult.reason}&rdquo;
                              </p>
                           </div>

                           <div className="flex flex-wrap gap-2 pt-2">
                              {aiResult.skills.map(skill => (
                                <span key={skill} className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-medium uppercase">
                                  {skill}
                                </span>
                              ))}
                           </div>
                        </div>

                        <div className="hidden lg:block w-px h-32 bg-white/20" />

                        <div className="flex flex-col items-center gap-4 w-full md:w-auto">
                           <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white text-orange-500 flex items-center justify-center shadow-lg shrink-0">
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
                    ) : null}
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
              className="w-full h-14 bg-white border-2 border-gray-200 rounded-lg pl-14 pr-6 text-base font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 shadow-sm transition-all"
            />
          </div>

          <div className="flex overflow-x-auto hide-scrollbar w-full max-w-6xl gap-2 pb-4 px-2 snap-x justify-start">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
                className={cn(
                  "shrink-0 snap-center px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  selectedCategory === cat
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-gray-500 text-sm mt-2 font-medium">
            Menampilkan {Math.min(visibleCount, filteredCareers.length)} dari {filteredCareers.length} karir
          </p>
        </section>

        {/* Career Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
                    "h-full flex flex-col p-6 rounded-lg relative overflow-hidden transition-all duration-200 border bg-white shadow-sm",
                    isMatched
                      ? "border-l-4 border-l-orange-500 border-t-gray-200 border-r-gray-200 border-b-gray-200 shadow-lg"
                      : "border-gray-200 hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-gray-200 hover:border-l-orange-500"
                  )}
                >


                  <div className="flex justify-between items-start mb-5 z-10">
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 group-hover:bg-orange-50 transition-colors">
                      {getCareerIcon(career)}
                    </div>

                    <div className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-bold tracking-wide border transition-all",
                      isMatched
                        ? "bg-orange-100 text-orange-700 border-orange-200"
                        : (career as any).matchScore > 0
                          ? "bg-gray-100 text-gray-700 border-gray-200"
                          : "bg-gray-50 text-gray-400 border-gray-200"
                    )}>
                       {isMatched ? `${aiResult.matchScore}%` : (career as any).matchScore > 0 ? `${(career as any).matchScore}%` : '—'} Match
                    </div>
                  </div>

                  <div className="flex-1 z-10">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">{career.title}</h3>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{career.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {career.skills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-600">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center z-10">
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-[8px] font-bold shadow-sm">Rp</div>
                       <span className="text-xs font-semibold text-gray-700">{career.salary}</span>
                    </div>
                    <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{career.category}</span>
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
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
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
        <SheetContent className="w-full md:max-w-md lg:max-w-lg bg-white border-l border-gray-200 shadow-xl p-0 flex flex-col">
          {selectedCareer && (
            <>
              <div className="p-8 pb-4 flex-1 overflow-y-auto">
                <SheetHeader className="mb-8 text-left">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                      {getCareerIcon(selectedCareer)}
                    </div>
                    <div>
                      <SheetTitle className="text-3xl font-bold text-gray-900 leading-tight mb-1">{selectedCareer.title}</SheetTitle>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
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
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                    <h4 className="font-bold text-gray-900 text-sm tracking-wide mb-4">SKILL YANG DIBUTUHKAN</h4>
                    <div className="space-y-3">
                       {selectedCareer.skills.map((skill, idx) => (
                         <div key={skill} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">{idx + 1}</div>
                            <span className="text-sm font-medium text-gray-700">{skill}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                     <h4 className="font-bold text-orange-900 text-sm tracking-wide mb-2">PROSPEK KARIR</h4>
                     <p className="text-orange-800 text-sm font-medium">Kebutuhan industri: {selectedCareer.demand}%. Estimasi gaji {selectedCareer.salary}/bulan.</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-200 bg-white">
                <Button
                  onClick={() => router.push(`/paths?career=${selectedCareer.id}`)}
                  className="w-full h-14 text-base font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md"
                >
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
  return <Bot size={size} strokeWidth={2.5} />;
}
