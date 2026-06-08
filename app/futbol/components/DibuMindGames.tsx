'use client';

import { useState, useEffect, useRef } from 'react';

interface DibuMindGamesProps {
  onComplete?: () => void;
}

type Zone = 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right';

interface DibuMindGamesProps {
  onComplete?: () => void;
}

export default function DibuMindGames({ onComplete }: DibuMindGamesProps) {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'won' | 'lost'>('ready');
  const [energy, setEnergy] = useState(50);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [misses, setMisses] = useState(0);
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [dibuAnimation, setDibuAnimation] = useState<'idle' | 'taunt' | 'save' | 'celebrate' | 'dance'>('idle');
  const [showFeedback, setShowFeedback] = useState<{ type: 'goal' | 'save'; message: string } | null>(null);
  const [isSpecialAnimation, setIsSpecialAnimation] = useState(false);

  const zones: Zone[] = ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'];
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setGameState('playing');
    setEnergy(50);
    setScore(0);
    setCombo(0);
    setMisses(0);
    setActiveZone(null);
    setDibuAnimation('idle');
    setShowFeedback(null);
    setIsSpecialAnimation(false);
  };

  const triggerZoneFlash = () => {
    if (gameState !== 'playing') return;

    // Dibu taunts first
    setDibuAnimation('taunt');
    
    setTimeout(() => {
      // Flash a random zone
      const randomZone = zones[Math.floor(Math.random() * zones.length)];
      setActiveZone(randomZone);
      
      // Zone flashes for 0.5 seconds
      setTimeout(() => {
        setActiveZone(null);
        setDibuAnimation('idle');
      }, 500);
    }, 800);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        triggerZoneFlash();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  const handleZoneClick = (clickedZone: Zone) => {
    if (gameState !== 'playing' || !activeZone) return;

    if (clickedZone === activeZone) {
      // Goal!
      const points = isSpecialAnimation ? 20 : 10;
      setScore(prev => prev + points);
      setEnergy(prev => Math.min(100, prev + 15));
      setCombo(prev => {
        const newCombo = prev + 1;
        
        // Trigger special animation on 3 combo
        if (newCombo === 3) {
          setIsSpecialAnimation(true);
          setDibuAnimation('dance');
          setTimeout(() => {
            setDibuAnimation('idle');
          }, 2000);
        }
        
        return newCombo;
      });

      setShowFeedback({ type: 'goal', message: `GOAL! +${points}` });
      setActiveZone(null);
    } else {
      // Save!
      setEnergy(prev => Math.max(0, prev - 20));
      setCombo(0);
      setIsSpecialAnimation(false);
      setMisses(prev => {
        const newMisses = prev + 1;
        
        if (newMisses >= 3) {
          setGameState('lost');
          setDibuAnimation('celebrate');
        }
        
        return newMisses;
      });

      setDibuAnimation('save');
      setShowFeedback({ type: 'save', message: 'SAVED!' });
      setActiveZone(null);

      setTimeout(() => {
        setDibuAnimation('idle');
      }, 1000);
    }

    // Clear feedback after animation
    setTimeout(() => {
      setShowFeedback(null);
    }, 800);

    // Check win condition
    if (score >= 100) {
      setGameState('won');
      setDibuAnimation('celebrate');
      if (onComplete) setTimeout(onComplete, 2000);
    }
  };

  const getZonePosition = (zone: Zone) => {
    const positions = {
      'top-left': { top: '10%', left: '10%' },
      'top-right': { top: '10%', right: '10%' },
      'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
      'bottom-left': { bottom: '10%', left: '10%' },
      'bottom-right': { bottom: '10%', right: '10%' }
    };
    return positions[zone];
  };

  const getZoneColor = (zone: Zone) => {
    const colors = {
      'top-left': '#FF6B6B',
      'top-right': '#4ECDC4',
      'center': '#FFE66D',
      'bottom-left': '#95E1D3',
      'bottom-right': '#F38181'
    };
    return colors[zone];
  };

  return (
    <div className="space-y-6 w-full">
      <div className="text-center space-y-4">
        <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
          Dibu's Mind Games
        </h3>
        <p style={{ color: 'var(--text-accent)' }}>
          Outsmart Dibu! Click the flashing zone before it disappears. 3 misses and you're out!
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
          {/* Energy Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold" style={{ color: 'var(--text-accent)' }}>ENERGY</span>
              <span className="text-sm font-bold" style={{ color: 'var(--gold-highlight)' }}>{energy}%</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-subtle)' }}>
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${energy}%`,
                  backgroundColor: energy > 50 ? '#22c55e' : energy > 25 ? '#eab308' : '#ef4444'
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold" style={{ color: 'var(--gold-highlight)' }}>
              Score: {score}
            </div>
            <div className="flex gap-4">
              <div className="text-sm font-semibold" style={{ color: 'var(--text-accent)' }}>
                Combo: {combo}/3
              </div>
              <div className="text-sm font-semibold" style={{ color: 'var(--text-accent)' }}>
                Misses: {misses}/3
              </div>
            </div>
          </div>

          {/* Game Area */}
          <div
            ref={gameAreaRef}
            className="relative w-full h-96 rounded-lg overflow-hidden"
            style={{
              backgroundColor: 'rgba(34, 139, 34, 0.2)',
              border: '3px solid #2d5a27'
            }}
          >
            {/* Goal net pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Goal zones */}
            {zones.map((zone) => (
              <div
                key={zone}
                onClick={() => handleZoneClick(zone)}
                className={`absolute w-20 h-20 rounded-lg cursor-pointer transition-all duration-150 hover:scale-110 ${
                  activeZone === zone ? 'animate-pulse' : ''
                }`}
                style={{
                  ...getZonePosition(zone),
                  backgroundColor: activeZone === zone ? '#22c55e' : getZoneColor(zone),
                  opacity: activeZone === zone ? 1 : 0.6,
                  border: activeZone === zone ? '3px solid #fff' : '2px solid rgba(255,255,255,0.3)',
                  boxShadow: activeZone === zone ? '0 0 20px rgba(34, 197, 94, 0.8)' : 'none'
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl">⚽</span>
                </div>
              </div>
            ))}

            {/* Dibu Martínez */}
            <div
              className={`absolute bottom-4 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                dibuAnimation === 'taunt' ? 'animate-bounce' : ''
              } ${dibuAnimation === 'dance' ? 'animate-spin' : ''}`}
              style={{
                backgroundColor: 'var(--gold-highlight)',
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
              }}
            >
              <span className="text-3xl">
                {dibuAnimation === 'save' ? '🧤' : dibuAnimation === 'celebrate' ? '🏆' : dibuAnimation === 'dance' ? '💃' : '🧤'}
              </span>
            </div>

            {/* Feedback overlay */}
            {showFeedback && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="text-4xl font-bold animate-bounce"
                  style={{
                    color: showFeedback.type === 'goal' ? '#22c55e' : '#ef4444',
                    textShadow: '0 0 20px rgba(0,0,0,0.8)'
                  }}
                >
                  {showFeedback.message}
                </div>
              </div>
            )}

            {/* Special combo indicator */}
            {isSpecialAnimation && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold animate-pulse"
                style={{ backgroundColor: 'rgba(255, 215, 0, 0.9)', color: '#000' }}
              >
                🔥 COMBO x2!
              </div>
            )}
          </div>
        </div>
      )}

      {gameState === 'won' && (
        <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e' }}>
          <div className="text-4xl mb-2">🏆</div>
          <h4 className="font-['Playfair_Display'] text-2xl font-bold mb-2" style={{ color: '#22c55e' }}>
            Victory!
          </h4>
          <p style={{ color: 'var(--text-accent)' }}>
            You outsmarted Dibu! Final Score: {score}
          </p>
          <button
            onClick={startGame}
            className="mt-4 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Play Again
          </button>
        </div>
      )}

      {gameState === 'lost' && (
        <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444' }}>
          <div className="text-4xl mb-2">🧤</div>
          <h4 className="font-['Playfair_Display'] text-2xl font-bold mb-2" style={{ color: '#ef4444' }}>
            Dibu's Celebration!
          </h4>
          <p style={{ color: 'var(--text-accent)' }}>
            Dibu outsmarted you this time. Final Score: {score}
          </p>
          <button
            onClick={startGame}
            className="mt-4 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
