'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isUpdating, setIsUpdating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const updatePlan = async () => {
      if (!isLoaded || !user) {
        setError('You must be signed in to view this page');
        setIsUpdating(false);
        return;
      }

      const plan = searchParams.get('plan') as 'standard' | 'premium' | null;
      
      if (!plan || (plan !== 'standard' && plan !== 'premium')) {
        setError('Invalid plan parameter');
        setIsUpdating(false);
        return;
      }

      try {
        // Update user's publicMetadata in Clerk
        const response = await fetch('/api/update-plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            plan,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update plan');
        }

        setSuccess(true);
        setIsUpdating(false);
      } catch (err) {
        console.error('Error updating plan:', err);
        setError('Failed to update your plan. Please contact support.');
        setIsUpdating(false);
      }
    };

    updatePlan();
  }, [isLoaded, user, searchParams]);

  if (isUpdating) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-dark)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--gold-highlight)' }}></div>
          <p style={{ color: 'var(--text-accent)' }}>Updating your plan...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-dark)' }}>
        <div className="text-center max-w-md mx-4">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="font-['Playfair_Display'] text-3xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
            Error
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--text-accent)' }}>
            {error}
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-dark)' }}>
        <div className="text-center max-w-md mx-4">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="font-['Playfair_Display'] text-3xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
            Payment Successful!
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--text-accent)' }}>
            Your plan has been updated successfully. You now have access to all premium features.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Go to Home
          </Link>
        </div>
      </main>
    );
  }

  return null;
}
