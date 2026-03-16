'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { CardTilt, CardTiltContent } from '@/components/ui/card-tilt';
import { cn } from '@/lib/utils';
import { Search, X, Brain, Code, Server, Palette, Sparkles, Loader2 } from 'lucide-react';

const CATEGORIES = ["Semua", "Technology", "Design", "Business", "Healthcare", "Finance", "Data"];

const CAREERS = [
  {
    title: "Cloud Architecture Engineer",
    match: "85%",
    demand: 80,
    salary: "Rp 15-25 Jt",
    skills: ["AWS", "Terraform", "Docker"],
    icon: <Server className="w-8 h-8 text-blue-500" />,
    color: "blue"
  },
  {
    title: "Data Scientist",
    match: "85%",
    demand: 65,
    salary: "Rp 12-20 Jt",
    skills: ["Python", "PyTorch", "SQL"],
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    color: "purple"
  },
  {
    title: "UX Designer",
    match: "85%",
    demand: 45,
    salary: "Rp 10-18 Jt",
    skills: ["Figma", "Research", "Testing"],
    icon: <Palette className="w-8 h-8 text-orange-500" />,
    color: "orange"
  },
  {
    title: "Full-Stack Developer",
    match: "82%",
    demand: 90,
    salary: "Rp 12-22 Jt",
    skills: ["Next.js", "Node.js", "PostgreSQL"],
    icon: <Code className="w-8 h-8 text-emerald-500" />,
    color: "emerald"
  },
  {
    title: "Cyber Security Analyst",
    match: "78%",
    demand: 85,
    salary: "Rp 15-30 Jt",
    skills: ["Nmap", "Metasploit", "Python"],
    icon: <Server className="w-8 h-8 text-red-500" />,
    color: "red"
  },
  {
    title: "AI Engineer",
    match: "75%",
    demand: 95,
    salary: "Rp 18-35 Jt",
    skills: ["TensorFlow", "Scikit", "Mathematics"],
    icon: <Brain className="w-8 h-8 text-cyan-500" />,
    color: "cyan"
  }
];

export default function ExploreCareers() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedCareer, setSelectedCareer] = useState<null | typeof CAREERS[0]>(null);
  const searchParams = useSearchParams();
  
  // AI State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{
    careerTitle: string;
    matchScore: number;
    reason: string;
    skills: string[];
  } | null>(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const showAi = searchParams.get('showAiResult');
    if (showAi && !aiResult && !aiLoading) {
      const storedData = localStorage.getItem('skillpath_onboarding_data');
      if (storedData) {
        setAiLoading(true);
        const parsed = JSON.parse(storedData);
        if (parsed.displayName) setUserName(parsed.displayName);
        
        fetch('/api/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed)
        })
        .then(res => res.json())
        .then(result => {
          if (result.careerTitle) {
            setAiResult(result);
            const matched = CAREERS.find(c => 
              c.title.toLowerCase().includes(result.careerTitle.toLowerCase()) || 
              result.careerTitle.toLowerCase().includes(c.title.toLowerCase())
            );
            if (matched) {
              setSelectedCareer(matched);
            }
          }
        })
        .catch(err => {
          console.error("AI Fetch Error:", err);
        })
        .finally(() => {
          setAiLoading(false);
        });
      }
    }
  }, [searchParams, aiResult, aiLoading]);

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* AI Result Section */}
        <AnimatePresence>
          {(aiLoading || aiResult) && (
            <motion.section 
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="mb-12"
            >
               <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 border border-white/20 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden text-white">
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
                         <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter italic">
                           {userName ? `Tunggu sebentar, ${userName}...` : 'Menghitung Masa Depan...'}
                         </h3>
                         <p className="text-white/60 font-bold animate-pulse text-sm">SkillPath AI sedang menganalisis arketipe dan minatmu.</p>
                      </div>
                    ) : aiResult && (
                      <>
                        <div className="flex-1 space-y-6">
                           <div className="flex items-center gap-3 flex-wrap">
                              {userName && (
                                <div className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest border border-white/20">
                                   Hai, {userName}!
                                </div>
                              )}
                              <div className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest border border-white/20">
                                 Rekomendasi Utama
                              </div>
                              <div className="px-4 py-1.5 rounded-full bg-white text-amber-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                 <Sparkles size={12} fill="currentColor" />
                                 {aiResult.matchScore}% Match
                              </div>
                           </div>
                           
                           <div>
                              <h2 className="text-5xl font-black tracking-tighter mb-4 italic leading-none">
                                {aiResult.careerTitle}
                              </h2>
                              <p className="text-white/80 text-lg font-bold leading-relaxed max-w-2xl">
                                &ldquo;{aiResult.reason}&rdquo;
                              </p>
                           </div>

                           <div className="flex flex-wrap gap-3 pt-2">
                              {aiResult.skills.map(skill => (
                                <span key={skill} className="px-5 py-2 rounded-2xl bg-white/10 border border-white/20 text-xs font-black uppercase tracking-tight backdrop-blur-sm">
                                  {skill}
                                </span>
                              ))}
                           </div>
                        </div>

                        <div className="hidden lg:block w-px h-32 bg-white/20" />

                        <div className="flex flex-col items-center gap-4">
                           <div className="w-32 h-32 rounded-[2.5rem] bg-white text-amber-600 flex items-center justify-center shadow-2xl">
                              <BotIcon size={64} />
                           </div>
                           <Button 
                             onClick={() => setAiResult(null)}
                             variant="ghost" 
                             className="text-white/60 hover:text-white hover:bg-white/10 font-bold uppercase tracking-widest text-[10px]"
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
        <section className="mb-12">
          <div className="relative max-w-3xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-muted-foreground">
               <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Cari profesi... (misal: Cloud Infrastructure, Full-Stack, AI Specialist)"
              className="w-full h-16 bg-card border border-border rounded-2xl pl-14 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 backdrop-blur-xl shadow-xl transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
               <Button className="rounded-xl h-10 w-10 p-0 bg-amber-500 hover:bg-amber-600 text-white shadow-lg">
                  <Search size={18} />
               </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-semibold transition-all backdrop-blur-md border",
                  selectedCategory === cat 
                    ? "bg-amber-500 text-white border-amber-500 shadow-[0_4px_15px_rgba(245,158,11,0.4)]" 
                    : "bg-white/40 text-muted-foreground border-white/60 hover:bg-white/60 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Career Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CAREERS.map((career, i) => {
            const isMatched = aiResult && (
              career.title.toLowerCase().includes(aiResult.careerTitle.toLowerCase()) || 
              aiResult.careerTitle.toLowerCase().includes(career.title.toLowerCase())
            );

            return (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedCareer(career)}
                className="cursor-pointer"
              >
                <CardTilt className="w-full" tiltMaxAngle={10} scale={1.02}>
                  <CardTiltContent 
                    className={cn(
                      "glass p-6 rounded-3xl relative overflow-hidden group transition-all duration-500",
                      isMatched ? "ring-2 ring-amber-400 bg-amber-50/10" : ""
                    )}
                  >
                    {/* Match Badge */}
                    <div className={cn(
                      "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border transition-all z-20",
                      isMatched 
                        ? "bg-amber-400 text-slate-900 border-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.5)]" 
                        : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    )}>
                       {isMatched ? `${aiResult.matchScore}%` : career.match} Match
                    </div>

                    {isMatched && (
                      <div className="absolute -left-12 -top-12 w-24 h-24 bg-amber-400 rotate-45 flex items-end justify-center pb-2 shadow-lg z-10">
                        <Sparkles size={16} className="text-slate-900 mb-1" />
                      </div>
                    )}

                    <div className="mb-6 p-4 rounded-2xl bg-white/50 w-fit group-hover:scale-110 transition-transform duration-500">
                      {career.icon}
                    </div>

                    <h3 className="text-xl font-display font-extrabold mb-4 leading-tight group-hover:text-amber-600 transition-colors">
                      {career.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {career.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white/30 rounded-lg text-[10px] font-bold text-muted-foreground border border-white/50">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/20">
                      <div className="flex items-center gap-2">
                         <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-[10px] font-bold">$</div>
                         <span className="text-xs font-bold text-muted-foreground">{career.salary}</span>
                      </div>
                      <div className="flex-1 max-w-[100px] ml-4">
                         <div className="h-1 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-400 to-amber-400" style={{ width: `${career.demand}%` }} />
                         </div>
                      </div>
                    </div>
                  </CardTiltContent>
                </CardTilt>
              </motion.div>
            );
          })}
        </section>
      </main>

      {/* Slide-over Panel (Career Detail) */}
      <AnimatePresence>
         {selectedCareer && (
            <>
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setSelectedCareer(null)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
               />
               <motion.div
                  initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-white/95 backdrop-blur-3xl z-[70] shadow-2xl p-10 flex flex-col pt-24"
               >
                  <button onClick={() => setSelectedCareer(null)} className="absolute top-8 right-8 p-2 hover:bg-muted rounded-full transition-colors">
                     <X size={24} />
                  </button>

                  <div className="mb-8 flex items-center gap-4">
                     <div className="p-4 rounded-2xl bg-muted">
                        {selectedCareer.icon}
                     </div>
                     <div>
                        <h2 className="text-3xl font-display font-extrabold">{selectedCareer.title}</h2>
                        <span className="text-emerald-600 font-bold">{selectedCareer.match} Match</span>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div>
                        <h4 className="font-bold text-muted-foreground uppercase tracking-widest text-xs mb-3">Deskripsi Singkat</h4>
                        <p className="text-muted-foreground leading-relaxed font-medium">
                           Sebagai seorang {selectedCareer.title}, Anda akan bertanggung jawab untuk mendesain dan mengelola solusi berbasis {selectedCareer.skills.join(", ")}.
                        </p>
                     </div>
                  </div>

                  <div className="mt-auto">
                     <Button className="w-full py-8 text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl shadow-amber-200 rounded-2xl">
                        Buat Learning Journey
                     </Button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
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
