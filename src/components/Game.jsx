import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';
import { updatePlayer, updateAnimals, updateResources } from '../utils/gameLogic';
import { drawPlayer, drawResources, drawAnimals, drawHud } from '../utils/rendering';

const Game = () => {
  const { gameState, setGameState } = useGameState();
  const canvasRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const gameLoop = (timestamp) => {
      updatePlayer(gameState.player, setGameState);
      updateAnimals(gameState.animals, setGameState);
      updateResources(gameState.resources, setGameState);

      drawPlayer(ctx, gameState.player);
      drawResources(ctx, gameState.resources);
      drawAnimals(ctx, gameState.animals);
      drawHud(ctx, gameState);

      rafIdRef.current = requestAnimationFrame(gameLoop);
    };

    rafIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [gameState, setGameState]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        updatePlayerPosition(0, -1);
        break;
      case 'ArrowDown':
      case 's':
        updatePlayerPosition(0, 1);
        break;
      case 'ArrowLeft':
      case 'a':
        updatePlayerPosition(-1, 0);
        break;
      case 'ArrowRight':
      case 'd':
        updatePlayerPosition(1, 0);
        break;
      case ' ':
        // Interact with nearby resources
        break;
      case 'i':
        // Open inventory
        break;
      case 'c':
        // Open crafting menu
        break;
    }
  };

  const updatePlayerPosition = (dx, dy) => {
    setGameState((prevState) => ({
      ...prevState,
      player: {
        ...prevState.player,
        position: {
          x: prevState.player.position.x + dx,
          y: prevState.player.position.y + dy,
        },
      },
    }));
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default Game;
