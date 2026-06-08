'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';

interface Step {
  id: number;
  text: string;
  icon: string;
}

const steps: Step[] = [
  { id: 1, text: "Fill 3/4 with yerba", icon: "🌿" },
  { id: 2, text: "Cover and shake to remove dust", icon: "🔄" },
  { id: 3, text: "Tilt to leave yerba on one side", icon: "↗️" },
  { id: 4, text: "Insert bombilla at diagonal angle", icon: "🥢" },
  { id: 5, text: "First wet with cold water", icon: "💧" },
  { id: 6, text: "Pour with hot water", icon: "🔥" },
];

export default function MasterCebadorGame() {
  const { user } = useUser();
  const [availableSteps, setAvailableSteps] = useState<Step[]>(steps);
  const [orderedSteps, setOrderedSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [bombillaMoved, setBombillaMoved] = useState(false);
  const [showBombillaWarning, setShowBombillaWarning] = useState(false);

  const handleStepClick = (step: Step) => {
    if (isComplete) return;

    // Check if bombilla is being moved after insertion
    if (step.id === 4 && orderedSteps.some(s => s.id === 4)) {
      setBombillaMoved(true);
      setShowBombillaWarning(true);
      setFeedback("⚠️ In Buenos Aires, that's not done. Once the bombilla is inserted, it's not moved.");
      setTimeout(() => setShowBombillaWarning(false), 3000);
      return;
    }

    // Check if step is correct
    if (step.id === currentStep) {
      setAvailableSteps(prev => prev.filter(s => s.id !== step.id));
      setOrderedSteps(prev => [...prev, step]);
      setCurrentStep(prev => prev + 1);
      setFeedback('');
      
      if (currentStep === 6) {
        setIsComplete(true);
        unlockAchievement();
      }
    } else {
      setFeedback("❌ Incorrect order. Try again!");
      // Reset the game
      setTimeout(() => {
        setAvailableSteps(steps);
        setOrderedSteps([]);
        setCurrentStep(1);
        setFeedback('');
        setBombillaMoved(false);
      }, 1500);
    }
  };

  const unlockAchievement = async () => {
    try {
      const response = await fetch('/api/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'unlock_cebador_de_ley',
        }),
      });

      if (response.ok) {
        setFeedback("🎉 Congratulations! You've unlocked the 'Cebador de Ley' achievement!");
      }
    } catch (error) {
      console.error('Error unlocking achievement:', error);
      setFeedback("🎉 Congratulations! You've completed the challenge!");
    }
  };

  const resetGame = () => {
    setAvailableSteps(steps);
    setOrderedSteps([]);
    setCurrentStep(1);
    setFeedback('');
    setIsComplete(false);
    setBombillaMoved(false);
    setShowBombillaWarning(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Available Steps */}
        <div className="space-y-4">
          <h3 className="font-['Playfair_Display'] text-xl font-semibold" style={{ color: 'var(--text-main)' }}>
            Available Steps
          </h3>
          <div className="space-y-3">
            {availableSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step)}
                className="w-full p-4 rounded-lg hover:scale-105 transition-all duration-300 text-left flex items-center gap-3"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-main)'
                }}
              >
                <span className="text-2xl">{step.icon}</span>
                <span className="font-medium">{step.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ordered Steps */}
        <div className="space-y-4">
          <h3 className="font-['Playfair_Display'] text-xl font-semibold" style={{ color: 'var(--text-main)' }}>
            Your Order
          </h3>
          <div className="space-y-3">
            {orderedSteps.length === 0 ? (
              <p className="text-center py-8" style={{ color: 'var(--text-accent)' }}>
                Click the steps in the correct order
              </p>
            ) : (
              orderedSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="p-4 rounded-lg flex items-center gap-3"
                  style={{ 
                    backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                    border: '1px solid #22c55e',
                    color: 'var(--text-main)'
                  }}
                >
                  <span className="text-2xl">{step.icon}</span>
                  <span className="font-medium">{step.text}</span>
                  <span className="ml-auto text-sm font-semibold" style={{ color: '#22c55e' }}>
                    {index + 1}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`p-4 rounded-lg text-center ${showBombillaWarning ? 'animate-pulse' : ''}`} style={{ 
          backgroundColor: showBombillaWarning ? 'rgba(239, 68, 68, 0.1)' : isComplete ? 'rgba(34, 197, 94, 0.1)' : 'rgba(196, 180, 160, 0.2)',
          border: showBombillaWarning ? '1px solid #ef4444' : isComplete ? '1px solid #22c55e' : '1px solid var(--text-accent)'
        }}>
          <p style={{ color: showBombillaWarning ? '#ef4444' : isComplete ? '#22c55e' : 'var(--text-accent)' }}>
            {feedback}
          </p>
        </div>
      )}

      {/* Reset Button */}
      {isComplete && (
        <div className="text-center">
          <button
            onClick={resetGame}
            className="px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
