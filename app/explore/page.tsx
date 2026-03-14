'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { RevealText } from '@/components/ui/reveal-text';
import { Button } from '@/components/ui/button';
import { CardTilt, CardTiltContent } from '@/components/ui/card-tilt';
import { cn } from '@/lib/utils';
import { Search, X, Cloud, Brain, Code, Database, Server, Smartphone, Monitor, Palette } from 'lucide-react';

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

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Search & Filter Hub */}
        <section className="mb-12">
          <div className="relative max-w-3xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-muted-foreground">
               <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Cari profesi... (misal: Cloud Infrastructure, Full-Stack, AI Specialist)"
              className="w-full h-16 bg-card border border-border rounded-2xl pl-14 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-xl shadow-xl transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
               <Button className="rounded-xl h-10 w-10 p-0 bg-sp-accent-gold hover:bg-sp-accent-gold/90 text-white shadow-lg">
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
                    ? "bg-primary text-white border-primary shadow-[0_4px_15px_rgba(139,34,82,0.4)]" 
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
          {CAREERS.map((career, i) => (
            <motion.div
              key={career.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedCareer(career)}
              className="cursor-pointer"
            >
              <CardTilt className="w-full" tiltMaxAngle={10} scale={1.02}>
                <CardTiltContent className="glass p-6 rounded-3xl relative overflow-hidden group">
                  {/* Match Badge */}
                  <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20 shadow-[0_0_15px_rgba(39,174,96,0.2)] group-hover:shadow-[0_0_20px_rgba(39,174,96,0.4)] transition-all">
                     {career.match} Match
                  </div>

                  {/* Icon */}
                  <div className="mb-6 p-4 rounded-2xl bg-white/50 w-fit group-hover:scale-110 transition-transform duration-500">
                    {career.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-extrabold mb-4 leading-tight group-hover:text-primary transition-colors">
                    {career.title}
                  </h3>

                  {/* Skills/Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {career.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white/30 rounded-lg text-[10px] font-bold text-muted-foreground border border-white/50">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                          <span className="text-[10px] font-bold">$</span>
                       </div>
                       <span className="text-xs font-bold text-muted-foreground">{career.salary}</span>
                    </div>

                    <div className="flex-1 max-w-[100px] ml-4">
                       <div className="flex justify-between items-center mb-1">
                          <span className="text-[8px] font-bold uppercase text-muted-foreground tracking-widest text-right w-full">Demand</span>
                       </div>
                       <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                             className="h-full bg-gradient-to-r from-sp-accent-orange to-sp-accent-gold" 
                             style={{ width: `${career.demand}%` }}
                          />
                       </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-3xl transition-all duration-500 pointer-events-none" />
                </CardTiltContent>
              </CardTilt>
            </motion.div>
          ))}
        </section>
      </main>

      {/* Slide-over Panel (Career Detail) */}
      <AnimatePresence>
         {selectedCareer && (
            <>
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedCareer(null)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
               />
               <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-white/95 backdrop-blur-3xl z-[70] shadow-2xl p-10 flex flex-col pt-24"
               >
                  <button 
                     onClick={() => setSelectedCareer(null)}
                     className="absolute top-8 right-8 p-2 hover:bg-muted rounded-full transition-colors"
                  >
                     <X size={24} />
                  </button>

                  <div className="mb-8 flex items-center gap-4">
                     <div className="p-4 rounded-2xl bg-muted">
                        {selectedCareer.icon}
                     </div>
                     <div>
                        <h2 className="text-3xl font-display font-extrabold">{selectedCareer.title}</h2>
                        <span className="text-emerald-600 font-bold">{selectedCareer.match} Match with your profile</span>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div>
                        <h4 className="font-bold text-muted-foreground uppercase tracking-widest text-xs mb-3">Deskripsi Singkat</h4>
                        <p className="text-muted-foreground leading-relaxed">
                           Sebagai seorang {selectedCareer.title}, Anda akan bertanggung jawab untuk mendesain, mengimplementasikan, dan mengelola solusi berbasis {selectedCareer.skills.join(", ")} untuk mendukung pertumbuhan bisnis digital.
                        </p>
                     </div>

                     <div>
                        <h4 className="font-bold text-muted-foreground uppercase tracking-widest text-xs mb-3">Mini-roadmap</h4>
                        <div className="glass p-6 rounded-2xl bg-muted/50">
                           {/* Mini SVG Roadmap mock */}
                           <svg viewBox="0 0 200 80" className="w-full stroke-primary">
                              <circle cx="20" cy="40" r="4" fill="var(--primary)" />
                              <path d="M24 40 H176" strokeDasharray="4 2" />
                              <circle cx="180" cy="40" r="4" fill="none" strokeWidth="2" />
                              <circle cx="60" cy="40" r="6" fill="var(--sp-accent-gold)" />
                              <circle cx="120" cy="40" r="6" fill="none" strokeWidth="2" />
                           </svg>
                           <div className="flex justify-between text-[10px] font-bold mt-2">
                              <span>DASAR</span>
                              <span className="text-sp-accent-gold">SEDANG</span>
                              <span>LANJUT</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-auto">
                     <Button className="w-full py-8 text-lg font-bold bg-primary hover:bg-primary/95 text-white shadow-xl shadow-primary/20 rounded-2xl">
                        Buat Learning Journey untuk Karir Ini
                     </Button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
    </div>
  );
}
