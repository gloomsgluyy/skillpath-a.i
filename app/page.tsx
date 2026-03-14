'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Send, GraduationCap, Laptop, Briefcase, Target, Compass, Cloud, User, PenTool, Bot } from 'lucide-react';
import { AnimatedTextGenerate } from "@/components/ui/animated-textgenerate";
import BackgroundMeteors from '@/components/ui/backgroundmeteors';
import { MorphyButton } from "@/components/ui/morphy-button";

/* ─── Traffic Light Window Header ─── */
function WindowHeader() {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '16px 24px', position: 'absolute', top: 0, left: 0, zIndex: 30 }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56', boxShadow: '0 0 4px rgba(255,95,86,0.3)' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', boxShadow: '0 0 4px rgba(255,189,46,0.3)' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f', boxShadow: '0 0 4px rgba(39,201,63,0.3)' }} />
    </div>
  );
}

/* ─── Floating Code Tile  ─── */
function CodeBracket({ className, delay = 0, color = '#d97706' }: { className?: string; delay?: number; color?: string; }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      style={{ position: 'absolute', zIndex: 40 }}
      className={className}
    >
      <motion.div 
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
        style={{
          padding: '12px 18px',
          borderRadius: 20,
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ color, fontFamily: 'monospace', fontWeight: 900, fontSize: 24, letterSpacing: '-1px' }}>&lt;/&gt;</span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Decorative gold swoosh lines (SVG) ─── */
function GoldSwooshes() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} viewBox="0 0 1400 900" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="gold1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-50 200 Q200 60 500 180 T1000 100 T1450 200"
        stroke="url(#gold1)" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
      />
      <motion.path
        d="M1450 350 Q1100 250 800 350 T200 280 T-50 400"
        stroke="url(#gold1)" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1 }}
      />
    </svg>
  );
}

/* ─── EXACT 1:1 CAREER MIND MAP ─── */
function CareerMindMap() {
  const topBranches = ['Tower Engineer', 'Product Designer', 'Cloud Engineer', 'Cloud Engineer', 'Datar Engineer'];
  const bottomBranches = ['Graphic Designer', 'Product Designer', 'Social Engineer', 'Cloud Engineer', 'Product Designer'];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      
      {/* ── Custom SVG Curves ── */}
      <svg viewBox="0 0 450 450" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        {/* Discover -> Cloud (Blue) */}
        <path d="M 80 225 C 110 225, 110 140, 135 140" stroke="#93c5fd" strokeWidth="2" fill="none" opacity="0.6" />
        {/* Discover -> Product (Orange) */}
        <path d="M 80 225 C 110 225, 110 310, 135 310" stroke="#fbd38d" strokeWidth="2" fill="none" opacity="0.6" />

        {/* Cloud -> Sub-branches (Blue) */}
        {topBranches.map((_, i) => (
          <path key={`t-${i}`} d={`M 185 140 C 210 140, 210 ${60 + i * 36}, 240 ${60 + i * 36}`} stroke="#93c5fd" strokeWidth="1.2" fill="none" opacity="0.4" />
        ))}
        {/* Product -> Sub-branches (Orange) */}
        {bottomBranches.map((_, i) => (
          <path key={`b-${i}`} d={`M 185 310 C 210 310, 210 ${250 + i * 36}, 240 ${250 + i * 36}`} stroke="#fbd38d" strokeWidth="1.2" fill="none" opacity="0.4" />
        ))}
      </svg>

      {/* ── Central Node (Discover Yourself) ── */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
        style={{ position: 'absolute', top: 225, left: 50, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
      >
        <div style={{ width: 64, height: 64, borderRadius: 24, background: '#fff', border: '2px solid rgba(217,119,6,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 36px rgba(0,0,0,0.08)', marginBottom: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', border: '2.5px solid #d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Compass size={24} color="#d97706" />
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 900, color: '#111', whiteSpace: 'nowrap' }}>Discover Yourself</div>
      </motion.div>

      {/* ── Top Intermediate Node (Cloud) ── */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
        style={{ position: 'absolute', top: 140, left: 160, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
      >
        <div style={{ width: 56, height: 56, borderRadius: 20, background: '#fff', border: '2px solid rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', marginBottom: 8 }}>
          <Cloud size={26} color="#3b82f6" />
        </div>
        <div style={{ fontSize: 10, fontWeight: 900, color: '#111' }}>Cloud Engineer</div>
      </motion.div>

      {/* ── Bottom Intermediate Node (Product) ── */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
        style={{ position: 'absolute', top: 310, left: 160, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
      >
        <div style={{ width: 56, height: 56, borderRadius: 20, background: '#fff', border: '2px solid rgba(234,88,12,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', marginBottom: 8 }}>
          <User size={26} color="#ea580c" />
        </div>
        <div style={{ fontSize: 10, fontWeight: 900, color: '#111' }}>Product Designer</div>
      </motion.div>

      {/* ── End Nodes (Top List) ── */}
      {topBranches.map((name, i) => (
        <motion.div key={`top-bot-${i}`} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.05 }}
          style={{ position: 'absolute', top: 60 + i * 36, left: 240, transform: 'translateY(-50%)', padding: '6px 14px', borderRadius: 100, background: '#e2e8f0', fontSize: 9.5, fontWeight: 700, color: '#334155', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', zIndex: 5 }}
        >
          {name}
        </motion.div>
      ))}

      {/* ── End Nodes (Bottom List) ── */}
      {bottomBranches.map((name, i) => (
        <motion.div key={`bot-bot-${i}`} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.05 }}
          style={{ position: 'absolute', top: 250 + i * 36, left: 240, transform: 'translateY(-50%)', padding: '6px 14px', borderRadius: 100, background: '#e2e8f0', fontSize: 9.5, fontWeight: 700, color: '#334155', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', zIndex: 5 }}
        >
          {name}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── EXACT 1:1 SIDE PANEL (Radar & Timeline) ─── */
function SidePanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 20, paddingRight: 20 }}>
      
      {/* ── RADAR CHART CARD ── */}
      <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}
        style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 28, padding: '24px 20px', flex: 1.4, display: 'flex', flexDirection: 'column', boxShadow: '0 8px 32px rgba(0,0,0,0.02)', position: 'relative' }}
      >
        <div style={{ fontSize: 13, fontWeight: 900, color: '#111', textAlign: 'center', marginBottom: 10 }}>Technical Skills</div>
        
        {/* Hexagon Area */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <svg viewBox="0 0 100 100" style={{ width: '90%', height: '90%', overflow: 'visible' }}>
            {/* Hexagon Grids */}
            {[100, 75, 50, 25].map(size => {
              const r = size * 0.4;
              const points = Array.from({length: 6}).map((_, i) => {
                const angle = (Math.PI / 3) * i - Math.PI / 2;
                return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
              }).join(' ');
              return <polygon key={size} points={points} fill="none" stroke="#e2e8f0" strokeWidth="0.5" />;
            })}
            
            {/* Axis Lines */}
            {Array.from({length: 3}).map((_, i) => {
              const angle = (Math.PI / 3) * i - Math.PI / 2;
              return <line key={i} x1={50 + 40 * Math.cos(angle)} y1={50 + 40 * Math.sin(angle)} x2={50 - 40 * Math.cos(angle)} y2={50 - 40 * Math.sin(angle)} stroke="#e2e8f0" strokeWidth="0.5" />;
            })}

            {/* Target Polygon (Orange Dashed) */}
            <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
            
            {/* Current Polygon (Blue Solid Fill) */}
            <polygon points="50,22 72,40 72,60 50,75 28,60 28,40" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" strokeWidth="1.5" />

            {/* Labels in SVG for perfect positioning */}
            <text x="50" y="8" fontSize="4.5" fontWeight="800" fill="#94a3b8" textAnchor="middle">Soft Skills</text>
            <text x="86" y="28" fontSize="4.5" fontWeight="800" fill="#94a3b8" textAnchor="start">Soft Skills</text>
            <text x="86" y="74" fontSize="4.5" fontWeight="800" fill="#94a3b8" textAnchor="start">Domain Knowledge</text>
            <text x="50" y="94" fontSize="4.5" fontWeight="800" fill="#94a3b8" textAnchor="middle">Domain Knowledge</text>
            <text x="14" y="74" fontSize="4.5" fontWeight="800" fill="#94a3b8" textAnchor="end">Domain Knowledge</text>
            <text x="14" y="28" fontSize="4.5" fontWeight="800" fill="#94a3b8" textAnchor="end">Soft Skills</text>
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#3b82f6' }} />
            <span style={{ fontSize: 10, color: '#475569', fontWeight: 800 }}>Current Skills</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ fontSize: 10, color: '#475569', fontWeight: 800 }}>Target Role Requirements</span>
          </div>
        </div>
        
        {/* Floating Cloud over Radar */}
        <motion.div animate={{ rotate: [0, 5, 0], y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity }} style={{ position: 'absolute', top: -10, right: -15, background: 'rgba(255,255,255,0.8)', padding: 12, borderRadius: 20, border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          <Cloud size={28} color="#64748b" />
        </motion.div>
      </motion.div>

      {/* ── TIMELINE CARD ── */}
      <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}
        style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 28, padding: '24px', flex: 0.8, boxShadow: '0 8px 32px rgba(0,0,0,0.02)', position: 'relative' }}
      >
        <div style={{ fontSize: 13, fontWeight: 900, color: '#111', marginBottom: 20 }}>Timeline</div>
        
        {/* Bars Container */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 10 }}>
          {/* Sequence Arrows (SVG) */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
              </marker>
            </defs>
            {/* Arrow from Bar 1 to Bar 2 */}
            <path d="M 45% 5 C 50% 5, 50% 15, 25% 15" stroke="#60a5fa" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
            {/* Arrow from Bar 2 to Bar 3 */}
            <path d="M 65% 25 C 70% 25, 70% 35, 60% 35" stroke="#60a5fa" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          </svg>

          {/* Vertical dashed marker */}
          <div style={{ position: 'absolute', top: 0, bottom: -10, left: '50%', borderLeft: '1.5px dashed #cbd5e1' }} />

          {/* Bar 1 */}
          <div style={{ height: 10, borderRadius: 10, width: '45%', background: 'linear-gradient(90deg, #f59e0b, #60a5fa)', zIndex: 1 }} />
          {/* Bar 2 */}
          <div style={{ height: 10, borderRadius: 10, width: '40%', background: 'linear-gradient(90deg, #f59e0b, #60a5fa)', left: '25%', position: 'relative', zIndex: 1 }} />
          {/* Bar 3 */}
          <div style={{ height: 10, borderRadius: 10, width: '30%', background: 'linear-gradient(90deg, #f59e0b, #60a5fa)', left: '60%', position: 'relative', zIndex: 1 }} />
        </div>

        {/* Month Labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, padding: '0 5px' }}>
          {['Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt'].map(m => (
            <span key={m} style={{ fontSize: 10, color: '#94a3b8', fontWeight: 800 }}>{m}</span>
          ))}
        </div>

        {/* Floating Bracket over Timeline */}
        <CodeBracket className="right-[-30px] bottom-[-20px]" delay={0.8} />
      </motion.div>

    </div>
  );
}

/* ══════════════════════════════════════════════ */
/*                  HOME PAGE                     */
/* ══════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50/50">
      <div className="fixed inset-0 z-[-1]">
        <BackgroundMeteors />
      </div>

      {/* Decorative Blur Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-amber-50/60 rounded-full blur-[120px] pointer-events-none z-[-1]" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none z-[-1]" />

      <Navbar />
      <GoldSwooshes />

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 10 }}>

        {/* ── HERO ── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: 50, alignItems: 'center', minHeight: '85vh', paddingTop: 100 }}>

          {/* LEFT: Text & CTA */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-block' }}>
              <AnimatedTextGenerate
                text="Tentukan Karirmu!!"
                className="mb-6"
                textClassName="font-montserrat font-[900] italic text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.9] tracking-tighter bg-clip-text"
                blurEffect
                speed={1.5}
                highlightWords={["Karirmu!!"]}
                highlightClassName="bg-gradient-to-br from-[#FF6B35] via-[#E8963A] to-[#D45A3A] bg-clip-text text-transparent"
              />
            </div>

            <div style={{ maxWidth: 440, marginBottom: 40 }}>
              <AnimatedTextGenerate
                text="Masih bimbang memilih karir? Konsultasikan ke SkillPath AI secara gratis."
                textClassName="text-slate-500 text-xl font-medium leading-relaxed"
                blurEffect
                speed={0.8}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/explore">
                <MorphyButton 
                  className="bg-gradient-to-br from-[#E85D3A] to-[#C73E5A] text-white font-black text-lg px-12 py-7 rounded-full shadow-[0_16px_40px_rgba(200,60,80,0.25)] hover:scale-105 transition-transform"
                >
                  Mulai Eksplorasi
                </MorphyButton>
              </Link>
            </motion.div>

            {/* Laptop floating item */}
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: -50, left: -40, background: '#fff', padding: 16, borderRadius: 24, boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}
            >
              <Laptop size={36} className="text-slate-300" />
            </motion.div>
            
            <CodeBracket className="bottom-[-80px] left-[-20px]" delay={1} />
          </div>

          {/* RIGHT: MASTER WINDOW */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0' }}>
            
            <CodeBracket className="top-[-20px] left-[15%]" delay={0.4} />

            {/* MAIN GLASS WINDOW CONTAINER */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: 540,
              borderRadius: 40,
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(40px)',
              border: '1.5px solid rgba(255,255,255,0.8)',
              boxShadow: '0 30px 60px -15px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10,
              overflow: 'hidden'
            }}>
              <WindowHeader />
              
              <div style={{ flex: 1, display: 'flex', paddingTop: 60, overflow: 'visible' }}>
                {/* 60% Left -> Mind Map */}
                <div style={{ flex: 1.4, position: 'relative' }}>
                  <CareerMindMap />
                </div>
                
                {/* 40% Right -> Dashboard */}
                <div style={{ flex: 1, borderLeft: '1px solid rgba(0,0,0,0.06)', padding: '0 0 20px 20px' }}>
                  <SidePanel />
                </div>
              </div>
            </div>

            {/* Floating Pen */}
            <motion.div animate={{ rotate: [-8, 8, -8], y: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', bottom: -30, left: '35%', background: 'rgba(255,255,255,0.8)', padding: 16, borderRadius: 24, border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)', boxShadow: '0 12px 32px rgba(0,0,0,0.06)', zIndex: 20 }}
            >
              <PenTool size={32} className="text-amber-500" style={{ transform: 'rotate(45deg)' }} />
            </motion.div>
          </div>
        </section>

        {/* ── BENTO ── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30, marginTop: 100, paddingBottom: 100 }}>
          
          {/* Card 1: Chat Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ borderRadius: 36, padding: 32, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <Bot size={24} className="text-slate-500" />
               </div>
               <span className="font-extrabold text-slate-900 text-lg">SkillPath Assistant</span>
            </div>
            <div className="space-y-4 mb-8">
              <div className="bg-slate-50 p-5 rounded-2xl rounded-bl-none text-sm text-slate-600 leading-relaxed border border-slate-100">
                 Berdasarkan analisis bakatmu, kamu memiliki potensi besar di bidang Pengembangan Cloud...
              </div>
              <div className="bg-amber-50/50 p-5 rounded-2xl rounded-br-none text-sm text-slate-600 leading-relaxed border border-amber-100/50 text-right ml-auto max-w-[85%]">
                 Wah menarik! Apa saja yang perlu saya pelajari?
              </div>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 px-6 rounded-full">
               <span className="text-sm font-semibold text-slate-400 flex-1">Tulis pesanmu...</span>
               <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center"><Send size={14} className="text-slate-500" /></div>
            </div>
          </motion.div>

          {/* Card 2: Radar Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ borderRadius: 36, padding: 32, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}
          >
             <div className="flex gap-6 h-full">
               <div className="flex-1 flex flex-col items-center justify-center">
                  <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-6">Technical Match</span>
                  <svg viewBox="0 0 100 100" className="w-[85%]">
                     <polygon points="50,10 90,35 78,85 22,85 10,35" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                     <polygon points="50,20 80,40 70,80 30,80 20,40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                     <polygon points="50,25 75,45 68,75 32,75 25,45" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="2" />
                  </svg>
               </div>
               <div className="flex-1 space-y-5 pt-10">
                  {[
                    { l: 'Bakat AI', v: 88, c: 'bg-amber-500' },
                    { l: 'Soft Skills', v: 62, c: 'bg-blue-500' },
                    { l: 'Logical', v: 45, c: 'bg-indigo-500' }
                  ].map(p => (
                    <div key={p.l}>
                      <div className="flex justify-between text-[11px] font-black text-slate-500 mb-2 uppercase tracking-wide">
                        <span>{p.l}</span>
                        <span>{p.v}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.v}%` }} className={`h-full rounded-full ${p.c}`} />
                      </div>
                    </div>
                  ))}
               </div>
             </div>
          </motion.div>

          {/* Card 3: Philosophy Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ borderRadius: 36, padding: 48, background: 'linear-gradient(135deg, #fefce8 0%, #ffffff 100%)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 32px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}
          >
            <h2 className="font-montserrat font-black text-[2rem] text-slate-900 leading-[1.2] relative z-20">
              Lebih dari sekedar tes bakat. Kami pemandu masa depanmu.
            </h2>
            <div className="absolute bottom-[-80px] right-[-80px] w-64 h-64 bg-amber-200/30 rounded-full blur-[50px] z-10" />
            <Compass className="absolute top-10 right-10 text-amber-100 rotate-12" size={80} />
          </motion.div>

        </section>
      </main>
    </div>
  );
}
