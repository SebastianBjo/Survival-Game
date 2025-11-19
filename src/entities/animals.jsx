export const updateAnimals = (animals) => {
  return animals.map((animal) => {
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
};
