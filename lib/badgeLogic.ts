export interface Badge {
  id: string;
  name: string;
  image: string;
  plan: string;
  requirements: string[];
}

export function isBadgeUnlocked(badge: Badge, user: any): boolean {
  if (!user) return false;

  const userPlan = user.publicMetadata?.plan as string | undefined;
  const hasPostedComment = user.publicMetadata?.hasPostedComment as boolean | undefined;

  // Debug log to see user metadata in real-time
  console.log(`[BadgeLogic] Checking badge: ${badge.id}, User plan: ${userPlan}, Has posted comment: ${hasPostedComment}`);

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
      return '/assets/badges/badge-std-argentina.png.png';
    case 'escarapela':
      return '/assets/badges/badge-std-escarapela.png.png';
    case 'mate':
      return '/assets/badges/badge-pre-mate.png.png';
    case 'worldcup':
      return '/assets/badges/badge-pre-worldcup.png.png';
    default:
      return '/assets/badges/badge-std-escarapela.png.png';
  }
}
