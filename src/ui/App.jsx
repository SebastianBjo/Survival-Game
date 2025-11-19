import React from 'react';
import GameLoop from '../engine/GameLoop';
import Hud from './Hud';
import Inventory from './Inventory';
import Crafting from './Crafting';
import Minimap from './Minimap';

const App = () => {
  return (
    <div className="relative h-screen w-screen bg-green-600 dark:bg-gray-800 overflow-hidden">
      <canvas id="game-canvas" className="h-full w-full" />
      <GameLoop />
      <Hud />
      <Inventory />
      <Crafting />
      <Minimap />
    </div>
  );
};

export default App;
