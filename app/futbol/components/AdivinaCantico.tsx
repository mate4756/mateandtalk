'use client';

import React, { useState } from 'react';

const chants = [
  {
    firstLine: "Muchachos, ahora nos volvió a...",
    answer: "ilusionar",
    fullLine: "Muchachos, ahora nos volvió a ilusionar",
  },
  {
    firstLine: "Bravo, Boca, bravo...",
    answer: "Boca",
    fullLine: "Bravo, Boca, bravo, Boca, bravo, Boca, bravo",
  },
  {
    firstLine: "Vamos River, vamos...",
    answer: "River",
    fullLine: "Vamos River, vamos River, vamos River, vamos River",
  },
];

export default function AdivinaCantico() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const currentChant = chants[currentIndex];

  const checkAnswer = () => {
    if (userAnswer.toLowerCase().trim() === currentChant.answer.toLowerCase()) {
      setFeedback('¡Correcto! ¡Sos un verdadero hincha!');
      setIsCorrect(true);
    } else {
      setFeedback(`Incorrecto. La respuesta era: "${currentChant.answer}"`);
      setIsCorrect(false);
    }
  };

  const nextChant = () => {
    setCurrentIndex((prev) => (prev + 1) % chants.length);
    setUserAnswer('');
    setFeedback('');
    setIsCorrect(false);
  };

  return (
    <div className="backdrop-blur-sm rounded-2xl p-8 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
      <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4" style={{ color: 'var(--text-main)' }}>
        Adivina el Cántico
      </h3>
      <p className="mb-6" style={{ color: 'var(--text-accent)' }}>
        Completa la siguiente línea de un cántico icónico. ¿Cuántos conocés de memoria?
      </p>
      <div className="space-y-4">
        <p className="text-lg font-semibold" style={{ color: 'var(--gold-highlight)' }}>
          "{currentChant.firstLine}"
        </p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Tu respuesta..."
          className="w-full rounded-lg p-3 transition-all duration-300"
          style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
        />
        <button
          onClick={checkAnswer}
          disabled={isCorrect}
          className="w-full py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
        >
          Verificar
        </button>
        {feedback && (
          <div className="p-3 rounded-lg" style={{ backgroundColor: isCorrect ? 'rgba(229, 181, 103, 0.2)' : 'rgba(196, 180, 160, 0.2)', border: isCorrect ? '1px solid var(--gold-highlight)' : '1px solid var(--text-accent)' }}>
            <p style={{ color: isCorrect ? 'var(--gold-highlight)' : 'var(--text-accent)' }}>
              {feedback}
            </p>
          </div>
        )}
        {isCorrect && (
          <button
            onClick={nextChant}
            className="w-full py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
          >
            Siguiente Cántico
          </button>
        )}
      </div>
    </div>
  );
}
