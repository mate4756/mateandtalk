'use client';

import { useState, useEffect, useRef } from 'react';

interface DibuPenaltyChallengeProps {
  onComplete?: () => void;
}

export default function DibuPenaltyChallenge({ onComplete }: DibuPenaltyChallengeProps) {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'won' | 'lost'>('ready');
  const [consecutiveGoals, setConsecutiveGoals] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [targetSize, setTargetSize] = useState(80);
  const [dibuPosition, setDibuPosition] = useState<'left' | 'center' | 'right'>('center');
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Target movement
  useEffect(() => {
    if (gameState !== 'playing') return;

    const moveInterval = setInterval(() => {
      setTargetPosition({
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60
      });
    }, 800);

    // Shrink target over time
    const shrinkInterval = setInterval(() => {
      setTargetSize(prev => Math.max(40, prev - 2));
    }, 2000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(shrinkInterval);
    };
  }, [gameState, consecutiveGoals]);

  const startGame = () => {
    setGameState('playing');
    setConsecutiveGoals(0);
    setTargetSize(80);
    setTargetPosition({ x: 50, y: 50 });
  };

  const handleShot = (e: React.MouseEvent) => {
    if (gameState !== 'playing') return;

    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const targetX = (targetPosition.x / 100) * rect.width;
    const targetY = (targetPosition.y / 100) * rect.height;

    // Check if click is within target
    const distance = Math.sqrt(
      Math.pow(clickX - targetX, 2) + Math.pow(clickY - targetY, 2)
    );

    // Dibu randomly dives
    const diveDirection = Math.random() < 0.33 ? 'left' : Math.random() < 0.66 ? 'center' : 'right';
    setDibuPosition(diveDirection);

    // Check if Dibu blocked it (30% chance)
    const dibuBlocked = Math.random() < 0.3;

    if (distance < targetSize / 2 && !dibuBlocked) {
      // Goal!
      const newGoals = consecutiveGoals + 1;
      setConsecutiveGoals(newGoals);
      setTargetSize(prev => Math.max(40, prev - 5)); // Shrink faster on goal

      if (newGoals >= 3) {
        setGameState('won');
        setResultMessage('World Class Striker');
        setShowResult(true);
        if (onComplete) setTimeout(onComplete, 2000);
      }
    } else {
      // Miss or blocked
      setGameState('lost');
      setResultMessage(dibuBlocked ? 'Dibu blocked it!' : 'Dibu blocked it!');
      setShowResult(true);
      setConsecutiveGoals(0);
    }
  };

  const handleTryAgain = () => {
    setShowResult(false);
    setGameState('ready');
    setConsecutiveGoals(0);
    setTargetSize(80);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="text-center space-y-4">
        <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
          Dibu's Penalty Challenge
        </h3>
        <p style={{ color: 'var(--text-accent)' }}>
          Score 3 consecutive goals against Dibu Martínez. One miss and you start over.
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
              Goals: {consecutiveGoals}/3
            </div>
            <div className="text-sm font-semibold" style={{ color: 'var(--text-accent)' }}>
              Target Size: {targetSize}px
            </div>
          </div>

          <div
            ref={gameAreaRef}
            onClick={handleShot}
            className="relative w-full h-96 rounded-lg cursor-crosshair overflow-hidden"
            style={{
              backgroundColor: 'rgba(34, 139, 34, 0.2)',
              border: '2px solid #2d5a27'
            }}
          >
            {/* Goal markings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-2 border-white/30" />
              <div className="absolute w-full h-0.5 bg-white/30" />
              <div className="absolute h-full w-0.5 bg-white/30" />
            </div>

            {/* Goal areas */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-white/30" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-white/30" />

            {/* Dibu Martínez (Goalkeeper) */}
            <div 
              className="absolute bottom-4 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: 'var(--gold-highlight)',
                left: dibuPosition === 'left' ? '20%' : dibuPosition === 'right' ? '70%' : '45%',
                transform: dibuPosition === 'left' ? 'rotate(-15deg)' : dibuPosition === 'right' ? 'rotate(15deg)' : 'none'
              }}
            >
              <span className="text-2xl">🧤</span>
            </div>

            {/* Moving Target */}
            <div
              className="absolute rounded-full border-2 border-white cursor-pointer transition-all duration-300"
              style={{
                width: `${targetSize}px`,
                height: `${targetSize}px`,
                left: `${targetPosition.x}%`,
                top: `${targetPosition.y}%`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.3)'
              }}
            />
          </div>
        </div>
      )}

      {showResult && (
        <div className="text-center p-6 rounded-lg" style={{ 
          backgroundColor: gameState === 'won' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
          border: gameState === 'won' ? '2px solid #22c55e' : '2px solid #ef4444' 
        }}>
          <div className="text-4xl mb-2">{gameState === 'won' ? '⚽' : '🧤'}</div>
          <h4 className="font-['Playfair_Display'] text-2xl font-bold mb-2" style={{ color: gameState === 'won' ? '#22c55e' : '#ef4444' }}>
            {resultMessage}
          </h4>
          <p style={{ color: 'var(--text-accent)' }}>
            {gameState === 'won' 
              ? 'You scored 3 consecutive goals against Dibu! Incredible skill!' 
              : 'Start over. You need 3 consecutive goals to win.'}
          </p>
          <button
            onClick={handleTryAgain}
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
