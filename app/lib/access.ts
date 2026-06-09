'use client';

import { useUser } from '@clerk/nextjs';

export function checkAccess(isAdminMode: boolean, isLoggedIn: boolean, userPlan?: 'standard' | 'premium', userId?: string): boolean {
  // Admin mode bypasses all restrictions, but only for authorized user
  if (isAdminMode && userId) {
    const ADMIN_USER_ID = 'user_3Emd2ZLWUqQcKPmt4uGTjrilks7';
    if (userId === ADMIN_USER_ID) {
      return true;
    }
  }

  // User must be logged in
  if (!isLoggedIn) {
    return false;
  }

  // User must have a plan (standard or premium)
  if (!userPlan) {
    return false;
  }

  // All checks passed
  return true;
}

export function getRedirectDestination(isAdminMode: boolean, isLoggedIn: boolean, userPlan?: 'standard' | 'premium', userId?: string): string | null {
  // Admin mode bypasses all restrictions, but only for authorized user
  if (isAdminMode && userId) {
    const ADMIN_USER_ID = 'user_3Emd2ZLWUqQcKPmt4uGTjrilks7';
    if (userId === ADMIN_USER_ID) {
      return null;
    }
  }

  // User not logged in - redirect to login
  if (!isLoggedIn) {
    return '/login';
  }

  // User logged in but no plan - redirect to plans
  if (!userPlan) {
    return '/plans';
  }

  // User has access
  return null;
}
