import React from 'react';
import useGameState from '../engine/useGameState';

const Hud = () => {
  const { gameState } = useGameState();

  return (
    <div className="fixed top-4 left-4 bg-gray-800 text-white p-4 rounded-md">
      <div>Health: {gameState.player.health}</div>
      <div>Hunger: {gameState.player.hunger}</div>
      <div>Thirst: {gameState.player.thirst}</div>
      <div>Fatigue: {gameState.player.fatigue}</div>
      <div>Temperature: {gameState.player.temperature}°C</div>
      <div>Time: {gameState.world.time}</div>
      <div>Weather: {gameState.world.weather}</div>
    </div>
  );
};

export default Hud;
