'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { ArrowRight, Bot, Send, GraduationCap, LayoutList, FolderKanban, Target, Compass, Cloud, User, PenTool, Activity } from 'lucide-react';
import { AnimatedTextGenerate } from "@/components/ui/animated-textgenerate";
import BackgroundMeteors from '@/components/ui/backgroundmeteors';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const HomeTestimonials = dynamic(() => import('@/components/sections/HomeTestimonials'), { ssr: false });
const OnboardingModal = dynamic(() => import('@/components/sections/OnboardingModal'), { ssr: false });

/* ─── Traffic Light Window Header ─── */
function WindowHeader() {
  return (
    <div className="flex gap-2 p-4 absolute top-0 left-0 w-full z-30">
      <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.6)]" />
      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.6)]" />
      <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.6)]" />
    </div>
  );
}

/* ─── Floating Code Tiles (Premium Glass effect) ─── */
function FloatingTile({
  className, delay = 0, children
}: { className?: string; delay?: number; children: React.ReactNode; }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.8, type: "spring", bounce: 0.4 }}
      className={`absolute z-40 ${className}`}
    >
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
        className="p-4 rounded-[1.5rem] bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_15px_35px_rgba(0,0,0,0.08)] flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ─── Decorative Swooshes ─── */
function GoldSwooshes() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1400 900" fill="none">
        <motion.path
          d="M -100 800 Q 400 900, 700 450 T 1500 100"
          stroke="url(#grad-yellow)" strokeWidth="2" strokeOpacity="0.4" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M 1500 800 Q 1100 900, 800 450 T -100 100"
          stroke="url(#grad-blue)" strokeWidth="1.5" strokeOpacity="0.3" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3.5, delay: 0.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="grad-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0" />
            <stop offset="50%" stopColor="#eab308" stopOpacity="1" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── CAREER MIND MAP (PREMIUM HTML CUBES & SVG SPLINED LINES) ─── */
function CareerMindMap() {
  const topBranches = ['Tower Engineer', 'Product Designer', 'Cloud Designer', 'Cloud Engineer', 'Software Design'];
  const bottomBranches = ['Data Designer', 'Product Designer', 'Expert Designer', 'Cloud Engineer', 'Product Designer'];

  const topY = [8, 16, 24, 32, 40];
  const bottomY = [60, 68, 76, 84, 92];

  return (
    <div className="relative w-full h-full flex items-center justify-center">

      {/* ── SVG Connection Lines (Behind Nodes) ── */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Discover → Cloud Engineer (blue) */}
        <motion.path d="M 24 50 C 32 50, 32 32, 40 32" stroke="#93c5fd" strokeWidth="0.6" fill="none" opacity="0.7" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }} />
        {/* Discover → Product Designer (orange) */}
        <motion.path d="M 24 50 C 32 50, 32 68, 40 68" stroke="#fdba74" strokeWidth="0.6" fill="none" opacity="0.7" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }} />

        {/* Cloud Engineer → Top Leaves */}
        {topY.map((yPos, i) => (
          <motion.path key={`tl-${i}`}
            d={`M 47 32 C 55 32, 56 ${yPos}, 63 ${yPos}`}
            stroke="#93c5fd" strokeWidth="0.4" opacity="0.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 + i * 0.06 }}
          />
        ))}

        {/* Product Designer → Bottom Leaves */}
        {bottomY.map((yPos, i) => (
          <motion.path key={`bl-${i}`}
            d={`M 47 68 C 55 68, 56 ${yPos}, 63 ${yPos}`}
            stroke="#fdba74" strokeWidth="0.4" opacity="0.5" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.5 + i * 0.06 }}
          />
        ))}
      </svg>

      {/* ── Central Node (Discover) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
        className="absolute z-10 flex flex-col items-center"
        style={{ left: '7%', top: '44%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-[52px] h-[52px] rounded-[1.1rem] bg-gradient-to-br from-amber-100 to-amber-200 shadow-[0_8px_20px_rgba(251,146,60,0.25)] border-2 border-amber-300/40 flex items-center justify-center">
          <Compass size={26} className="text-amber-800" />
        </div>
        <span className="mt-1.5 text-[10px] font-black text-slate-800 tracking-tight italic">Your Journey</span>
      </motion.div>

      {/* ── Branch Node 1 (Cloud) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
        className="absolute z-10 flex flex-col items-center"
        style={{ left: '34%', top: '27%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-[44px] h-[44px] rounded-[1rem] bg-gradient-to-br from-blue-50 to-blue-100 shadow-[0_6px_16px_rgba(59,130,246,0.15)] border-2 border-blue-200/60 flex items-center justify-center">
          <Cloud size={22} className="text-blue-700" />
        </div>
        <span className="mt-1.5 text-[9px] font-black text-slate-800 tracking-tight">Cloud Engineer</span>
      </motion.div>

      {/* ── Branch Node 2 (Product) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
        className="absolute z-10 flex flex-col items-center"
        style={{ left: '33%', top: '63%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-[44px] h-[44px] rounded-[1rem] bg-gradient-to-br from-orange-50 to-orange-100 shadow-[0_6px_16px_rgba(249,115,22,0.15)] border-2 border-orange-200/60 flex items-center justify-center">
          <User size={22} className="text-orange-700" />
        </div>
        <span className="mt-1.5 text-[9px] font-black text-slate-800 tracking-tight">Product Designer</span>
      </motion.div>

      {/* ── Leaves (Top — Blue) ── */}
      <div className="absolute flex flex-col gap-[5px] z-10" style={{ left: '62%', top: '5%' }}>
        {topBranches.map((name, i) => (
          <motion.div key={`tl-pill-${i}`}
            initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }}
            className="py-[3px] px-3 rounded-full bg-blue-50 border border-blue-200/60 shadow-sm whitespace-nowrap"
          >
            <span className="text-[9px] font-bold text-slate-700">{name}</span>
          </motion.div>
        ))}
      </div>

      {/* ── Leaves (Bottom — Orange) ── */}
      <div className="absolute flex flex-col gap-[5px] z-10" style={{ left: '62%', top: '55%' }}>
        {bottomBranches.map((name, i) => (
          <motion.div key={`bl-pill-${i}`}
            initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.05 }}
            className="py-[3px] px-3 rounded-full bg-orange-50 border border-orange-200/60 shadow-sm whitespace-nowrap"
          >
            <span className="text-[9px] font-bold text-slate-700">{name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── RADAR CHART (SVG + HTML TEXT) ─── */
function SidePanelRadar() {
  const radarLabels = ["Technical Skills", "Soft\nSkills", "Domain\nKnowledge", "Domain Knowledge", "Domain\nKnowledge", "Soft\nSkills"];
  const numPoints = 6;
  const radius = 35;
  const center = 50;

  const generatePolygon = (r: number, offsetScale: number[] = []) => {
    return Array.from({ length: numPoints }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2; // Start from top
      const val = offsetScale[i] !== undefined ? offsetScale[i] : 1;
      const actR = r * val;
      return `${center + actR * Math.cos(angle)},${center + actR * Math.sin(angle)}`;
    }).join(' ');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative pt-2">
      <div className="w-full h-full relative aspect-square max-h-[180px]">
        {/* SVG Drawing */}
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible absolute inset-0 text-slate-300 pointer-events-none">
          {/* Web Lines (Concentric) */}
          {[1, 0.75, 0.5, 0.25].map(scale => (
            <polygon key={scale} points={generatePolygon(radius * scale)} fill="none" stroke="currentColor" strokeWidth="0.5" />
          ))}
          {/* Web Lines (Spokes) */}
          {Array.from({ length: numPoints }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
            return (
              <line key={i} x1={center} y1={center} x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} stroke="currentColor" strokeWidth="0.5" />
            );
          })}

          {/* Data Shapes */}
          {/* Current (Blue) */}
          <polygon
            points={generatePolygon(radius, [0.6, 0.7, 0.8, 0.4, 0.5, 0.6])}
            fill="rgba(59,130,246,0.15)" stroke="#3b82f6" strokeWidth="1.5" strokeLinejoin="round"
          />
          {/* Target (Orange) */}
          <polygon
            points={generatePolygon(radius, [0.8, 0.9, 0.6, 0.5, 0.9, 0.5])}
            fill="rgba(249,115,22,0.15)" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round"
          />
        </svg>

        {/* HTML Labels (Crisp Text) */}
        {radarLabels.map((label, i) => {
          const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
          const labelRadius = radius + 15; // Push labels out
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);

          let align = 'center';
          if (x < 45) align = 'end';
          if (x > 55) align = 'start';

          return (
            <div key={i}
              className="absolute flex flex-col items-center justify-center pointer-events-none"
              style={{
                left: `${x}%`, top: `${y}%`,
                transform: `translate(${align === 'end' ? '-100%' : align === 'start' ? '0' : '-50%'}, -50%)`,
                textAlign: align as any
              }}>
              {label.split('\n').map((line, j) => (
                <span key={j} className="text-[9px] font-black text-slate-800 leading-none whitespace-nowrap">{line}</span>
              ))}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-auto w-full justify-center pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 border border-blue-500/30" />
          <span className="text-[9px] font-black text-slate-700">Current Skills</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-400 border border-orange-500/30" />
          <span className="text-[9px] font-black text-slate-700">Target Role Requirements</span>
        </div>
      </div>
    </div>
  );
}

/* ─── TIMELINE (HTML/CSS GANTT WITH DASHED LINES) ─── */
function SidePanelTimeline() {
  const months = ['Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt'];

  return (
    <div className="flex flex-col h-full w-full">
      <h4 className="text-[12px] font-black text-slate-900 mb-4 px-2 tracking-tight">Timeline</h4>

      <div className="flex-1 relative w-full flex flex-col justify-between pb-6 px-4">
        {/* Background Vertical Guide Lines */}
        <div className="absolute inset-0 px-4 pointer-events-none flex justify-between h-[calc(100%-24px)] opacity-30 mt-1">
          {months.map((_, i) => (
            <div key={`guide-${i}`} className="w-px h-full border-r border-dashed border-slate-400 relative">
              {i === 2 && <div className="absolute left-0 top-1/2 -ml-1 text-[10px] text-slate-400"><Activity size={10} /></div>}
            </div>
          ))}
        </div>

        {/* Gantt Pills */}
        <div className="w-[30%] h-4 rounded-full bg-blue-300 ml-[5%] mb-2 shadow-sm border border-blue-400/20 relative z-10" />
        <div className="w-[20%] h-4 rounded-full bg-slate-300 ml-[15%] mb-2 shadow-sm border border-slate-400/20 relative z-10" />
        <div className="w-[25%] h-4 rounded-full bg-blue-200 ml-[25%] mb-2 shadow-sm border border-blue-300/20 relative z-10" />
        <div className="w-[30%] h-4 rounded-full bg-orange-300 py-[2px] px-1 ml-[55%] mb-2 shadow-sm border border-orange-400/20 flex items-center justify-end relative z-10" />
      </div>

      {/* Axis */}
      <div className="flex justify-between border-t border-slate-200 pt-2 px-4 mt-auto">
        {months.map((m, i) => (
          <span key={m} className="text-[9px] font-bold text-slate-500 w-8 text-center">{m}</span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════ */
/*                  HOME PAGE                     */
/* ══════════════════════════════════════════════ */
export default function Home() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      router.push('/explore');
    }
  }, [currentUser, loading, router]);

  if (loading || currentUser) return null;

  return (
    <BackgroundMeteors>
      <div className="relative min-h-screen overflow-x-hidden w-full">
        {/* Mesh Background - Sunset Horizon Warm Tones */}
        <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,126,95,0.05)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(254,180,123,0.04)_0%,transparent_50%),radial-gradient(circle_at_0%_50%,rgba(255,200,170,0.06)_0%,transparent_40%)]" />

        <Navbar />
        <GoldSwooshes />

        <main className="max-w-7xl mx-auto px-6 relative z-10">

          {/* ── HERO (TWO COLUMNS AGAIN) ── */}
          <section className="flex flex-col lg:flex-row items-center justify-center min-h-[95vh] pt-32 pb-20 gap-16 lg:gap-8">

            {/* LEFT: Text & CTA */}
          <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="mb-0 overflow-visible pb-12 w-full">
              <AnimatedTextGenerate
                text="Tentukan Karirmu!!"
                textClassName="font-montserrat font-[950] italic text-[clamp(3.5rem,7vw,6.5rem)] leading-[1.05] tracking-[tighter] bg-clip-text"
                blurEffect
                speed={1.5}
                highlightWords={["Karirmu!!"]}
                highlightClassName="bg-gradient-to-br from-[#FF6B35] via-[#E8963A] to-[#D45A3A] bg-clip-text text-transparent drop-shadow-[0_15px_30px_rgba(232,150,58,0.4)] pb-4 pr-4"
              />
            </div>

            <div className="max-w-lg mb-10 w-full">
              <AnimatedTextGenerate
                text="Masih bimbang memilih karir? Konsultasikan ke SkillPath AI secara gratis."
                textClassName="text-slate-600 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold leading-relaxed opacity-90"
                blurEffect
                speed={0.8}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center lg:items-start gap-8"
            >
              <Button
                onClick={() => (document.getElementById('onboarding-modal') as HTMLDialogElement)?.showModal()}
                className="glow-pill-primary font-black text-lg px-12 py-7 shadow-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,107,53,0.4)] hover:-translate-y-1"
              >
                Mulai Eksplorasi
                <ArrowRight size={20} className="ml-2" />
              </Button>

              {/* Social Proof */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/30 backdrop-blur-md border border-white/40">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-[3px] border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-[3px] border-white bg-amber-400 flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                    10K+
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-800 leading-tight">Terpercaya</span>
                  <span className="text-[10px] font-bold text-slate-500">Oleh 10K+ Pelajar</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: PREMIUM MASTER WINDOW */}
          <div className="w-full lg:w-7/12 relative mt-16 lg:mt-0 flex items-center justify-center h-auto min-h-[700px] lg:min-h-0 lg:h-[520px]">

            {/* Floating Assets outside the window */}
            <FloatingTile className="hidden lg:flex -top-8 left-[15%]" delay={1.2}>
              <div className="text-xl font-black text-slate-700 mx-2">&lt;/&gt;</div>
            </FloatingTile>

            <FloatingTile className="hidden lg:flex top-[10%] -right-4" delay={1.8}>
              <Cloud size={24} className="text-slate-800" strokeWidth={2.5} />
            </FloatingTile>

            <FloatingTile className="hidden lg:flex bottom-[25%] -left-6" delay={2.1}>
              <div className="text-lg font-black text-slate-700 mx-1">&lt;/&gt;</div>
            </FloatingTile>

            <FloatingTile className="hidden lg:flex -bottom-8 left-[50%]" delay={2.4}>
              <PenTool size={24} className="text-slate-800" strokeWidth={2.5} />
            </FloatingTile>

            {/* Main Window Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-[800px] h-full bg-white/60 backdrop-blur-2xl border-[1.5px] border-white/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] rounded-[2rem] overflow-hidden flex flex-col relative z-20"
            >
              <WindowHeader />

              {/* Internal Grid Layout */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-4 p-4 pt-4 lg:pt-12 h-full overflow-y-auto lg:overflow-hidden">

                {/* MindMap Panel */}
                <div className="bg-slate-50/60 rounded-3xl border border-white/60 relative overflow-hidden flex items-center justify-center shadow-inner min-h-[350px] lg:min-h-0">
                  <CareerMindMap />
                </div>

                {/* Right Stack (Radar + Timeline) */}
                <div className="flex flex-col gap-4 h-full min-h-[400px] lg:min-h-0">
                  <div className="flex-1 bg-slate-50/60 rounded-3xl border border-white/60 relative p-3 shadow-inner">
                    <SidePanelRadar />
                  </div>
                  <div className="h-[35%] min-h-[150px] lg:min-h-0 bg-slate-50/60 rounded-[1.5rem] border border-white/60 relative p-2 pt-3 shadow-inner">
                    <SidePanelTimeline />
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BENTO ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-20 pb-40">

          {/* Card 1: Chat Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group rounded-[2.5rem] p-10 bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg">
                <Bot size={28} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-xl tracking-tight">SkillPath AI</span>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 line-height-normal">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online
                </span>
              </div>
            </div>
            <div className="space-y-6 mb-10 overflow-hidden">
              <div className="bg-slate-100/80 p-6 rounded-3xl rounded-bl-none text-sm font-bold text-slate-700 leading-relaxed border border-white">
                Berdasarkan minatmu pada desain dan teknologi, peran UI Designer mungkin cocok untukmu. Apa pendapatmu?
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 rounded-3xl rounded-br-none text-sm font-bold text-white leading-relaxed shadow-xl text-right ml-auto max-w-[90%]">
                Terdengar menarik! Saya ingin tahu lebih banyak tentang keterampilan yang dibutuhkan.
              </div>
            </div>
            <div className="flex items-center gap-4 bg-slate-100/50 border border-slate-200/50 p-5 px-8 rounded-full">
              <span className="text-sm font-bold text-slate-400 flex-1">Tulis pesanmu...</span>
              <Send size={18} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
            </div>
          </motion.div>

          {/* Card 2: Phases */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-[2.5rem] p-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100"
          >
            <h3 className="font-black text-slate-900 text-xl mb-1 text-center">Target Role Requirements</h3>
            <p className="text-xs font-bold text-slate-400 text-center mb-10 uppercase tracking-widest">UI/UX Designer Track</p>

            <div className="space-y-8">
              {[
                { phase: 1, title: 'Foundational Skills', progress: 85, icon: <GraduationCap size={18} />, color: 'bg-amber-400' },
                { phase: 2, title: 'Specialized Training', progress: 45, icon: <LayoutList size={18} />, color: 'bg-indigo-500' },
                { phase: 3, title: 'Project Portfolio', progress: 20, icon: <FolderKanban size={18} />, color: 'bg-rose-400' },
                { phase: 4, title: 'Job Readiness', progress: 10, icon: <Target size={18} />, color: 'bg-emerald-500' },
              ].map((p) => (
                <div key={p.phase} className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl ${p.color}/10 flex items-center justify-center text-slate-600`}>
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2.5">
                      <span className="text-[13px] font-black text-slate-700">Phase {p.phase}: <span className="text-slate-500 font-bold">{p.title}</span></span>
                      <span className="text-[13px] font-black text-slate-800">{p.progress}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.progress}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full rounded-full ${p.color} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Typography Statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-[2.5rem] p-12 bg-slate-900 relative overflow-hidden flex flex-col justify-end min-h-[400px]"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none scale-150">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" strokeDasharray="2 4" />
                <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="1" />
                <path d="M50 0V100M0 50H100" stroke="white" strokeWidth="0.2" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>

            <h2 className="font-montserrat font-black text-[clamp(2.5rem,5vw,3rem)] text-white leading-[1.2] relative z-20">
              Lebih dari sekedar tes bakat. <br />
              <span className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent italic mt-2">Kami pemandu masa depanmu.</span>
            </h2>
          </motion.div>

        </section>

        {/* ── TESTIMONIALS ── */}
        <section>
          <HomeTestimonials />
        </section>

      </main>

      <dialog id="onboarding-modal" className="backdrop:bg-black/50 bg-transparent rounded-2xl sm:rounded-3xl outline-none border-none p-0 overflow-hidden shadow-2xl m-auto w-[calc(100vw-1rem)] max-w-[640px] sm:w-[640px] max-h-[calc(100dvh-1rem)]">
        <OnboardingModal />
      </dialog>

      </div>
    </BackgroundMeteors>
  );
}
