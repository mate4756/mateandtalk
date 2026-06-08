'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useAdminMode } from '../../lib/admin';

interface Player {
  id: string;
  name: string;
  correctPosition: string;
  legacy: string;
  icon: string;
}

interface Position {
  id: string;
  name: string;
  label: string;
  x: number;
  y: number;
}

const players: Player[] = [
  {
    id: 'messi',
    name: 'Lionel Messi',
    correctPosition: 'forward',
    legacy: 'The GOAT who led Argentina to World Cup glory in 2022, cementing his legacy as the greatest player of all time.',
    icon: '10'
  },
  {
    id: 'maradona',
    name: 'Diego Maradona',
    correctPosition: 'forward',
    legacy: 'The hand of God and the goal of the century in 1986 made him a national hero and football legend.',
    icon: '10'
  },
  {
    id: 'kempes',
    name: 'Mario Kempes',
    correctPosition: 'forward',
    legacy: 'Top scorer and hero of the 1978 World Cup, scoring the goals that brought Argentina its first World Cup title.',
    icon: '10'
  },
  {
    id: 'dimaria',
    name: 'Ángel Di María',
    correctPosition: 'midfielder',
    legacy: 'The scorer of crucial goals in finals, including the 2021 Copa América and 2022 World Cup.',
    icon: '11'
  },
  {
    id: 'dibu',
    name: 'Emiliano "Dibu" Martínez',
    correctPosition: 'goalkeeper',
    legacy: 'Penalty shootout hero who saved Argentina in crucial moments, including the 2021 Copa América and 2022 World Cup.',
    icon: 'GK'
  },
  {
    id: 'passarella',
    name: 'Daniel Passarella',
    correctPosition: 'defender',
    legacy: 'Captain of the 1978 World Cup winning team, a defensive leader who embodied Argentine determination.',
    icon: '6'
  }
];

const positions: Position[] = [
  { id: 'goalkeeper', name: 'goalkeeper', label: 'Goalkeeper', x: 50, y: 90 },
  { id: 'defender', name: 'defender', label: 'Defender', x: 50, y: 70 },
  { id: 'midfielder', name: 'midfielder', label: 'Midfielder', x: 50, y: 50 },
  { id: 'forward', name: 'forward', label: 'Forward', x: 50, y: 30 }
];

export default function LegendsSelectionBoard() {
  const { user } = useUser();
  const { isAdminMode } = useAdminMode();
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>(players);
  const [placedPlayers, setPlacedPlayers] = useState<Map<string, Player>>(new Map());
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState<{ position: string; legacy: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handlePlayerClick = (player: Player) => {
    if (isComplete) return;
    setSelectedPlayer(player);
  };

  const handlePositionClick = (position: Position) => {
    if (!selectedPlayer || isComplete) return;

    if (selectedPlayer.correctPosition === position.name) {
      // Correct placement
      setPlacedPlayers(prev => new Map(prev).set(position.id, selectedPlayer));
      setAvailablePlayers(prev => prev.filter(p => p.id !== selectedPlayer.id));
      
      setPopupContent({
        position: position.label,
        legacy: selectedPlayer.legacy
      });
      setShowPopup(true);
      setFeedback('');
      
      setSelectedPlayer(null);
      
      // Check if all players are placed correctly
      if (availablePlayers.length === 1) {
        setIsComplete(true);
        unlockAchievement();
      }
    } else {
      // Incorrect placement
      setFeedback(`This legend belongs elsewhere! Try placing him in the ${position.label} position to see his true power.`);
      setTimeout(() => setFeedback(''), 3000);
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
          action: 'unlock_patrimonio_futbolero',
        }),
      });

      if (response.ok) {
        setFeedback("🎉 Congratulations! You've unlocked the 'Patrimonio Futbolero' achievement!");
      }
    } catch (error) {
      console.error('Error unlocking achievement:', error);
      setFeedback("🎉 Congratulations! You've completed the Legends Selection Board!");
    }
  };

  const resetGame = () => {
    setAvailablePlayers(players);
    setPlacedPlayers(new Map());
    setSelectedPlayer(null);
    setFeedback('');
    setShowPopup(false);
    setPopupContent(null);
    setIsComplete(false);
  };

  return (
    <div className="space-y-6">
      {/* Mini Football Pitch */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden" style={{ 
        backgroundColor: '#2d5a27',
        border: '4px solid #ffffff'
      }}>
        {/* Pitch markings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 border-2 border-white rounded-full opacity-50"></div>
        </div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white opacity-50"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white opacity-50"></div>
        
        {/* Goal areas */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-16 border-2 border-white border-b-0"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-16 border-2 border-white border-t-0"></div>

        {/* Position drop zones */}
        {positions.map((position) => (
          <div
            key={position.id}
            onClick={() => handlePositionClick(position)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
              selectedPlayer ? 'hover:scale-110' : ''
            } ${placedPlayers.has(position.id) ? 'opacity-50' : ''}`}
            style={{ 
              left: `${position.x}%`, 
              top: `${position.y}%`,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: placedPlayers.has(position.id) ? '2px solid #22c55e' : '2px dashed rgba(255, 255, 255, 0.5)'
            }}
          >
            {placedPlayers.has(position.id) ? (
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{placedPlayers.get(position.id)?.icon}</div>
                <div className="text-xs text-white truncate">{placedPlayers.get(position.id)?.name.split(' ')[0]}</div>
              </div>
            ) : (
              <span className="text-xs text-white text-center">{position.label}</span>
            )}
          </div>
        ))}
      </div>

      {/* Available Players */}
      <div className="space-y-4">
        <h3 className="font-['Playfair_Display'] text-xl font-semibold" style={{ color: 'var(--text-main)' }}>
          Available Legends
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {availablePlayers.map((player) => (
            <button
              key={player.id}
              onClick={() => handlePlayerClick(player)}
              className={`p-4 rounded-lg transition-all duration-300 text-left ${
                selectedPlayer?.id === player.id
                  ? 'ring-2 ring-[#E5B567] scale-105'
                  : 'hover:scale-105'
              }`}
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                border: selectedPlayer?.id === player.id ? '2px solid #E5B567' : '1px solid var(--border-subtle)',
                color: 'var(--text-main)'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}>
                  {player.icon}
                </div>
                <span className="font-medium text-sm">{player.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="p-4 rounded-lg text-center" style={{ 
          backgroundColor: isComplete ? 'rgba(34, 197, 94, 0.1)' : 'rgba(196, 180, 160, 0.2)',
          border: isComplete ? '1px solid #22c55e' : '1px solid var(--text-accent)'
        }}>
          <p style={{ color: isComplete ? '#22c55e' : 'var(--text-accent)' }}>
            {feedback}
          </p>
        </div>
      )}

      {/* Popup Panel */}
      {showPopup && popupContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowPopup(false)}>
          <div className="backdrop-blur-sm rounded-2xl p-8 max-w-md mx-4" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid #E5B567' }}>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
              Legend Placed!
            </h3>
            <div className="space-y-4">
              <div>
                <span className="font-semibold" style={{ color: 'var(--gold-highlight)' }}>Position: </span>
                <span style={{ color: 'var(--text-main)' }}>{popupContent.position}</span>
              </div>
              <div>
                <span className="font-semibold" style={{ color: 'var(--gold-highlight)' }}>Legacy: </span>
                <p className="mt-2" style={{ color: 'var(--text-accent)' }}>{popupContent.legacy}</p>
              </div>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 w-full py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
              style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
            >
              Continue
            </button>
          </div>
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
