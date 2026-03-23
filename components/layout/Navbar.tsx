'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Compass, Brain, LayoutList, BookOpen, FolderKanban, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { getAIRecommendation } from '@/lib/firestore';

const NAV_LINKS = [
  { label: 'Explore Careers', href: '/explore', icon: <Compass size={14} /> },
  { label: 'Discover Yourself', href: '/discover', icon: <Brain size={14} /> },
  { label: 'Skill Paths', href: '/paths', icon: <LayoutList size={14} /> },
  { label: 'Learning Journey', href: '/journey', icon: <BookOpen size={14} /> },
  { label: 'Projects', href: '/projects', icon: <FolderKanban size={14} /> },
];

export function Navbar() {
  const { currentUser, logout } = useAuth();
  const [targetCareer, setTargetCareer] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (currentUser?.uid) {
      getAIRecommendation(currentUser.uid)
        .then(rec => setTargetCareer(rec?.careerTitle || null))
        .catch(() => { });
    }
  }, [currentUser]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2 rounded-full"
        style={{
          background: 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.4)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="bg-transparent p-1 rounded-xl">
            <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
              <path d="M14 3L6 22h3l5-12 5 12h3L14 3z" fill="#E8963A" />
              <path d="M9 22l5-12 5 12" fill="none" stroke="#2D3748" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="font-display font-extrabold text-lg text-slate-800 tracking-tight">
            SkillPath
          </span>
        </Link>

        {/* Navigation Links - ONLY SHOW IF LOGGED IN */}
        {currentUser && (
          <div className="hidden xl:flex items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-bold text-slate-600 hover:text-slate-900 transition-all group"
              >
                <span className="text-slate-400 group-hover:text-amber-500 transition-colors">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Authentication CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  // Clear old data so fresh onboarding starts
                  localStorage.removeItem('skillpath_onboarding_data');
                  const dialog = document.getElementById('onboarding-modal') as HTMLDialogElement;
                  if (dialog) dialog.showModal();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-full border border-amber-200 transition-all"
                title="Personalisasi Ulang"
              >
                Personalisasi Ulang
              </button>
              <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 hover:bg-white/80 transition-all border border-slate-200 cursor-pointer">
                <img src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}`} alt="Avatar" className="w-6 h-6 rounded-full" />
                <span className="text-xs font-semibold text-slate-700 hidden sm:block">{currentUser.displayName || 'User'}</span>
              </Link>
              <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Keluar">
                <LogOut size={16} />
              </button>
            </div>
          ) : null}
        </div>
      </motion.div>
    </nav>
  );
}
