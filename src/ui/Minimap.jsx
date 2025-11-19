import React from 'react';
import useGameState from '../engine/useGameState';

const Minimap = () => {
  const { gameState } = useGameState();

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-md">
      <h2 className="text-lg font-bold mb-2">Minimap</h2>
      <canvas id="minimap-canvas" width={200} height={200} />
    </div>
  );
};

export default Minimap;
