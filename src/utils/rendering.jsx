export const drawPlayer = (ctx, player) => {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.position.x, player.position.y, 32, 32);
};

export const drawResources = (ctx, resources) => {
  ctx.fillStyle = 'yellow';
  resources.forEach((resource) => {
    ctx.fillRect(resource.position.x, resource.position.y, 16, 16);
  });
};

export const drawAnimals = (ctx, animals) => {
  ctx.fillStyle = 'brown';
  animals.forEach((animal) => {
    ctx.fillRect(animal.position.x, animal.position.y, 32, 32);
  });
};

export const drawHud = (ctx, gameState) => {
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
