'use client';

import { useState, useEffect } from 'react';

interface ScaloniMemoryMatchProps {
  onComplete?: () => void;
}

// 2022 World Cup Argentina Starting XI with their positions
const playerPositions = [
  { player: 'Emiliano Martínez', position: 'Goalkeeper' },
  { player: 'Nahuel Molina', position: 'Defender' },
  { player: 'Cristian Romero', position: 'Defender' },
  { player: 'Lisandro Martínez', position: 'Defender' },
  { player: 'Nicolás Otamendi', position: 'Defender' },
  { player: 'Marcos Acuña', position: 'Defender' },
  { player: 'Rodrigo De Paul', position: 'Midfielder' },
  { player: 'Enzo Fernández', position: 'Midfielder' },
  { player: 'Alexis Mac Allister', position: 'Midfielder' },
  { player: 'Ángel Di María', position: 'Forward' },
  { player: 'Lionel Messi', position: 'Forward' }
];

interface Card {
  id: string;
  content: string;
  type: 'player' | 'position';
  matchId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function ScaloniMemoryMatch({ onComplete }: ScaloniMemoryMatchProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'won'>('ready');

  const initializeGame = () => {
    // Create cards for players and positions
    const initialCards: Card[] = [];
    
    playerPositions.forEach((pair, index) => {
      initialCards.push({
        id: `player-${index}`,
        content: pair.player,
        type: 'player',
        matchId: pair.player,
        isFlipped: false,
        isMatched: false
      });
      
      initialCards.push({
        id: `position-${index}`,
        content: pair.position,
        type: 'position',
        matchId: pair.player,
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(shuffleArray(initialCards));
    setFlippedCards([]);
    setMatchedPairs(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const startGame = () => {
    setGameState('playing');
    initializeGame();
  };

  const handleCardClick = (clickedCard: Card) => {
    if (gameState !== 'playing') return;
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    if (flippedCards.length >= 2) return;

    // Flip the card
    setCards(prev => prev.map(card => 
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    ));
    
    setFlippedCards(prev => [...prev, { ...clickedCard, isFlipped: true }]);

    // If two cards are flipped, check for match
    if (flippedCards.length === 1) {
      const firstCard = flippedCards[0];
      const secondCard = clickedCard;

      if (firstCard.matchId === secondCard.matchId) {
        // Match found!
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstCard.id || card.id === secondCard.id 
              ? { ...card, isMatched: true } 
              : card
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);

          // Check for victory
          if (matchedPairs + 1 >= 11) {
            setGameState('won');
            if (onComplete) setTimeout(onComplete, 2000);
          }
        }, 500);
      } else {
        // No match - flip back after 1 second
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstCard.id || card.id === secondCard.id 
              ? { ...card, isFlipped: false } 
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    setGameState('ready');
    initializeGame();
  };

  if (gameState === 'ready') {
    return (
      <div className="space-y-6 w-full">
        <div className="text-center space-y-4">
          <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
            Scaloni's Memory Match
          </h3>
          <p style={{ color: 'var(--text-accent)' }}>
            Flip cards to match each player with their position. Find all 11 pairs to win!
          </p>
        </div>
        <div className="text-center">
          <button
            onClick={startGame}
            className="px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Start Match
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'won') {
    return (
      <div className="space-y-6 w-full">
        <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e' }}>
          <div className="text-4xl mb-2">🏆</div>
          <h4 className="font-['Playfair_Display'] text-2xl font-bold mb-2" style={{ color: '#22c55e' }}>
            Victory!
          </h4>
          <p style={{ color: 'var(--text-accent)' }}>
            Scaloni would be proud! Masterclass completed.
          </p>
        </div>
        <div className="text-center">
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="text-center space-y-4">
        <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
          Scaloni's Memory Match
        </h3>
        <div className="text-sm" style={{ color: 'var(--gold-highlight)' }}>
          Pairs Found: {matchedPairs}/11
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className="perspective-1000 cursor-pointer"
            style={{ height: '100px' }}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Card Back */}
              <div
                className="absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundColor: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
                  backfaceVisibility: 'hidden',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                }}
              >
                <div className="text-2xl">⚽</div>
              </div>

              {/* Card Front */}
              <div
                className={`absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center p-2 ${
                  card.isMatched ? 'opacity-50' : ''
                }`}
                style={{
                  backgroundColor: card.isMatched 
                    ? 'rgba(34, 197, 94, 0.2)' 
                    : 'var(--card-bg)',
                  border: card.isMatched 
                    ? '2px solid #22c55e' 
                    : '1px solid var(--border-subtle)',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  boxShadow: card.isMatched 
                    ? '0 4px 15px rgba(34, 197, 94, 0.3)' 
                    : '0 4px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div
                  className={`text-center text-xs font-semibold ${
                    card.type === 'player' ? 'text-sm' : 'text-xs'
                  }`}
                  style={{ 
                    color: card.isMatched ? '#22c55e' : 'var(--text-main)',
                    wordBreak: 'break-word'
                  }}
                >
                  {card.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
