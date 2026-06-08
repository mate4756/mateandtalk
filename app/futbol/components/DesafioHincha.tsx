'use client';

import React, { useState } from 'react';

const phrases = [
  {
    phrase: "Mirá que te como, hermano",
    type: "cancha",
    explanation: "Frase legendaria de Dibu Martínez en la tanda de penales de la Copa América 2021 contra Colombia, usada como intimidación psicológica.",
  },
  {
    phrase: "No me la contés",
    type: "calle",
    explanation: "Expresión cotidiana que usamos cuando alguien intenta engañarnos en cualquier situación.",
  },
  {
    phrase: "¡Vamos carajo!",
    type: "cancha",
    explanation: "Grito de aliento puro que resuena en el estadio, lleno de pasión desbordada.",
  },
  {
    phrase: "De una",
    type: "calle",
    explanation: "Acuerdo casual que usamos en el día a día para decir 'vamos a hacerlo'.",
  },
  {
    phrase: "Muchachos, ahora nos volvió a ilusionar",
    type: "cancha",
    explanation: "Cántico sagrado que define la resurrección futbolera, exclusivo de la religión del fútbol.",
  },
  {
    phrase: "Ponele",
    type: "calle",
    explanation: "Palabra de relleno para acuerdo que usamos en conversaciones cotidianas.",
  },
];

export default function DesafioHincha() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const currentPhrase = phrases[currentIndex];

  const checkAnswer = (type: 'cancha' | 'calle') => {
    if (type === currentPhrase.type) {
      setFeedback(`¡Correcto! ${currentPhrase.explanation}`);
      setScore((prev) => prev + 1);
    } else {
      setFeedback(`Incorrecto. ${currentPhrase.explanation}`);
    }
  };

  const nextPhrase = () => {
    setCurrentIndex((prev) => (prev + 1) % phrases.length);
    setFeedback('');
  };

  return (
    <div className="backdrop-blur-sm rounded-2xl p-8 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
      <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4" style={{ color: 'var(--text-main)' }}>
        Desafío del Hincha
      </h3>
      <p className="mb-4" style={{ color: 'var(--text-accent)' }}>
        Clasifica la frase: ¿Es de cancha o de calle?
      </p>
      <p className="mb-2 text-sm" style={{ color: 'var(--gold-highlight)' }}>
        Puntuación: {score} / {phrases.length}
      </p>
      <div className="space-y-4">
        <p className="text-lg font-semibold" style={{ color: 'var(--gold-highlight)' }}>
          "{currentPhrase.phrase}"
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => checkAnswer('cancha')}
            className="flex-1 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
          >
            De Cancha
          </button>
          <button
            onClick={() => checkAnswer('calle')}
            className="flex-1 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
          >
            De Calle
          </button>
        </div>
        {feedback && (
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(196, 180, 160, 0.2)', border: '1px solid var(--text-accent)' }}>
            <p style={{ color: 'var(--text-accent)' }}>
              {feedback}
            </p>
          </div>
        )}
        {feedback && (
          <button
            onClick={nextPhrase}
            className="w-full py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Siguiente Frase
          </button>
        )}
      </div>
    </div>
  );
}
