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
  const completedModules = user.publicMetadata?.completedModules as string[] | undefined;
  const soccerGameStreak = user.publicMetadata?.soccerGameStreak as number | undefined;

  switch (badge.id) {
    case 'mate':
      // Complete Mate Module + Have Premium Plan
      const hasMateModule = completedModules?.includes('mate') || false;
      const hasPremiumPlan = userPlan === 'premium';
      return hasMateModule && hasPremiumPlan;

    case 'worldcup':
      // Complete Soccer Module + Play soccer game for 5 consecutive days
      const hasSoccerModule = completedModules?.includes('soccer') || false;
      const hasSoccerStreak = (soccerGameStreak || 0) >= 5;
      return hasSoccerModule && hasSoccerStreak;

    default:
      return false;
  }
}

export function getBadgeIcon(badgeId: string): string {
  switch (badgeId) {
    case 'mate':
      return '🧉';
    case 'worldcup':
      return '⚽';
    default:
      return '🎖️';
  }
}
