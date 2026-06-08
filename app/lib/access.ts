'use client';

export function checkAccess(isAdminMode: boolean, isLoggedIn: boolean, userPlan?: 'standard' | 'premium'): boolean {
  // Admin mode bypasses all restrictions
  if (isAdminMode) {
    return true;
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

export function getRedirectDestination(isAdminMode: boolean, isLoggedIn: boolean, userPlan?: 'standard' | 'premium'): string | null {
  // Admin mode bypasses all restrictions
  if (isAdminMode) {
    return null;
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
