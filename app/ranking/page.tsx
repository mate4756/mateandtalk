'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface RankingEntry {
  position: number;
  username: string;
  badge: string | null;
  hours: number;
  plan: string | null;
}

export default function RankingPage() {
  const [rankingData, setRankingData] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch ranking data from API
    const fetchRanking = async () => {
      try {
        const response = await fetch('/api/ranking?limit=10');
        const data = await response.json();
        
        if (data.success) {
          const formattedData = data.ranking.map((entry: any) => ({
            position: entry.position,
            username: entry.username,
            badge: entry.badge || null,
            hours: entry.weeklyHours,
            plan: entry.plan || null,
          }));
          setRankingData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching ranking:', error);
        // Fallback to mock data if API fails
        const mockData: RankingEntry[] = [
          { position: 1, username: 'MateLover2024', badge: '👑 Founder', hours: 45.5, plan: 'Premium' },
          { position: 2, username: 'BuenosAiresFan', badge: '🏅 Standard', hours: 42.3, plan: 'Standard' },
          { position: 3, username: 'TangoMaster', badge: null, hours: 38.7, plan: 'Premium' },
          { position: 4, username: 'ArgentineSoul', badge: '🇦🇷 Argentina', hours: 35.2, plan: 'Standard' },
          { position: 5, username: 'SpanishLearner', badge: null, hours: 32.8, plan: null },
          { position: 6, username: 'PorteñoVibes', badge: null, hours: 30.1, plan: 'Premium' },
          { position: 7, username: 'MateExpert', badge: '🏆 Escarapela', hours: 28.5, plan: 'Standard' },
          { position: 8, username: 'BuenosAiresExplorer', badge: null, hours: 26.3, plan: null },
          { position: 9, username: 'SpanishJourney', badge: null, hours: 24.7, plan: 'Standard' },
          { position: 10, username: 'LearningDaily', badge: null, hours: 22.1, plan: null },
        ];
        setRankingData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div style={{ color: 'var(--text-main)' }}>Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
            Weekly Ranking
          </h1>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Back to Home
          </Link>
        </div>

        <div className="backdrop-blur-sm rounded-2xl p-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
          <p className="text-lg mb-6" style={{ color: 'var(--text-accent)' }}>
            Top learners this week based on study hours and platform activity
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <th className="text-left py-4 px-4 font-semibold" style={{ color: 'var(--text-main)' }}>
                    Position
                  </th>
                  <th className="text-left py-4 px-4 font-semibold" style={{ color: 'var(--text-main)' }}>
                    Username
                  </th>
                  <th className="text-left py-4 px-4 font-semibold" style={{ color: 'var(--text-main)' }}>
                    Badge
                  </th>
                  <th className="text-left py-4 px-4 font-semibold" style={{ color: 'var(--text-main)' }}>
                    Plan
                  </th>
                  <th className="text-right py-4 px-4 font-semibold" style={{ color: 'var(--text-main)' }}>
                    Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {rankingData.map((entry) => (
                  <tr
                    key={entry.position}
                    className="transition-all duration-300 hover:bg-opacity-50"
                    style={{ 
                      borderBottom: '1px solid var(--border-subtle)',
                      backgroundColor: entry.position <= 3 ? 'rgba(229, 181, 103, 0.05)' : 'transparent'
                    }}
                  >
                    <td className="py-4 px-4">
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold"
                        style={{ 
                          backgroundColor: entry.position <= 3 ? '#E5B567' : 'var(--border-subtle)',
                          color: entry.position <= 3 ? 'var(--bg-dark)' : 'var(--text-main)'
                        }}
                      >
                        {entry.position}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold" style={{ color: 'var(--text-main)' }}>
                      {entry.username}
                    </td>
                    <td className="py-4 px-4">
                      {entry.badge ? (
                        <span
                          className="inline-block px-3 py-1 rounded-full text-sm"
                          style={{ 
                            backgroundColor: 'rgba(229, 181, 103, 0.1)',
                            border: '1px solid #E5B567',
                            color: 'var(--text-main)'
                          }}
                        >
                          {entry.badge}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-accent)' }}>—</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {entry.plan ? (
                        <span
                          className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
                          style={{ 
                            backgroundColor: entry.plan === 'Premium' ? 'rgba(229, 181, 103, 0.2)' : 'rgba(229, 181, 103, 0.1)',
                            border: '1px solid #E5B567',
                            color: 'var(--text-main)'
                          }}
                        >
                          {entry.plan}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-accent)' }}>Free</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right font-semibold" style={{ color: '#E5B567' }}>
                      {entry.hours.toFixed(1)}h
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm" style={{ color: 'var(--text-accent)' }}>
              Ranking updated weekly based on learning hours and platform activity
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
