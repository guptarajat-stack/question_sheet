"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Flame, 
  RotateCw, 
  CheckCircle2, 
  ListTodo, 
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  CalendarCheck
} from 'lucide-react';
import { StorageService } from '@/services/storage';
import { DashboardStats } from '@/types';
import DashboardChart from '@/components/DashboardChart';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalQuestions: 0,
    completedQuestions: 0,
    remainingQuestions: 0,
    masteryRate: 0,
    streak: 0,
    revisionPending: 0,
    dailyGoalProgress: 0,
    dailyGoalTarget: 10
  });

  useEffect(() => {
    setStats(StorageService.getStats());

    // Event listener for real-time updates
    const handleUpdate = () => {
      setStats(StorageService.getStats());
    };
    window.addEventListener('local-storage-update', handleUpdate);
    return () => window.removeEventListener('local-storage-update', handleUpdate);
  }, []);

  const completionPercentage = stats.totalQuestions > 0 
    ? Math.round((stats.completedQuestions / stats.totalQuestions) * 100) 
    : 0;

  const kpis = [
    {
      title: "Total Solved",
      value: `${stats.completedQuestions}/${stats.totalQuestions}`,
      subtitle: `${completionPercentage}% Completed`,
      icon: CheckCircle2,
      color: "text-emerald-400 border-emerald-500/10 bg-emerald-500/5",
      badge: `${stats.remainingQuestions} Left`
    },
    {
      title: "Daily Goal (Reset 5AM)",
      value: `${stats.dailyGoalProgress}/${stats.dailyGoalTarget}`,
      subtitle: stats.dailyGoalProgress >= stats.dailyGoalTarget ? "Goal Achieved! 🎉" : "Target: 10 Questions",
      icon: CalendarCheck,
      color: "text-violet-400 border-violet-500/10 bg-violet-500/5",
      badge: `${Math.max(0, stats.dailyGoalTarget - stats.dailyGoalProgress)} More`
    },
    {
      title: "Daily Streak",
      value: `${stats.streak} Days`,
      subtitle: stats.streak > 0 ? "Keep it up! 🔥" : "Solve a problem to start",
      icon: Flame,
      color: "text-amber-500 border-amber-500/10 bg-amber-500/5",
      badge: "Active"
    },
    {
      title: "Pending Revision",
      value: `${stats.revisionPending}`,
      subtitle: stats.revisionPending > 0 ? "Spaced repetition due" : "No pending tasks",
      icon: RotateCw,
      color: "text-blue-400 border-blue-500/10 bg-blue-500/5",
      badge: stats.revisionPending > 0 ? "High Priority" : "Clean"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Hero banner */}
      <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950/20 via-slate-900/40 to-slate-900/60 p-6 sm:p-8">
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            <BrainCircuit className="h-3.5 w-3.5" />
            Placement Preparation Mode
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mt-2">
            Target SDE: Master Your DSA Concepts
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Track problem sheets, log completions, and leverage automated spaced repetition (+3, +7, +21 days) to solidify patterns before coding rounds.
          </p>
        </div>
        
        {/* Glow decorative circles */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 -mb-20 h-48 w-48 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={index} 
              className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/20 backdrop-blur-md flex flex-col justify-between hover:border-slate-700/60 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{kpi.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {kpi.badge}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4 mb-2">
                <div className={`p-2.5 rounded-xl border ${kpi.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white tracking-tight">{kpi.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">{kpi.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <DashboardChart />

      {/* Action Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revision Widget */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <RotateCw className="h-5 w-5 text-violet-400" />
              Spaced Repetition Queue
            </h3>
            <p className="text-xs text-slate-400">
              Revise solved questions at intervals (+3d, +7d, +21d) to build long-term memory.
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                {stats.revisionPending} Questions Due Today
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {stats.revisionPending > 0 ? "Revise now to maintain mastery" : "All revisions up to date!"}
              </p>
            </div>
            {stats.revisionPending > 0 && (
              <Link 
                href="/revision"
                className="flex items-center justify-center p-2 rounded-lg bg-violet-600 text-white hover:bg-violet-500 transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <Link
            href="/revision"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700/80 text-white rounded-xl text-sm font-semibold border border-slate-700/60 transition-colors"
          >
            <span>Open Revision Deck</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Daily Goal Widget */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-violet-400" />
              Daily Focus Target
            </h3>
            <p className="text-xs text-slate-400">
              Solve any 10 questions of your choice from the sheet today to hitting the target.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <div className="flex items-center justify-between text-sm font-semibold text-white mb-2">
              <span>Goal Progress</span>
              <span>{Math.round((stats.dailyGoalProgress / stats.dailyGoalTarget) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-violet-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, (stats.dailyGoalProgress / stats.dailyGoalTarget) * 100)}%` }}
              />
            </div>
          </div>

          <Link
            href="/daily"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-violet-600/10 transition-colors"
          >
            <span>Track Today's Progress</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
