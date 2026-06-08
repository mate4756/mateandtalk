'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useAdminMode } from '../lib/admin';
import { useAuthVerification } from '../lib/auth';
import { QuizQuestion, getCurrentActiveWeek, getWeekStatus, weekSchedules } from '@/lib/quizData';

export default function WeeklyQuiz() {
  const { isSignedIn, isLoaded } = useUser();
  const { isAdminMode } = useAdminMode();
  const { hasPlan } = useAuthVerification();
  const [showQuiz, setShowQuiz] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [nextAvailable, setNextAvailable] = useState<string | null>(null);
  const [countdown, setCountdown] = useState('');
  const [rotationWeek, setRotationWeek] = useState<number>(1);
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [weekStatus, setWeekStatus] = useState<'locked' | 'coming-soon' | 'ready'>('locked');

  useEffect(() => {
    if (showQuiz && isSignedIn) {
      fetchQuizQuestions();
    }
  }, [showQuiz, isSignedIn]);

  useEffect(() => {
    // Initialize current week and status
    const activeWeek = getCurrentActiveWeek();
    setCurrentWeek(activeWeek);
    setWeekStatus(getWeekStatus(activeWeek));
  }, []);

  useEffect(() => {
    if (nextAvailable) {
      const interval = setInterval(() => {
        const now = new Date();
        const available = new Date(nextAvailable);
        const diff = available.getTime() - now.getTime();

        if (diff <= 0) {
          clearInterval(interval);
          setCountdown('Available now!');
          setNextAvailable(null);
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [nextAvailable]);

  const fetchQuizQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const adminParam = isAdminMode ? '?isAdmin=true' : '';
      const response = await fetch(`/api/quiz${adminParam}`);
      const data = await response.json();

      if (!data.success) {
        if (data.reason) {
          setError(data.reason);
          if (data.nextAvailable) {
            setNextAvailable(data.nextAvailable);
          }
        }
        setShowQuiz(false);
        setLoading(false);
        return;
      }

      setQuestions(data.questions);
      setRotationWeek(data.rotationWeek || 1);
      setCurrentQuestion(0);
      setAnswers([]);
      setCompleted(false);
      setLoading(false);
    } catch (err) {
      setError('Failed to load quiz. Please try again.');
      setLoading(false);
      setShowQuiz(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (finalAnswers: number[]) => {
    setLoading(true);
    try {
      let correctCount = 0;
      questions.forEach((q, index) => {
        if (q.correctAnswer === finalAnswers[index]) {
          correctCount++;
        }
      });

      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: finalAnswers,
          score: correctCount,
          isAdmin: isAdminMode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setScore(correctCount);
        setCompleted(true);
        if (data.nextAvailable) {
          setNextAvailable(data.nextAvailable);
        }
      } else {
        setError(data.error || 'Failed to submit quiz');
      }
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    if (!isSignedIn) {
      setError('Please log in to participate');
      return;
    }
    
    if (!hasPlan && !isAdminMode) {
      setError('Premium access required. Please upgrade to a Premium plan to participate in weekly quizzes.');
      return;
    }
    
    if (currentWeek === 0 && !isAdminMode) {
      setError('Quiz not yet available. Check back soon!');
      return;
    }
    
    setShowQuiz(true);
  };

  if (!isLoaded) {
    return <div style={{ color: 'var(--text-main)' }}>Loading...</div>;
  }

  if (completed) {
    return (
      <div className="backdrop-blur-sm rounded-2xl p-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
        <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4" style={{ color: 'var(--text-main)' }}>
          Quiz Completed!
        </h3>
        <p className="text-lg mb-4" style={{ color: 'var(--text-main)' }}>
          Your score: <span className="font-bold" style={{ color: '#E5B567' }}>{score}/{questions.length}</span>
        </p>
        {isAdminMode && (
          <p className="text-sm mb-4" style={{ color: 'var(--gold-highlight)' }}>
            Admin Mode: Quiz attempt recorded for testing
          </p>
        )}
        {nextAvailable && countdown && (
          <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(229, 181, 103, 0.1)', border: '1px solid #E5B567' }}>
            <p className="text-sm" style={{ color: 'var(--text-main)' }}>
              Next quiz in: <span className="font-bold" style={{ color: '#E5B567' }}>{countdown}</span>
            </p>
          </div>
        )}
        <button
          onClick={() => setShowQuiz(false)}
          className="mt-6 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
          style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
        >
          Close
        </button>
      </div>
    );
  }

  if (showQuiz && questions.length > 0) {
    const question = questions[currentQuestion];
    return (
      <div className="backdrop-blur-sm rounded-2xl p-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--text-main)' }}>
            Weekly Quiz
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold" style={{ color: '#E5B567' }}>
              Question {currentQuestion + 1}/{questions.length}
            </span>
            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(229, 181, 103, 0.2)', color: '#E5B567' }}>
              Week {rotationWeek}
            </span>
            {isAdminMode && (
              <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                Admin
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ color: 'var(--text-main)' }}>Loading...</div>
        ) : (
          <div className="space-y-6">
            <p className="text-lg" style={{ color: 'var(--text-main)' }}>
              {question.question}
            </p>

            <div className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-4 rounded-lg text-left transition-all duration-300 hover:scale-102"
                  style={{ 
                    backgroundColor: 'var(--bg-dark)', 
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowQuiz(false)}
          className="mt-6 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
          style={{ backgroundColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-sm rounded-2xl p-8" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
            Weekly Participation Quiz
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-accent)' }}>
              Week {currentWeek || 'Coming Soon'}
            </span>
            {currentWeek > 0 && (
              <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>
                Active
              </span>
            )}
            {currentWeek === 0 && weekStatus === 'coming-soon' && (
              <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(229, 181, 103, 0.2)', color: '#E5B567' }}>
                Coming Soon
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-lg mb-6" style={{ color: 'var(--text-accent)' }}>
        Test your knowledge of Argentine Spanish! One attempt per week. Content rotates every 3 weeks.
      </p>

      {currentWeek === 0 && weekStatus === 'coming-soon' && (
        <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(229, 181, 103, 0.1)', border: '1px solid #E5B567' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: '#E5B567' }}>
            Coming Soon
          </p>
          <p className="text-sm" style={{ color: 'var(--text-main)' }}>
            This challenge unlocks on {weekSchedules.find(s => s.weekNumber === 1)?.unlockDate}. Get your premium access ready!
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444' }}>
          <p className="text-sm" style={{ color: '#ef4444' }}>{error}</p>
        </div>
      )}

      {nextAvailable && countdown && (
        <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(229, 181, 103, 0.1)', border: '1px solid #E5B567' }}>
          <p className="text-sm" style={{ color: 'var(--text-main)' }}>
            Next quiz in: <span className="font-bold" style={{ color: '#E5B567' }}>{countdown}</span>
          </p>
        </div>
      )}

      {loading ? (
        <div style={{ color: 'var(--text-main)' }}>Loading...</div>
      ) : (
        <button
          onClick={handleStartQuiz}
          disabled={!isSignedIn || (!hasPlan && !isAdminMode) || (currentWeek === 0 && !isAdminMode) || (!!nextAvailable && !isAdminMode)}
          className="px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            backgroundColor: isSignedIn && hasPlan && currentWeek > 0 && (!nextAvailable || isAdminMode) ? 'var(--gold-highlight)' : 'var(--border-subtle)', 
            color: isSignedIn && hasPlan && currentWeek > 0 && (!nextAvailable || isAdminMode) ? 'var(--bg-dark)' : 'var(--text-accent)'
          }}
        >
          {!isSignedIn ? 'Please log in to participate' : 
           !hasPlan && !isAdminMode ? 'Premium Required' :
           currentWeek === 0 && !isAdminMode ? 'Coming Soon' :
           (nextAvailable && !isAdminMode) ? 'Quiz Locked' : 'Start Quiz'}
        </button>
      )}

      {isAdminMode && (
        <div className="mt-4 p-3 rounded-lg text-xs" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444' }}>
          <p style={{ color: '#ef4444' }}>
            Admin Mode: Weekly limit bypassed for testing
          </p>
        </div>
      )}
    </div>
  );
}
