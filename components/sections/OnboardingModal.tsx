'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  ChevronRight, ArrowLeft, Palette, Code, Briefcase, Database,
  Sparkles, GraduationCap, Megaphone, Shield, Wrench, Lightbulb,
  User, Bot
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type OnboardingState = {
  step: number;
  pendidikan: string;
  archetype: string;
  roleInterests: string[];
  jurusan: string;
  minat: string;
  displayName: string;
  email: string;
  pass: string;
};

const ARCHETYPES = [
  { id: 'kreatif', title: 'Si Kreatif', desc: 'Desain & visual', icon: <Palette className="w-5 h-5" />, color: 'from-pink-500 to-rose-500' },
  { id: 'logis', title: 'Si Logis', desc: 'Coding & logika', icon: <Code className="w-5 h-5" />, color: 'from-sky-500 to-blue-600' },
  { id: 'pemimpin', title: 'Si Pemimpin', desc: 'Strategi & bisnis', icon: <Briefcase className="w-5 h-5" />, color: 'from-amber-500 to-orange-500' },
  { id: 'data', title: 'Si Penata Data', desc: 'Angka & pola data', icon: <Database className="w-5 h-5" />, color: 'from-emerald-500 to-teal-500' },
  { id: 'komunikator', title: 'Si Komunikator', desc: 'Negosiasi & influence', icon: <Megaphone className="w-5 h-5" />, color: 'from-violet-500 to-purple-600' },
  { id: 'protector', title: 'Si Pelindung', desc: 'Keamanan & sistem', icon: <Shield className="w-5 h-5" />, color: 'from-red-500 to-rose-600' },
  { id: 'builder', title: 'Si Builder', desc: 'Merakit & membangun', icon: <Wrench className="w-5 h-5" />, color: 'from-slate-600 to-slate-800' },
  { id: 'inovator', title: 'Si Inovator', desc: 'Ide baru & futuristik', icon: <Lightbulb className="w-5 h-5" />, color: 'from-yellow-400 to-amber-500' },
];

const ROLE_OPTIONS = [
  'UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'Full-Stack Developer',
  'Data Analyst', 'Data Scientist', 'AI/ML Engineer', 'Cloud Engineer',
  'Cyber Security', 'Mobile Developer', 'DevOps Engineer', 'Product Manager',
  'Game Developer', 'Digital Marketing', 'Video Editor', 'Content Creator',
];

export default function OnboardingModal() {
  const { signInWithEmail, currentUser } = useAuth();
  const router = useRouter();
  
  const [data, setData] = useState<OnboardingState>({
    step: 1,
    pendidikan: '',
    archetype: '',
    roleInterests: [],
    jurusan: '',
    minat: '',
    displayName: '',
    email: '',
    pass: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomRole, setShowCustomRole] = useState(false);
  const [customRoleInput, setCustomRoleInput] = useState('');

  const handleNext = (updates: Partial<OnboardingState>) => {
    setData((prev) => ({ ...prev, ...updates, step: prev.step + 1 }));
  };

  const handleBack = () => {
    setData((prev) => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  };

  const toggleRole = (role: string) => {
    setData((prev) => {
      const exists = prev.roleInterests.includes(role);
      return {
        ...prev,
        roleInterests: exists
          ? prev.roleInterests.filter(r => r !== role)
          : [...prev.roleInterests, role]
      };
    });
  };

  const closeModal = () => {
    const dialog = document.getElementById('onboarding-modal') as HTMLDialogElement;
    if (dialog) dialog.close();
    setTimeout(() => setData({ step: 1, pendidikan: '', archetype: '', roleInterests: [], jurusan: '', minat: '', displayName: '', email: '', pass: '' }), 300);
  };

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      localStorage.setItem('skillpath_onboarding_data', JSON.stringify({
        pendidikan: data.pendidikan,
        archetype: data.archetype,
        roleInterests: data.roleInterests,
        jurusan: data.jurusan,
        minat: data.minat,
        displayName: data.displayName,
      }));

      // If not logged in, login or register
      if (!currentUser) {
        await signInWithEmail(data.email, data.pass, data.displayName);
      }
      
      closeModal();
      router.push('/explore?showAiResult=true');
    } catch (error) {
      console.error("Login failed:", error);
      setIsSubmitting(false);
    }
  };

  const totalSteps = 5;

  return (
    <div className="bg-white/90 backdrop-blur-2xl rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-[0_32px_80px_-20px_rgba(0,0,0,0.15)] relative w-full max-h-[90vh] sm:max-h-[640px] flex flex-col border border-white/40">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-slate-100/50 relative z-10 bg-white/60 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {data.step > 1 && (
            <button onClick={handleBack} className="p-2 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50/50 transition-all shrink-0">
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/30 shrink-0">
            <Sparkles size={14} className="text-white fill-white" />
          </div>
          <h2 className="text-sm sm:text-base font-black text-slate-800 tracking-tight truncate">Personalisasi Karir</h2>
        </div>
        <button onClick={closeModal} className="text-slate-400 hover:text-slate-800 font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-slate-100/50 transition-all shrink-0">
          Lewati
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-slate-100/50 relative z-10 shrink-0">
        <motion.div 
          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
          initial={{ width: '0%' }}
          animate={{ width: `${(data.step / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "circOut" }}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-8 relative min-h-0">
        <AnimatePresence mode="wait">
          
          {/* ── STEP 1: PENDIDIKAN ── */}
          {data.step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-2">Langkah 1/{totalSteps}</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 leading-tight">Pendidikan Terakhir?</h3>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">Bantu AI memahami latar belakang akademismu.</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {['SMK', 'SMA', 'Kuliah'].map((edu) => (
                  <button
                    key={edu}
                    onClick={() => handleNext({ pendidikan: edu })}
                    className="group flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border-2 border-slate-100 hover:border-amber-400 hover:bg-amber-50/30 hover:shadow-lg hover:shadow-amber-400/10 transition-all duration-300 active:scale-95"
                  >
                    <div className="mb-2 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-50 group-hover:bg-amber-100 flex items-center justify-center text-slate-400 group-hover:text-amber-600 transition-colors">
                       <GraduationCap size={20} className="sm:hidden" />
                       <GraduationCap size={24} className="hidden sm:block" />
                    </div>
                    <span className="font-extrabold text-slate-700 text-sm sm:text-base group-hover:text-slate-900">{edu}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: ARCHETYPE ── */}
          {data.step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-2">Langkah 2/{totalSteps}</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 leading-tight">Siapa Dirimu dalam Tim?</h3>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">Pilih satu yang paling cocok.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 overflow-y-auto max-h-[55vh] sm:max-h-[380px] pr-1">
                {ARCHETYPES.map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => handleNext({ archetype: arch.title })}
                    className="group flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-slate-100 hover:border-amber-400 hover:bg-white hover:shadow-md transition-all text-left active:scale-[0.97]"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${arch.color} flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-110 transition-transform`}>
                       {arch.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-black text-slate-800 text-xs sm:text-sm leading-tight block">{arch.title}</span>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold mt-0.5">{arch.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: ROLE INTERESTS (MULTI-SELECT) ── */}
          {data.step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 flex flex-col"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-2">Langkah 3/{totalSteps}</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 leading-tight">Bidang yang Menarik?</h3>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">Pilih sebanyak yang kamu mau — bebas! 😉</p>
              </div>

              <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[45vh] sm:max-h-[260px] pr-1 pb-2">
                {ROLE_OPTIONS.map((role) => {
                  const selected = data.roleInterests.includes(role);
                  return (
                    <button
                      key={role}
                      onClick={() => toggleRole(role)}
                      className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all border-2 active:scale-95 ${
                        selected 
                          ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20' 
                          : 'bg-white text-slate-600 border-slate-100 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50/50'
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>

              {/* Custom Role "Lainnya" */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowCustomRole(!showCustomRole)}
                  className={`w-full px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all border-2 border-dashed active:scale-95 ${
                    showCustomRole
                      ? 'bg-amber-50 text-amber-700 border-amber-400'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  ✨ Lainnya — Ketik role impianmu sendiri
                </button>
                {showCustomRole && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customRoleInput}
                      onChange={(e) => setCustomRoleInput(e.target.value)}
                      placeholder="Misal: Blockchain Developer, AR Designer..."
                      className="flex-1 px-3 py-2 rounded-xl text-sm border-2 border-amber-200 focus:border-amber-400 focus:outline-none bg-white"
                    />
                    <button
                      onClick={() => {
                        if (customRoleInput.trim()) {
                          toggleRole(customRoleInput.trim());
                          setCustomRoleInput('');
                        }
                      }}
                      className="px-4 py-2 rounded-xl text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-all"
                    >
                      + Tambah
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-2 shrink-0">
                <Button 
                  onClick={() => handleNext({})} 
                  disabled={data.roleInterests.length === 0}
                  className="w-full py-5 sm:py-6 rounded-xl sm:rounded-2xl text-sm sm:text-base font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-[0_10px_25px_rgba(245,158,11,0.35)] text-white disabled:bg-slate-100 disabled:text-slate-300 disabled:from-slate-100 disabled:to-slate-100 transition-all"
                >
                  Lanjut ({data.roleInterests.length} dipilih)
                  <ChevronRight size={18} className="ml-1.5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: DETAILS ── */}
          {data.step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 flex flex-col"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-2">Langkah 4/{totalSteps}</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 leading-tight">Ceritakan Lebih Lanjut</h3>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">Detail agar AI bisa kasih saran yang jitu.</p>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">
                    {data.pendidikan === 'SMA' ? 'Penjurusan (MIPA/IPS/Bahasa)' : 
                     data.pendidikan === 'SMK' ? 'Jurusan SMK (RPL, TKJ, dll)' : 
                     'Program Studi Kuliah'}
                  </label>
                  <input 
                    type="text" 
                    value={data.jurusan}
                    onChange={(e) => setData(p => ({ ...p, jurusan: e.target.value }))}
                    placeholder="Misal: Rekayasa Perangkat Lunak"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-bold text-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">
                    Hal yang bikin kamu antusias
                  </label>
                  <textarea 
                    value={data.minat}
                    onChange={(e) => setData(p => ({ ...p, minat: e.target.value }))}
                    placeholder="Misal: Suka ngedit video, desain poster, atau coding proyek sendiri..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 outline-none transition-all resize-none font-bold text-slate-800 text-sm"
                  />
                </div>
              </div>

              <div className="pt-1 shrink-0">
                <Button 
                  onClick={() => handleNext({})} 
                  disabled={!data.jurusan || !data.minat}
                  className="w-full py-5 sm:py-6 rounded-xl sm:rounded-2xl text-sm sm:text-base font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-[0_10px_25px_rgba(245,158,11,0.35)] text-white disabled:bg-slate-100 disabled:text-slate-300 disabled:from-slate-100 disabled:to-slate-100 transition-all"
                >
                  Hampir Selesai!
                  <ChevronRight size={18} className="ml-1.5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 5: LOGIN + PROFILE ── */}
          {data.step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full text-center px-2"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 mb-5 flex items-center justify-center shadow-xl shadow-amber-500/40 relative">
                  <div className="absolute -top-1.5 -right-1.5 bg-white text-amber-500 p-1 rounded-lg shadow-md animate-bounce">
                    <Sparkles size={14} className="fill-amber-500" />
                  </div>
                  <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1.5 tracking-tight leading-tight">Satu Langkah Lagi!</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed mb-5 max-w-xs">
                Masukkan nama, email, dan password untuk membuat akun / login.
              </p>

              {/* Display Name Input */}
              <div className="w-full max-w-sm mb-4">
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <User size={18} />
                  </div>
                  <input 
                    type="text"
                    value={data.displayName}
                    onChange={(e) => setData(p => ({ ...p, displayName: e.target.value }))}
                    placeholder="Nama panggilanmu"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-bold text-slate-800 text-sm text-center mb-2"
                  />
                  <input 
                    type="email"
                    value={data.email}
                    onChange={(e) => setData(p => ({ ...p, email: e.target.value }))}
                    placeholder="Email (Testing)"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-bold text-slate-800 text-sm text-center mb-2"
                  />
                  <input 
                    type="password"
                    value={data.pass}
                    onChange={(e) => setData(p => ({ ...p, pass: e.target.value }))}
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 border-2 border-slate-100 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-bold text-slate-800 text-sm text-center"
                  />
                </div>
              </div>

              <Button 
                 onClick={handleLogin}
                 disabled={isSubmitting || !data.displayName.trim() || !data.email.trim() || !data.pass.trim()}
                 variant="outline"
                 className="w-full max-w-sm py-5 sm:py-6 rounded-xl sm:rounded-2xl text-sm sm:text-base font-black border-2 border-slate-100 hover:bg-white hover:border-amber-500 hover:shadow-xl transition-all flex items-center justify-center gap-3 bg-white disabled:opacity-50"
              >
                {isSubmitting ? (
                   <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-[3px] border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                      <span className="text-amber-600 text-sm">Memproses...</span>
                   </div>
                ) : (
                   <span className="text-slate-800 text-sm">Masuk / Daftar dengan Email</span>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
