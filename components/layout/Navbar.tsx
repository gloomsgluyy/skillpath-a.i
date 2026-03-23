'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Brain, LayoutList, BookOpen, FolderKanban, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getAIRecommendation } from '@/lib/firestore';

const NAV_LINKS = [
  { label: 'Explore Careers', href: '/explore', icon: Compass },
  { label: 'Discover Yourself', href: '/discover', icon: Brain },
  { label: 'Skill Paths', href: '/paths', icon: LayoutList },
  { label: 'Learning Journey', href: '/journey', icon: BookOpen },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
];

export function Navbar() {
  const { currentUser, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 h-16 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none">
              <path d="M10 2L4 18h3l3-8 3 8h3L10 2z" fill="white" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-900">SkillPath</span>
        </Link>

        {/* Desktop Navigation Links */}
        {currentUser && (
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                    transition-colors duration-200
                    ${isActive
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon size={16} className={isActive ? 'text-orange-500' : 'text-gray-400'} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <>
              {/* Re-personalize button */}
              <button
                onClick={() => {
                  localStorage.removeItem('skillpath_onboarding_data');
                  const dialog = document.getElementById('onboarding-modal') as HTMLDialogElement;
                  if (dialog) dialog.showModal();
                }}
                className="hidden sm:block px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50 border border-orange-200 rounded-lg transition-colors"
              >
                Personalisasi Ulang
              </button>

              {/* User Avatar */}
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}&background=F97316&color=fff`}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-orange-200"
                />
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {currentUser.displayName || 'User'}
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Keluar"
              >
                <LogOut size={18} />
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </>
          ) : null}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && currentUser && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                    transition-colors duration-200
                    ${isActive
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon size={18} className={isActive ? 'text-orange-500' : 'text-gray-400'} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
