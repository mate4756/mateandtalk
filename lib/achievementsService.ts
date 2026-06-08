import { clerkClient } from '@clerk/nextjs/server';

export type AchievementAction = 
  | 'login'
  | 'purchase_standard'
  | 'purchase_premium'
  | 'complete_module'
  | 'verify_email'
  | 'complete_profile'
  | 'unlock_cebador_de_ley'
  | 'unlock_patrimonio_futbolero'
  | 'unlock_mate_master';

export interface UserProgress {
  userId: string;
  streakDays: number;
  lastLogin: string;
  isFounder: boolean;
  unlockedBadges: string[];
  completedAchievements: string[];
  purchaseCount: number;
}

export interface AchievementReward {
  badgeId?: string;
  achievementId: string;
  message: string;
}

// In-memory storage for demo purposes (in production, use a database)
const userProgressStore = new Map<string, UserProgress>();
const globalPurchaseCount = 0;

export async function updateUserProgress(
  userId: string,
  action: AchievementAction
): Promise<{ success: boolean; rewards?: AchievementReward[]; error?: string }> {
  try {
    const user = await clerkClient.users.getUser(userId);
    const currentProgress = getUserProgress(userId);
    
    let rewards: AchievementReward[] = [];
    
    switch (action) {
      case 'login':
        rewards = await handleLoginStreak(userId, user, currentProgress);
        break;
      case 'purchase_standard':
        rewards = await handlePurchase(userId, 'standard', currentProgress);
        break;
      case 'purchase_premium':
        rewards = await handlePurchase(userId, 'premium', currentProgress);
        break;
      case 'complete_module':
        rewards = await handleModuleCompletion(userId, currentProgress);
        break;
      case 'verify_email':
        rewards = await handleEmailVerification(userId, user, currentProgress);
        break;
      case 'complete_profile':
        rewards = await handleProfileCompletion(userId, user, currentProgress);
        break;
      case 'unlock_cebador_de_ley':
        rewards = await handleCebadorDeLey(userId, currentProgress);
        break;
      case 'unlock_patrimonio_futbolero':
        rewards = await handlePatrimonioFutbolero(userId, currentProgress);
        break;
      case 'unlock_mate_master':
        rewards = await handleMateMaster(userId, currentProgress);
        break;
    }
    
    return { success: true, rewards };
  } catch (error) {
    console.error('Error updating user progress:', error);
    return { success: false, error: 'Failed to update progress' };
  }
}

async function handleLoginStreak(
  userId: string,
  user: any,
  currentProgress: UserProgress
): Promise<AchievementReward[]> {
  const rewards: AchievementReward[] = [];
  const today = new Date();
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayString = todayDateOnly.toISOString().split('T')[0];
  const lastLogin = currentProgress.lastLogin;
  
  let newStreakDays = currentProgress.streakDays;
  
  if (lastLogin) {
    const lastDate = new Date(lastLogin);
    const lastDateOnly = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
    
    // Calculate difference in days (ignoring time)
    const diffTime = todayDateOnly.getTime() - lastDateOnly.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Check if more than 48 hours have passed (2 days)
    const hoursPassed = diffTime / (1000 * 60 * 60);
    
    if (diffDays === 0) {
      // Same day - keep current streak
      newStreakDays = currentProgress.streakDays;
    } else if (diffDays === 1) {
      // Yesterday - increment streak
      newStreakDays = currentProgress.streakDays + 1;
    } else if (hoursPassed > 48) {
      // More than 48 hours passed - reset streak to 1
      newStreakDays = 1;
    } else {
      // Between 24-48 hours but not consecutive day - reset streak
      newStreakDays = 1;
    }
  } else {
    newStreakDays = 1;
  }
  
  // Check for streak milestones
  const streakMilestones = [
    { days: 3, achievementId: 'streak-3-days', badgeId: 'streak-3-badge' },
    { days: 7, achievementId: 'streak-7-days', badgeId: 'streak-7-badge' },
    { days: 15, achievementId: 'streak-15-days', badgeId: 'streak-15-badge' },
    { days: 30, achievementId: 'streak-30-days', badgeId: 'streak-30-badge' },
  ];
  
  for (const milestone of streakMilestones) {
    if (newStreakDays >= milestone.days && !currentProgress.completedAchievements.includes(milestone.achievementId)) {
      rewards.push({
        badgeId: milestone.badgeId,
        achievementId: milestone.achievementId,
        message: `You've reached ${milestone.days} consecutive days!`,
      });
      currentProgress.completedAchievements.push(milestone.achievementId);
      currentProgress.unlockedBadges.push(milestone.badgeId);
    }
  }
  
  // 30-day milestone: unlock plan badge
  if (newStreakDays >= 30) {
    const plan = user.publicMetadata?.plan as 'standard' | 'premium' | undefined;
    if (plan && !currentProgress.unlockedBadges.includes(`${plan}-badge`)) {
      rewards.push({
        badgeId: `${plan}-badge`,
        achievementId: 'plan-badge-unlocked',
        message: `You've unlocked your ${plan} badge!`,
      });
      currentProgress.unlockedBadges.push(`${plan}-badge`);
    }
  }
  
  // Update progress
  currentProgress.streakDays = newStreakDays;
  currentProgress.lastLogin = todayString;
  setUserProgress(userId, currentProgress);
  
  // Update Clerk metadata
  await clerkClient.users.updateUser(userId, {
    unsafeMetadata: {
      ...user.unsafeMetadata,
      lastLogin: todayString,
      streakDays: newStreakDays,
      unlockedBadges: currentProgress.unlockedBadges,
      completedAchievements: currentProgress.completedAchievements,
    },
  });
  
  return rewards;
}

async function handlePurchase(
  userId: string,
  plan: 'standard' | 'premium',
  currentProgress: UserProgress
): Promise<AchievementReward[]> {
  const rewards: AchievementReward[] = [];
  
  // Update purchase count
  currentProgress.purchaseCount += 1;
  
  // Check if this is the first purchase (founder)
  if (currentProgress.purchaseCount === 1) {
    currentProgress.isFounder = true;
    rewards.push({
      badgeId: 'founder-badge',
      achievementId: 'founder-status',
      message: 'You are a Founder! 🎉',
    });
    currentProgress.unlockedBadges.push('founder-badge');
    currentProgress.completedAchievements.push('founder-status');
  }
  
  // Check if purchase is #25 or less for special badges
  if (currentProgress.purchaseCount <= 25) {
    if (!currentProgress.unlockedBadges.includes('argentina-badge')) {
      rewards.push({
        badgeId: 'argentina-badge',
        achievementId: 'early-adopter',
        message: 'You unlocked the Argentina badge! 🇦🇷',
      });
      currentProgress.unlockedBadges.push('argentina-badge');
      currentProgress.completedAchievements.push('early-adopter');
    }
    
    if (!currentProgress.unlockedBadges.includes('escarapela-badge')) {
      rewards.push({
        badgeId: 'escarapela-badge',
        achievementId: 'early-adopter-escarapela',
        message: 'You unlocked the Escarapela badge! 🏆',
      });
      currentProgress.unlockedBadges.push('escarapela-badge');
      currentProgress.completedAchievements.push('early-adopter-escarapela');
    }
  }
  
  // Unlock plan achievement
  const planAchievementId = plan === 'standard' ? 'subscription-purchased' : 'subscription-purchased';
  if (!currentProgress.completedAchievements.includes(planAchievementId)) {
    rewards.push({
      achievementId: planAchievementId,
      message: `You've purchased the ${plan} plan!`,
    });
    currentProgress.completedAchievements.push(planAchievementId);
  }
  
  setUserProgress(userId, currentProgress);
  
  // Update Clerk metadata
  const user = await clerkClient.users.getUser(userId);
  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      ...user.publicMetadata,
      plan,
      isFounder: currentProgress.isFounder,
    },
    unsafeMetadata: {
      ...user.unsafeMetadata,
      purchaseCount: currentProgress.purchaseCount,
      unlockedBadges: currentProgress.unlockedBadges,
      completedAchievements: currentProgress.completedAchievements,
    },
  });
  
  return rewards;
}

async function handleModuleCompletion(
  userId: string,
  currentProgress: UserProgress
): Promise<AchievementReward[]> {
  const rewards: AchievementReward[] = [];
  // Module completion logic can be expanded based on specific modules
  return rewards;
}

async function handleEmailVerification(
  userId: string,
  user: any,
  currentProgress: UserProgress
): Promise<AchievementReward[]> {
  const rewards: AchievementReward[] = [];
  
  const hasProfile = user.firstName && user.lastName;
  const isEmailVerified = user.emailAddresses[0]?.verification?.status === 'verified';
  
  if (isEmailVerified && hasProfile && !currentProgress.completedAchievements.includes('registration-complete')) {
    rewards.push({
      achievementId: 'registration-complete',
      message: 'Profile complete and email verified! 🎉',
    });
    currentProgress.completedAchievements.push('registration-complete');
  }
  
  setUserProgress(userId, currentProgress);
  
  return rewards;
}

async function handleProfileCompletion(
  userId: string,
  user: any,
  currentProgress: UserProgress
): Promise<AchievementReward[]> {
  const rewards: AchievementReward[] = [];
  
  const hasProfile = user.firstName && user.lastName;
  const isEmailVerified = user.emailAddresses[0]?.verification?.status === 'verified';
  
  if (hasProfile && isEmailVerified && !currentProgress.completedAchievements.includes('registration-complete')) {
    rewards.push({
      achievementId: 'registration-complete',
      message: 'Profile complete! 🎉',
    });
    currentProgress.completedAchievements.push('registration-complete');
  }
  
  setUserProgress(userId, currentProgress);
  
  return rewards;
}

async function handleCebadorDeLey(
  userId: string,
  currentProgress: UserProgress
): Promise<AchievementReward[]> {
  const rewards: AchievementReward[] = [];
  
  if (!currentProgress.completedAchievements.includes('cebador-de-ley')) {
    rewards.push({
      badgeId: 'cebador-de-ley-badge',
      achievementId: 'cebador-de-ley',
      message: 'You unlocked the Cebador de Ley achievement! 🧉',
    });
    currentProgress.completedAchievements.push('cebador-de-ley');
    currentProgress.unlockedBadges.push('cebador-de-ley-badge');
  }
  
  setUserProgress(userId, currentProgress);
  
  // Update Clerk metadata
  const user = await clerkClient.users.getUser(userId);
  await clerkClient.users.updateUser(userId, {
    unsafeMetadata: {
      ...user.unsafeMetadata,
      unlockedBadges: currentProgress.unlockedBadges,
      completedAchievements: currentProgress.completedAchievements,
    },
  });
  
  return rewards;
}

async function handlePatrimonioFutbolero(
  userId: string,
  currentProgress: UserProgress
): Promise<AchievementReward[]> {
  const rewards: AchievementReward[] = [];
  
  if (!currentProgress.completedAchievements.includes('patrimonio-futbolero')) {
    rewards.push({
      badgeId: 'patrimonio-futbolero-badge',
      achievementId: 'patrimonio-futbolero',
      message: 'You unlocked the Patrimonio Futbolero achievement! ⚽',
    });
    currentProgress.completedAchievements.push('patrimonio-futbolero');
    currentProgress.unlockedBadges.push('patrimonio-futbolero-badge');
  }
  
  setUserProgress(userId, currentProgress);
  
  // Update Clerk metadata
  const user = await clerkClient.users.getUser(userId);
  await clerkClient.users.updateUser(userId, {
    unsafeMetadata: {
      ...user.unsafeMetadata,
      unlockedBadges: currentProgress.unlockedBadges,
      completedAchievements: currentProgress.completedAchievements,
    },
  });
  
  return rewards;
}

async function handleMateMaster(
  userId: string,
  currentProgress: UserProgress
): Promise<AchievementReward[]> {
  const rewards: AchievementReward[] = [];
  
  if (!currentProgress.completedAchievements.includes('mate-master')) {
    rewards.push({
      badgeId: 'mate-master-badge',
      achievementId: 'mate-master',
      message: 'You unlocked the Mate Master achievement! 🧉',
    });
    currentProgress.completedAchievements.push('mate-master');
    currentProgress.unlockedBadges.push('mate-master-badge');
  }
  
  setUserProgress(userId, currentProgress);
  
  // Update Clerk metadata
  const user = await clerkClient.users.getUser(userId);
  await clerkClient.users.updateUser(userId, {
    unsafeMetadata: {
      ...user.unsafeMetadata,
      unlockedBadges: currentProgress.unlockedBadges,
      completedAchievements: currentProgress.completedAchievements,
    },
  });
  
  return rewards;
}

export function getUserProgress(userId: string): UserProgress {
  if (!userProgressStore.has(userId)) {
    userProgressStore.set(userId, {
      userId,
      streakDays: 0,
      lastLogin: '',
      isFounder: false,
      unlockedBadges: [],
      completedAchievements: [],
      purchaseCount: 0,
    });
  }
  return userProgressStore.get(userId)!;
}

function setUserProgress(userId: string, progress: UserProgress): void {
  userProgressStore.set(userId, progress);
}

export function getUserAchievements(userId: string): string[] {
  const progress = getUserProgress(userId);
  return progress.completedAchievements;
}

export function getUserBadges(userId: string): string[] {
  const progress = getUserProgress(userId);
  return progress.unlockedBadges;
}

export function isUserFounder(userId: string): boolean {
  const progress = getUserProgress(userId);
  return progress.isFounder;
}
