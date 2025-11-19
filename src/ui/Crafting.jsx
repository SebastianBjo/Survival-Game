import React, { useState } from 'react';
import useGameState from '../engine/useGameState';

const Crafting = () => {
  const { gameState, setGameState } = useGameState();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const craftItem = () => {
    // Implement crafting logic
    // Check if player has required resources, update inventory, etc.
    console.log(`Crafted ${selectedRecipe.name}`);
    setSelectedRecipe(null);
  };

  return (
    <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-md">
      <h2 className="text-lg font-bold mb-2">Crafting</h2>
      <div className="space-y-2">
        {gameState.craftingRecipes.map((recipe, index) => (
          <div
            key={index}
            className={`bg-gray-700 p-2 rounded-md flex justify-between items-center cursor-pointer ${
              selectedRecipe?.name === recipe.name ? 'bg-gray-600' : ''
            }`}
            onClick={() => setSelectedRecipe(recipe)}
          >
            <span>{recipe.name}</span>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
              onClick={craftItem}
            >
              Craft
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crafting;
