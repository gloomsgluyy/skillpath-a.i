'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { CardTilt, CardTiltContent } from '@/components/ui/card-tilt';
import { cn } from '@/lib/utils';
import { Settings, LogOut, MapPin, Link as LinkIcon, Mail, Github, Twitter, Award, Zap, BookOpen, Star } from 'lucide-react';

const SKILLS = [
  { name: "Linux Administration", level: "Advanced", mastered: true },
  { name: "Docker & Containerization", level: "Expert", mastered: true },
  { name: "Network Security", level: "Intermediate", mastered: true },
  { name: "Terraform", level: "Beginner", mastered: false },
  { name: "AWS Cloud Arch", level: "Beginner", mastered: false },
];

export default function Profile() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        
        {/* Profile Header */}
        <section className="glass rounded-[3rem] p-10 mb-8 flex flex-col items-center">
           <div className="relative group mb-8">
              <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                 <img 
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop" 
                    alt="User" 
                    className="w-full h-full object-cover"
                 />
              </div>
              <motion.div 
                 animate={{ scale: [1, 1.1, 1] }} 
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="absolute -bottom-2 right-4 w-10 h-10 bg-sp-accent-gold rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg"
              >
                 <Award size={20} />
              </motion.div>
           </div>

           <h1 className="text-4xl font-display font-black mb-2">Gloom AI Specialist</h1>
           <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <MapPin size={14} className="text-primary" /> Jakarta, Indonesia
           </p>

           <div className="flex gap-4 mb-10">
              <Button className="rounded-full px-8 py-6 bg-primary text-white font-bold text-xs uppercase tracking-widest gap-2 shadow-xl shadow-primary/20">
                 <Settings size={16} /> Edit Profile
              </Button>
              <Button variant="outline" className="glass rounded-full px-8 py-6 font-bold text-xs uppercase tracking-widest gap-2 border-primary/20 hover:bg-primary/5">
                 <LogOut size={16} /> Logout
              </Button>
           </div>

           <div className="flex gap-6">
              <button className="p-3 glass rounded-2xl hover:bg-white/60 transition-all text-muted-foreground hover:text-primary"><Github size={20}/></button>
              <button className="p-3 glass rounded-2xl hover:bg-white/60 transition-all text-muted-foreground hover:text-primary"><Twitter size={20}/></button>
              <button className="p-3 glass rounded-2xl hover:bg-white/60 transition-all text-muted-foreground hover:text-primary"><Mail size={20}/></button>
              <button className="p-3 glass rounded-2xl hover:bg-white/60 transition-all text-muted-foreground hover:text-primary"><LinkIcon size={20}/></button>
           </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
           
           {/* Left: About & Skills (8 cols) */}
           <div className="md:col-span-8 space-y-8">
              <div className="glass rounded-[2.5rem] p-10">
                 <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                    <BookOpen size={20} className="text-primary" /> Summary
                 </h4>
                 <p className="text-muted-foreground leading-relaxed">
                    Seorang antusias teknologi dengan fokus pada infrastruktur cloud dan keamanan siber. Sedang bertransisi menjadi Cloud Architect melalui program SkillPath AI. Saat ini menguasai ekosistem Docker dan administrasi server tingkat lanjut.
                 </p>
              </div>

              <div className="glass rounded-[2.5rem] p-10">
                 <h4 className="font-display font-bold text-lg mb-8 flex items-center gap-2">
                    <Zap size={20} className="text-sp-accent-orange" /> Skills & Competencies
                 </h4>
                 
                 <div className="space-y-6">
                    <div>
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Mastered Skills</p>
                       <div className="flex flex-wrap gap-3">
                          {SKILLS.filter(s => s.mastered).map(s => (
                             <div key={s.name} className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 font-bold text-xs">
                                <Star size={12} fill="currentColor" />
                                {s.name}
                                <span className="opacity-50 font-medium">| {s.level}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="pt-6 border-t border-white/20">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Current Learning Journey</p>
                       <div className="flex flex-wrap gap-3">
                          {SKILLS.filter(s => !s.mastered).map(s => (
                             <div key={s.name} className="flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-xl border border-primary/10 font-bold text-xs">
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                                   <Zap size={12} fill="currentColor" />
                                </motion.div>
                                {s.name}
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right: Activity & Badges (4 cols) */}
           <div className="md:col-span-4 space-y-8">
              <div className="glass rounded-[2.5rem] p-8 bg-gradient-to-br from-primary/5 to-transparent">
                 <h4 className="font-display font-bold text-sm uppercase tracking-widest text-muted-foreground mb-6">Learning Activity</h4>
                 <div className="space-y-6">
                    {[
                       { day: "Mon", h: 40 },
                       { day: "Tue", h: 80 },
                       { day: "Wed", h: 60 },
                       { day: "Thu", h: 100 },
                       { day: "Fri", h: 30 },
                       { day: "Sat", h: 10 },
                       { day: "Sun", h: 0 },
                    ].map(d => (
                       <div key={d.day} className="flex items-center gap-3">
                          <span className="text-[10px] font-bold w-8 text-muted-foreground">{d.day}</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                             <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${d.h}%` }}
                                className="h-full bg-primary"
                             />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <CardTilt tiltMaxAngle={15}>
                 <CardTiltContent className="glass rounded-[2rem] p-8 text-center border-sp-accent-gold/30 bg-gradient-to-br from-sp-accent-gold/5 to-transparent">
                    <div className="w-16 h-16 rounded-full bg-sp-accent-gold flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-sp-accent-gold/20">
                       <Award size={32} />
                    </div>
                    <h5 className="font-bold mb-1">Top 5% Learner</h5>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Global Ranking #1204</p>
                 </CardTiltContent>
              </CardTilt>
           </div>

        </div>
      </main>
    </div>
  );
}
