'use client';

import { useState } from 'react';

interface NationalTeamTriviaProps {
  onComplete?: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  fact: string;
}

export default function NationalTeamTrivia({ onComplete }: NationalTeamTriviaProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "In which year did Argentina win its first World Cup?",
      options: ["1978", "1986", "1930", "1950"],
      correctAnswer: 0,
      fact: "Argentina won its first World Cup in 1978, hosted at home, defeating the Netherlands 3-1 in the final."
    },
    {
      id: 2,
      question: "Who scored the 'Goal of the Century' against England in 1986?",
      options: ["Diego Maradona", "Mario Kempes", "Gabriel Batistuta", "Lionel Messi"],
      correctAnswer: 0,
      fact: "Diego Maradona scored the 'Goal of the Century' by dribbling past 5 English players in the 1986 World Cup quarterfinal."
    },
    {
      id: 3,
      question: "How many World Cups has Argentina won as of 2024?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      fact: "Argentina has won 3 World Cups: 1978, 1986, and 2022, making them one of the most successful national teams."
    },
    {
      id: 4,
      question: "What is the nickname of the Argentine national team?",
      options: ["La Albiceleste", "Los Gauchos", "Los Pumas", "El Tango"],
      correctAnswer: 0,
      fact: "La Albiceleste (The White and Sky Blue) refers to the team's iconic striped jersey colors."
    },
    {
      id: 5,
      question: "Which stadium is considered the home of Argentine football?",
      options: ["El Monumental", "La Bombonera", "El Cilindro", "El Gigante"],
      correctAnswer: 0,
      fact: "Estadio Monumental in Buenos Aires is the largest stadium in Argentina and home to River Plate, hosting many national team matches."
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quiz complete
      if (onComplete) {
        onComplete();
      }
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "¡Perfecto! You're a true Argentine football expert!";
    if (percentage >= 80) return "¡Excelente! Great knowledge of La Selección!";
    if (percentage >= 60) return "¡Bien done! You know your football history!";
    return "Keep learning! There's always more to discover about Argentine football.";
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
          National Team Trivia Quiz
        </h3>
        <p style={{ color: 'var(--text-accent)' }}>
          Test your knowledge of Argentine football history and La Selección!
        </p>
      </div>

      {currentQuestion < questions.length ? (
        <div className="backdrop-blur-sm rounded-xl p-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-semibold" style={{ color: 'var(--gold-highlight)' }}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-accent)' }}>
              Score: {score}/{questions.length}
            </span>
          </div>

          <h4 className="font-['Playfair_Display'] text-xl font-semibold mb-6" style={{ color: 'var(--text-main)' }}>
            {questions[currentQuestion].question}
          </h4>

          {!showResult ? (
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className="w-full p-4 rounded-lg text-left transition-all duration-300 hover:scale-102"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg ${
                  isCorrect ? 'border-green-500' : 'border-red-500'
                }`}
                style={{
                  backgroundColor: isCorrect ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  border: '2px solid'
                }}
              >
                <p className="font-semibold mb-2" style={{ color: isCorrect ? '#22c55e' : '#ef4444' }}>
                  {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                <p style={{ color: 'var(--text-accent)' }}>
                  {questions[currentQuestion].fact}
                </p>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🏆</div>
          <h4 className="font-['Playfair_Display'] text-3xl font-bold" style={{ color: 'var(--gold-highlight)' }}>
            Quiz Complete!
          </h4>
          <div className="space-y-2">
            <p className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
              Final Score: {score}/{questions.length}
            </p>
            <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
              {getScoreMessage()}
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowResult(false);
              setSelectedAnswer(null);
              setIsCorrect(null);
            }}
            className="px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
