'use client';

import React, { useState } from 'react';

const challenges = [
  {
    phrase: "Why did the stadium become a space of political resistance during the military dictatorship?",
    context: "The relationship between football and politics in Argentina",
    options: [
      { text: "Because dictators banned all other forms of gathering", explanation: "Not exactly. While gatherings were restricted, the stadium had a unique cultural status that made it harder to suppress completely." },
      { text: "Because it was one of the few places where people could gather without fear, carrying hidden messages of resistance in chants and flags", explanation: "Exactly. The stadium became a sanctuary where political expression could occur through football, with chants carrying hidden messages and flags serving as symbols of defiance." },
      { text: "Because football was the only legal activity during that time", explanation: "No. Football wasn't the only legal activity, but it was one of the few that could carry political meaning without immediate repression." },
    ],
    correct: 1,
  },
  {
    phrase: "What role do superstitions play in Argentine football?",
    context: "Rituals and Superstitions in Argentine football culture",
    options: [
      { text: "They're silly habits that players should abandon for better performance", explanation: "Not at all. These rituals are deeply meaningful and serve an important psychological purpose." },
      { text: "They're a way of imposing order on chaos and finding control in an uncontrollable game", explanation: "Perfect. From Maradona wearing his children's names on boots to Messi touching the grass, these rituals help players and fans find control in the fundamentally unpredictable nature of football." },
      { text: "They're only for fans, not for professional players", explanation: "Incorrect. Players are equally superstitious—Maradona, Messi, and countless others have their own pre-match rituals." },
    ],
    correct: 1,
  },
  {
    phrase: "How does the stadium achieve temporary social equality in Argentina?",
    context: "The Stadium as a Sanctuary",
    options: [
      { text: "By charging the same ticket price for everyone", explanation: "No. Ticket prices vary, but something deeper happens inside the stadium." },
      { text: "By creating a space where nobody cares about bank account, education, or social status—only about heart", explanation: "Exactly. For 90 minutes, the taxi driver and CEO stand shoulder to shoulder, singing the same songs, feeling the same emotions. The stadium achieves a momentary equality that exists nowhere else in Argentine society." },
      { text: "By forcing people to sit in assigned sections based on social class", explanation: "The opposite. The stadium breaks down social barriers that exist outside." },
    ],
    correct: 1,
  },
];

export default function ContextMaster({ onComplete }: { onComplete?: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentChallenge = challenges[currentIndex];

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === currentChallenge.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextChallenge = () => {
    if (currentIndex === challenges.length - 1) {
      setIsFinished(true);
      if (onComplete) onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = (score / challenges.length) * 100;
    let message = "";
    
    if (percentage === 100) {
      message = "You're not just learning Argentine culture—you're living it. ¡Sos un crack!";
    } else if (percentage >= 75) {
      message = "Impressive. You're getting the rhythm of Argentine passion. Keep going.";
    } else if (percentage >= 50) {
      message = "Not bad, but there's more to discover. The culture runs deeper than you think.";
    } else {
      message = "Every expert was once a beginner. Dive deeper into the stories behind the words.";
    }

    return (
      <div className="backdrop-blur-sm rounded-2xl p-8 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
        <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4" style={{ color: 'var(--text-main)' }}>
          The Context Master
        </h3>
        <div className="text-center space-y-6">
          <div className="py-8">
            <p className="text-5xl font-bold mb-2" style={{ color: 'var(--gold-highlight)' }}>
              {score} / {challenges.length}
            </p>
            <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
              Correct Answers
            </p>
          </div>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
            {message}
          </p>
          <div className="flex gap-4 pt-4">
            <button
              onClick={resetGame}
              className="flex-1 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
              style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
            >
              Play Again
            </button>
            <a
              href="/"
              className="flex-1 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold text-center"
              style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-sm rounded-2xl p-8 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
      <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4" style={{ color: 'var(--text-main)' }}>
        The Context Master
      </h3>
      <p className="mb-4" style={{ color: 'var(--text-accent)' }}>
        What does this phrase REALLY mean in this moment?
      </p>
      <p className="mb-2 text-sm" style={{ color: 'var(--gold-highlight)' }}>
        Score: {score} / {challenges.length}
      </p>
      <div className="space-y-4">
        <p className="text-lg font-semibold mb-2" style={{ color: 'var(--gold-highlight)' }}>
          "{currentChallenge.phrase}"
        </p>
        <p className="text-sm italic mb-4" style={{ color: 'var(--text-accent)' }}>
          Context: {currentChallenge.context}
        </p>
        <div className="space-y-3">
          {currentChallenge.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showExplanation && handleSelect(index)}
              disabled={showExplanation}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                showExplanation
                  ? index === currentChallenge.correct
                    ? 'opacity-100'
                    : 'opacity-50'
                  : 'hover:scale-[1.02]'
              }`}
              style={{
                backgroundColor: showExplanation
                  ? index === currentChallenge.correct
                    ? 'rgba(229, 181, 103, 0.2)'
                    : 'var(--card-bg)'
                  : 'var(--card-bg)',
                border: showExplanation
                  ? index === currentChallenge.correct
                    ? '2px solid var(--gold-highlight)'
                    : '1px solid var(--border-subtle)'
                  : '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                cursor: showExplanation ? 'default' : 'pointer',
              }}
            >
              <span className="font-semibold mr-2" style={{ color: 'var(--gold-highlight)' }}>
                {String.fromCharCode(65 + index)}.
              </span>
              {option.text}
            </button>
          ))}
        </div>
        {showExplanation && (
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(196, 180, 160, 0.2)', border: '1px solid var(--text-accent)' }}>
            <p style={{ color: 'var(--text-accent)' }}>
              {currentChallenge.options[selectedOption!].explanation}
            </p>
          </div>
        )}
        {showExplanation && (
          <button
            onClick={nextChallenge}
            className="w-full py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Next Challenge
          </button>
        )}
      </div>
    </div>
  );
}
