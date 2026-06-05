export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  title: string;
  difficulty: Difficulty;
  topic: string;
  problemUrl: string; // LeetCode or GFG link
  platform: 'LeetCode' | 'GeeksforGeeks';
}

export type ProgressStatus = 'Not Started' | 'Done' | 'Revision Due';

export interface UserProgress {
  questionId: string;
  status: ProgressStatus;
  completedAt?: string; // ISO date string of completion
  revisionStep: number;  // 0: completed, 1: rev1 done, 2: rev2 done, 3: mastered
  nextRevisionDate?: string; // ISO date string when revision is due
}

export interface TopicProgress {
  topic: string;
  total: number;
  completed: number;
  percentage: number;
}

export interface DashboardStats {
  totalQuestions: number;
  completedQuestions: number;
  remainingQuestions: number;
  masteryRate: number; // percentage of mastered questions
  streak: number;
  revisionPending: number;
  dailyGoalProgress: number; // questions solved today (since 5am)
  dailyGoalTarget: number; // default 10
}

export interface DailyGoalLog {
  date: string; // YYYY-MM-DD (adjusted for 5 AM IST rollover)
  count: number;
  target: number;
  completed: boolean;
}
