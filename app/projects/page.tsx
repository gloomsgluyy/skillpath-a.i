'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Plus, Sparkles, CheckCircle2, Star, ExternalLink, Loader2, FolderKanban } from 'lucide-react';
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

      saveProjectEvaluation(currentUser.uid, project).catch(console.warn);
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
      <div className="min-h-screen pt-24">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FolderKanban size={36} className="text-white" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-slate-900">Login Diperlukan</h2>
          <p className="text-slate-600 mb-8">Login untuk mengakses AI Projects Lab.</p>
          <Button onClick={() => router.push('/')} className="glow-pill-primary font-black px-8 py-3">Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Navbar />
      {/* Subtle mesh — matches landing page */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_70%_10%,rgba(255,126,95,0.06)_0%,transparent_50%),radial-gradient(circle_at_30%_90%,rgba(254,180,123,0.05)_0%,transparent_50%)]" />

      <main className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">AI Projects Lab</h1>
            <p className="text-slate-500 text-sm font-medium">Submit proyekmu dan dapatkan evaluasi dari AI Mentor</p>
          </div>
          <Button onClick={() => { setShowSubmit(true); setEvalResult(null); }} className="glow-pill-primary font-black text-sm px-6 py-3">
            <Plus size={16} className="mr-2" /> Submit Proyek Baru
          </Button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-32">
            <Loader2 size={48} className="text-amber-400 animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-[2.5rem] bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FolderKanban size={36} className="text-white" />
            </div>
            <h3 className="text-xl font-black mb-2 text-slate-900">Belum Ada Proyek</h3>
            <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">Submit proyek pertamamu untuk mendapatkan evaluasi AI dan bangun portofoliomu!</p>
            <Button onClick={() => setShowSubmit(true)} className="glow-pill-primary font-black px-8 py-3">
              Submit Proyek Pertama
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.5), ease: 'easeOut' }}
                className="rounded-[2rem] bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 group flex flex-col p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-black/5 group-hover:rotate-6 transition-transform duration-500 flex items-center justify-center">
                    <FolderKanban size={22} className="text-amber-600" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 border border-white/60">
                    <Star size={12} className="text-amber-500 fill-current" />
                    <span className="text-sm font-black text-slate-800">{project.score}</span>
                    <span className="text-slate-400 text-[10px] font-bold">/100</span>
                  </div>
                </div>

                {/* Score progress bar */}
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: `${project.score}%` }} />
                </div>

                <h3 className="font-black text-lg text-slate-900 leading-tight mb-2">{project.title}</h3>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.skills.map(s => (
                    <Badge key={s} variant="outline" className="text-[10px] font-bold text-slate-600 border-slate-200 bg-white/40 px-2 py-0.5">{s}</Badge>
                  ))}
                </div>

                <p className="text-slate-500 text-xs line-clamp-2 mb-4 flex-1">{project.feedback}</p>

                {project.link && (
                  <div className="pt-3 border-t border-slate-200/50">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-700 text-xs font-bold hover:text-amber-600 transition-colors">
                      <ExternalLink size={12} /> Lihat Proyek
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Submit Sheet */}
      <Sheet open={showSubmit} onOpenChange={setShowSubmit}>
        <SheetContent className="w-full md:max-w-md bg-white/95 backdrop-blur-3xl border-l-white/40 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] p-0 flex flex-col">
          <div className="p-8 flex-1 overflow-y-auto">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-2xl font-black text-slate-900 tracking-tight">Submit Proyek</SheetTitle>
              <p className="text-slate-500 text-sm font-medium">AI akan mengevaluasi proyek dan memberikan feedback.</p>
            </SheetHeader>

            <div className="space-y-6">
              <div>
                <label className="text-[13px] font-black text-slate-700 mb-2 block">Judul Proyek *</label>
                <input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} placeholder="Misal: E-Commerce Landing Page" className="w-full bg-white rounded-xl px-4 py-3.5 text-sm font-medium outline-none border border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all text-slate-900 shadow-sm" />
              </div>
              <div>
                <label className="text-[13px] font-black text-slate-700 mb-2 block">Link Proyek</label>
                <input value={projectLink} onChange={(e) => setProjectLink(e.target.value)} placeholder="https://github.com/..." className="w-full bg-white rounded-xl px-4 py-3.5 text-sm font-medium outline-none border border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all text-slate-900 shadow-sm" />
              </div>
              <div>
                <label className="text-[13px] font-black text-slate-700 mb-2 block">Skills (pisah koma)</label>
                <input value={projectSkills} onChange={(e) => setProjectSkills(e.target.value)} placeholder="React, Node.js, Firebase" className="w-full bg-white rounded-xl px-4 py-3.5 text-sm font-medium outline-none border border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all text-slate-900 shadow-sm" />
              </div>
            </div>

            {evalResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-[1.5rem] bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <span className="font-black text-slate-900">Evaluasi Selesai!</span>
                    <div className="text-2xl font-black text-slate-900">
                      Skor: <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">{evalResult.score}/100</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{evalResult.feedback}</p>
              </motion.div>
            )}
          </div>

          <div className="p-8 border-t border-slate-100 bg-white">
            <Button onClick={handleSubmitProject} disabled={submitting || !projectTitle.trim()} className="w-full h-14 glow-pill-primary font-black uppercase tracking-widest text-sm">
              {submitting ? <><Loader2 size={16} className="animate-spin mr-2" /> AI Mengevaluasi...</> : '🤖 Submit & Evaluasi'}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
