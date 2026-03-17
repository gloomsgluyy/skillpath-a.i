'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Plus, Sparkles, CheckCircle2, Star, ExternalLink, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserProjects, saveProjectEvaluation, getAIRecommendation, type ProjectEvaluation } from '@/lib/firestore';

export default function ProjectsPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [projects, setProjects] = useState<ProjectEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [career, setCareer] = useState('');

  // Form
  const [projectTitle, setProjectTitle] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectSkills, setProjectSkills] = useState('');

  // Evaluation result
  const [evalResult, setEvalResult] = useState<any>(null);

  useEffect(() => {
    async function load() {
      if (!currentUser?.uid) { setLoading(false); return; }
      const [userProjects, rec] = await Promise.all([
        getUserProjects(currentUser.uid),
        getAIRecommendation(currentUser.uid),
      ]);
      setProjects(userProjects);
      setCareer(rec?.careerTitle || '');
      setLoading(false);
    }
    load();
  }, [currentUser]);

  const handleSubmitProject = async () => {
    if (!currentUser?.uid || !projectTitle.trim()) return;
    setSubmitting(true);
    setEvalResult(null);

    try {
      const res = await fetch('/api/evaluate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: projectTitle,
          link: projectLink,
          skills: projectSkills.split(',').map(s => s.trim()).filter(Boolean),
          career,
        })
      });
      const data = await res.json();

      const project: Omit<ProjectEvaluation, 'submittedAt'> = {
        id: `proj-${Date.now()}`,
        title: projectTitle,
        link: projectLink,
        score: data.score || 75,
        skills: projectSkills.split(',').map(s => s.trim()).filter(Boolean),
        feedback: data.feedback || 'Proyek bagus! Terus tingkatkan.',
      };

      await saveProjectEvaluation(currentUser.uid, project);
      setProjects(prev => [...prev, { ...project, submittedAt: new Date() } as ProjectEvaluation]);
      setEvalResult(data);
      setProjectTitle('');
      setProjectLink('');
      setProjectSkills('');
    } catch (err) {
      console.error('Project eval error:', err);
    }
    setSubmitting(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-white pt-24">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <Sparkles size={48} className="text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl font-black mb-4">Login Diperlukan</h2>
          <p className="text-white/60 mb-8">Login untuk mengakses AI Projects Lab.</p>
          <Button onClick={() => router.push('/')} className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8">Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white pt-24 pb-12">
      <Navbar />
      <div className="fixed top-0 right-0 w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />

      <main className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black mb-1">🚀 AI Projects Lab</h1>
            <p className="text-white/50 text-sm font-medium">Submit proyekmu dan dapatkan evaluasi dari AI Mentor</p>
          </div>
          <Button onClick={() => { setShowSubmit(true); setEvalResult(null); }} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl px-6">
            <Plus size={16} className="mr-2" /> Submit Proyek Baru
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={48} className="text-amber-400 animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Sparkles size={40} className="text-amber-400" />
            </div>
            <h3 className="text-xl font-black mb-2">Belum Ada Proyek</h3>
            <p className="text-white/50 text-sm mb-6">Submit proyek pertamamu untuk mendapatkan evaluasi AI!</p>
            <Button onClick={() => setShowSubmit(true)} className="bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl px-6">
              Submit Proyek Pertama
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-amber-500/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-current" />
                    <span className="text-lg font-black text-amber-400">{project.score}</span>
                    <span className="text-white/30 text-xs">/100</span>
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-2">{project.title}</h3>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-white/10 rounded-md text-[10px] font-bold text-white/60">{s}</span>
                  ))}
                </div>

                <p className="text-white/50 text-xs line-clamp-3 mb-4">{project.feedback}</p>

                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-amber-400 text-xs font-bold hover:underline">
                    <ExternalLink size={12} /> Lihat Proyek
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Submit Sheet */}
      <Sheet open={showSubmit} onOpenChange={setShowSubmit}>
        <SheetContent className="w-full md:max-w-md bg-[#1a1f2e] border-l-white/10 text-white p-0 flex flex-col">
          <div className="p-8 flex-1 overflow-y-auto">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-2xl font-black text-white">Submit Proyek</SheetTitle>
              <p className="text-white/50 text-sm">AI akan mengevaluasi proyek dan memberikan feedback.</p>
            </SheetHeader>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 block">Judul Proyek *</label>
                <input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} placeholder="Misal: E-Commerce Landing Page" className="w-full bg-white/10 rounded-xl px-4 py-3 text-sm outline-none border border-white/10 focus:border-amber-500/50" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 block">Link Proyek</label>
                <input value={projectLink} onChange={(e) => setProjectLink(e.target.value)} placeholder="https://github.com/..." className="w-full bg-white/10 rounded-xl px-4 py-3 text-sm outline-none border border-white/10 focus:border-amber-500/50" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 block">Skills (pisah koma)</label>
                <input value={projectSkills} onChange={(e) => setProjectSkills(e.target.value)} placeholder="React, Node.js, Firebase" className="w-full bg-white/10 rounded-xl px-4 py-3 text-sm outline-none border border-white/10 focus:border-amber-500/50" />
              </div>
            </div>

            {evalResult && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="text-emerald-400" size={20} />
                  <span className="font-bold text-emerald-300">Evaluasi Selesai!</span>
                </div>
                <div className="text-3xl font-black text-amber-400 mb-2">Skor: {evalResult.score}/100</div>
                <p className="text-white/70 text-sm">{evalResult.feedback}</p>
              </motion.div>
            )}
          </div>

          <div className="p-8 border-t border-white/10">
            <Button onClick={handleSubmitProject} disabled={submitting || !projectTitle.trim()} className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black rounded-xl uppercase tracking-widest">
              {submitting ? <><Loader2 size={16} className="animate-spin mr-2" /> AI Mengevaluasi...</> : '🤖 Submit & Evaluasi'}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
