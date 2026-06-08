import { clerkClient } from '@clerk/nextjs/server';

export interface UserActivity {
  userId: string;
  username: string;
  weeklyHours: number;
  lastActivity: string;
  badge?: string;
  plan?: string | null;
}

// In-memory storage for demo purposes (in production, use a database)
const userActivityStore = new Map<string, UserActivity>();

export async function trackUserActivity(
  userId: string,
  hours: number,
  activityType: 'study' | 'login' | 'quiz' | 'comment' = 'study'
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await clerkClient.users.getUser(userId);
    const username = user.firstName || user.username || 'Anonymous';
    const plan = user.publicMetadata?.plan as 'standard' | 'premium' | undefined;
    const badges = (user.unsafeMetadata?.unlockedBadges as string[]) || [];
    
    // Get or create user activity record
    let activity = userActivityStore.get(userId);
    
    if (!activity) {
      activity = {
        userId,
        username,
        weeklyHours: 0,
        lastActivity: new Date().toISOString(),
        badge: badges.find(b => b.includes('founder')) ? '👑 Founder' : undefined,
        plan: plan || null,
      };
      userActivityStore.set(userId, activity);
    }
    
    // Update weekly hours (reset weekly)
    const now = new Date();
    const lastActivityDate = activity.lastActivity ? new Date(activity.lastActivity) : null;
    const daysSinceLastActivity = lastActivityDate 
      ? Math.floor((now.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24))
      : 7;
    
    // Reset weekly hours if it's been a week
    if (daysSinceLastActivity >= 7) {
      activity.weeklyHours = 0;
    }
    
    // Add hours based on activity type
    const hourMultiplier = {
      study: 1,
      login: 0.1,
      quiz: 0.5,
      comment: 0.25,
    };
    
    activity.weeklyHours += hours * hourMultiplier[activityType];
    activity.lastActivity = now.toISOString();
    
    // Update badge if user has one
    if (badges.length > 0) {
      const badgeEmojis: Record<string, string> = {
        'founder-badge': '👑 Founder',
        'argentina-badge': '🇦🇷 Argentina',
        'escarapela-badge': '🏆 Escarapela',
        'standard-badge': '🏅 Standard',
        'premium-badge': '👑 Premium',
      };
      
      const badge = badges.find(b => badgeEmojis[b]);
      if (badge) {
        activity.badge = badgeEmojis[badge];
      }
    }
    
    userActivityStore.set(userId, activity);
    
    // Update Clerk metadata
    await clerkClient.users.updateUser(userId, {
      unsafeMetadata: {
        ...user.unsafeMetadata,
        weeklyHours: activity.weeklyHours,
        lastActivity: activity.lastActivity,
      },
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error tracking user activity:', error);
    return { success: false, error: 'Failed to track activity' };
  }
}

export async function getWeeklyRanking(limit: number = 10): Promise<(UserActivity & { position: number })[]> {
  const allActivities = Array.from(userActivityStore.values());
  
  // Sort by weekly hours (descending)
  const sorted = allActivities
    .sort((a, b) => b.weeklyHours - a.weeklyHours)
    .slice(0, limit);
  
  // Add position
  return sorted.map((activity, index) => ({
    ...activity,
    position: index + 1,
  }));
}

export function getUserActivity(userId: string): UserActivity | undefined {
  return userActivityStore.get(userId);
}

export async function resetWeeklyHours(): Promise<void> {
  // This should be called weekly (e.g., via cron job)
  for (const [userId, activity] of userActivityStore.entries()) {
    activity.weeklyHours = 0;
    userActivityStore.set(userId, activity);
    
    try {
      const user = await clerkClient.users.getUser(userId);
      await clerkClient.users.updateUser(userId, {
        unsafeMetadata: {
          ...user.unsafeMetadata,
          weeklyHours: 0,
        },
      });
    } catch (error) {
      console.error(`Error resetting hours for user ${userId}:`, error);
    }
  }
}
