import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const App = () => {
  // Game State
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [resources, setResources] = useState([
    { type: 'food', position: { x: 20, y: 30 } },
    { type: 'water', position: { x: 70, y: 80 } },
    { type: 'wood', position: { x: 40, y: 60 } },
  ]);
  const [animals, setAnimals] = useState([
    { type: 'deer', position: { x: 30, y: 40 }, health: 100 },
    { type: 'rabbit', position: { x: 60, y: 70 }, health: 50 },
  ]);
  const [gameState, setGameState] = useState({
    player: {
      position: playerPosition,
      health: 100,
      hunger: 100,
      thirst: 100,
      fatigue: 0,
      temperature: 20,
    },
    world: {
      time: 0,
      weather: 'clear',
      temperature: 20,
    },
  });

  // Game Loop
  const rafIdRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const gameLoop = (timestamp) => {
      // Update Game State
      updatePlayer(gameState.player);
      updateAnimals(animals);
      updateResources(resources);
      updateWeather(gameState.world);
      updateTemperature(gameState.player);

      // Render Game World
      clearCanvas(ctx, canvas);
      drawPlayer(ctx, gameState.player);
      drawResources(ctx, resources);
      drawAnimals(ctx, animals);
      drawHud(ctx, gameState);

      rafIdRef.current = requestAnimationFrame(gameLoop);
    };

    rafIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [gameState, animals, resources]);

  // Input Handling
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
    setPlayerPosition((pos) => ({
      x: pos.x + dx,
      y: pos.y + dy,
    }));
  };

  const collectResource = (resource) => {
    // Implement resource collection logic here
    console.log(`Collected ${resource.type}`);
    setResources(resources.filter((res) => res !== resource));
  };

  // Game World Rendering
  const clearCanvas = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawPlayer = (ctx, player) => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.position.x, player.position.y, 32, 32);
  };

  const drawResources = (ctx, resources) => {
    ctx.fillStyle = 'yellow';
    resources.forEach((resource) => {
      ctx.fillRect(resource.position.x, resource.position.y, 16, 16);
    });
  };

  const drawAnimals = (ctx, animals) => {
    ctx.fillStyle = 'brown';
    animals.forEach((animal) => {
      ctx.fillRect(animal.position.x, animal.position.y, 32, 32);
    });
  };

  const drawHud = (ctx, gameState) => {
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`Health: ${gameState.player.health}`, 10, 20);
    ctx.fillText(`Hunger: ${gameState.player.hunger}`, 10, 40);
    ctx.fillText(`Thirst: ${gameState.player.thirst}`, 10, 60);
    ctx.fillText(`Fatigue: ${gameState.player.fatigue}`, 10, 80);
    ctx.fillText(`Temperature: ${gameState.player.temperature}°C`, 10, 100);
    ctx.fillText(`Time: ${gameState.world.time}`, 10, 120);
    ctx.fillText(`Weather: ${gameState.world.weather}`, 10, 140);
  };

  // Game Logic
  const updatePlayer = (player) => {
    // Update player's hunger, thirst, fatigue, and temperature
    const updatedPlayer = {
      ...player,
      hunger: player.hunger - 1,
      thirst: player.thirst - 1,
      fatigue: player.fatigue + 1,
      temperature: updateTemperature(player.temperature),
    };

    // Handle player's injuries and health
    if (updatedPlayer.hunger <= 0 || updatedPlayer.thirst <= 0) {
      updatedPlayer.health -= 1;
    }

    if (updatedPlayer.fatigue >= 100) {
      updatedPlayer.health -= 1;
      updatedPlayer.fatigue = 0;
    }

    if (updatedPlayer.temperature < 0 || updatedPlayer.temperature > 40) {
      updatedPlayer.health -= 1;
    }

    setGameState((prevState) => ({
      ...prevState,
      player: updatedPlayer,
    }));
  };

  const updateAnimals = (animals) => {
    const updatedAnimals = animals.map((animal) => {
      // Update animal behavior (wander, flee, rest) based on environmental factors
      const newPosition = {
        x: animal.position.x + Math.floor(Math.random() * 3) - 1,
        y: animal.position.y + Math.floor(Math.random() * 3) - 1,
      };

      return {
        ...animal,
        position: newPosition,
      };
    });

    setAnimals(updatedAnimals);
  };

  const updateResources = (resources) => {
    // Update resource positions or replenish over time
    // ...
    setResources(resources);
  };

  const updateWeather = (world) => {
    // Implement weather system logic
    // For example, chance of rain/snow increases at night, wind picks up during storms, etc.
    setGameState((prevState) => ({
      ...prevState,
      world: {
        ...prevState.world,
        time: prevState.world.time + 1,
        weather: 'clear', // Update weather based on time of day, season, etc.
      },
    }));
  };

  const updateTemperature = (player) => {
    // Implement temperature update logic based on environmental factors
    // For example, decrease temperature at night, increase in hot weather, etc.
    setGameState((prevState) => ({
      ...prevState,
      player: {
        ...prevState.player,
        temperature: prevState.player.temperature,
      },
    }));
  };

  // Render
  return (
    <div
      className="relative h-screen w-screen bg-green-600 dark:bg-gray-800 text-white flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <header className="bg-green-700 dark:bg-gray-700 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {gameState.world.time % 86400 < 43200 ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
          <span>Day {Math.floor(gameState.world.time / 86400)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>{playerPosition.x}, {playerPosition.y}</span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-10 gap-1 p-4">
        {resources.map((resource, index) => (
          <div
            key={index}
            className={`bg-yellow-500 dark:bg-gray-600 rounded-md p-2 cursor-pointer hover:bg-yellow-600 dark:hover:bg-gray-500`}
            onClick={() => collectResource(resource)}
          >
            {resource.type}
          </div>
        ))}
        <div
          className={`bg-blue-500 dark:bg-gray-600 rounded-md p-2 col-span-1 row-span-1`}
          style={{ gridColumn: `${playerPosition.x}`, gridRow: `${playerPosition.y}` }}
        >
          You
        </div>
      </div>

      <footer className="bg-green-700 dark:bg-gray-700 px-4 py-2 flex justify-center space-x-4">
        <button
          className="p-2 rounded-full hover:bg-green-800 dark:hover:bg-gray-600"
          onClick={() => updatePlayerPosition(0, -1)}
        >
          <ChevronUp size={20} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-green-800 dark:hover:bg-gray-600"
          onClick={() => updatePlayerPosition(0, 1)}
        >
          <ChevronDown size={20} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-green-800 dark:hover:bg-gray-600"
          onClick={() => updatePlayerPosition(-1, 0)}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-green-800 dark:hover:bg-gray-600"
          onClick={() => updatePlayerPosition(1, 0)}
        >
          <ChevronRight size={20} />
        </button>
      </footer>

      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default App;
