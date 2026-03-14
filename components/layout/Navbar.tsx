'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Compass, Brain, LayoutList, BookOpen, FolderKanban, User } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Explore Careers', href: '/explore', icon: <Compass size={14} /> },
  { label: 'Discover Yourself', href: '/discover', icon: <Brain size={14} /> },
  { label: 'Skill Paths', href: '/paths', icon: <LayoutList size={14} /> },
  { label: 'Learning Journey', href: '/journey', icon: <BookOpen size={14} /> },
  { label: 'Projects', href: '/projects', icon: <FolderKanban size={14} /> },
  { label: 'Profile', href: '/profile', icon: <User size={14} /> },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2.5 rounded-full"
        style={{
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.7)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
            <path d="M14 3L6 22h3l5-12 5 12h3L14 3z" fill="#E8963A" />
            <path d="M9 22l5-12 5 12" fill="none" stroke="#8B2252" strokeWidth="1.5" />
          </svg>
          <span className="font-display font-extrabold text-lg text-foreground tracking-tight">
            SkillPath
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-foreground/70 hover:text-foreground rounded-full hover:bg-white/50 transition-all"
            >
              <span className="opacity-60">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link 
          href="/discover"
          className="shrink-0 px-5 py-2 rounded-full text-[13px] font-bold text-foreground border-2 border-foreground/80 hover:bg-foreground hover:text-white transition-all"
        >
          Mulai Navigasi
        </Link>
      </motion.div>
    </nav>
  );
}
