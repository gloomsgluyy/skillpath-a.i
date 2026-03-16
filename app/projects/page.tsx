'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { CardTilt, CardTiltContent } from '@/components/ui/card-tilt';
import { cn } from '@/lib/utils';
import { Briefcase, Link as LinkIcon, Sparkles, Star, Plus, ShieldCheck, Code, ArrowUpRight, CheckCircle2, Bot } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  score: number;
  skills: string[];
  feedback?: string;
}

const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "E-Commerce Microservices",
    category: "Backend",
    thumbnail: "bg-gradient-to-br from-indigo-500 to-purple-600",
    score: 92,
    skills: ["Docker", "Node.js", "Redis"],
    feedback: "Struktur arsitektur sangat solid. Penggunaan Redis untuk caching keranjang belanja sangat tepat saar traffic tinggi. Disarankan menambah circuit breaker untuk ketahanan."
  },
  {
    id: "p2",
    title: "AWS VPC Architecture",
    category: "Infrastructure",
    thumbnail: "bg-gradient-to-br from-amber-500 to-orange-600",
    score: 88,
    skills: ["AWS EC2", "VPC", "Security Group"],
    feedback: "Isolasi subnet publik dan privat sudah benar. Perhatikan aturan Security Group untuk port SSH agar tidak terbuka ke 0.0.0.0/0."
  },
  {
    id: "p3",
    title: "React Dashboard UI",
    category: "Frontend",
    thumbnail: "bg-gradient-to-br from-emerald-400 to-teal-500",
    score: 95,
    skills: ["React", "Tailwind", "Framer Motion"],
    feedback: "Implementasi desain glassmorphism luar biasa. Animasi sangat halus (60fps). Coba pertimbangkan aksesibilitas (a11y) untuk warna kontras."
  }
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  
  // Submit State
  const [linkInput, setLinkInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<any>(null);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkInput) return;
    
    setIsEvaluating(true);
    setEvalResult(null);

    // Mock API Call delay
    setTimeout(() => {
      setEvalResult({
        title: "Evaluasi Proyek Baru",
        score: 85,
        skills: ["API Integration", "Deployment", "Git"],
        feedback: "Mentor AI melihat struktur kode yang rapi pada repository Anda. Penggunaan variabel environment sudah aman. Untuk skor lebih tinggi, lengkapi README.md dengan instruksi instalasi yang jelas."
      });
      setIsEvaluating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden relative">
      <Navbar />

      {/* Subtle Grid Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none z-0" />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tighter mb-4">
              Portfolio Lab
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl">
              Unggah proyekmu dan dapatkan evaluasi otomatis dari AI Mentor. Bangun portofolio industri-standar.
            </p>
          </div>
          <Button 
            onClick={() => setIsSubmitModalOpen(true)}
            className="rounded-full px-6 py-6 bg-white hover:bg-white/90 text-slate-950 font-black text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
          >
            <Plus size={20} className="mr-2" /> Evaluasi Proyek Baru
          </Button>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          
          {/* Main Feature Highlight (Cols 2, Rows 2) */}
          <div className="lg:col-span-2 lg:row-span-2 rounded-3xl p-1 relative overflow-hidden group border border-white/10 hover:border-indigo-500/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-900/40 backdrop-blur-md -z-10" />
            <div className="h-full w-full bg-[#0a0514]/60 backdrop-blur-xl rounded-[1.4rem] p-8 flex flex-col justify-between">
               <div>
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                     <ShieldCheck size={32} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-black mb-2 leading-tight">Sertifikasi Cloud Security<br/>Tingkat Lanjut</h2>
                  <p className="text-white/60 font-medium">Berdasarkan 3 proyek infrastruktur terakhirmu, kamu sudah memenuhi kualifikasi untuk sertifikasi AWS Security.</p>
               </div>
               
               <div className="flex justify-between items-center pt-6 border-t border-white/10 mt-6">
                  <div className="flex gap-2">
                     <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-xs font-bold">+3</span>
                     <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 text-emerald-400">
                       <CheckCircle2 size={16} />
                     </span>
                  </div>
                  <Button variant="ghost" className="uppercase text-xs font-bold tracking-widest text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
                     Klaim Sertifikat
                  </Button>
               </div>
            </div>
          </div>

          {/* Render Mock Projects */}
          {MOCK_PROJECTS.map((project, idx) => (
             <div 
                key={project.id} 
                className={cn("rounded-3xl relative overflow-hidden group cursor-pointer border border-white/10 hover:border-white/30 transition-all", idx === 0 ? "lg:col-span-2" : "lg:col-span-1 lg:row-span-2")}
                onClick={() => setSelectedProject(project)}
             >
                {/* Bg Image/Color */}
                <div className={cn("absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500", project.thumbnail)} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-[#0a0514]/80 to-transparent" />
                
                <div className="relative h-full w-full p-6 flex flex-col justify-end">
                   <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-black text-amber-400 flex items-center gap-1">
                      <Star size={12} fill="currentColor" /> {project.score}
                   </div>
                   
                   <h3 className="text-2xl font-black mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">{project.title}</h3>
                   <span className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4 inline-block">{project.category}</span>
                   
                   <div className="flex flex-wrap gap-2">
                      {project.skills.map(skill => (
                         <span key={skill} className="px-2.5 py-1 rounded bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold">
                            {skill}
                         </span>
                      ))}
                   </div>
                </div>
             </div>
          ))}

          {/* Quick Stats or Empty Slots */}
          <div className="lg:col-span-1 rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
             <Code size={32} className="text-white/40 mb-4" />
             <h4 className="font-bold text-white/60">Terkunci</h4>
             <p className="text-xs text-white/40 mt-2 px-4">Selesaikan modul React untuk membuka slot portfolio ini.</p>
          </div>

        </div>
      </main>

      {/* Slide-Over AI Evaluation Detail */}
      <Sheet open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
         <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-[#0a0514]/95 backdrop-blur-3xl border-l-white/10 p-0 text-white flex flex-col">
            {selectedProject && (
               <>
                  {/* Visual Header */}
                  <div className={cn("h-48 w-full relative", selectedProject.thumbnail)}>
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] to-transparent" />
                     <div className="absolute bottom-6 left-8 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center shadow-2xl">
                           <span className="text-2xl font-black text-amber-400">{selectedProject.score}</span>
                        </div>
                        <div>
                           <h2 className="text-2xl font-black leading-tight drop-shadow-md">{selectedProject.title}</h2>
                           <span className="text-xs font-bold uppercase tracking-widest opacity-80">{selectedProject.category}</span>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 flex-1 overflow-y-auto space-y-8">
                     <div>
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#feb47b] mb-4">
                           <Bot size={16} /> Feedback Mentor AI
                        </h4>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                           <p className="text-slate-300 leading-relaxed font-medium italic">"{selectedProject.feedback}"</p>
                        </div>
                     </div>

                     <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Skill Diverifikasi</h4>
                        <div className="flex flex-wrap gap-2">
                           {selectedProject.skills.map(s => (
                              <span key={s} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-sm">
                                 {s}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
               </>
            )}
         </SheetContent>
      </Sheet>

      {/* Submit Evaluation Modal (Slide Up or Dialog) */}
      <AnimatePresence>
         {isSubmitModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => !isEvaluating && setIsSubmitModalOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
               />
               
               <motion.div 
                  initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  className="relative w-full max-w-lg bg-[#1a0f2e] border border-white/20 p-8 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
               >
                  {/* Deco */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-[50px]" />
                  
                  <h2 className="text-3xl font-black mb-2 tracking-tight">Evaluasi Proyek</h2>
                  <p className="text-white/60 text-sm font-medium mb-8">Tempel link repository GitHub atau URL proyek live Anda. AI akan menganalisis kode dan performa.</p>

                  {!evalResult ? (
                     <form onSubmit={handleEvaluate} className="relative">
                        <div className="relative mb-8">
                           <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                           <input 
                              disabled={isEvaluating}
                              value={linkInput}
                              onChange={e => setLinkInput(e.target.value)}
                              type="url" 
                              placeholder="https://github.com/username/repo..."
                              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                              required
                           />
                        </div>

                        <Button 
                           disabled={isEvaluating}
                           type="submit" 
                           className="w-full h-14 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-black text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                        >
                           {isEvaluating ? (
                              <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"/> Menganalisis Kode...</span>
                           ) : (
                              "Mulai Evaluasi AI"
                           )}
                        </Button>
                     </form>
                  ) : (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/30 mb-6 text-center">
                           <div className="w-16 h-16 rounded-full bg-indigo-500 mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                              <Star size={32} className="text-amber-400" fill="currentColor" />
                           </div>
                           <h3 className="text-2xl font-black text-white">{evalResult.score} / 100</h3>
                           <p className="text-indigo-200 text-sm font-bold mt-1 uppercase tracking-widest">Skor Proyek Baru</p>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed italic mb-6">"{evalResult.feedback}"</p>
                        <Button 
                           onClick={() => { setIsSubmitModalOpen(false); setEvalResult(null); setLinkInput(''); }}
                           className="w-full h-14 rounded-2xl bg-white text-slate-900 hover:bg-slate-200 font-black uppercase tracking-widest"
                        >
                           Simpan ke Portofolio
                        </Button>
                     </motion.div>
                  )}

               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}
