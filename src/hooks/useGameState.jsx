import { useState } from 'react';

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    player: {
      position: { x: 50, y: 50 },
      health: 100,
      hunger: 100,
      thirst: 100,
      fatigue: 0,
      temperature: 20,
    },
    animals: [
      { type: 'deer', position: { x: 30, y: 40 }, health: 100 },
      { type: 'rabbit', position: { x: 60, y: 70 }, health: 50 },
    ],
    resources: [
      { type: 'food', position: { x: 20, y: 30 } },
      { type: 'water', position: { x: 70, y: 80 } },
      { type: 'wood', position: { x: 40, y: 60 } },
    ],
    world: {
      time: 0,
      weather: 'clear',
      temperature: 20,
    },
  });

  return { gameState, setGameState };
};
