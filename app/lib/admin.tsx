'use client';

import { useAdminContext } from '../providers/AdminProvider';
import { useUser } from '@clerk/nextjs';

export function useAdminMode() {
  try {
    const { isAdminMode, setAdminMode } = useAdminContext();
    return { isAdminMode, setAdminMode };
  } catch (error) {
    console.warn('useAdminMode must be used within an AdminProvider, using fallback');
    return { isAdminMode: false, setAdminMode: () => {} };
  }
}

export function AdminIndicator({ isAdminMode }: { isAdminMode: boolean }) {
  // Admin indicator removed - keep admin power in backend, not in UI
  return null;
}

export function AdminAccess() {
  const { isAdminMode, setAdminMode } = useAdminMode();
  const { user } = useUser();

  // Only show admin button for specific user
  const ADMIN_USER_ID = 'user_3Emd2ZLWUqQcKPmt4uGTjrilks7';

  if (!user || user.id !== ADMIN_USER_ID) {
    return null;
  }

  return (
    <button
      onClick={() => setAdminMode(!isAdminMode)}
      className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
      style={{
        backgroundColor: isAdminMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(229, 181, 103, 0.2)',
        border: isAdminMode ? '2px solid #ef4444' : '2px solid #E5B567',
        color: isAdminMode ? '#ef4444' : '#E5B567'
      }}
    >
      {isAdminMode ? 'ADMIN ON' : 'ADMIN OFF'}
    </button>
  );
}


