import React from 'react';
import useGameState from '../engine/useGameState';

const Inventory = () => {
  const { gameState } = useGameState();

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-4 rounded-md">
      <h2 className="text-lg font-bold mb-2">Inventory</h2>
      <div className="grid grid-cols-4 gap-2">
        {gameState.player.inventory.map((item, index) => (
          <div
            key={index}
            className="bg-gray-700 p-2 rounded-md flex justify-center items-center"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
