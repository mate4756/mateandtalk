'use client';

import React, { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "What does 'ilusionar' mean in the context of the song?",
    options: [
      "To create illusions or deceive someone",
      "To make someone hope or dream again",
      "To imagine things that aren't real",
      "To celebrate a victory"
    ],
    correctAnswer: 1,
    explanation: "'Ilusionar' means to make someone hope or dream again. In the song, it captures the feeling of a nation that had lost hope but found it renewed through the national team's journey."
  },
  {
    question: "Who are 'los pibes de Malvinas' mentioned in the lyrics?",
    options: [
      "Young football players from the Falkland Islands",
      "The Argentine soldiers who fought in the 1982 Falklands War",
      "Children born in the Falklands after 1982",
      "Fans who traveled to the Falklands for matches"
    ],
    correctAnswer: 1,
    explanation: "'Los pibes de Malvinas' refers to the young Argentine soldiers who fought in the 1982 Falklands War. The song honors their memory, connecting the football triumph to national sacrifice and resilience."
  },
  {
    question: "Who originally wrote the lyrics to 'Muchachos, ahora nos volvimos a ilusionar'?",
    options: [
      "Diego Maradona during his playing career",
      "Lionel Messi as a tribute to his teammates",
      "Fernando Romero, a devoted River Plate fan",
      "The band La Mosca Tse Tse"
    ],
    correctAnswer: 2,
    explanation: "Fernando Romero, a devoted River Plate fan, adapted the lyrics over the melody of La Mosca Tse Tse's song. What started as a club anthem evolved into a national symbol during Qatar 2022."
  },
  {
    question: "What melody is the song based on?",
    options: [
      "A traditional Argentine folk song",
      "A tango classic from the 1940s",
      "La Mosca Tse Tse's song 'Muchachos'",
      "An original composition for the World Cup"
    ],
    correctAnswer: 2,
    explanation: "The song uses the melody from La Mosca Tse Tse's 'Muchachos.' Fernando Romero adapted new lyrics over this existing melody, creating a powerful fusion that resonated with millions."
  },
  {
    question: "Why did the song become so popular during Qatar 2022?",
    options: [
      "It was officially adopted by the Argentine Football Association",
      "It was played in every stadium by FIFA",
      "It captured the collective hope and memory of a nation waiting 36 years for a third World Cup",
      "It was the only song allowed in the stadiums"
    ],
    correctAnswer: 2,
    explanation: "The song became popular because it captured the collective hope of a nation that had waited 36 years for a third World Cup. It references Diego, Messi, and Malvinas—touching on Argentina's greatest triumphs and deepest wounds."
  },
  {
    question: "What does the song represent about Argentine culture?",
    options: [
      "Only the passion for football victories",
      "The exclusive pride of Buenos Aires residents",
      "The resilience that unites generations and transcends club rivalries",
      "The rejection of international football"
    ],
    correctAnswer: 2,
    explanation: "The song represents Argentine resilience that unites generations. Older fans hear echoes of 1986 and Diego, while younger fans see Messi's final chance. It transcended club rivalries to become a national symbol of hope and collective memory."
  }
];

export default function StadiumVsStreet({ onComplete }: { onComplete?: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentQuestion = quizQuestions[currentIndex];

  const checkAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === currentQuestion.correctAnswer) {
      setFeedback(`Correct! ${currentQuestion.explanation}`);
      setScore((prev) => prev + 1);
    } else {
      setFeedback(`Incorrect. ${currentQuestion.explanation}`);
    }
  };

  const nextQuestion = () => {
    if (currentIndex === quizQuestions.length - 1) {
      setIsFinished(true);
      if (onComplete) onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setFeedback('');
      setSelectedAnswer(null);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setFeedback('');
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
  };

  if (isFinished) {
    const percentage = (score / quizQuestions.length) * 100;
    let message = "";
    
    if (percentage === 100) {
      message = "Perfect! You truly understand the soul of 'Muchachos.' ¡Sos un verdadero hincha!";
    } else if (percentage >= 75) {
      message = "Excellent work! You've captured the essence of this Argentine anthem.";
    } else if (percentage >= 50) {
      message = "Good effort. The story of 'Muchachos' has layers—keep exploring Argentine football culture.";
    } else {
      message = "Every journey starts with curiosity. Dive deeper into the story of Qatar 2022 and the meaning behind the lyrics.";
    }

    return (
      <div className="backdrop-blur-sm rounded-2xl p-8 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
        <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4" style={{ color: 'var(--text-main)' }}>
          Muchachos Quiz
        </h3>
        <div className="text-center space-y-6">
          <div className="py-8">
            <p className="text-5xl font-bold mb-2" style={{ color: 'var(--gold-highlight)' }}>
              {score} / {quizQuestions.length}
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
              Try Again
            </button>
            <button
              onClick={() => { if (onComplete) onComplete(); }}
              className="flex-1 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
              style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-sm rounded-2xl p-8 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
      <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4" style={{ color: 'var(--text-main)' }}>
        Muchachos Quiz
      </h3>
      <p className="mb-4" style={{ color: 'var(--text-accent)' }}>
        Test your knowledge about Argentina's anthem from Qatar 2022
      </p>
      <p className="mb-2 text-sm" style={{ color: 'var(--gold-highlight)' }}>
        Question {currentIndex + 1} of {quizQuestions.length} • Score: {score} / {quizQuestions.length}
      </p>
      <div className="space-y-4">
        <p className="text-lg font-semibold leading-relaxed" style={{ color: 'var(--text-main)' }}>
          {currentQuestion.question}
        </p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => checkAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 hover:scale-102 ${
                selectedAnswer === index
                  ? index === currentQuestion.correctAnswer
                    ? 'border-2 border-green-500'
                    : 'border-2 border-red-500'
                  : 'border border-gray-300 hover:border-gray-400'
              }`}
              style={{ 
                backgroundColor: selectedAnswer === null ? 'var(--bg-dark)' : 'var(--card-bg)',
                color: 'var(--text-main)',
                opacity: selectedAnswer !== null && selectedAnswer !== index ? 0.6 : 1
              }}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && (
          <div className="p-4 rounded-lg" style={{ backgroundColor: selectedAnswer === currentQuestion.correctAnswer ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: selectedAnswer === currentQuestion.correctAnswer ? '1px solid #22c55e' : '1px solid #ef4444' }}>
            <p style={{ color: selectedAnswer === currentQuestion.correctAnswer ? '#22c55e' : '#ef4444' }}>
              {feedback}
            </p>
          </div>
        )}
        {feedback && (
          <button
            onClick={nextQuestion}
            className="w-full py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            {currentIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}
