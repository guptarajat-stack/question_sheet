"use client";

import { useEffect, useState } from 'react';
import { 
  Calendar, 
  Hourglass, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight,
  RefreshCw,
  Trophy
} from 'lucide-react';
import { SAMPLE_QUESTIONS } from '@/data/sampleQuestions';
import { StorageService, getCurrentTrackingDay } from '@/services/storage';
import { Question, UserProgress } from '@/types';
import QuestionRow from '@/components/QuestionRow';

export default function DailyPlan() {
  const [solvedToday, setSolvedToday] = useState<Question[]>([]);
  const [recommended, setRecommended] = useState<Question[]>([]);
  const [stats, setStats] = useState({ dailyGoalProgress: 0, dailyGoalTarget: 10 });
  const [timeLeft, setTimeLeft] = useState('');

  const fetchDailyState = () => {
    const currentStats = StorageService.getStats();
    setStats({
      dailyGoalProgress: currentStats.dailyGoalProgress,
      dailyGoalTarget: currentStats.dailyGoalTarget
    });

    const progressMap = StorageService.getProgressMap();
    const activeTopics = StorageService.getTopicSettings();
    const currentTrackingDay = getCurrentTrackingDay();

    // 1. Find questions completed today (since 5 AM IST)
    const completed = SAMPLE_QUESTIONS.filter(q => {
      if (activeTopics[q.topic] === false) return false;
      const prog = progressMap[q.id];
      if (prog && prog.status === 'Done' && prog.completedAt) {
        return getCurrentTrackingDay(new Date(prog.completedAt)) === currentTrackingDay;
      }
      return false;
    });
    setSolvedToday(completed);

    // 2. Find 10 recommended incomplete questions
    const incomplete = SAMPLE_QUESTIONS.filter(q => {
      if (activeTopics[q.topic] === false) return false;
      const prog = progressMap[q.id];
      return !prog || prog.status === 'Not Started';
    }).slice(0, 10);
    setRecommended(incomplete);
  };

  useEffect(() => {
    fetchDailyState();

    // Live countdown to 5 AM IST next rollover
    const calcTimeLeft = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(5, 0, 0, 0); // 5 AM

      // If we are past 5 AM, target is 5 AM tomorrow
      if (now.getTime() >= target.getTime()) {
        target.setDate(target.getDate() + 1);
      }

      const diffMs = target.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
      );
    };

    calcTimeLeft();
    const intervalId = setInterval(calcTimeLeft, 1000);

    const handleUpdate = () => {
      fetchDailyState();
    };
    window.addEventListener('local-storage-update', handleUpdate);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('local-storage-update', handleUpdate);
    };
  }, []);

  const progressPercent = Math.min(
    100,
    Math.round((stats.dailyGoalProgress / stats.dailyGoalTarget) * 100)
  );

  return (
    <div className="space-y-8">
      {/* Top Banner Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Card (Span 2) */}
        <div className="md:col-span-2 p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-violet-400" />
              Daily Practice Target
            </h2>
            <p className="text-xs text-slate-400">
              Solve any 10 questions of your choice to secure your daily goal.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 mt-6">
            {/* Circular Progress Indicator */}
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="8"
                  strokeDasharray="251.3"
                  strokeDashoffset={251.3 - (251.3 * progressPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-black text-white">{stats.dailyGoalProgress}</span>
                <span className="text-xs text-slate-500 font-bold block">/ {stats.dailyGoalTarget}</span>
              </div>
            </div>

            <div className="space-y-3 w-full text-center sm:text-left">
              {stats.dailyGoalProgress >= stats.dailyGoalTarget ? (
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                  <Trophy className="h-4 w-4 fill-emerald-500/10" />
                  <span>Target Unlocked! Great Job!</span>
                </div>
              ) : (
                <p className="text-sm font-semibold text-slate-300">
                  You are <span className="text-violet-400">{stats.dailyGoalTarget - stats.dailyGoalProgress}</span> questions away from today's goal.
                </p>
              )}
              <p className="text-xs text-slate-400">
                Any questions checked done from the DSA Bank will automatically contribute to this counter.
              </p>
            </div>
          </div>
          
          <div className="absolute right-0 top-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-violet-600/5 blur-2xl" />
        </div>

        {/* Rollover Countdown Card */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md flex flex-col justify-between text-center relative overflow-hidden">
          <div className="space-y-1">
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-wider">Rollover Countdown</h3>
            <p className="text-xs text-slate-500">Counter resets daily at 5:00 AM IST</p>
          </div>

          <div className="py-6 flex flex-col items-center justify-center">
            <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/20 text-violet-400 mb-3 animate-pulse">
              <Hourglass className="h-6 w-6" />
            </div>
            <p className="text-3xl font-black font-mono text-white tracking-wider">{timeLeft}</p>
          </div>

          <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border-t border-slate-800/40 pt-4">
            <RefreshCw className="h-3 w-3" />
            Auto Reset Window
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Solved Today Section (Span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              Completed Today
            </h3>
            <p className="text-xs text-slate-400">Questions you have completed since 5:00 AM IST</p>
          </div>

          <div className="space-y-3">
            {solvedToday.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 text-slate-500">
                <p className="text-sm font-semibold">No questions completed today</p>
                <p className="text-xs text-slate-600 mt-1">Start by picking a question from the recommendation engine or the main catalog!</p>
              </div>
            ) : (
              solvedToday.map(q => (
                <QuestionRow 
                  key={q.id} 
                  question={q} 
                  onStatusChange={fetchDailyState} 
                />
              ))
            )}
          </div>
        </div>

        {/* Recommended Queue Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-400" />
              Recommended Next
            </h3>
            <p className="text-xs text-slate-400">Incomplete questions to help you build focus</p>
          </div>

          <div className="space-y-3">
            {recommended.length === 0 ? (
              <div className="text-center py-8 rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 text-slate-500 text-sm">
                🎉 All active catalog questions completed!
              </div>
            ) : (
              recommended.map(q => (
                <div 
                  key={q.id}
                  className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/30 flex flex-col justify-between gap-3 hover:border-slate-700/60 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{q.topic}</span>
                    <span className="text-sm font-bold text-white line-clamp-1">{q.title}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/50 pt-2.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {q.difficulty}
                    </span>
                    <a
                      href={q.problemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] font-bold text-violet-400 hover:text-white transition-colors"
                    >
                      Solve <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
