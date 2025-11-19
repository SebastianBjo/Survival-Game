import { updatePlayer } from '../entities/player';
import { updateAnimals } from '../entities/animals';
import { updateResources } from '../entities/resources';
import { updateWeather } from '../systems/weather';
import { updateTemperature } from '../systems/temperature';

export const updateWorld = (gameState, setGameState) => {
  setGameState((prevState) => ({
    ...prevState,
    player: updatePlayer(prevState.player),
    animals: updateAnimals(prevState.animals),
    resources: updateResources(prevState.resources),
    world: {
      ...prevState.world,
      time: prevState.world.time + 1,
      weather: updateWeather(prevState.world.weather, prevState.world.time),
      temperature: updateTemperature(prevState.world.temperature, prevState.world.time),
    },
  }));
};

export const renderWorld = (gameState) => {
  // Render the game world using HTML5 Canvas
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render the player
  ctx.fillStyle = 'blue';
  ctx.fillRect(
    gameState.player.position.x,
    gameState.player.position.y,
    32,
    32
  );

  // Render the resources
  ctx.fillStyle = 'yellow';
  gameState.resources.forEach((resource) => {
    ctx.fillRect(resource.position.x, resource.position.y, 16, 16);
  });

  // Render the animals
  ctx.fillStyle = 'brown';
  gameState.animals.forEach((animal) => {
    ctx.fillRect(animal.position.x, animal.position.y, 32, 32);
  });

  // Render the weather and temperature
  ctx.fillStyle = 'white';
  ctx.font = '16px Arial';
  ctx.fillText(`Weather: ${gameState.world.weather}`, 10, 20);
  ctx.fillText(`Temperature: ${gameState.world.temperature}°C`, 10, 40);
};
