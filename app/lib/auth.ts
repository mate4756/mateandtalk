'use client';

import { useAuth, useUser } from '@clerk/nextjs';

export function useAuthVerification() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  const isEmailVerified = user?.emailAddresses[0]?.verification?.status === 'verified';
  const userPlan = user?.publicMetadata?.plan as 'standard' | 'premium' | undefined;
  const hasPlan = userPlan === 'standard' || userPlan === 'premium';

  return {
    isSignedIn,
    isLoaded,
    isEmailVerified,
    userPlan,
    hasPlan,
    canComment: isSignedIn && isEmailVerified && hasPlan,
  };
}

export function getAuthErrorMessage(isSignedIn: boolean | undefined, isEmailVerified: boolean | undefined, hasPlan: boolean | undefined): string {
  if (!isSignedIn) {
    return 'Sign in to join the conversation.';
  }
  if (!isEmailVerified) {
    return 'Verify your email to join the conversation.';
  }
  if (!hasPlan) {
    return 'Exclusive access: Purchase a plan to join the conversation.';
  }
  return '';
}
