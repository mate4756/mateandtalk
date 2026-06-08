'use client';

import { useState } from 'react';

interface TacticalSetupProps {
  onComplete?: () => void;
}

// 2022 World Cup Argentina Starting XI (exact lineup)
const correctStartingXI = [
  'Emiliano Martínez',
  'Nahuel Molina',
  'Cristian Romero',
  'Lisandro Martínez',
  'Nicolás Otamendi',
  'Marcos Acuña',
  'Rodrigo De Paul',
  'Enzo Fernández',
  'Alexis Mac Allister',
  'Ángel Di María',
  'Lionel Messi'
];

const players = [
  { id: 1, name: 'Emiliano Martínez' },
  { id: 2, name: 'Nahuel Molina' },
  { id: 3, name: 'Cristian Romero' },
  { id: 4, name: 'Lisandro Martínez' },
  { id: 5, name: 'Nicolás Otamendi' },
  { id: 6, name: 'Marcos Acuña' },
  { id: 7, name: 'Rodrigo De Paul' },
  { id: 8, name: 'Enzo Fernández' },
  { id: 9, name: 'Alexis Mac Allister' },
  { id: 10, name: 'Ángel Di María' },
  { id: 11, name: 'Lionel Messi' },
  { id: 12, name: 'Julián Álvarez' },
  { id: 13, name: 'Germán Pezzella' },
  { id: 14, name: 'Gonzalo Montiel' },
  { id: 15, name: 'Nicolás Tagliafico' },
  { id: 16, name: 'Leandro Paredes' },
  { id: 17, name: 'Alejandro Gómez' },
  { id: 18, name: 'Guido Rodríguez' },
  { id: 19, name: 'Nicolás González' },
  { id: 20, name: 'Exequiel Palacios' },
  { id: 21, name: 'Paulo Dybala' },
  { id: 22, name: 'Lautaro Martínez' },
  { id: 23, name: 'Emi Buendía' },
  { id: 24, name: 'Thiago Almada' },
  { id: 25, name: 'Giovani Lo Celso' },
  { id: 26, name: 'Joaquín Correa' },
  { id: 27, name: 'Gerónimo Rulli' },
];

export default function TacticalSetup({ onComplete }: TacticalSetupProps) {
  const [placedPlayers, setPlacedPlayers] = useState<Record<number, number>>({});
  const [draggedPlayerId, setDraggedPlayerId] = useState<number | null>(null);
  const [validationResult, setValidationResult] = useState<'correct' | 'incorrect' | null>(null);

  const handleDragStart = (playerId: number) => {
    setDraggedPlayerId(playerId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (slotNumber: number) => {
    if (draggedPlayerId !== null && !Object.values(placedPlayers).includes(draggedPlayerId)) {
      setPlacedPlayers(prev => ({ ...prev, [slotNumber]: draggedPlayerId }));
      setDraggedPlayerId(null);
      setValidationResult(null);
    }
  };

  const handleReset = () => {
    setPlacedPlayers({});
    setValidationResult(null);
  };

  const handleSubmit = () => {
    if (Object.keys(placedPlayers).length !== 11) return;

    const placedNames = Object.values(placedPlayers).map(id => players.find(p => p.id === id)?.name).filter(Boolean) as string[];
    
    // Check if all placed players are in the correct starting XI
    const isCorrect = correctStartingXI.every(name => placedNames.includes(name)) && 
                      placedNames.every(name => correctStartingXI.includes(name));

    setValidationResult(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect && onComplete) {
      setTimeout(() => onComplete(), 2000);
    }
  };

  const isComplete = Object.keys(placedPlayers).length === 11;

  return (
    <div className="space-y-6 w-full">
      <div className="text-center space-y-4">
        <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
          Scaloni's Masterclass
        </h3>
        <p style={{ color: 'var(--text-accent)' }}>
          Drag the 2022 World Cup Starting XI into the slots. Only the champion team wins.
        </p>
      </div>

      {validationResult === 'correct' && (
        <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e' }}>
          <div className="text-4xl mb-2">🏆</div>
          <h4 className="font-['Playfair_Display'] text-2xl font-bold mb-2" style={{ color: '#22c55e' }}>
            Winning Formation Unlocked!
          </h4>
          <p style={{ color: 'var(--text-accent)' }}>
            You've recreated the champion team. The World Cup is yours!
          </p>
        </div>
      )}

      {validationResult === 'incorrect' && (
        <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '2px solid #ef4444' }}>
          <div className="text-4xl mb-2">❌</div>
          <h4 className="font-['Playfair_Display'] text-2xl font-bold mb-2" style={{ color: '#ef4444' }}>
            That's not the champion team!
          </h4>
          <p style={{ color: 'var(--text-accent)' }}>
            Try again later. Only the 2022 World Cup Starting XI wins.
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Side: Player List */}
        <div className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
          <h4 className="font-semibold mb-4" style={{ color: 'var(--gold-highlight)' }}>Squad ({players.length} players)</h4>
          <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
            {players.map(player => {
              const isPlaced = Object.values(placedPlayers).includes(player.id);
              const isStarter = correctStartingXI.includes(player.name);
              return (
                <div
                  key={player.id}
                  draggable={!isPlaced}
                  onDragStart={() => !isPlaced && handleDragStart(player.id)}
                  className={`p-4 rounded-lg cursor-move transition-all duration-300 text-center ${
                    isPlaced ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: isStarter ? '2px solid var(--gold-highlight)' : '1px solid var(--border-subtle)'
                  }}
                >
                  <div className="font-bold text-base" style={{ color: 'var(--text-main)' }}>{player.name}</div>
                  {isStarter && (
                    <div className="text-xs font-semibold mt-1" style={{ color: 'var(--gold-highlight)' }}>★ Starter</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: 11 Slots */}
        <div className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
          <h4 className="font-semibold mb-4" style={{ color: 'var(--gold-highlight)' }}>Starting XI ({Object.keys(placedPlayers).length}/11)</h4>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 11 }, (_, i) => i + 1).map(slotNumber => {
              const playerId = placedPlayers[slotNumber];
              const player = players.find(p => p.id === playerId);
              
              return (
                <div
                  key={slotNumber}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(slotNumber)}
                  className={`relative min-h-[80px] rounded-lg flex items-center justify-center transition-all duration-300 ${
                    player ? 'animate-pulse' : 'border-2 border-dashed'
                  }`}
                  style={{
                    backgroundColor: player ? 'var(--gold-highlight)' : 'rgba(255, 255, 255, 0.1)',
                    borderColor: player ? 'var(--gold-highlight)' : 'var(--border-subtle)'
                  }}
                >
                  {player ? (
                    <div className="text-center p-2">
                      <div className="font-bold text-sm" style={{ color: 'var(--bg-dark)' }}>{player.name}</div>
                      <div className="text-xs font-semibold mt-1" style={{ color: 'var(--bg-dark)' }}>#{slotNumber}</div>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold" style={{ color: 'var(--text-accent)' }}>{slotNumber}</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              style={{ backgroundColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
            >
              Reset Field
            </button>
            {isComplete && (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
              >
                Submit Formation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
