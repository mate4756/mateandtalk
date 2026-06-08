'use client';

import React, { useState } from 'react';

interface Scenario {
  id: number;
  question: string;
  options: {
    correct: string;
    incorrect: string;
  };
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    question: "A friend hands you the mate. What do you do?",
    options: {
      correct: "Say 'gracias' and drink it all before returning it",
      incorrect: "Take a small sip and immediately pass it to the next person"
    },
    explanation: "In Argentina, you drink the entire mate before returning it. Taking only a sip and passing it on is considered rude to the cebador (the person serving)."
  },
  {
    id: 2,
    question: "You're enjoying your mate and want to adjust the flavor. What should you do?",
    options: {
      correct: "Ask the cebador to adjust the water temperature or amount",
      incorrect: "Move the bombilla to find a fresher section"
    },
    explanation: "Never move the bombilla! It's a sign of disrespect to the cebador. If you want adjustments, ask politely."
  },
  {
    id: 3,
    question: "The mate is being passed around the circle. It's your turn. What's the proper etiquette?",
    options: {
      correct: "Accept it with your right hand, drink it all, and return it to the cebador",
      incorrect: "Accept it with your left hand, take a quick sip, and pass it to the next person"
    },
    explanation: "The right hand is traditionally used for receiving mate. Drink it completely before returning it to the person serving."
  },
  {
    id: 4,
    question: "You're the cebador and someone says 'no más' (no more). What do you do?",
    options: {
      correct: "Respect their decision and continue serving others",
      incorrect: "Insist they have one more, it's impolite to refuse"
    },
    explanation: "When someone says they don't want more, respect it immediately. Forcing mate on someone is considered rude."
  },
  {
    id: 5,
    question: "The mate has become 'lavado' (washed/lost its flavor). What should you do?",
    options: {
      correct: "Tell the cebador it's time to change the yerba",
      incorrect: "Keep drinking it anyway to be polite"
    },
    explanation: "When mate loses its flavor, it's time to change the yerba. Drinking washed mate is not enjoyable and the cebador will appreciate knowing."
  },
  {
    id: 6,
    question: "You're visiting Argentina for the first time and someone offers you mate. What's the best response?",
    options: {
      correct: "Accept it enthusiastically and ask them to teach you the proper way to drink it",
      incorrect: "Politely decline saying you don't know how to drink it properly"
    },
    explanation: "Accepting mate is a gesture of friendship. Argentines love teaching foreigners about mate culture. It's a great way to connect!"
  }
];

export default function TheEtiquetteQuiz({ onComplete }: { onComplete?: () => void }) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [randomScenarios, setRandomScenarios] = useState<Scenario[]>([]);

  useState(() => {
    // Shuffle and pick 3 random scenarios
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
    setRandomScenarios(shuffled.slice(0, 3));
  });

  const currentScenario = randomScenarios[currentScenarioIndex];

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      if (currentScenarioIndex < randomScenarios.length - 1) {
        setCurrentScenarioIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
        if (score + (isCorrect ? 1 : 0) === randomScenarios.length && onComplete) {
          onComplete();
        }
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentScenarioIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsComplete(false);
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
    setRandomScenarios(shuffled.slice(0, 3));
  };

  if (randomScenarios.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--text-main)' }}>
        The Etiquette Quiz
      </h3>
      <p className="text-sm" style={{ color: 'var(--text-accent)' }}>
        Test your knowledge of Argentine mate etiquette
      </p>

      {!isComplete && currentScenario && (
        <div className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-subtle)' }}>
          <div className="mb-4">
            <span className="text-sm font-semibold" style={{ color: 'var(--gold-highlight)' }}>
              Scenario {currentScenarioIndex + 1} of {randomScenarios.length}
            </span>
          </div>

          <p className="text-lg mb-6" style={{ color: 'var(--text-main)' }}>
            {currentScenario.question}
          </p>

          <div className="space-y-3">
            {[
              { text: currentScenario.options.correct, isCorrect: true },
              { text: currentScenario.options.incorrect, isCorrect: false }
            ]
              .sort(() => Math.random() - 0.5)
              .map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.text, option.isCorrect)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                    showFeedback && selectedAnswer === option.text
                      ? option.isCorrect
                        ? 'ring-2 ring-green-500'
                        : 'ring-2 ring-red-500'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: selectedAnswer === option.text
                      ? option.isCorrect
                        ? '2px solid #22c55e'
                        : '2px solid #ef4444'
                      : '1px solid var(--border-subtle)',
                    color: 'var(--text-main)',
                    opacity: showFeedback && selectedAnswer !== option.text ? 0.5 : 1
                  }}
                >
                  {option.text}
                </button>
              ))}
          </div>

          {showFeedback && selectedAnswer && (
            <div className={`mt-4 p-4 rounded-lg ${
              selectedAnswer === currentScenario.options.correct
                ? 'bg-green-500/10 border-2 border-green-500'
                : 'bg-red-500/10 border-2 border-red-500'
            }`}>
              <p className="font-semibold mb-2" style={{
                color: selectedAnswer === currentScenario.options.correct
                  ? '#22c55e'
                  : '#ef4444'
              }}>
                {selectedAnswer === currentScenario.options.correct ? '✓ Correct!' : '✗ Not quite!'}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-accent)' }}>
                {currentScenario.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {isComplete && (
        <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--gold-highlight)' }}>
          <div className="text-4xl mb-4">🏆</div>
          <h4 className="font-['Playfair_Display'] text-2xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
            Quiz Complete!
          </h4>
          <p className="text-lg mb-4" style={{ color: 'var(--text-accent)' }}>
            Your Score: {score} / {randomScenarios.length}
          </p>
          {score === randomScenarios.length && (
            <p className="text-sm mb-4" style={{ color: '#22c55e' }}>
              Perfect! You're a true mate etiquette expert!
            </p>
          )}
          <button
            onClick={resetQuiz}
            className="px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
