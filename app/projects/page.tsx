'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { CardTilt, CardTiltContent } from '@/components/ui/card-tilt';
import { cn } from '@/lib/utils';
import { LayoutGrid, Users, Clock, ArrowUpRight, Filter, Search, Code, Palette, Globe, Shield } from 'lucide-react';

const PROJECTS = [
  {
    title: "E-Commerce Cloud Deploy",
    category: "Cloud",
    difficulty: "Advanced",
    duration: "4 Minggu",
    team: "3-5 Orang",
    match: "98%",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    icon: <Globe size={20} />
  },
  {
    title: "Bank Sec Penetration Test",
    category: "Security",
    difficulty: "Expert",
    duration: "6 Minggu",
    team: "Individual",
    match: "92%",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    icon: <Shield size={20} />
  },
  {
    title: "Social Media UI Kit",
    category: "Design",
    difficulty: "Intermediate",
    duration: "2 Minggu",
    team: "2 Orang",
    match: "85%",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop",
    icon: <Palette size={20} />
  },
  {
    title: "Real-time Chat App",
    category: "Development",
    difficulty: "Intermediate",
    duration: "3 Minggu",
    team: "2-4 Orang",
    match: "88%",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=2070&auto=format&fit=crop",
    icon: <Code size={20} />
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
             <h4 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Project Ecosystem</h4>
             <h1 className="text-4xl md:text-5xl font-display font-black leading-tight">
                Bangun Portofoliomu dengan <br /> Proyek Berbasis Industri
             </h1>
          </div>
          <div className="flex gap-3">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                   type="text" 
                   placeholder="Cari proyek..." 
                   className="glass h-12 pl-12 pr-6 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all w-full md:w-64"
                />
             </div>
             <Button variant="outline" className="glass rounded-full px-5 gap-2 h-12 font-bold"><Filter size={18}/> Filters</Button>
          </div>
        </section>

        {/* Filters pills */}
        <div className="flex flex-wrap gap-4 mb-12">
           {["Semua", "Cloud", "Security", "Design", "Development", "AI"].map(f => (
              <button 
                 key={f}
                 onClick={() => setActiveFilter(f)}
                 className={cn(
                    "px-6 py-2 rounded-full text-xs font-bold border transition-all",
                    activeFilter === f 
                       ? "bg-primary border-primary text-white shadow-lg" 
                       : "bg-white/40 border-white/60 text-muted-foreground hover:bg-white/60"
                 )}
              >
                 {f}
              </button>
           ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {PROJECTS.map((proj, i) => (
              <motion.div
                 key={proj.title}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
              >
                 <CardTilt className="w-full" tiltMaxAngle={5} scale={1.01}>
                    <CardTiltContent className="glass rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row h-full border border-white/40 group">
                       
                       {/* Project Image */}
                       <div className="w-full md:w-[40%] h-48 md:h-auto relative overflow-hidden shrink-0">
                          <img 
                             src={proj.image} 
                             alt={proj.title} 
                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 flex gap-2">
                             <div className="glass px-2 py-1 rounded-md text-[8px] font-bold text-white uppercase tracking-widest">{proj.category}</div>
                          </div>
                       </div>

                       {/* Project Content */}
                       <div className="p-8 flex flex-col justify-between flex-1">
                          <div>
                             <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                   {proj.icon}
                                </div>
                                <div className="text-right">
                                   <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                      {proj.match} Match
                                   </span>
                                </div>
                             </div>

                             <h3 className="text-2xl font-display font-black mb-6 leading-tight group-hover:text-primary transition-colors">
                                {proj.title}
                             </h3>

                             <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                   <LayoutGrid size={14} />
                                   <span className="text-[10px] font-bold uppercase tracking-widest">{proj.difficulty}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                   <Clock size={14} />
                                   <span className="text-[10px] font-bold uppercase tracking-widest">{proj.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                                   <Users size={14} />
                                   <span className="text-[10px] font-bold uppercase tracking-widest">{proj.team}</span>
                                </div>
                             </div>
                          </div>

                          <div className="flex items-center gap-4">
                             <Button className="flex-1 rounded-2xl py-6 bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
                                Ambil Proyek
                             </Button>
                             <Button variant="outline" size="icon" className="glass rounded-2xl w-14 h-14 shrink-0 transition-transform group-hover:rotate-12">
                                <ArrowUpRight size={20} />
                             </Button>
                          </div>
                       </div>
                    </CardTiltContent>
                 </CardTilt>
              </motion.div>
           ))}
        </div>

        {/* Load More Section */}
        <div className="mt-20 flex flex-col items-center">
           <Button variant="ghost" className="text-muted-foreground font-bold flex flex-col gap-2 group">
              <span className="uppercase tracking-[0.3em] text-[10px]">Tampilkan Lebih Banyak</span>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                 <ArrowUpRight className="rotate-90" size={20} />
              </motion.div>
           </Button>
        </div>
      </main>
    </div>
  );
}
