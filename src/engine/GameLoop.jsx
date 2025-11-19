import React, { useEffect, useRef } from 'react';
import useGameState from './useGameState';
import { updateWorld, renderWorld } from './worldLogic';

const GameLoop = () => {
  const { gameState, setGameState } = useGameState();
  const rafIdRef = useRef(null);

  useEffect(() => {
    const gameLoop = (timestamp) => {
      updateWorld(gameState, setGameState);
      renderWorld(gameState);
      rafIdRef.current = requestAnimationFrame(gameLoop);
    };

    rafIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [gameState, setGameState]);

  return null;
};

export default GameLoop;
