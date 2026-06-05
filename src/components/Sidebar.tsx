"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  RotateCw, 
  BarChart3, 
  Settings as SettingsIcon, 
  Flame, 
  Menu, 
  X,
  GraduationCap
} from 'lucide-react';
import { StorageService } from '@/services/storage';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({ streak: 0, revisionPending: 0 });

  // Update stats on mount and navigation changes
  useEffect(() => {
    const updateStats = () => {
      const currentStats = StorageService.getStats();
      setStats({
        streak: currentStats.streak,
        revisionPending: currentStats.revisionPending
      });
    };
    updateStats();
    
    // Add event listener for storage updates to keep sidebar synced
    window.addEventListener('storage', updateStats);
    window.addEventListener('local-storage-update', updateStats);
    return () => {
      window.removeEventListener('storage', updateStats);
      window.removeEventListener('local-storage-update', updateStats);
    };
  }, [pathname]);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'DSA Bank', href: '/bank', icon: BookOpen },
    { name: 'Daily Plan', href: '/daily', icon: Calendar },
    { 
      name: 'Revision', 
      href: '/revision', 
      icon: RotateCw,
      badge: stats.revisionPending > 0 ? stats.revisionPending : undefined
    },
    { name: 'Topic Progress', href: '/progress', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="flex lg:hidden items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-violet-400" />
          <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            PrepTracker
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-amber-500/20">
            <Flame className="h-4 w-4 fill-amber-500" />
            <span>{stats.streak} Days</span>
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between transition-transform duration-300 transform
        lg:translate-x-0 lg:static lg:h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Logo / Header */}
          <div className="hidden lg:flex items-center gap-3 px-6 py-6 border-b border-slate-800">
            <div className="p-2 bg-violet-600/10 rounded-lg border border-violet-500/20">
              <GraduationCap className="h-6 w-6 text-violet-400" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide text-white leading-tight">PrepTracker</h1>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Placement Prep</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-6 space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium
                    ${isActive 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' 
                      : 'hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-violet-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`
                      px-2 py-0.5 rounded-full text-xs font-semibold
                      ${isActive ? 'bg-white text-violet-600' : 'bg-violet-600/20 text-violet-400 border border-violet-500/20'}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t border-slate-800">
          {/* Streak display in Desktop */}
          <div className="hidden lg:flex items-center justify-between p-3.5 bg-slate-950/50 border border-slate-800/80 rounded-xl mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-500">
                <Flame className="h-5 w-5 fill-amber-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400 leading-tight">Current Streak</p>
                <p className="text-sm font-bold text-white leading-tight mt-0.5">{stats.streak} Days Active</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold font-sans">
              DS
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-tight">Placement Aspirant</p>
              <p className="text-[10px] text-slate-400 leading-tight mt-0.5">SDE Preparation</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile drawer */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/55 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  );
}
