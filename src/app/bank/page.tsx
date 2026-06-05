"use client";

import { useEffect, useState } from 'react';
import { Search, ChevronDown, ChevronUp, Filter, CheckCircle } from 'lucide-react';
import { SAMPLE_QUESTIONS, TOPICS } from '@/data/sampleQuestions';
import { StorageService } from '@/services/storage';
import { Question, UserProgress, Difficulty, ProgressStatus } from '@/types';
import QuestionRow from '@/components/QuestionRow';

export default function DSABank() {
  const [activeTopics, setActiveTopics] = useState<Record<string, boolean>>({});
  const [progressMap, setProgressMap] = useState<Record<string, UserProgress>>({});
  
  // Collapsible topics state
  const [collapsedTopics, setCollapsedTopics] = useState<Record<string, boolean>>({});
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<ProgressStatus | 'All'>('All');

  useEffect(() => {
    setActiveTopics(StorageService.getTopicSettings());
    setProgressMap(StorageService.getProgressMap());

    // Expand first topic by default, collapse others
    const initialCollapsed: Record<string, boolean> = {};
    TOPICS.forEach((t, i) => {
      initialCollapsed[t] = i !== 0;
    });
    setCollapsedTopics(initialCollapsed);

    // Event listener for updates
    const handleUpdate = () => {
      setProgressMap(StorageService.getProgressMap());
      setActiveTopics(StorageService.getTopicSettings());
    };
    window.addEventListener('local-storage-update', handleUpdate);
    return () => window.removeEventListener('local-storage-update', handleUpdate);
  }, []);

  const handleStatusChange = () => {
    setProgressMap(StorageService.getProgressMap());
  };

  const toggleCollapse = (topicName: string) => {
    setCollapsedTopics(prev => ({
      ...prev,
      [topicName]: !prev[topicName]
    }));
  };

  // Filter visible topics
  const visibleTopics = TOPICS.filter(t => activeTopics[t] !== false);

  // Group and filter questions
  const groupedQuestions = visibleTopics.reduce((acc, topic) => {
    // Get questions for this topic
    const topicQuestions = SAMPLE_QUESTIONS.filter(q => q.topic === topic);

    // Filter questions based on filters
    const filtered = topicQuestions.filter(q => {
      // 1. Search Query Filter
      const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Difficulty Filter
      const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;

      // 3. Status Filter
      const prog = progressMap[q.id] || { status: 'Not Started', revisionStep: 0 };
      
      // Calculate dynamic revision status
      const isRevDue = prog.status === 'Done' && prog.nextRevisionDate && 
        prog.nextRevisionDate <= new Date().toISOString().split('T')[0];

      let effectiveStatus = prog.status;
      if (isRevDue) effectiveStatus = 'Revision Due';

      const matchesStatus = statusFilter === 'All' || effectiveStatus === statusFilter;

      return matchesSearch && matchesDifficulty && matchesStatus;
    });

    if (filtered.length > 0 || searchQuery === '') {
      acc[topic] = filtered;
    }
    return acc;
  }, {} as Record<string, Question[]>);

  // Helper to get completion stats per topic
  const getTopicProgress = (topicName: string) => {
    const topicQuestions = SAMPLE_QUESTIONS.filter(q => q.topic === topicName);
    const completed = topicQuestions.filter(q => progressMap[q.id]?.status === 'Done').length;
    const total = topicQuestions.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">DSA Catalog Bank</h2>
          <p className="text-xs text-slate-400">Search and check off problems across topics from Striver A2Z</p>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/10 backdrop-blur-md grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search problems by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/40 border border-slate-800/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="relative">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | 'All')}
            className="w-full px-3 py-2 bg-slate-950/40 border border-slate-800/80 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-violet-500/60 transition-all appearance-none cursor-pointer"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-3.5 flex items-center text-slate-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ProgressStatus | 'All')}
            className="w-full px-3 py-2 bg-slate-950/40 border border-slate-800/80 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-violet-500/60 transition-all appearance-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="Done">Done</option>
            <option value="Revision Due">Revision Due</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-3.5 flex items-center text-slate-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {visibleTopics.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 text-slate-400">
            <p className="font-semibold">All topics hidden</p>
            <p className="text-xs text-slate-500 mt-1">Enable topics in Settings to start tracking them.</p>
          </div>
        ) : Object.keys(groupedQuestions).length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 text-slate-400">
            <p className="font-semibold">No questions match the filters</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          visibleTopics.map(topic => {
            const questions = groupedQuestions[topic];
            // If topic is filtered out completely from search results, skip rendering it
            if (!questions) return null;

            const isCollapsed = collapsedTopics[topic] !== false;
            const { completed, total, percentage } = getTopicProgress(topic);

            return (
              <div 
                key={topic}
                className="rounded-2xl border border-slate-800/60 bg-slate-900/20 backdrop-blur-md overflow-hidden transition-all duration-200"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleCollapse(topic)}
                  className="w-full flex items-center justify-between p-5 hover:bg-slate-800/20 transition-colors text-left focus:outline-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-[70%]">
                    <span className="font-bold text-sm sm:text-base text-white">{topic}</span>
                    
                    {/* Collapsed progress indicator */}
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-violet-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">
                        {completed}/{total} Solved ({percentage}%)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {percentage === 100 && (
                      <span className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4" />
                      </span>
                    )}
                    {isCollapsed ? (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronUp className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Collapsible content */}
                {!isCollapsed && (
                  <div className="border-t border-slate-800/40 p-4 bg-slate-950/20 space-y-3">
                    {questions.length === 0 ? (
                      <p className="text-center py-4 text-xs text-slate-500 font-medium">
                        No matching questions in this topic
                      </p>
                    ) : (
                      questions.map(q => (
                        <QuestionRow 
                          key={q.id} 
                          question={q} 
                          onStatusChange={handleStatusChange} 
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
