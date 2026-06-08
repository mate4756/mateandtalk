'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export function useAchievementTracking() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    // Track login streak
    const trackStreak = async () => {
      const today = new Date();
      const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const lastLogin = user.publicMetadata?.lastLogin as string;
      const streakDays = (user.publicMetadata?.streakDays as number) || 0;

      let newStreakDays = streakDays;
      let newLastLogin = todayDateOnly.toISOString().split('T')[0];

      if (lastLogin) {
        const lastDate = new Date(lastLogin);
        const lastDateOnly = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
        
        // Calculate difference in days (ignoring time)
        const diffTime = todayDateOnly.getTime() - lastDateOnly.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // Check if more than 48 hours have passed (2 days)
        const hoursPassed = diffTime / (1000 * 60 * 60);

        if (diffDays === 0) {
          // Same day - keep current streak, don't update lastLogin
          newLastLogin = lastLogin;
          newStreakDays = streakDays;
        } else if (diffDays === 1) {
          // Yesterday - increment streak
          newStreakDays = streakDays + 1;
        } else if (hoursPassed > 48) {
          // More than 48 hours passed - reset streak to 1
          newStreakDays = 1;
        } else {
          // Between 24-48 hours but not consecutive day - reset streak
          newStreakDays = 1;
        }
      } else {
        // First login
        newStreakDays = 1;
      }

      // Check if we need to update
      if (newStreakDays !== streakDays || newLastLogin !== lastLogin) {
        try {
          // Use Clerk's unsafeMetadata for tracking (publicMetadata requires backend)
          await user.update({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              lastLogin: newLastLogin,
              streakDays: newStreakDays,
            },
          });

          // Check for 30-day milestone to unlock badge
          if (newStreakDays >= 30) {
            const plan = user.publicMetadata?.plan as 'standard' | 'premium' | undefined;
            const unlockedBadges = (user.unsafeMetadata?.unlockedBadges as string[]) || [];

            if (plan && !unlockedBadges.includes(`${plan}-badge`)) {
              await user.update({
                unsafeMetadata: {
                  ...user.unsafeMetadata,
                  lastLogin: newLastLogin,
                  streakDays: newStreakDays,
                  unlockedBadges: [...unlockedBadges, `${plan}-badge`],
                },
              });
            }
          }
        } catch (error) {
          console.error('Error tracking streak:', error);
        }
      }
    };

    trackStreak();
  }, [isLoaded, user]);
}

export function checkRegistrationAchievement(user: any): boolean {
  const hasProfile = user?.firstName && user?.lastName;
  const isEmailVerified = user?.emailAddresses[0]?.verification?.status === 'verified';
  return hasProfile && isEmailVerified;
}

export function checkSubscriptionAchievement(user: any): boolean {
  const plan = user?.publicMetadata?.plan as 'standard' | 'premium' | undefined;
  return plan === 'standard' || plan === 'premium';
}

export function checkStreakMilestones(user: any): {
  threeDays: boolean;
  sevenDays: boolean;
  fifteenDays: boolean;
  thirtyDays: boolean;
} {
  const streakDays = (user?.unsafeMetadata?.streakDays as number) || 0;
  return {
    threeDays: streakDays >= 3,
    sevenDays: streakDays >= 7,
    fifteenDays: streakDays >= 15,
    thirtyDays: streakDays >= 30,
  };
}
