'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function TemperatureMaster({ onComplete }: { onComplete?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [temperature, setTemperature] = useState(50);
  const [direction, setDirection] = useState(1);
  const [result, setResult] = useState<'perfect' | 'too_hot' | 'too_cold' | null>(null);
  const [animationId, setAnimationId] = useState<number | null>(null);

  const minTemp = 50;
  const maxTemp = 100;
  const greenZoneMin = 75;
  const greenZoneMax = 80;

  useEffect(() => {
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [animationId]);

  const startAnimation = () => {
    setIsPlaying(true);
    setResult(null);
    setTemperature(50);
    setDirection(1);

    let currentTemp = 50;
    let currentDirection = 1;
    let speed = 0.8;

    const animate = () => {
      currentTemp += speed * currentDirection;

      if (currentTemp >= maxTemp) {
        currentDirection = -1;
      } else if (currentTemp <= minTemp) {
        currentDirection = 1;
      }

      setTemperature(currentTemp);
      setDirection(currentDirection);

      const id = requestAnimationFrame(animate);
      setAnimationId(id);
    };

    animate();
  };

  const handlePour = () => {
    if (!isPlaying) return;

    if (animationId) {
      cancelAnimationFrame(animationId);
      setAnimationId(null);
    }

    setIsPlaying(false);

    if (temperature >= greenZoneMin && temperature <= greenZoneMax) {
      setResult('perfect');
      if (onComplete) onComplete();
    } else if (temperature > greenZoneMax) {
      setResult('too_hot');
    } else {
      setResult('too_cold');
    }
  };

  const resetGame = () => {
    setResult(null);
    setTemperature(50);
    setIsPlaying(false);
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= greenZoneMin && temp <= greenZoneMax) return '#22c55e';
    if (temp > greenZoneMax) return '#ef4444';
    return '#3b82f6';
  };

  const getGaugePosition = (temp: number) => {
    const percentage = ((temp - minTemp) / (maxTemp - minTemp)) * 100;
    return percentage;
  };

  return (
    <div className="space-y-4">
      <h3 className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--text-main)' }}>
        Temperature Master
      </h3>
      <p className="text-sm" style={{ color: 'var(--text-accent)' }}>
        Click 'Pour' when the needle is in the Green Zone (75°C - 80°C)
      </p>

      <div className="relative h-48 rounded-lg p-4" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-subtle)' }}>
        {/* Kettle illustration */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-6xl">
          🫖
        </div>

        {/* Temperature gauge */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="relative h-4 rounded-full" style={{ backgroundColor: 'var(--bg-dark)' }}>
            {/* Green zone indicator */}
            <div
              className="absolute h-full rounded-full"
              style={{
                left: `${getGaugePosition(greenZoneMin)}%`,
                width: `${getGaugePosition(greenZoneMax) - getGaugePosition(greenZoneMin)}%`,
                backgroundColor: 'rgba(34, 197, 94, 0.3)',
                border: '2px solid #22c55e',
                borderStyle: 'dashed'
              }}
            />
            
            {/* Temperature bar */}
            <div
              className="absolute h-full rounded-full transition-all duration-75"
              style={{
                width: `${getGaugePosition(temperature)}%`,
                backgroundColor: getTemperatureColor(temperature)
              }}
            />
          </div>

          {/* Temperature labels */}
          <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--text-accent)' }}>
            <span>{minTemp}°C</span>
            <span className="font-semibold" style={{ color: '#22c55e' }}>
              Green Zone: {greenZoneMin}°C - {greenZoneMax}°C
            </span>
            <span>{maxTemp}°C</span>
          </div>

          {/* Current temperature display */}
          <div className="text-center mt-4">
            <div className="text-4xl font-bold" style={{ color: getTemperatureColor(temperature) }}>
              {Math.round(temperature)}°C
            </div>
          </div>
        </div>
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
              onClick={handlePour}
              className="px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold animate-pulse"
              style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
            >
              Pour!
            </button>
          )}
        </div>
      )}

      {result === 'perfect' && (
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e' }}>
          <div className="text-4xl mb-2">✨</div>
          <p className="font-semibold text-lg" style={{ color: '#22c55e' }}>Perfect Cebada!</p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-accent)' }}>
            The water temperature is ideal for extracting the best flavor without burning the yerba.
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

      {result === 'too_hot' && (
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444' }}>
          <div className="text-4xl mb-2">🔥</div>
          <p className="font-semibold text-lg" style={{ color: '#ef4444' }}>Too Hot!</p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-main)' }}>
            The yerba has been burned! Water above 80°C can scorch the leaves, creating a bitter taste.
            <br />
            <span className="font-semibold mt-2 block" style={{ color: 'var(--text-accent)' }}>
              Tip: Let the water cool for 30 seconds after boiling before pouring.
            </span>
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

      {result === 'too_cold' && (
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '2px solid #3b82f6' }}>
          <div className="text-4xl mb-2">❄️</div>
          <p className="font-semibold text-lg" style={{ color: '#3b82f6' }}>Too Cold!</p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-main)' }}>
            The water is not hot enough to properly extract the flavor from the yerba.
            <br />
            <span className="font-semibold mt-2 block" style={{ color: 'var(--text-accent)' }}>
              Tip: Water should be between 75°C and 80°C for the perfect mate.
            </span>
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
    </div>
  );
}
