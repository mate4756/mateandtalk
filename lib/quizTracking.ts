import { clerkClient } from '@clerk/nextjs/server';

export interface QuizAttempt {
  userId: string;
  weekNumber: number;
  completedAt: string;
  score: number;
  totalQuestions: number;
}

export function getCurrentWeekNumber(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const daysSinceStart = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  return Math.floor(daysSinceStart / 7) + 1;
}

export function getRotationWeek(): number {
  // 3-week rotation cycle
  const currentWeek = getCurrentWeekNumber();
  return ((currentWeek - 1) % 3) + 1; // Returns 1, 2, or 3
}

export async function canUserTakeQuiz(
  userId: string,
  isAdmin: boolean = false
): Promise<{ canTake: boolean; reason?: string; nextAvailable?: string }> {
  // Admin override: always allow
  if (isAdmin) {
    return { canTake: true };
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    const metadata = user.unsafeMetadata || {};
    
    const lastQuizCompletion = metadata.lastQuizCompletion as string | undefined;
    const lastQuizWeek = metadata.lastQuizWeek as number | undefined;
    
    if (!lastQuizCompletion || !lastQuizWeek) {
      return { canTake: true };
    }

    const currentWeek = getCurrentWeekNumber();
    
    // Check if same week
    if (lastQuizWeek === currentWeek) {
      const completedAt = new Date(lastQuizCompletion);
      const nextAvailable = new Date(completedAt.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      return {
        canTake: false,
        reason: 'You have already completed the quiz this week',
        nextAvailable: nextAvailable.toISOString(),
      };
    }

    // Different week - allow
    return { canTake: true };
  } catch (error) {
    console.error('Error checking quiz eligibility:', error);
    // On error, allow to proceed (fail-open for better UX)
    return { canTake: true };
  }
}

export async function recordQuizAttempt(
  userId: string,
  score: number,
  totalQuestions: number,
  isAdmin: boolean = false
): Promise<{ success: boolean; error?: string }> {
  try {
    const currentWeek = getCurrentWeekNumber();
    const attempt: QuizAttempt = {
      userId,
      weekNumber: currentWeek,
      completedAt: new Date().toISOString(),
      score,
      totalQuestions,
    };

    // Always update Clerk metadata for persistence
    const user = await clerkClient.users.getUser(userId);
    await clerkClient.users.updateUser(userId, {
      unsafeMetadata: {
        ...user.unsafeMetadata,
        lastQuizCompletion: attempt.completedAt,
        lastQuizWeek: currentWeek,
        quizScore: score,
        quizTotalQuestions: totalQuestions,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error recording quiz attempt:', error);
    return { success: false, error: 'Failed to record quiz attempt' };
  }
}

export async function resetQuizAttempt(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await clerkClient.users.getUser(userId);
    await clerkClient.users.updateUser(userId, {
      unsafeMetadata: {
        ...user.unsafeMetadata,
        lastQuizCompletion: undefined,
        lastQuizWeek: undefined,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error resetting quiz attempt:', error);
    return { success: false, error: 'Failed to reset quiz attempt' };
  }
}

export function getNextQuizAvailableTime(userId: string): string | null {
  // This is now calculated dynamically based on current week
  // The actual check happens in canUserTakeQuiz
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  return nextWeek.toISOString();
}
