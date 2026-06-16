import { User } from '@clerk/nextjs/server';

export interface Badge {
  id: string;
  name: string;
  image: string;
  plan: string;
  requirements: string[];
}

export function isBadgeUnlocked(badge: Badge, user: User | null): boolean {
  if (!user) return false;

  const userPlan = user.publicMetadata?.plan as string | undefined;
  const hasPostedComment = user.publicMetadata?.hasPostedComment as boolean | undefined;

  switch (badge.id) {
    case 'argentina':
      // Argentina Badge: Unlocked automatically when user purchases Standard Plan
      return userPlan === 'standard' || userPlan === 'premium';

    case 'escarapela':
      // Escarapela Badge: Unlocked automatically once user posts a comment
      return hasPostedComment === true;

    case 'mate':
      // Mate Badge: Simply check if user has Premium Plan
      return userPlan === 'premium';

    case 'worldcup':
      // World Cup Badge: Complete Soccer Module + Play soccer game for 5 consecutive days
      const completedModules = user.publicMetadata?.completedModules as string[] | undefined;
      const soccerGameStreak = user.publicMetadata?.soccerGameStreak as number | undefined;
      const hasSoccerModule = completedModules?.includes('soccer') || false;
      const hasSoccerStreak = (soccerGameStreak || 0) >= 5;
      return hasSoccerModule && hasSoccerStreak;

    default:
      return false;
  }
}

export function getBadgeIcon(badgeId: string): string {
  switch (badgeId) {
    case 'argentina':
      return '🇦🇷';
    case 'escarapela':
      return '🎖️';
    case 'mate':
      return '🧉';
    case 'worldcup':
      return '⚽';
    default:
      return '🎖️';
  }
}
