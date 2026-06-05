"use client";

import { useEffect, useState } from 'react';
import { 
  RotateCw, 
  CheckCircle2, 
  ExternalLink,
  BookOpen,
  CalendarDays,
  Brain,
  Trophy
} from 'lucide-react';
import { SAMPLE_QUESTIONS } from '@/data/sampleQuestions';
import { StorageService, getTodayDateString } from '@/services/storage';
import { Question, UserProgress } from '@/types';

interface RevisionQuestion {
  question: Question;
  progress: UserProgress;
}

export default function Revision() {
  const [revisionDue, setRevisionDue] = useState<RevisionQuestion[]>([]);
  const [masteredList, setMasteredList] = useState<Question[]>([]);

  const fetchRevisionState = () => {
    const progressMap = StorageService.getProgressMap();
    const activeTopics = StorageService.getTopicSettings();
    const todayStr = getTodayDateString();

    // 1. Filter questions due for revision
    const due: RevisionQuestion[] = [];
    const mastered: Question[] = [];

    SAMPLE_QUESTIONS.forEach(q => {
      if (activeTopics[q.topic] === false) return;
      const prog = progressMap[q.id];
      if (prog && prog.status === 'Done') {
        if (prog.revisionStep >= 3) {
          mastered.push(q);
        } else if (prog.nextRevisionDate && prog.nextRevisionDate <= todayStr) {
          due.push({
            question: q,
            progress: prog
          });
        }
      }
    });

    setRevisionDue(due);
    setMasteredList(mastered);
  };

  useEffect(() => {
    fetchRevisionState();

    const handleUpdate = () => {
      fetchRevisionState();
    };
    window.addEventListener('local-storage-update', handleUpdate);
    return () => window.removeEventListener('local-storage-update', handleUpdate);
  }, []);

  const handleCompleteRevision = (questionId: string) => {
    StorageService.completeRevision(questionId);
    fetchRevisionState();
    
    // Emit global event to update other components (like Sidebar badge)
    window.dispatchEvent(new CustomEvent('local-storage-update'));
  };

  const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Hard: 'bg-red-500/10 text-red-400 border-red-500/20'
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <RotateCw className="h-5 w-5 text-violet-400" />
            Spaced Repetition System
          </h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Retain DSA concepts longer by reviewing them at scientific intervals: 3 days, 7 days, and 21 days after initial completion.
          </p>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 text-center min-w-[100px]">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Due Today</p>
            <p className="text-xl font-black text-white mt-0.5">{revisionDue.length}</p>
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 text-center min-w-[100px]">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Mastered</p>
            <p className="text-xl font-black text-violet-400 mt-0.5">{masteredList.length}</p>
          </div>
        </div>

        <div className="absolute right-0 top-0 -mr-12 -mt-12 h-32 w-32 rounded-full bg-violet-600/5 blur-2xl" />
      </div>

      {/* Main Revision Queue List */}
      <div className="space-y-4">
        <div>
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <Brain className="h-5 w-5 text-violet-400" />
            Today's Revision Deck
          </h3>
          <p className="text-xs text-slate-400">Questions scheduled for revision. Completing moves them to the next interval.</p>
        </div>

        <div className="space-y-3">
          {revisionDue.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 text-slate-500">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full w-fit mx-auto mb-3">
                <Trophy className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-white">All caught up!</p>
              <p className="text-xs text-slate-600 mt-1">No questions are due for revision today. Keep solving new problems!</p>
            </div>
          ) : (
            revisionDue.map(({ question, progress }) => {
              const nextIntervalStr = progress.revisionStep === 0 ? "+7 Days" : progress.revisionStep === 1 ? "+21 Days" : "Mastery";
              const stepLabel = progress.revisionStep === 0 ? "Revision 1" : progress.revisionStep === 1 ? "Revision 2" : "Revision 3";

              return (
                <div 
                  key={question.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/10 hover:border-slate-700/60 transition-all duration-200"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Tick action button */}
                    <button
                      onClick={() => handleCompleteRevision(question.id)}
                      className="p-1 rounded-lg bg-violet-600/10 hover:bg-violet-600 text-violet-400 hover:text-white border border-violet-500/20 transition-all shrink-0 mt-0.5 group"
                      title="Mark Revision Completed"
                    >
                      <CheckCircle2 className="h-5 w-5 group-hover:scale-105 transition-transform" />
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm sm:text-base text-slate-200">{question.title}</span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-800/40 border border-slate-800/80 px-2 py-0.5 rounded-md">
                          {question.topic}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                        {/* Spaced intervals badge */}
                        <span className="inline-flex items-center gap-1 bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded-md border border-violet-500/20 font-medium">
                          {stepLabel}
                        </span>
                        <span className="text-slate-500">
                          Next Interval: <strong className="text-slate-300 font-semibold">{nextIntervalStr}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 border-t border-slate-800/40 pt-3 md:pt-0 md:border-0">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${difficultyColors[question.difficulty]}`}>
                        {question.difficulty}
                      </span>
                      <span className="text-[10px] font-semibold uppercase text-slate-400 bg-slate-800/20 border border-slate-800/80 px-2 py-0.5 rounded-md">
                        {question.platform}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={question.problemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-700/60 transition-colors"
                      >
                        Solve <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <button
                        onClick={() => handleCompleteRevision(question.id)}
                        className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Complete Rev
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
