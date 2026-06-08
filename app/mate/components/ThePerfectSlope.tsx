'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function ThePerfectSlope({ onComplete }: { onComplete?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [angle, setAngle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [result, setResult] = useState<'perfect' | 'miss' | null>(null);
  const [animationId, setAnimationId] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const targetAngle = 45;
  const tolerance = 5;

  useEffect(() => {
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [animationId]);

  const startAnimation = () => {
    setIsPlaying(true);
    setIsAnimating(true);
    setResult(null);
    setAngle(0);

    let currentAngle = 0;
    let direction = 1;
    let speed = 0.5;

    const animate = () => {
      currentAngle += speed * direction;

      if (currentAngle >= 90) {
        direction = -1;
      } else if (currentAngle <= 0) {
        direction = 1;
      }

      setAngle(currentAngle);
      drawSlope(currentAngle);

      const id = requestAnimationFrame(animate);
      setAnimationId(id);
    };

    animate();
  };

  const handleClick = () => {
    if (!isAnimating) return;

    if (animationId) {
      cancelAnimationFrame(animationId);
      setAnimationId(null);
    }

    setIsAnimating(false);
    setIsPlaying(false);

    const diff = Math.abs(angle - targetAngle);
    if (diff <= tolerance) {
      setResult('perfect');
      if (onComplete) onComplete();
    } else {
      setResult('miss');
    }
  };

  const drawSlope = (currentAngle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw mate gourd outline
    ctx.beginPath();
    ctx.arc(width / 2, height / 2 + 20, 80, 0, Math.PI * 2);
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw yerba slope
    ctx.save();
    ctx.translate(width / 2, height / 2 + 20);
    ctx.rotate((currentAngle * Math.PI) / 180);

    ctx.beginPath();
    ctx.moveTo(-70, 0);
    ctx.lineTo(70, 0);
    ctx.lineTo(70, -40);
    ctx.lineTo(-70, -40);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, -40, 0, 0);
    gradient.addColorStop(0, '#2d5016');
    gradient.addColorStop(1, '#4a7c23');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();

    // Draw target zone indicator
    ctx.save();
    ctx.translate(width / 2, height / 2 + 20);
    ctx.rotate((targetAngle * Math.PI) / 180);

    ctx.beginPath();
    ctx.moveTo(-70, 0);
    ctx.lineTo(70, 0);
    ctx.lineTo(70, -40);
    ctx.lineTo(-70, -40);
    ctx.closePath();

    ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();

    ctx.restore();

    // Draw angle indicator
    ctx.fillStyle = '#E5B567';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(currentAngle)}°`, width / 2, height - 20);
  };

  const resetGame = () => {
    setResult(null);
    setAngle(0);
    setIsPlaying(false);
    setIsAnimating(false);
    drawSlope(0);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--text-main)' }}>
        The Perfect Slope
      </h3>
      <p className="text-sm" style={{ color: 'var(--text-accent)' }}>
        Click to stop the yerba at the perfect 45° angle (the 'montañita')
      </p>

      <div className="relative flex justify-center">
        <canvas
          ref={canvasRef}
          width={300}
          height={250}
          className="rounded-lg"
          style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-subtle)' }}
        />
      </div>

      {result === null && (
        <div className="text-center">
          {!isPlaying ? (
            <button
              onClick={startAnimation}
              className="px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
              style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
            >
              Start
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold animate-pulse"
              style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
            >
              Stop!
            </button>
          )}
        </div>
      )}

      {result === 'perfect' && (
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e' }}>
          <div className="text-4xl mb-2">✨</div>
          <p className="font-semibold text-lg" style={{ color: '#22c55e' }}>Perfect!</p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-accent)' }}>
            The 45° slope ensures the yerba settles perfectly for optimal flavor extraction.
          </p>
          <button
            onClick={resetGame}
            className="mt-4 px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
          >
            Try Again
          </button>
        </div>
      )}

      {result === 'miss' && (
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'rgba(196, 180, 160, 0.2)', border: '2px solid var(--text-accent)' }}>
          <div className="text-4xl mb-2">🎯</div>
          <p className="font-semibold text-lg" style={{ color: 'var(--text-accent)' }}>Keep practicing!</p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-main)' }}>
            The slope is important for flavor. A 45° angle creates the perfect 'montañita' that allows water to flow evenly through the yerba.
          </p>
          <button
            onClick={resetGame}
            className="mt-4 px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
          >
            Try Again
          </button>
        </div>
      )}

      <div className="text-center text-xs" style={{ color: 'var(--text-accent)', opacity: 0.7 }}>
        Target: {targetAngle}° ± {tolerance}°
      </div>
    </div>
  );
}
