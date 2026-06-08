export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'registration' | 'subscription' | 'streak' | 'module';
  condition: (user: any) => boolean;
  reward?: string;
}

export interface UserAchievements {
  registrationCompleted: boolean;
  subscriptionCompleted: boolean;
  streakDays: number;
  streakMilestones: {
    threeDays: boolean;
    sevenDays: boolean;
    fifteenDays: boolean;
    thirtyDays: boolean;
  };
  unlockedBadges: string[];
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'registration-complete',
    name: 'Welcome Aboard',
    description: 'Complete your profile and verify your email',
    icon: '🎉',
    category: 'registration',
    condition: (user) => {
      const hasProfile = user?.firstName && user?.lastName;
      const isEmailVerified = user?.emailAddresses[0]?.verification?.status === 'verified';
      return hasProfile && isEmailVerified;
    },
    reward: 'Profile access unlocked'
  },
  {
    id: 'subscription-purchased',
    name: 'Premium Member',
    description: 'Purchase a Standard or Premium plan',
    icon: '⭐',
    category: 'subscription',
    condition: (user) => {
      const plan = user?.publicMetadata?.plan as 'standard' | 'premium' | undefined;
      return plan === 'standard' || plan === 'premium';
    },
    reward: 'Full access to all modules'
  },
  {
    id: 'cebador-de-ley',
    name: 'Cebador de Ley',
    description: 'Complete the Master Cebador challenge in the Mate module',
    icon: '🧉',
    category: 'module',
    condition: (user) => {
      const unlockedBadges = (user?.unsafeMetadata?.unlockedBadges as string[]) || [];
      return unlockedBadges.includes('cebador-de-ley');
    },
    reward: 'Master Cebador badge'
  },
  {
    id: 'patrimonio-futbolero',
    name: 'Patrimonio Futbolero',
    description: 'Complete the Legends Selection Board challenge in the Football module',
    icon: '⚽',
    category: 'module',
    condition: (user) => {
      const unlockedBadges = (user?.unsafeMetadata?.unlockedBadges as string[]) || [];
      return unlockedBadges.includes('patrimonio-futbolero');
    },
    reward: 'Football Heritage badge'
  },
  {
    id: 'mate-master',
    name: 'Mate Master',
    description: 'Complete all 3 minigames in the Mate module',
    icon: '🧉',
    category: 'module',
    condition: (user) => {
      const unlockedBadges = (user?.unsafeMetadata?.unlockedBadges as string[]) || [];
      return unlockedBadges.includes('mate-master');
    },
    reward: 'Mate Master badge'
  },
  {
    id: 'streak-3-days',
    name: 'Consistent Learner',
    description: 'Log in for 3 consecutive days',
    icon: '🔥',
    category: 'streak',
    condition: (user) => {
      const streakDays = (user?.unsafeMetadata?.streakDays as number) || 0;
      return streakDays >= 3;
    },
    reward: '3-day streak badge'
  },
  {
    id: 'streak-7-days',
    name: 'Dedicated Student',
    description: 'Log in for 7 consecutive days',
    icon: '🔥🔥',
    category: 'streak',
    condition: (user) => {
      const streakDays = (user?.unsafeMetadata?.streakDays as number) || 0;
      return streakDays >= 7;
    },
    reward: '7-day streak badge'
  },
  {
    id: 'streak-15-days',
    name: 'Master Learner',
    description: 'Log in for 15 consecutive days',
    icon: '🔥🔥🔥',
    category: 'streak',
    condition: (user) => {
      const streakDays = (user?.unsafeMetadata?.streakDays as number) || 0;
      return streakDays >= 15;
    },
    reward: '15-day streak badge'
  },
  {
    id: 'streak-30-days',
    name: 'Legendary Streak',
    description: 'Log in for 30 consecutive days',
    icon: '👑',
    category: 'streak',
    condition: (user) => {
      const streakDays = (user?.unsafeMetadata?.streakDays as number) || 0;
      return streakDays >= 30;
    },
    reward: 'Unlock level badge'
  }
];

export function checkAchievements(user: any): Achievement[] {
  return ACHIEVEMENTS.filter(achievement => achievement.condition(user));
}

export function getUserAchievements(user: any): UserAchievements {
  const plan = user?.publicMetadata?.plan as 'standard' | 'premium' | undefined;
  const streakDays = (user?.unsafeMetadata?.streakDays as number) || 0;
  const hasProfile = user?.firstName && user?.lastName;
  const isEmailVerified = user?.emailAddresses[0]?.verification?.status === 'verified';

  return {
    registrationCompleted: hasProfile && isEmailVerified,
    subscriptionCompleted: plan === 'standard' || plan === 'premium',
    streakDays,
    streakMilestones: {
      threeDays: streakDays >= 3,
      sevenDays: streakDays >= 7,
      fifteenDays: streakDays >= 15,
      thirtyDays: streakDays >= 30,
    },
    unlockedBadges: (user?.unsafeMetadata?.unlockedBadges as string[]) || []
  };
}
