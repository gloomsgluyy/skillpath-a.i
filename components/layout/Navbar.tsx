'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Compass, Brain, LayoutList, BookOpen, FolderKanban, LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SkillPathLogo } from '@/components/brand/SkillPathLogo';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const NAV_LINKS = [
  { label: 'Explore Careers', href: '/explore', icon: <Compass size={14} /> },
  { label: 'Skill Paths', href: '/paths', icon: <LayoutList size={14} /> },
  { label: 'Learning Journey', href: '/journey', icon: <BookOpen size={14} /> },
  { label: 'Projects', href: '/projects', icon: <FolderKanban size={14} /> },
];

export function Navbar() {
  const { currentUser, logout } = useAuth();

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
          <SkillPathLogo />
        </Link>

        {/* Navigation Links - ONLY SHOW IF LOGGED IN */}
        {currentUser && (
          <>
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

            {/* Mobile Navigation */}
            <div className="xl:hidden flex items-center ml-2">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 text-slate-600 hover:text-amber-500 transition-colors" aria-label="Menu">
                    <Menu size={20} />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] border-l-white/40 bg-white/95 backdrop-blur-3xl pt-12">
                  <SheetTitle className="sr-only">Navigasi Utama</SheetTitle>
                  <SheetDescription className="sr-only">Menu navigasi aplikasi SkillPath</SheetDescription>
                  <div className="flex flex-col gap-4">
                    {NAV_LINKS.map(link => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 text-slate-700 hover:text-amber-600 font-bold transition-all"
                      >
                        <div className="text-amber-500">{link.icon}</div>
                        {link.label}
                      </Link>
                    ))}
                    <div className="h-px bg-slate-200/60 my-2" />
                    <Link href="/profile" onClick={() => (document.querySelector('[data-state="open"]') as HTMLElement)?.click()} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition-all">
                      <img src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}`} alt="Avatar" className="w-6 h-6 rounded-full border border-slate-200" />
                      <span>{currentUser.displayName || 'User Profile'}</span>
                    </Link>
                    <button onClick={() => {
                        const dialog = document.getElementById('onboarding-modal') as HTMLDialogElement;
                        if (dialog) dialog.showModal();
                        (document.querySelector('[data-state="open"]') as HTMLElement)?.click();
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 text-amber-600 font-bold transition-all text-left"
                    >
                      <Brain size={18} /> Personalisasi Ulang
                    </button>
                    <button onClick={() => { logout(); (document.querySelector('[data-state="open"]') as HTMLElement)?.click(); }} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 font-bold transition-all text-left">
                      <LogOut size={18} /> Keluar
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}

        {/* Authentication CTA */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
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
