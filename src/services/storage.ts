import { Question, UserProgress, DashboardStats, ProgressStatus } from '../types';
import { SAMPLE_QUESTIONS, TOPICS_DEFAULT_CONFIG } from '../data/sampleQuestions';

const PROGRESS_KEY = 'placement_tracker_progress';
const SETTINGS_KEY = 'placement_tracker_settings';

// Helper to get tracking day based on 5 AM IST rollover
export function getCurrentTrackingDay(dateInput: Date = new Date()): string {
  const d = new Date(dateInput.getTime());
  // Shift back by 5 hours so that 5:00 AM becomes 12:00 AM (midnight)
  d.setHours(d.getHours() - 5);
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTodayDateString(dateInput: Date = new Date()): string {
  const year = dateInput.getFullYear();
  const month = String(dateInput.getMonth() + 1).padStart(2, '0');
  const day = String(dateInput.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export class StorageService {
  // Get progress map: questionId -> UserProgress
  static getProgressMap(): Record<string, UserProgress> {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem(PROGRESS_KEY);
    if (!data) {
      this.initSeed();
      return this.getProgressMap();
    }
    return JSON.parse(data);
  }

  // Save progress map
  static saveProgressMap(map: Record<string, UserProgress>): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
  }

  // Get single question progress
  static getQuestionProgress(questionId: string): UserProgress {
    const map = this.getProgressMap();
    return map[questionId] || {
      questionId,
      status: 'Not Started',
      revisionStep: 0
    };
  }

  // Toggle question status (mark Done / Not Started)
  static toggleQuestionDone(questionId: string, isChecked: boolean, dateInput: Date = new Date()): UserProgress {
    const map = this.getProgressMap();
    const current = map[questionId] || {
      questionId,
      status: 'Not Started',
      revisionStep: 0
    };

    if (isChecked) {
      // Mark Done
      current.status = 'Done';
      current.completedAt = dateInput.toISOString();
      current.revisionStep = 0;
      
      // Schedule revision in +3 days
      const revDate = new Date(dateInput.getTime());
      revDate.setDate(revDate.getDate() + 3);
      current.nextRevisionDate = getTodayDateString(revDate);
    } else {
      // Uncheck / Reset
      current.status = 'Not Started';
      current.completedAt = undefined;
      current.revisionStep = 0;
      current.nextRevisionDate = undefined;
    }

    map[questionId] = current;
    this.saveProgressMap(map);
    return current;
  }

  // Mark revision step completed
  static completeRevision(questionId: string, dateInput: Date = new Date()): UserProgress {
    const map = this.getProgressMap();
    const current = map[questionId];
    if (!current || current.status !== 'Done') return current;

    // Increment revision step
    current.revisionStep += 1;

    let intervalDays = 0;
    if (current.revisionStep === 1) {
      intervalDays = 7; // Next revision in 7 days
    } else if (current.revisionStep === 2) {
      intervalDays = 21; // Next revision in 21 days
    }

    if (intervalDays > 0) {
      const nextRev = new Date(dateInput.getTime());
      nextRev.setDate(nextRev.getDate() + intervalDays);
      current.nextRevisionDate = getTodayDateString(nextRev);
    } else {
      // Fully mastered after 3 revisions (step 3)
      current.nextRevisionDate = undefined; // No more revision due
    }

    map[questionId] = current;
    this.saveProgressMap(map);
    return current;
  }

  // Get visible topics configuration
  static getTopicSettings(): Record<string, boolean> {
    if (typeof window === 'undefined') return TOPICS_DEFAULT_CONFIG;
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) return TOPICS_DEFAULT_CONFIG;
    return JSON.parse(data);
  }

  // Save visible topics configuration
  static saveTopicSettings(settings: Record<string, boolean>): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  // Reset all user progress
  static resetAllData(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(PROGRESS_KEY);
    this.initSeed();
  }

  // Seed the initial data
  private static initSeed(): void {
    if (typeof window === 'undefined') return;
    const progressMap: Record<string, UserProgress> = {};

    // Dynamic seed dates: revision questions completed 3 days ago so they are due today
    const now = new Date();
    const seedDoneDate = new Date(now.getTime());
    seedDoneDate.setDate(seedDoneDate.getDate() - 3);
    seedDoneDate.setHours(10, 0, 0, 0);
    const seedLaterDate = new Date(now.getTime());
    seedLaterDate.setDate(seedLaterDate.getDate() - 2);
    seedLaterDate.setHours(10, 0, 0, 0);
    const todayStr = getTodayDateString(now);

    // 1. Mark all Arrays, Binary Search, and Linked List questions as done
    SAMPLE_QUESTIONS.forEach(q => {
      if (q.topic === "Arrays" || q.topic === "Binary Search" || q.topic === "Linked List") {
        // Set all as Done
        progressMap[q.id] = {
          questionId: q.id,
          status: 'Done',
          completedAt: seedLaterDate.toISOString(),
          revisionStep: 3, // Set as Mastered by default so they don't clutter revision
          nextRevisionDate: undefined
        };
      }
    });

    // 2. Put 3 specific questions from these done sections into the revision queue for today (+3 days since June 2)
    const revisionDoneList = ["arr_largest", "bs_basic", "ll_reverse"];
    revisionDoneList.forEach(id => {
      if (progressMap[id]) {
        progressMap[id].completedAt = seedDoneDate.toISOString();
        progressMap[id].revisionStep = 0;
        progressMap[id].nextRevisionDate = todayStr; // Due today
      }
    });

    // 3. Put 7 questions from "daily done questions" (other topics completed in daily plan) into revision queue today
    const dailyDoneRevisionList = [
      "str_outer_parens",
      "str_reverse_words",
      "rec_pow",
      "bit_power_two",
      "sq_valid_parentheses",
      "gd_assign_cookies",
      "tree_traversals"
    ];

    dailyDoneRevisionList.forEach(id => {
      // Set as completed on June 2, revision step 0, next revision date is June 5 (today)
      progressMap[id] = {
        questionId: id,
        status: 'Done',
        completedAt: seedDoneDate.toISOString(),
        revisionStep: 0,
        nextRevisionDate: todayStr // Due today
      };
    });

    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap));
  }

  // Get statistics
  static getStats(dateInput: Date = new Date()): DashboardStats {
    const map = this.getProgressMap();
    const topicSettings = this.getTopicSettings();
    const todayStr = getTodayDateString(dateInput);

    // Filter questions based on settings (hiding inactive topics)
    const activeQuestions = SAMPLE_QUESTIONS.filter(q => topicSettings[q.topic] !== false);
    const totalQuestions = activeQuestions.length;

    let completedQuestions = 0;
    let masteredCount = 0;
    let revisionPending = 0;
    let dailyGoalProgress = 0;

    const currentTrackingDay = getCurrentTrackingDay(dateInput);

    activeQuestions.forEach(q => {
      const prog = map[q.id];
      if (prog && prog.status === 'Done') {
        completedQuestions++;
        
        if (prog.revisionStep >= 3) {
          masteredCount++;
        }

        // Check if revision is due today or in the past
        if (prog.nextRevisionDate && prog.nextRevisionDate <= todayStr) {
          revisionPending++;
        }

        // Count for daily goal (solved in the current tracking day window starting 5 AM IST)
        if (prog.completedAt) {
          const completionDay = getCurrentTrackingDay(new Date(prog.completedAt));
          if (completionDay === currentTrackingDay) {
            dailyGoalProgress++;
          }
        }
      }
    });

    const remainingQuestions = totalQuestions - completedQuestions;
    const masteryRate = totalQuestions > 0 ? Math.round((masteredCount / totalQuestions) * 100) : 0;
    const streak = this.calculateStreak(map, dateInput);

    return {
      totalQuestions,
      completedQuestions,
      remainingQuestions,
      masteryRate,
      streak,
      revisionPending,
      dailyGoalProgress,
      dailyGoalTarget: 10
    };
  }

  // Calculate daily streak
  private static calculateStreak(map: Record<string, UserProgress>, dateInput: Date): number {
    // Collect all completed tracking days
    const completedDays = new Set<string>();
    
    Object.values(map).forEach(prog => {
      if (prog.status === 'Done' && prog.completedAt) {
        const day = getCurrentTrackingDay(new Date(prog.completedAt));
        completedDays.add(day);
      }
    });

    if (completedDays.size === 0) return 0;

    let streak = 0;
    const checkDate = new Date(dateInput.getTime());
    let currentDayStr = getCurrentTrackingDay(checkDate);

    // If solved today, start counting
    if (completedDays.has(currentDayStr)) {
      streak++;
      while (true) {
        checkDate.setDate(checkDate.getDate() - 1);
        currentDayStr = getCurrentTrackingDay(checkDate);
        if (completedDays.has(currentDayStr)) {
          streak++;
        } else {
          break;
        }
      }
    } else {
      // If not solved today, check if yesterday was solved to keep the streak active
      checkDate.setDate(checkDate.getDate() - 1);
      currentDayStr = getCurrentTrackingDay(checkDate);
      if (completedDays.has(currentDayStr)) {
        streak++;
        while (true) {
          checkDate.setDate(checkDate.getDate() - 1);
          currentDayStr = getCurrentTrackingDay(checkDate);
          if (completedDays.has(currentDayStr)) {
            streak++;
          } else {
            break;
          }
        }
      }
    }

    return streak;
  }

  // Get solved count in last 7 days (including shifted days)
  static getWeeklyHistory(dateInput: Date = new Date()): { day: string; count: number }[] {
    const map = this.getProgressMap();
    const history: Record<string, number> = {};

    // Generate last 7 days strings
    const days: string[] = [];
    const tempDate = new Date(dateInput.getTime());
    for (let i = 6; i >= 0; i--) {
      const d = new Date(tempDate.getTime());
      d.setDate(d.getDate() - i);
      const dayStr = getCurrentTrackingDay(d);
      days.push(dayStr);
      history[dayStr] = 0;
    }

    // Populate
    Object.values(map).forEach(prog => {
      if (prog.status === 'Done' && prog.completedAt) {
        const dayStr = getCurrentTrackingDay(new Date(prog.completedAt));
        if (history[dayStr] !== undefined) {
          history[dayStr]++;
        }
      }
    });

    const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return days.map(dayStr => {
      // Extract weekday label
      const d = new Date(dayStr + 'T12:00:00'); // avoid timezone issues
      return {
        day: weekdayNames[d.getDay()],
        count: history[dayStr]
      };
    });
  }
}
