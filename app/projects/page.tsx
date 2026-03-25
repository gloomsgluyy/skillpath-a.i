'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Search, FolderKanban, CheckCircle2, ChevronRight, Play, Loader2, Send, Github, Monitor, Link2, BookOpen, AlertCircle, Sparkles, ChevronDown, Rocket, Notebook, Compass, ArrowUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserProjects, updateProjectStatus, type ProjectEvaluation } from '@/lib/firestore';

import { LAB_PROJECTS, type LabProject } from '@/lib/data/projects';

const CATEGORIES = ["Semua", ...Array.from(new Set(LAB_PROJECTS.map(p => p.category)))];

export default function ProjectsPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<Record<string, ProjectEvaluation>>({});
  const [targetCareer, setTargetCareer] = useState<string | null>(null);
  
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [selectedProject, setSelectedProject] = useState<typeof LAB_PROJECTS[0] | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  useEffect(() => {
    async function load() {
      if (!currentUser?.uid) { setLoading(false); return; }
      
      const userProjs = await getUserProjects(currentUser.uid);
      const progressMap: Record<string, ProjectEvaluation> = {};
      userProjs.forEach(p => progressMap[p.id] = p);
      
      setUserProgress(progressMap);

      const storedCareer = localStorage.getItem(`skillpath_career_${currentUser.uid}`);
      if (storedCareer) {
        setTargetCareer(storedCareer);
      } else {
        const storedOnboarding = localStorage.getItem('skillpath_onboarding_data');
        if (storedOnboarding) {
          try {
            const parsed = JSON.parse(storedOnboarding);
            if (parsed.targetCareer) setTargetCareer(parsed.targetCareer);
          } catch(e) {}
        }
      }
      
      setLoading(false);
    }
    load();
  }, [currentUser]);

  const isMatchFunc = useCallback((project: typeof LAB_PROJECTS[0]) => {
    if (!targetCareer) return false;
    const tc = targetCareer.toLowerCase();
    const cat = project.category.toLowerCase();
    const title = project.title.toLowerCase();
    const skills = project.skills.map(s => s.toLowerCase());
    
    if (tc.includes(cat) || cat.includes(tc)) return true;
    if ((tc.includes('ui') || tc.includes('ux') || tc.includes('design')) && (cat.includes('design') || skills.includes('figma'))) return true;
    if (tc.includes('frontend') && (cat.includes('frontend') || skills.includes('react') || skills.includes('vue'))) return true;
    if (tc.includes('backend') && (cat.includes('backend') || skills.includes('node') || skills.includes('api'))) return true;
    if (tc.includes('data') && (cat.includes('data') || skills.includes('python') || cat.includes('machine learning'))) return true;
    
    if (title.includes(tc)) return true;
    if (skills.some(s => tc.includes(s) && s.length > 2)) return true;

    return false;
  }, [targetCareer]);

  const displayedProjects = useMemo(() => {
    return LAB_PROJECTS.filter(p => {
      const matchesCat = activeTab === "Semua" || p.category === activeTab;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      const aMatch = isMatchFunc(a);
      const bMatch = isMatchFunc(b);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [activeTab, searchQuery, isMatchFunc]);

  const recommendedProject = targetCareer 
    ? LAB_PROJECTS.find(p => isMatchFunc(p)) 
    : LAB_PROJECTS[0];

  const handleToggleStatus = async (projId: string, currentStatus: string) => {
    if (!currentUser?.uid || !selectedProject) return;
    
    const nextStatus = currentStatus === 'Tersedia' ? 'Sedang Dikerjakan' : 
                       currentStatus === 'Sedang Dikerjakan' ? 'Terselesaikan' : 'Tersedia';
                       
    const prev = { ...userProgress };
    let newEval: ProjectEvaluation = prev[projId] ? 
        { ...prev[projId], status: nextStatus, score: 100 } : 
        { id: projId, title: selectedProject.title, skills: selectedProject.skills, status: nextStatus, score: 100 };
    
    setUserProgress(curr => ({...curr, [projId]: newEval}));
    
    try {
      await updateProjectStatus(currentUser.uid, newEval);
    } catch (e) { console.error(e) }
  };

  const getDifficultyColor = (diff: string) => {
    if (diff === 'Pemula') return 'bg-emerald-100/80 text-emerald-800 border-emerald-200';
    if (diff === 'Menengah') return 'bg-amber-100/80 text-amber-800 border-amber-200';
    return 'bg-rose-100/80 text-rose-800 border-rose-200';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Terselesaikan') return 'bg-green-500/10 text-green-700 border-green-500/20';
    if (status === 'Sedang Dikerjakan') return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
    if (status === 'Revisi') return 'bg-orange-500/10 text-orange-700 border-orange-500/20';
    return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-24">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FolderKanban size={36} className="text-white" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-slate-900">Login Diperlukan</h2>
          <Button onClick={() => router.push('/')} className="glow-pill-primary font-black px-8 py-3 mt-4">Kembali</Button>
        </div>
      </div>
    );
  }

  const onSheetOpenChange = (open: boolean) => {
    if (!open) { setSelectedProject(null); return; }
  };

  const activeProgress = selectedProject ? userProgress[selectedProject.id] : null;
  const isStarted = activeProgress && activeProgress.status !== 'Tersedia';

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 font-sans relative">
      <Navbar />
      
      {/* Ambient Blurred Background inherited from Explore */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] sm:top-[-20%] left-[-10%] sm:left-[-10%] w-[50%] h-[50%] bg-amber-400/20 blur-[120px] rounded-full mix-blend-multiply" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full mix-blend-multiply" />
          <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-rose-400/15 blur-[120px] rounded-full mix-blend-multiply" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full overflow-hidden">
        

        {/* Filter Bar (Chips & Search) */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 w-full overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto pb-2 md:pb-0" style={{ maskImage: 'linear-gradient(to right, black 80%, transparent 100%)' }}>
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mr-2 shrink-0">Kategori</span>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap shrink-0",
                  activeTab === cat 
                    ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/20" 
                    : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari proyek..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/60 backdrop-blur border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all placeholder:text-slate-400"
            />
          </div>
        </motion.div>

        {/* Project Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-72 rounded-[1.5rem] bg-white/50" />)}
          </div>
        ) : displayedProjects.length === 0 ? (
          <div className="text-center py-20 rounded-[2rem] bg-white/40 border border-white">
            <p className="font-bold text-slate-500">Tidak ada proyek yang sesuai dengan pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
            {displayedProjects.map((project, i) => {
              const progress = userProgress[project.id];
              const status = progress?.status || 'Tersedia';

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.4) }}
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group bg-white/60 backdrop-blur-xl border border-white rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all cursor-pointer flex flex-col h-full"
                >
                  <div className="p-5 flex flex-col h-full relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={cn("px-2.5 py-1 rounded border text-[10px] font-black uppercase tracking-wider", getDifficultyColor(project.difficulty))}>
                          {project.difficulty}
                        </span>
                        {isMatchFunc(project) && (
                          <span className="px-2.5 py-1 rounded bg-amber-100/80 text-[#5D1636] border border-amber-300 text-[10px] font-black tracking-wider flex items-center gap-1 shadow-sm">
                            <Sparkles size={10} /> 98% Match
                          </span>
                        )}
                      </div>
                      {status !== 'Tersedia' && (
                        <span className={cn("px-2.5 py-1 rounded border text-[10px] font-black uppercase tracking-wider backdrop-blur-md", getStatusColor(status))}>
                          {status}
                        </span>
                      )}
                    </div>

                    {/* Accurate Reference Image from project data */}
                    <div className="h-44 rounded-[1.25rem] border border-slate-200/60 overflow-hidden relative shadow-inner mb-5">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <h3 className="font-black text-lg text-slate-900 leading-[1.2] mb-2">{project.title}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">{project.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-3 border-t border-slate-200/50">
                      {project.skills.slice(0, 3).map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-600">{s}</span>
                      ))}
                      {project.skills.length > 3 && <span className="px-1 text-[10px] text-slate-400">+{project.skills.length - 3}</span>}
                    </div>

                    {/* Interactive hover progress line indicating interactivity */}
                    <div className="absolute bottom-0 left-0 h-1 bg-sky-400 transition-all duration-300 w-0 group-hover:w-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* Slide-over Briefing */}
      <Sheet open={!!selectedProject} onOpenChange={onSheetOpenChange}>
        <SheetContent className="w-[95vw] !max-w-[1100px] sm:w-[90vw] bg-white border-l-slate-200 shadow-2xl p-0 flex flex-col overflow-hidden">
          {selectedProject && (
            <div className="flex-1 overflow-y-auto hide-scrollbar p-6 md:p-10 relative">
              
              {/* Header */}
              <div className="mb-10 relative z-10 border-b border-slate-100 pb-8">
                <SheetTitle className="text-3xl md:text-[2.75rem] font-black text-slate-900 leading-[1.1] mb-5 tracking-tight max-w-2xl">
                  {selectedProject.title}
                </SheetTitle>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.skills.map(s => (
                    <div key={s} className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-sm">
                      <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center">
                         <CodeIcon type={s} />
                      </div>
                      {s}
                    </div>
                  ))}
                </div>

                <div className="text-slate-700 text-[15px] leading-relaxed max-w-3xl font-medium">
                  <strong className="text-slate-900 font-black">Briefing Deskripsi:</strong> {selectedProject.description}
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="flex flex-col md:flex-row gap-10 relative z-10">
                
                {/* Left Column: Checklist */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-sm font-black text-slate-900 mb-4 tracking-tight uppercase flex items-center gap-2">
                    <Compass size={16} className="text-sky-500" />
                    Buku Panduan Aksi (Action Plan)
                  </h3>
                  
                  <div className="space-y-3">
                    {selectedProject.checklist.map((step: any, i: number) => {
                      const isExpanded = expandedStep === i;
                      const title = typeof step === 'string' ? step : step.title;
                      const detail = typeof step === 'string' ? null : step.detail;
                      const code = typeof step === 'string' ? null : step.code;
                      
                      return (
                        <div 
                          key={i} 
                          onClick={() => setExpandedStep(isExpanded ? null : i)}
                          className={cn(
                            "rounded-[1.25rem] border transition-all cursor-pointer overflow-hidden",
                            isExpanded ? "bg-white border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)]" : "bg-slate-50 border-slate-100 hover:bg-slate-100/70 hover:border-slate-200"
                          )}
                        >
                          <div className="p-4 sm:p-5 flex items-start gap-4">
                            {/* Number Circle */}
                            <div className="mt-0.5 shrink-0 flex items-center justify-center">
                              <div className={cn("w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center transition-all text-[10px] font-bold", isExpanded ? "border-sky-600 bg-sky-50 text-sky-700" : "border-slate-300 bg-white text-slate-400")}>
                                {i + 1}
                              </div>
                            </div>
                            
                            <div className="flex-1 w-full overflow-hidden">
                              <div className="flex items-center justify-between">
                                <span className={cn("text-sm font-bold", isExpanded ? "text-slate-900" : "text-slate-600")}>{title}</span>
                                {isExpanded && <ChevronDown size={16} className="text-slate-400 shrink-0 ml-2" />}
                              </div>
                              
                              <AnimatePresence>
                                {isExpanded && (detail || code) && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }} 
                                    animate={{ height: 'auto', opacity: 1 }} 
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pt-3 pb-1 space-y-3">
                                      {detail && <p className="text-[13px] text-slate-600 leading-relaxed font-medium">{detail}</p>}
                                      {code && (
                                        <div className="bg-[#1e1e1e] rounded-xl p-4 text-[#d4d4d4] text-[13px] font-mono overflow-x-auto w-full border border-slate-800 shadow-inner">
                                          <pre><code>{code}</code></pre>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right Column: Submission Zone & Resources */}
                <div className="w-full md:w-[380px] shrink-0 space-y-8">
                  
                  {/* Status Tracker */}
                  <div className="bg-slate-50/80 rounded-[1.5rem] p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-200">
                       <div className={cn("h-full transition-all duration-1000", activeProgress?.status === 'Terselesaikan' ? "bg-emerald-500 w-full" : isStarted ? "bg-sky-500 w-1/2" : "w-0")} />
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                         <Rocket size={16} className={activeProgress?.status === 'Terselesaikan' ? "text-emerald-500" : "text-sky-500"} /> 
                         Progress Proyek
                       </h3>
                       {activeProgress?.status === 'Terselesaikan' && <CheckCircle2 size={18} className="text-emerald-500" />}
                    </div>
                    
                    <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
                      Atur status pengerjaan sebagai pengingat referensi belajar Anda.
                    </p>
                    
                    <Button 
                      onClick={() => handleToggleStatus(selectedProject.id, activeProgress?.status || 'Tersedia')} 
                      className={cn(
                        "w-full rounded-xl h-12 text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95",
                        !isStarted ? "bg-slate-900 text-white hover:bg-slate-800" :
                        activeProgress?.status === 'Terselesaikan' ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200" :
                        "bg-sky-600 text-white hover:bg-sky-700 shadow-sky-600/20"
                      )}
                    >
                      {!isStarted ? "Mulai Eksplorasi" : activeProgress?.status === 'Terselesaikan' ? "Tandai Belum Selesai" : "Mengerjakan (Selesaikan)"}
                    </Button>
                  </div>

                  {/* Resource Center */}
                  <div>
                    <h3 className="text-sm font-black text-slate-900 mb-4 tracking-tight flex items-center gap-2 uppercase">
                      <Notebook size={16} className="text-rose-500"/> Pusat Literatur
                    </h3>
                    <div className="flex flex-col gap-2">
                       {selectedProject.resources?.map((res: any, i: number) => (
                         <a key={i} href={res.url} target="_blank" rel="noreferrer" className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 hover:border-slate-300 hover:shadow-sm hover:text-sky-600 flex items-center justify-between transition-all group">
                           <span className="flex items-center gap-2">
                             <Link2 size={14} className="text-slate-400 group-hover:text-sky-500" /> 
                             {res.title}
                           </span>
                           <ChevronRight size={14} className="text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-transform" />
                         </a>
                       ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Scroll to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_4px_20px_rgba(245,158,11,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

const CodeIcon = ({ type }: { type: string }) => {
  const t = type.toLowerCase();
  if (t.includes('node') || t.includes('javascript') || t.includes('js')) return <Monitor size={12} className="text-amber-500" />;
  if (t.includes('python')) return <Monitor size={12} className="text-blue-500" />;
  if (t.includes('database') || t.includes('sql') || t.includes('mongo')) return <Monitor size={12} className="text-emerald-500" />;
  if (t.includes('figma') || t.includes('ui')) return <Monitor size={12} className="text-fuchsia-500" />;
  return <BookOpen size={12} className="text-slate-400" />;
};
