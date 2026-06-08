'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useAdminMode } from '../lib/admin';
import { useAuthVerification } from '../lib/auth';
import ThePerfectSlope from './components/ThePerfectSlope';
import TemperatureMaster from './components/TemperatureMaster';
import TheEtiquetteQuiz from './components/TheEtiquetteQuiz';

export default function MatePage() {
  const [showMinigames, setShowMinigames] = useState(false);
  const [completedGames, setCompletedGames] = useState<Set<string>>(new Set());
  const { user } = useUser();
  const { isAdminMode } = useAdminMode();
  const { hasPlan } = useAuthVerification();

  // Access Hierarchy: Admin > Paid User > Blocked
  const canAccessContent = isAdminMode || hasPlan;

  const handleGameComplete = (gameId: string) => {
    setCompletedGames(prev => new Set(prev).add(gameId));
    
    // Check if all 3 games are completed
    if (completedGames.size === 2) { // Adding the 3rd one
      unlockMateMasterAchievement();
    }
  };

  const unlockMateMasterAchievement = async () => {
    try {
      const response = await fetch('/api/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'unlock_mate_master',
        }),
      });
    } catch (error) {
      console.error('Error unlocking Mate Master achievement:', error);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 font-['Playfair_Display'] text-lg hover:scale-105 transition-all duration-300"
          style={{ color: 'var(--text-accent)' }}
        >
          ← Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-20">
        {canAccessContent ? (
          <div className="space-y-16">
            {/* Title Section */}
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🧉</div>
              <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold leading-tight" style={{ color: 'var(--text-main)' }}>
                The Ritual of Mate
              </h1>
              <p className="font-['Playfair_Display'] text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-accent)' }}>
                Discover the social art of sharing mate, its etiquette, and the conversations that flow around this sacred tradition.
              </p>
            </div>

            {/* What is Mate Section */}
            <div className="backdrop-blur-sm rounded-2xl p-8 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--section-border)' }}>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-6" style={{ color: 'var(--gold-highlight)' }}>
                What is it?
              </h2>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                <p>
                  The mate, which is actually the name of the gourd used to drink it, is a type of tea made from dried, chopped, and ground leaves called yerba mate. Although mate can be bought in bags (called 'mate cocido'), it is not the same drink. Mate is deeply linked to the Argentine culture. You will likely see it circulating in streets, parks, universities, and professional internships in Buenos Aires!
                </p>
                <p>
                  The mate has three essential parts: the mate (the gourd or cup used to hold the drink), the yerba (the tea leaves poured into the mate), and the bombilla (the metal or sometimes straw filter used for drinking).
                </p>
              </div>
            </div>

            {/* What does it taste like Section */}
            <div className="backdrop-blur-sm rounded-2xl p-8 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--section-border)' }}>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-6" style={{ color: 'var(--gold-highlight)' }}>
                What does it taste like?
              </h2>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                <p>
                  If you have never tried mate, you might be surprised. However, while studying in Buenos Aires, mate is an experience you cannot miss. It can be very strong and bitter, and it has an earthy flavor. Many have to get used to it.
                </p>
              </div>
            </div>

            {/* How is it drunk Section */}
            <div className="backdrop-blur-sm rounded-2xl p-8 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--section-border)' }}>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-6" style={{ color: 'var(--gold-highlight)' }}>
                How is it drunk?
              </h2>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                <p>
                  Each region (and each mate drinker) has their own specific preparation method, but the basics in Argentina are almost always the same. Before using any mate, it is necessary to 'cure' it. Curing a mate aims to improve its flavor and ensure it lasts longer. If your mate is made of gourd, the first step is to moisten the interior and try to remove loose particles. Then, whether your mate is wood or gourd, the key to curing is to pour yerba mate, add hot water, and let it rest for 24 hours. The mate will absorb the water, removing any other flavor that might affect future use. Then, simply discard the yerba, clean the mate, and let it dry.
                </p>
              </div>
            </div>

            {/* Preparation Steps Section */}
            <div className="backdrop-blur-sm rounded-2xl p-8 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--section-border)' }}>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-6" style={{ color: 'var(--gold-highlight)' }}>
                Preparation Steps
              </h2>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                <ol className="list-decimal list-inside space-y-3">
                  <li>Fill the mate about three-quarters full with yerba.</li>
                  <li>Place your hand over the mate, covering the hole completely, and shake it side to side. This removes excess dust to prevent a floury taste. Shake the dust off your hands and repeat. Then, shake side to side to settle the yerba.</li>
                  <li>Tilt the mate so the yerba is sloped, then bring it back to a normal level.</li>
                  <li>Place the bombilla in the dry mate at the lower end of the yerba slope at a semi-diagonal angle, so its end rests at the deepest part.</li>
                  <li>Add cold water almost to the surface of the yerba and let it absorb. This prevents the mate from burning.</li>
                  <li>Now pour hot water (below boiling point) near the bombilla and sip. Keep adding water without discarding the yerba until the drink loses its flavor and becomes 'washed'.</li>
                </ol>
              </div>
            </div>

            {/* Don't move the bombilla Section */}
            <div className="backdrop-blur-sm rounded-2xl p-8 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--section-border)' }}>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-6" style={{ color: 'var(--gold-highlight)' }}>
                Don't move the bombilla!
              </h2>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                <p>
                  Some mate drinkers, like Uruguayans, move the bombilla to drink a fresher section each time it gets washed. However, in Buenos Aires, this is less common. Unless the person accompanying you does it, do not move the bombilla!
                </p>
              </div>
            </div>

            {/* Mate Culture Section */}
            <div className="backdrop-blur-sm rounded-2xl p-8 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--section-border)' }}>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-6" style={{ color: 'var(--gold-highlight)' }}>
                What is the Mate Culture?
              </h2>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                <p>
                  Mate is usually drunk in groups, among family and friends, and in diverse social settings. It is passed from hand to hand; each person drinks the water and returns it to the one serving so they can refill it and pass it to others.
                </p>
              </div>
            </div>

            {/* Why drink it Section */}
            <div className="backdrop-blur-sm rounded-2xl p-8 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--section-border)' }}>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-6" style={{ color: 'var(--gold-highlight)' }}>
                Why is it drunk?
              </h2>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                <p>
                  Besides being a popular traditional drink, mate contains a natural stimulant similar to caffeine, called 'mateína'. It is consumed like coffee for energy, is digestive, contains vitamins and minerals, and is said to help reduce cholesterol. Taking mate is a gesture of friendship, cordiality, and a synonym for encounter that transcends age and social status.
                </p>
              </div>
            </div>

            {/* Interactive Minigames Section */}
            <div className="backdrop-blur-sm rounded-2xl p-8 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--gold-highlight)' }}>
              <div className="text-center space-y-6">
                <div className="text-5xl">🎯</div>
                <h2 className="font-['Playfair_Display'] text-3xl font-bold" style={{ color: 'var(--text-main)' }}>
                  Mate Mastery Games
                </h2>
                <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
                  Test your skills with 3 interactive challenges! Complete all 3 to unlock the exclusive "Mate Master" achievement.
                </p>
                
                {!showMinigames ? (
                  <button
                    onClick={() => setShowMinigames(true)}
                    className="px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                    style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
                  >
                    Start the Games
                  </button>
                ) : (
                  <div className="space-y-12">
                    {/* Game Progress */}
                    <div className="flex justify-center gap-4 text-sm" style={{ color: 'var(--text-accent)' }}>
                      <span className={completedGames.has('slope') ? 'text-green-500 font-semibold' : ''}>
                        {completedGames.has('slope') ? '✓' : '○'} The Perfect Slope
                      </span>
                      <span className={completedGames.has('temperature') ? 'text-green-500 font-semibold' : ''}>
                        {completedGames.has('temperature') ? '✓' : '○'} Temperature Master
                      </span>
                      <span className={completedGames.has('etiquette') ? 'text-green-500 font-semibold' : ''}>
                        {completedGames.has('etiquette') ? '✓' : '○'} Etiquette Quiz
                      </span>
                    </div>

                    {/* Game 1: The Perfect Slope */}
                    <div className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
                      <ThePerfectSlope onComplete={() => handleGameComplete('slope')} />
                    </div>

                    {/* Game 2: Temperature Master */}
                    <div className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
                      <TemperatureMaster onComplete={() => handleGameComplete('temperature')} />
                    </div>

                    {/* Game 3: The Etiquette Quiz */}
                    <div className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
                      <TheEtiquetteQuiz onComplete={() => handleGameComplete('etiquette')} />
                    </div>

                    {/* Achievement Unlocked Message */}
                    {completedGames.size === 3 && (
                      <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e' }}>
                        <div className="text-4xl mb-2">🎉</div>
                        <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2" style={{ color: '#22c55e' }}>
                          Mate Master Achievement Unlocked!
                        </h3>
                        <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
                          You've completed all 3 mate mastery challenges!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>
              Premium Content
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-accent)' }}>
              This content is exclusive to our plan members.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#plans"
                className="inline-block px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
              >
                View Plans
              </Link>
              <Link 
                href="/"
                className="inline-block px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                style={{ backgroundColor: 'var(--border-subtle)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
