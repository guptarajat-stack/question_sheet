"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart3, CheckCircle, ArrowUpRight } from 'lucide-react';
import { SAMPLE_QUESTIONS, TOPICS } from '@/data/sampleQuestions';
import { StorageService } from '@/services/storage';
import { UserProgress } from '@/types';

interface TopicStat {
  name: string;
  total: number;
  completed: number;
  percentage: number;
  easyTotal: number;
  easyCompleted: number;
  mediumTotal: number;
  mediumCompleted: number;
  hardTotal: number;
  hardCompleted: number;
}

export default function TopicProgress() {
  const [topicStats, setTopicStats] = useState<TopicStat[]>([]);
  const [activeTopics, setActiveTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchStats = () => {
      const progressMap = StorageService.getProgressMap();
      const settings = StorageService.getTopicSettings();
      setActiveTopics(settings);

      const stats = TOPICS.map(topic => {
        const questions = SAMPLE_QUESTIONS.filter(q => q.topic === topic);
        const completedList = questions.filter(q => progressMap[q.id]?.status === 'Done');

        const easy = questions.filter(q => q.difficulty === 'Easy');
        const easyDone = easy.filter(q => progressMap[q.id]?.status === 'Done');

        const medium = questions.filter(q => q.difficulty === 'Medium');
        const mediumDone = medium.filter(q => progressMap[q.id]?.status === 'Done');

        const hard = questions.filter(q => q.difficulty === 'Hard');
        const hardDone = hard.filter(q => progressMap[q.id]?.status === 'Done');

        const total = questions.length;
        const completed = completedList.length;

        return {
          name: topic,
          total,
          completed,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
          easyTotal: easy.length,
          easyCompleted: easyDone.length,
          mediumTotal: medium.length,
          mediumCompleted: mediumDone.length,
          hardTotal: hard.length,
          hardCompleted: hardDone.length
        };
      });

      setTopicStats(stats);
    };

    fetchStats();

    const handleUpdate = () => {
      fetchStats();
    };
    window.addEventListener('local-storage-update', handleUpdate);
    return () => window.removeEventListener('local-storage-update', handleUpdate);
  }, []);

  // Filter out disabled topics
  const visibleStats = topicStats.filter(s => activeTopics[s.name] !== false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">Topic-wise Metrics</h2>
        <p className="text-xs text-slate-400 font-medium">Detailed progress bars and difficulty splits for placement prep</p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {visibleStats.length === 0 ? (
          <div className="md:col-span-2 text-center py-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 text-slate-400">
            No active topics to monitor. Turn them on in Settings!
          </div>
        ) : (
          visibleStats.map(stat => (
            <div 
              key={stat.name}
              className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/20 backdrop-blur-md flex flex-col justify-between space-y-5 hover:border-slate-700/60 transition-colors"
            >
              {/* Heading and Link */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-base leading-tight">{stat.name}</h3>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    {stat.completed} of {stat.total} Solved
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {stat.percentage === 100 && (
                    <span className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4" />
                    </span>
                  )}
                  <Link 
                    href="/bank"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Solve Topic Questions"
                  >
                    <ArrowUpRight className="h-4.5 w-4.5" />
                  </Link>
                </div>
              </div>

              {/* Progress Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-400">Mastery Rate</span>
                  <span className="text-violet-400">{stat.percentage}%</span>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800/50">
                  <div 
                    className="bg-gradient-to-r from-violet-600 to-indigo-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>

              {/* Grid split for Easy / Medium / Hard */}
              <div className="grid grid-cols-3 gap-2 border-t border-slate-800/60 pt-4">
                {/* Easy */}
                <div className="text-center p-2 rounded-xl bg-slate-950/40 border border-slate-800/40">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wide">Easy</span>
                  <p className="text-sm font-black text-white mt-1">
                    {stat.easyCompleted}<span className="text-slate-500 font-medium text-xs">/{stat.easyTotal}</span>
                  </p>
                </div>

                {/* Medium */}
                <div className="text-center p-2 rounded-xl bg-slate-950/40 border border-slate-800/40">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wide">Medium</span>
                  <p className="text-sm font-black text-white mt-1">
                    {stat.mediumCompleted}<span className="text-slate-500 font-medium text-xs">/{stat.mediumTotal}</span>
                  </p>
                </div>

                {/* Hard */}
                <div className="text-center p-2 rounded-xl bg-slate-950/40 border border-slate-800/40">
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-wide">Hard</span>
                  <p className="text-sm font-black text-white mt-1">
                    {stat.hardCompleted}<span className="text-slate-500 font-medium text-xs">/{stat.hardTotal}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
