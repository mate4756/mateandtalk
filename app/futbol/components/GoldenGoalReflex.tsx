'use client';

import { useState, useEffect, useCallback } from 'react';

interface GoldenGoalReflexProps {
  onComplete?: () => void;
}

export default function GoldenGoalReflex({ onComplete }: GoldenGoalReflexProps) {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [missedClicks, setMissedClicks] = useState(0);

  const spawnTarget = useCallback(() => {
    const newTarget = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // 10% to 90% of container width
      y: Math.random() * 70 + 15, // 15% to 85% of container height
      size: Math.random() * 30 + 40, // 40px to 70px
    };
    setTargets(prev => [...prev.slice(-4), newTarget]); // Keep max 5 targets
  }, []);

  const handleTargetClick = (targetId: number) => {
    setScore(prev => prev + 1);
    setTargets(prev => prev.filter(t => t.id !== targetId));
    spawnTarget();
  };

  const handleBackgroundClick = () => {
    if (gameState === 'playing') {
      setMissedClicks(prev => prev + 1);
    }
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    setMissedClicks(0);
    setTargets([]);
    
    // Spawn initial targets
    for (let i = 0; i < 3; i++) {
      setTimeout(() => spawnTarget(), i * 500);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Spawn targets periodically
      const spawnInterval = setInterval(() => {
        if (gameState === 'playing') {
          spawnTarget();
        }
      }, 1500);
      
      return () => {
        clearInterval(interval);
        clearInterval(spawnInterval);
      };
    }
  }, [gameState, spawnTarget]);

  const getPerformanceMessage = () => {
    if (score >= 20) return "¡GOLAZO! World Class reflexes!";
    if (score >= 15) return "¡GOL! Excellent performance!";
    if (score >= 10) return "Great effort! Keep practicing!";
    return "Good start! Try again for more goals!";
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
          Golden Goal Reflex Challenge
        </h3>
        <p style={{ color: 'var(--text-accent)' }}>
          Click the football targets as fast as you can! 30 seconds to score as many goals as possible.
        </p>
      </div>

      {gameState === 'ready' && (
        <div className="text-center">
          <button
            onClick={startGame}
            className="px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Start Challenge
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold" style={{ color: 'var(--gold-highlight)' }}>
              Goals: {score}
            </div>
            <div className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
              Time: {timeLeft}s
            </div>
          </div>

          <div
            onClick={handleBackgroundClick}
            className="relative h-96 rounded-lg cursor-crosshair overflow-hidden"
            style={{
              backgroundColor: 'rgba(34, 139, 34, 0.2)',
              border: '2px solid #2d5a27'
            }}
          >
            {/* Field markings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-2 border-white/30" />
              <div className="absolute w-full h-0.5 bg-white/30" />
              <div className="absolute h-full w-0.5 bg-white/30" />
            </div>

            {/* Goal areas */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-white/30" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-white/30" />

            {/* Targets */}
            {targets.map(target => (
              <div
                key={target.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTargetClick(target.id);
                }}
                className="absolute rounded-full cursor-pointer hover:scale-110 transition-transform duration-150 flex items-center justify-center"
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  width: `${target.size}px`,
                  height: `${target.size}px`,
                  backgroundColor: 'var(--gold-highlight)',
                  border: '3px solid #fff',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                <span className="text-2xl">⚽</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {gameState === 'finished' && (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">⚽</div>
          <h4 className="font-['Playfair_Display'] text-3xl font-bold" style={{ color: 'var(--gold-highlight)' }}>
            Challenge Complete!
          </h4>
          <div className="space-y-2">
            <p className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
              Goals Scored: {score}
            </p>
            <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
              {getPerformanceMessage()}
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
            >
              Play Again
            </button>
            {onComplete && (
              <button
                onClick={onComplete}
                className="px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-accent)' }}
              >
                Complete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
