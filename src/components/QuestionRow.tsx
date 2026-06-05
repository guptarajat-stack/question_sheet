"use client";

import { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Question, UserProgress } from '../types';
import { StorageService } from '@/services/storage';

interface QuestionRowProps {
  question: Question;
  onStatusChange?: (prog: UserProgress) => void;
}

export default function QuestionRow({ question, onStatusChange }: QuestionRowProps) {
  const [progress, setProgress] = useState<UserProgress>({
    questionId: question.id,
    status: 'Not Started',
    revisionStep: 0
  });

  useEffect(() => {
    setProgress(StorageService.getQuestionProgress(question.id));
  }, [question.id]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const updated = StorageService.toggleQuestionDone(question.id, isChecked);
    setProgress(updated);
    
    // Notify parent component if callback provided
    if (onStatusChange) {
      onStatusChange(updated);
    }
    
    // Emit global event to update other components (like Sidebar)
    window.dispatchEvent(new CustomEvent('local-storage-update'));
  };

  const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Hard: 'bg-red-500/10 text-red-400 border-red-500/20'
  };

  const platformBadge = {
    LeetCode: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    GeeksforGeeks: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  };

  // Check if revision is pending
  const isRevisionPending = progress.status === 'Done' && progress.nextRevisionDate && 
    progress.nextRevisionDate <= new Date().toISOString().split('T')[0];

  return (
    <div className={`
      flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-200
      ${progress.status === 'Done'
        ? 'bg-slate-900/30 border-slate-800/80 hover:border-slate-800' 
        : 'bg-slate-950/20 border-slate-800/40 hover:border-slate-800/70 hover:bg-slate-900/10'
      }
    `}>
      <div className="flex items-start gap-3.5">
        {/* Custom Styled Checkbox */}
        <div className="flex items-center h-6">
          <input
            id={`q-check-${question.id}`}
            type="checkbox"
            checked={progress.status === 'Done'}
            onChange={handleCheckboxChange}
            className="w-5 h-5 rounded-lg border-slate-700 bg-slate-950/50 text-violet-600 focus:ring-violet-500/20 focus:ring-offset-slate-900 focus:ring-2 focus:ring-offset-2 accent-violet-600 transition-all cursor-pointer"
          />
        </div>

        {/* Title and details */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <label 
              htmlFor={`q-check-${question.id}`}
              className={`font-medium text-sm sm:text-base cursor-pointer hover:text-white transition-colors select-none ${
                progress.status === 'Done' ? 'text-slate-400 line-through' : 'text-slate-200'
              }`}
            >
              {question.title}
            </label>
            
            {/* Topic tag */}
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-800/40 border border-slate-800/80 px-2 py-0.5 rounded-md">
              {question.topic}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
            {/* Completed date if solved */}
            {progress.status === 'Done' && progress.completedAt && (
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Solved on {new Date(progress.completedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
              </span>
            )}

            {/* Revision Step */}
            {progress.status === 'Done' && (
              <span className="flex items-center gap-1 text-violet-400 font-medium">
                <Clock className="h-3.5 w-3.5" />
                {progress.revisionStep === 0 && "Pending Revision 1"}
                {progress.revisionStep === 1 && "Pending Revision 2"}
                {progress.revisionStep === 2 && "Pending Revision 3"}
                {progress.revisionStep >= 3 && "Mastered"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-slate-800/40 pt-3 sm:pt-0 sm:border-0">
        {/* Badges container */}
        <div className="flex items-center gap-2">
          {/* Revision Pending alert */}
          {isRevisionPending && (
            <span className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Revision Due</span>
            </span>
          )}

          {/* Difficulty Badge */}
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${difficultyColors[question.difficulty]}`}>
            {question.difficulty}
          </span>
          
          {/* Platform Badge */}
          <span className="text-[10px] font-semibold uppercase text-slate-400 bg-slate-800/20 border border-slate-800/80 px-2 py-0.5 rounded-md">
            {question.platform}
          </span>
        </div>

        {/* Solve link */}
        <a
          href={question.problemUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600/10 hover:bg-violet-600 text-violet-400 hover:text-white rounded-lg text-xs font-semibold border border-violet-500/20 transition-all group"
        >
          <span>Solve</span>
          <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
