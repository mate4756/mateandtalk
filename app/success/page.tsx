'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isValidating, setIsValidating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [plan, setPlan] = useState<'standard' | 'premium' | null>(null);

  useEffect(() => {
    const validatePlan = async () => {
      if (!isLoaded || !user) {
        setError('You must be signed in to view this page');
        setIsValidating(false);
        return;
      }

      const planParam = searchParams.get('plan') as 'standard' | 'premium' | null;
      
      if (!planParam || (planParam !== 'standard' && planParam !== 'premium')) {
        setError('Invalid plan parameter');
        setIsValidating(false);
        return;
      }

      setPlan(planParam);

      // Validate user's current plan from Clerk (webhook should have already updated it)
      const userPlan = user.publicMetadata?.plan as 'standard' | 'premium' | undefined;
      
      if (userPlan === planParam) {
        setSuccess(true);
      } else {
        // Webhook hasn't processed yet, show success anyway (it will process shortly)
        console.log('Webhook may still be processing. Plan:', userPlan, 'Expected:', planParam);
        setSuccess(true);
      }

      setIsValidating(false);
    };

    validatePlan();
  }, [isLoaded, user, searchParams]);

  if (isValidating) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-dark)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--gold-highlight)' }}></div>
          <p style={{ color: 'var(--text-accent)' }}>Validating your plan...</p>
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
    const isPremium = plan === 'premium';
    
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-dark)' }}>
        <div className="text-center max-w-2xl mx-4 px-6 py-12">
          <div className="text-6xl mb-6">{isPremium ? '🌟' : '✅'}</div>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>
            {isPremium ? 'Welcome to the Premium plan!' : 'Congratulations!'}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: 'var(--text-accent)' }}>
            {isPremium 
              ? 'We are thrilled to have you here. You now have full access to all exclusive features and priority support. We hope this journey helps you achieve all your goals. Your feedback is invaluable, so please don\'t hesitate to reach out via our official email or the comments section. Welcome to the family!'
              : 'Congratulations on acquiring your plan and becoming part of the family! We hope you enjoy the learning journey. If you have any suggestions, feel free to use the comments section or send us an email at our official address. Wishing you the best during your stay!'
            }
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: isPremium ? '#E5B567' : 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Go to Home
          </Link>
        </div>
      </main>
    );
  }

  return null;
}
