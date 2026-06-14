'use client';

import React from 'react';
import Link from 'next/link';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';

export default function ArcadePage() {
  const { isSignedIn, user } = useUser();

  // Placeholder leaderboard data
  const leaderboardData = [
    { rank: 1, username: 'SpeedDemon', score: 15420 },
    { rank: 2, username: 'ArgentineAce', score: 12850 },
    { rank: 3, username: 'MateMaster', score: 11200 },
    { rank: 4, username: 'DodgeKing', score: 9870 },
    { rank: 5, username: 'ReflexPro', score: 8540 },
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
            Arcade
          </h1>
          <p className="text-xl" style={{ color: 'var(--text-accent)' }}>
            Test your skills and compete with the community
          </p>
        </div>

        {/* Gatekeeping - Show if not authenticated */}
        {!isSignedIn ? (
          <div className="backdrop-blur-sm rounded-2xl p-12 text-center" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-subtle)' }}>
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🎮</div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                Unlock The Last Run
              </h2>
              <p className="text-lg mb-8" style={{ color: 'var(--text-accent)' }}>
                Sign up to start your run and compete for the top spot on our global leaderboard.
              </p>
              <SignInButton mode="modal">
                <button className="px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 font-bold text-lg" style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}>
                  Sign Up / Login
                </button>
              </SignInButton>
            </div>
          </div>
        ) : (
          /* Game Section - Show if authenticated */
          <div className="space-y-12">
            {/* Game Embed */}
            <div className="backdrop-blur-sm rounded-2xl p-8" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-subtle)' }}>
              <div className="mb-8">
                <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  THE LAST RUN
                </h2>
                <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
                  How far can you go? Dodge obstacles, test your reflexes, and climb to the top of our leaderboard. Prove you have the best skills in the community!
                </p>
              </div>

              {/* Game Iframe Placeholder */}
              <div className="relative w-full" style={{ aspectRatio: '16/9', backgroundColor: '#2A2420', borderRadius: '12px', overflow: 'hidden' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🏃</div>
                    <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
                      Game Embed Coming Soon
                    </p>
                    <p className="text-sm mt-2" style={{ color: 'var(--text-accent)', opacity: 0.7 }}>
                      Side-scrolling dodge game
                    </p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--plans-bg)', border: '1px solid var(--border-subtle)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--gold-highlight)' }}>
                  How to Play:
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-accent)' }}>
                  Use arrow keys or touch controls to duck and dodge obstacles. The further you go, the higher your score!
                </p>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="backdrop-blur-sm rounded-2xl p-8" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-subtle)' }}>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-6" style={{ color: 'var(--gold-highlight)' }}>
                Leaderboard
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                        Rank
                      </th>
                      <th className="text-left py-3 px-4 font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                        Username
                      </th>
                      <th className="text-right py-3 px-4 font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((entry) => (
                      <tr 
                        key={entry.rank} 
                        style={{ borderBottom: '1px solid var(--border-subtle)' }}
                        className={entry.rank <= 3 ? 'bg-opacity-20' : ''}
                      >
                        <td className="py-4 px-4">
                          <span className="font-bold" style={{ 
                            color: entry.rank === 1 ? '#FFD700' : entry.rank === 2 ? '#C0C0C0' : entry.rank === 3 ? '#CD7F32' : 'var(--text-main)'
                          }}>
                            #{entry.rank}
                          </span>
                        </td>
                        <td className="py-4 px-4" style={{ color: 'var(--text-main)' }}>
                          {entry.username}
                        </td>
                        <td className="py-4 px-4 text-right font-mono" style={{ color: 'var(--gold-highlight)' }}>
                          {entry.score.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* User's Score Placeholder */}
              {user && (
                <div className="mt-6 p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--plans-bg)', border: '1px solid var(--border-subtle)' }}>
                  <p className="text-sm" style={{ color: 'var(--text-accent)' }}>
                    Your Best Score: <span className="font-bold" style={{ color: 'var(--gold-highlight)' }}>Coming Soon</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
