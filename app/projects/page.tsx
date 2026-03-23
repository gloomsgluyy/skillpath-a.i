'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
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

  const [projectTitle, setProjectTitle] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectSkills, setProjectSkills] = useState('');
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
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-xl mx-auto text-center py-20 px-4">
          <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-6">
            <FolderKanban size={32} className="text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Login Diperlukan</h2>
          <p className="text-gray-600 mb-8">Login untuk mengakses AI Projects Lab.</p>
          <button onClick={() => router.push('/')} className="btn-primary px-8 py-3">Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">AI Projects Lab</h1>
            <p className="text-gray-500 text-sm">Submit proyekmu dan dapatkan evaluasi dari AI Mentor</p>
          </div>
          <button onClick={() => { setShowSubmit(true); setEvalResult(null); }} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Submit Proyek Baru
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="w-12 h-12 rounded-lg bg-gray-200" />
                  <Skeleton className="w-16 h-8 rounded-full bg-gray-200" />
                </div>
                <Skeleton className="w-full h-1.5 rounded-full bg-gray-200 mt-2" />
                <Skeleton className="w-3/4 h-6 rounded bg-gray-200" />
                <div className="flex gap-2 mt-1">
                  <Skeleton className="w-16 h-4 rounded bg-gray-200" />
                  <Skeleton className="w-20 h-4 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-16 text-center">
            <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-6">
              <FolderKanban size={32} className="text-orange-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Belum Ada Proyek</h3>
            <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">Submit proyek pertamamu untuk mendapatkan evaluasi AI dan bangun portofoliomu!</p>
            <button onClick={() => setShowSubmit(true)} className="btn-primary px-8 py-3">
              Submit Proyek Pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.5) }}
                className="bg-white border border-gray-200 rounded-lg border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                    <FolderKanban size={20} className="text-orange-500" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                    <Star size={12} className="fill-current" />
                    <span className="text-sm font-bold">{project.score}</span>
                    <span className="text-[10px] font-medium">/100</span>
                  </div>
                </div>

                {/* Score bar */}
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: `${project.score}%` }} />
                </div>

                <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2">{project.title}</h3>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-600">{s}</span>
                  ))}
                </div>

                <p className="text-gray-500 text-xs line-clamp-2 mb-4 flex-1">{project.feedback}</p>

                {project.link && (
                  <div className="pt-3 border-t border-gray-200">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-700 text-xs font-medium hover:text-orange-500 transition-colors">
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
        <SheetContent className="w-full md:max-w-md bg-white border-l border-gray-200 shadow-xl p-0 flex flex-col sm:max-w-lg overflow-hidden">
          <div className="p-8 flex-1 overflow-y-auto">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-2xl font-bold text-gray-900">Submit Proyek</SheetTitle>
              <p className="text-gray-500 text-sm">AI akan mengevaluasi proyek dan memberikan feedback.</p>
            </SheetHeader>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Judul Proyek *</label>
                <input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} placeholder="Misal: E-Commerce Landing Page" className="input-clean w-full" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Link Proyek / Portofolio</label>
                <input value={projectLink} onChange={(e) => setProjectLink(e.target.value)} placeholder="Misal: Link GitHub, Figma, Google Drive..." className="input-clean w-full" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Skills (pisah koma)</label>
                <input value={projectSkills} onChange={(e) => setProjectSkills(e.target.value)} placeholder="React, Node.js, Firebase" className="input-clean w-full" />
              </div>
            </div>

            {evalResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="text-green-600" size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">Evaluasi Selesai!</span>
                    <div className="text-2xl font-bold text-gray-900">
                      Skor: <span className="text-orange-500">{evalResult.score}/100</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{evalResult.feedback}</p>
              </motion.div>
            )}
          </div>

          <div className="p-8 border-t border-gray-200 bg-white">
            <button onClick={handleSubmitProject} disabled={submitting || !projectTitle.trim()} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
              {submitting ? <><Loader2 size={16} className="animate-spin" /> AI Mengevaluasi...</> : '🤖 Submit & Evaluasi'}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
