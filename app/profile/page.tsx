'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { getUserAchievements, ACHIEVEMENTS } from '../lib/achievements';
import { useAchievementTracking } from '../lib/achievementTracking';

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [achievements, setAchievements] = useState<any>(null);

  // Track achievements on page load
  useAchievementTracking();

  useEffect(() => {
    if (isLoaded && user) {
      setUsername(user.firstName || '');
      setAchievements(getUserAchievements(user));
    }
  }, [isLoaded, user]);

  const handleUsernameUpdate = async () => {
    if (!user) return;

    try {
      await user.update({
        firstName: username,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  if (!isLoaded) {
    return <div style={{ color: 'var(--text-main)' }}>Loading...</div>;
  }

  if (!user) {
    return <div style={{ color: 'var(--text-main)' }}>Please sign in to view your profile.</div>;
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
            My Profile
          </h1>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Back to Home
          </Link>
        </div>

        {/* Profile Section */}
        <div className="backdrop-blur-sm rounded-2xl p-8 mb-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
          <h2 className="font-['Playfair_Display'] text-2xl font-semibold mb-6" style={{ color: 'var(--text-main)' }}>
            Personal Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-accent)' }}>
                Username
              </label>
              {isEditing ? (
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 rounded-lg p-3 transition-all duration-300"
                    style={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                  <button
                    onClick={handleUsernameUpdate}
                    className="px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
                    style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
                    style={{ backgroundColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-lg" style={{ color: 'var(--text-main)' }}>
                    {username || 'No name'}
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
                    style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-accent)' }}>
                Email
              </label>
              <p className="text-lg" style={{ color: 'var(--text-main)' }}>
                {user.emailAddresses[0]?.emailAddress}
                {user.emailAddresses[0]?.verification?.status === 'verified' && (
                  <span className="ml-2 text-sm" style={{ color: '#E5B567' }}>✓ Verified</span>
                )}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-accent)' }}>
                Plan
              </label>
              <p className="text-lg" style={{ color: 'var(--text-main)' }}>
                {user.publicMetadata?.plan ? String(user.publicMetadata.plan).toUpperCase() : 'Free'}
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="backdrop-blur-sm rounded-2xl p-8 mb-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
          <h2 className="font-['Playfair_Display'] text-2xl font-semibold mb-6" style={{ color: 'var(--text-main)' }}>
            Achievements
          </h2>

          <div className="space-y-4">
            {ACHIEVEMENTS.map((achievement) => {
              const isUnlocked = achievement.condition(user);
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg transition-all duration-300 ${isUnlocked ? 'opacity-100' : 'opacity-50'}`}
                  style={{ 
                    backgroundColor: isUnlocked ? 'rgba(229, 181, 103, 0.1)' : 'var(--bg-dark)',
                    border: isUnlocked ? '1px solid #E5B567' : '1px solid var(--border-subtle)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg" style={{ color: 'var(--text-main)' }}>
                        {achievement.name}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-accent)' }}>
                        {achievement.description}
                      </p>
                      {achievement.reward && isUnlocked && (
                        <p className="text-sm mt-1" style={{ color: '#E5B567' }}>
                          Reward: {achievement.reward}
                        </p>
                      )}
                    </div>
                    {isUnlocked && (
                      <span className="text-2xl">✓</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges Section */}
        {achievements?.unlockedBadges && achievements.unlockedBadges.length > 0 && (
          <div className="backdrop-blur-sm rounded-2xl p-8 mb-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
            <h2 className="font-['Playfair_Display'] text-2xl font-semibold mb-6" style={{ color: 'var(--text-main)' }}>
              Unlocked Badges
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.unlockedBadges.map((badgeId: string) => (
                <div
                  key={badgeId}
                  className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: 'rgba(229, 181, 103, 0.1)',
                    border: '1px solid #E5B567'
                  }}
                >
                  <div className="text-4xl mb-2">
                    {badgeId === 'standard-badge' ? '🏅' : badgeId === 'premium-badge' ? '👑' : '🎖️'}
                  </div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                    {badgeId === 'standard-badge' ? 'Standard' : badgeId === 'premium-badge' ? 'Premium' : 'Badge'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Streak Section */}
        {achievements && (
          <div className="backdrop-blur-sm rounded-2xl p-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
            <h2 className="font-['Playfair_Display'] text-2xl font-semibold mb-6" style={{ color: 'var(--text-main)' }}>
              Login Streak
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { days: 3, label: '3 Days', unlocked: achievements.streakMilestones.threeDays },
                { days: 7, label: '7 Days', unlocked: achievements.streakMilestones.sevenDays },
                { days: 15, label: '15 Days', unlocked: achievements.streakMilestones.fifteenDays },
                { days: 30, label: '30 Days', unlocked: achievements.streakMilestones.thirtyDays },
              ].map((milestone) => (
                <div
                  key={milestone.days}
                  className={`p-4 rounded-lg text-center transition-all duration-300 ${milestone.unlocked ? 'opacity-100' : 'opacity-50'}`}
                  style={{ 
                    backgroundColor: milestone.unlocked ? 'rgba(229, 181, 103, 0.1)' : 'var(--bg-dark)',
                    border: milestone.unlocked ? '1px solid #E5B567' : '1px solid var(--border-subtle)'
                  }}
                >
                  <p className="text-3xl font-bold mb-2" style={{ color: milestone.unlocked ? '#E5B567' : 'var(--text-accent)' }}>
                    {milestone.days}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-main)' }}>
                    {milestone.label}
                  </p>
                  {milestone.unlocked && (
                    <p className="text-xs mt-2" style={{ color: '#E5B567' }}>✓ Completed</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-lg" style={{ color: 'var(--text-main)' }}>
                Current streak: <span className="font-bold" style={{ color: '#E5B567' }}>{achievements.streakDays} days</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
