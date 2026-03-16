'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { CardTilt, CardTiltContent } from '@/components/ui/card-tilt';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Search, Brain, Code, Server, Palette, Sparkles, Network, Database, ShieldAlert, Cpu, ChartBar, LayoutTemplate, Briefcase } from 'lucide-react';

const CATEGORIES = ["Semua", "Infrastruktur & Jaringan", "Software Development", "Data & AI", "Kreatif & Desain"];

const CAREERS = [
  // Infra & Network
  {
    id: "cloud-architect",
    title: "Cloud Architecture Engineer",
    category: "Infrastruktur & Jaringan",
    match: "85%", demand: 90, salary: "Rp 15-25 Jt / bulan",
    skills: ["AWS/GCP", "Kubernetes", "Terraform"],
    icon: <Server className="w-10 h-10 text-blue-500" />,
    color: "blue",
    desc: "Mendesain dan memelihara infrastruktur server berbasis cloud agar sistem perusahaan berjalan efisien dan tidak pernah down."
  },
  {
    id: "cyber-security",
    title: "Cyber Security Analyst",
    category: "Infrastruktur & Jaringan",
    match: "78%", demand: 85, salary: "Rp 18-30 Jt / bulan",
    skills: ["Penetration Testing", "Network Security", "Linux"],
    icon: <ShieldAlert className="w-10 h-10 text-red-500" />,
    color: "red",
    desc: "Melindungi jaringan komputer dan sistem dari ancaman siber, hacker, dan potensi kebocoran data."
  },
  {
    id: "network-engineer",
    title: "Network System Engineer",
    category: "Infrastruktur & Jaringan",
    match: "70%", demand: 80, salary: "Rp 10-20 Jt / bulan",
    skills: ["Cisco", "Mikrotik", "Routing"],
    icon: <Network className="w-10 h-10 text-cyan-500" />,
    color: "cyan",
    desc: "Membangun tulang punggung komunikasi data perusahaan, dari WiFi hingga jaringan kabel fiber optik berskala besar."
  },

  // Software Dev
  {
    id: "fullstack-dev",
    title: "Full-Stack Developer",
    category: "Software Development",
    match: "82%", demand: 95, salary: "Rp 12-22 Jt / bulan",
    skills: ["Next.js", "Node.js", "PostgreSQL"],
    icon: <Code className="w-10 h-10 text-emerald-500" />,
    color: "emerald",
    desc: "Membangun fitur aplikasi dari tata letak depan (frontend) hingga logika database di belakang (backend)."
  },
  {
    id: "mobile-dev",
    title: "Mobile App Developer",
    category: "Software Development",
    match: "75%", demand: 90, salary: "Rp 10-25 Jt / bulan",
    skills: ["Flutter", "React Native", "Swift"],
    icon: <Briefcase className="w-10 h-10 text-indigo-500" />, // Using Briefcase as generic since Mobile/Phone is omitted
    color: "indigo",
    desc: "Menciptakan aplikasi canggih untuk smartphone Android dan iOS yang diunduh jutaan pengguna."
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    category: "Software Development",
    match: "80%", demand: 98, salary: "Rp 15-35 Jt / bulan",
    skills: ["Docker", "CI/CD", "Linux"],
    icon: <Cpu className="w-10 h-10 text-violet-500" />,
    color: "violet",
    desc: "Menjembatani tim programmer dan tim server agar rilis fitur baru berjalan otomatis, cepat, dan aman."
  },

  // Data & AI
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data & AI",
    match: "85%", demand: 85, salary: "Rp 15-30 Jt / bulan",
    skills: ["Python", "Machine Learning", "SQL"],
    icon: <ChartBar className="w-10 h-10 text-purple-500" />,
    color: "purple",
    desc: "Menganalisis jutaan data acak untuk menemukan pola tersembunyi yang membantu keputusan bisnis."
  },
  {
    id: "ai-engineer",
    title: "AI Specialist Engineer",
    category: "Data & AI",
    match: "72%", demand: 100, salary: "Rp 20-40 Jt / bulan",
    skills: ["PyTorch", "LLM", "Data Model"],
    icon: <Brain className="w-10 h-10 text-fuchsia-500" />,
    color: "fuchsia",
    desc: "Melatih kecerdasan buatan (seperti ChatGPT) untuk mengenali teks, gambar, dan memberikan solusi otomatis."
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    category: "Data & AI",
    match: "65%", demand: 90, salary: "Rp 12-25 Jt / bulan",
    skills: ["Apache Spark", "Hadoop", "ETL"],
    icon: <Database className="w-10 h-10 text-amber-500" />,
    color: "amber",
    desc: "Membangun dan merawat pipa aliran data raksasa agar selalu bersih dan siap digunakan oleh tim analis."
  },

  // Kreatif & Desain
  {
    id: "uiux-designer",
    title: "UI/UX Product Designer",
    category: "Kreatif & Desain",
    match: "88%", demand: 85, salary: "Rp 10-20 Jt / bulan",
    skills: ["Figma", "Design System", "User Research"],
    icon: <Palette className="w-10 h-10 text-orange-500" />,
    color: "orange",
    desc: "Menyulap ide rumit menjadi tampilan aplikasi yang cantik, intuitif, dan membuat pengguna betah."
  },
  {
    id: "frontend-engineer",
    title: "Frontend Web Engineer",
    category: "Kreatif & Desain",
    match: "80%", demand: 90, salary: "Rp 10-18 Jt / bulan",
    skills: ["React", "TailwindCSS", "TypeScript"],
    icon: <LayoutTemplate className="w-10 h-10 text-pink-500" />,
    color: "pink",
    desc: "Mewujudkan desain UI/UX menjadi kode interaktif yang hidup di browser pengguna dengan animasi mulus."
  },
  {
    id: "game-developer",
    title: "Game Logic Developer",
    category: "Kreatif & Desain",
    match: "70%", demand: 75, salary: "Rp 8-20 Jt / bulan",
    skills: ["Unity", "C#", "3D Math"],
    icon: <Sparkles className="w-10 h-10 text-yellow-500" />,
    color: "yellow",
    desc: "Membuat mekanika permainan, kecerdasan musuh (NPC), dan sistem skor untuk video game interaktif."
  }
];

export default function ExploreCareers() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
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
        
        // Simulating the AI call to ensure fluid UI demo since we only have limit API keys
        fetch('/api/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed)
        })
        .then(res => res.json())
        .then(result => {
          if (result.careerTitle) {
            setAiResult(result);
          }
        })
        .catch(err => console.error("AI Fetch Error:", err))
        .finally(() => setAiLoading(false));
      }
    }
  }, [searchParams, aiResult, aiLoading]);

  const filteredCareers = CAREERS.filter(career => {
    const matchCategory = selectedCategory === "Semua" || career.category === selectedCategory;
    const matchSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        career.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

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

        {/* Top Section: Search & Filter Hub */}
        <section className="mb-12 flex flex-col items-center w-full">
          <div className="relative w-full max-w-3xl mb-8">
            <div className="absolute inset-y-0 left-5 flex items-center text-amber-500/80 pointer-events-none drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
               <Search size={24} />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari profesi... (misal: Cloud Infrastructure, Full-Stack, AI Specialist)"
              className="w-full h-16 bg-white/40 border border-white/50 rounded-2xl pl-14 pr-6 text-base md:text-lg font-medium text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-amber-500/30 backdrop-blur-2xl shadow-xl transition-all"
            />
          </div>

          <div className="flex overflow-x-auto hide-scrollbar w-full max-w-5xl gap-3 pb-4 px-2 snap-x justify-start lg:justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "shrink-0 snap-center px-6 py-3 rounded-full text-sm font-extrabold transition-all duration-300 border backdrop-blur-xl",
                  selectedCategory === cat 
                    ? "bg-[#5D1636] text-white border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)] scale-105" // Deep Burgundy
                    : "bg-white/20 text-slate-600 border-white/40 hover:bg-white/40 hover:text-slate-900"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Main Content: The Career Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCareers.map((career, i) => {
            const isMatched = aiResult && (
              career.title.toLowerCase().includes(aiResult.careerTitle.toLowerCase()) || 
              aiResult.careerTitle.toLowerCase().includes(career.title.toLowerCase())
            );

            return (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, ease: "easeOut" }}
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
                  {/* Decorative Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/0 via-amber-400/0 to-amber-400/0 group-hover:to-amber-400/10 transition-colors duration-500 pointer-events-none" />

                  {/* Top Row: Icon & Match Badge */}
                  <div className="flex justify-between items-start mb-6 z-10">
                    <div className="p-3 rounded-2xl bg-white shadow-xl shadow-black/5 group-hover:rotate-6 transition-transform duration-500">
                      {career.icon}
                    </div>
                    
                    <div className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-black tracking-wide border transition-all",
                      isMatched 
                        ? "bg-amber-100 text-[#5D1636] border-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" 
                        : "bg-white/50 text-slate-700 border-white/60"
                    )}>
                       {isMatched ? `${aiResult.matchScore}%` : career.match} Match
                    </div>
                  </div>

                  {/* Title & Skills */}
                  <div className="flex-1 z-10">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight mb-4">
                      {career.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {career.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-white/40 rounded-md text-[10px] font-bold text-slate-600 border border-white/60">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Salary & Demand Indicator */}
                  <div className="mt-auto pt-5 border-t border-slate-200/50 flex flex-col gap-3 z-10">
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white text-[10px] font-black shadow-sm">Rp</div>
                       <span className="text-xs font-bold text-slate-700">{career.salary}</span>
                    </div>
                    
                    <div className="w-full">
                       <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1.5">
                         <span>Kebutuhan Industri</span>
                         <span>Tinggi</span>
                       </div>
                       <div className="h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 rounded-full" 
                            style={{ width: `${career.demand}%` }} 
                          />
                       </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </section>
      </main>

      {/* Slide-Over Panel (Career Detail) via shadcn Sheet */}
      <Sheet open={!!selectedCareer} onOpenChange={(open) => !open && setSelectedCareer(null)}>
        <SheetContent className="w-full md:max-w-md lg:max-w-lg bg-white/95 backdrop-blur-3xl border-l-white/40 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] p-0 flex flex-col">
          {selectedCareer && (
            <>
              <div className="p-8 pb-4 flex-1 overflow-y-auto">
                <SheetHeader className="mb-8 text-left">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-white shadow-xl border border-slate-100">
                      {selectedCareer.icon}
                    </div>
                    <div>
                      <SheetTitle className="text-3xl font-black text-slate-900 leading-tight mb-1">{selectedCareer.title}</SheetTitle>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black">
                         <Sparkles size={12} /> {selectedCareer.match} Match
                      </span>
                    </div>
                  </div>
                  
                  <SheetDescription className="text-base text-slate-600 font-medium leading-relaxed">
                    {selectedCareer.desc}
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-6">
                  {/* Skill Node Preview (Static mini-roadmap) */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-black text-slate-900 text-sm tracking-wide mb-4">SKILL NODE PREVIEW</h4>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-amber-200 before:to-rose-200">
                       {selectedCareer.skills.map((skill, idx) => (
                         <div key={skill} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-amber-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-amber-300" />
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-700">
                               {skill} Dasar
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                     <h4 className="font-black text-amber-900 text-sm tracking-wide mb-2">PROSPEK KARIR</h4>
                     <p className="text-amber-800 text-sm font-medium">Kebutuhan industri sangat tinggi (90%). Estimasi gaji entry-level hingga senior berkisar {selectedCareer.salary}.</p>
                  </div>
                </div>
              </div>

              {/* Sticky CTA Bottom */}
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
