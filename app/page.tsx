'use client';

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { ArrowRight, Bot, Send, GraduationCap, LayoutList, FolderKanban, Target, Compass, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import HomeTestimonials from '@/components/sections/HomeTestimonials';
import OnboardingModal from '@/components/sections/OnboardingModal';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

/* ─── Feature Card ─── */
function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="card-elevated p-6 cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Stat Item ─── */
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-orange-500">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}

/* ─── Step Card ─── */
function StepCard({ step, title, description, delay }: { step: number; title: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="card-plain p-6 text-center"
    >
      <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-4">
        {step}
      </div>
      <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
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
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6">

        {/* ── HERO SECTION ── */}
        <section className="flex flex-col lg:flex-row items-center justify-between min-h-[85vh] pt-16 pb-20 gap-12">

          {/* LEFT: Text & CTA */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge-orange mb-6 inline-flex">
                <Sparkles size={14} />
                AI-Powered Career Guidance
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Tentukan{' '}
              <span className="text-orange-500">Karirmu</span>
              <br />
              Dengan AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 leading-relaxed max-w-lg mb-8"
            >
              Masih bimbang memilih karir? Konsultasikan ke SkillPath AI secara
              gratis. Dapatkan roadmap belajar yang presisi dan evaluasi portofolio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <button
                onClick={() => (document.getElementById('onboarding-modal') as HTMLDialogElement)?.showModal()}
                className="btn-primary flex items-center gap-2 text-lg px-8 py-3"
              >
                Mulai Eksplorasi
                <ArrowRight size={20} />
              </button>

              <a href="#features" className="btn-ghost flex items-center gap-2">
                Pelajari Lebih Lanjut
              </a>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 mt-10"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-white bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white">
                  10K+
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">Terpercaya</span>
                <span className="text-xs text-gray-500">Oleh 10K+ Pelajar</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="w-full lg:w-1/2 max-w-lg"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Chat Preview Header */}
              <div className="bg-gray-900 px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">SkillPath AI</h4>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Online
                  </span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg rounded-bl-none text-sm text-gray-700 leading-relaxed max-w-[85%]">
                  Berdasarkan minatmu pada desain dan teknologi, peran <strong>UI Designer</strong> mungkin cocok untukmu. Apa pendapatmu?
                </div>
                <div className="bg-orange-500 p-4 rounded-lg rounded-br-none text-sm text-white leading-relaxed ml-auto max-w-[85%]">
                  Terdengar menarik! Saya ingin tahu lebih banyak tentang keterampilan yang dibutuhkan.
                </div>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg rounded-bl-none text-sm text-gray-700 max-w-[85%]">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span className="font-medium">3 skill utama:</span>
                  </div>
                  <ul className="text-xs space-y-1 text-gray-600 ml-6">
                    <li>• Figma & UI Prototyping</li>
                    <li>• User Research</li>
                    <li>• Design Systems</li>
                  </ul>
                </div>
              </div>

              {/* Chat Input */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3">
                  <span className="text-sm text-gray-400 flex-1">Tulis pesanmu...</span>
                  <Send size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section className="py-12 border-t border-b border-gray-200/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="75+" label="Karir Tersedia" />
            <StatItem value="10K+" label="Pengguna Aktif" />
            <StatItem value="95%" label="Akurasi AI" />
            <StatItem value="24/7" label="AI Konsultan" />
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-blue mb-4 inline-flex">Fitur Utama</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Semua yang kamu butuhkan</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Platform lengkap berbasis AI untuk menemukan karir impian, membuat roadmap presisi, dan mengevaluasi skill-mu.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<Compass size={24} className="text-orange-500" />}
              title="Explore 75+ Karir"
              description="Database karir lengkap dengan deskripsi detail, skills yang dibutuhkan, range gaji, dan match score berdasarkan profilmu."
              delay={0}
            />
            <FeatureCard
              icon={<Bot size={24} className="text-orange-500" />}
              title="AI Career Consultant"
              description="Chat dengan AI yang sudah dilatih khusus untuk memberikan rekomendasi karir personal berdasarkan kepribadian dan minatmu."
              delay={0.1}
            />
            <FeatureCard
              icon={<LayoutList size={24} className="text-orange-500" />}
              title="Skill Path Roadmap"
              description="Dapatkan roadmap belajar step-by-step yang dipersonalisasi untuk karir targetmu, lengkap dengan estimasi waktu."
              delay={0.2}
            />
            <FeatureCard
              icon={<FolderKanban size={24} className="text-orange-500" />}
              title="Portfolio Evaluator"
              description="Submit proyekmu untuk dievaluasi oleh AI. Dapatkan skor, feedback detail, dan rekomendasi skill improvement."
              delay={0.3}
            />
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Cara Kerja</h2>
            <p className="text-gray-600">3 langkah mudah untuk menemukan karirmu</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              step={1}
              title="Isi Profil"
              description="Jawab quiz singkat 5 langkah tentang pendidikan, kepribadian, dan minatmu."
              delay={0}
            />
            <StepCard
              step={2}
              title="Dapatkan Rekomendasi"
              description="AI kami menganalisis profilmu dan merekomendasikan karir terbaik dengan match score."
              delay={0.1}
            />
            <StepCard
              step={3}
              title="Mulai Belajar"
              description="Ikuti roadmap belajar personal, selesaikan daily tasks, dan bangun portofolio."
              delay={0.2}
            />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Lebih dari sekedar tes bakat.{' '}
              <span className="text-orange-400">Kami pemandu masa depanmu.</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Mulai perjalanan karirmu sekarang. Gratis tanpa batas.
            </p>
            <button
              onClick={() => (document.getElementById('onboarding-modal') as HTMLDialogElement)?.showModal()}
              className="btn-primary text-lg px-10 py-3.5 inline-flex items-center gap-2"
            >
              Mulai Sekarang <ArrowRight size={20} />
            </button>
          </motion.div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-12">
          <HomeTestimonials />
        </section>

      </main>

      <dialog id="onboarding-modal" className="backdrop:bg-black/50 bg-transparent rounded-xl outline-none border-none p-0 overflow-hidden shadow-2xl m-auto w-[95vw] sm:w-[600px] max-w-[600px]">
        <OnboardingModal />
      </dialog>
    </div>
  );
}
