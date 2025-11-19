import React, { useState, useEffect } from 'react';
import { Sun, Moon, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const Forest = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [resources, setResources] = useState([
    { type: 'food', x: 20, y: 30 },
    { type: 'water', x: 70, y: 80 },
    { type: 'wood', x: 40, y: 60 },
  ]);
  const [time, setTime] = useState(0);
  const [isDayTime, setIsDayTime] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time => time + 1);
      setIsDayTime(time % 86400 < 43200);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMove = (direction) => {
    switch (direction) {
      case 'up':
        setPlayerPosition(pos => ({ x: pos.x, y: pos.y - 1 }));
        break;
      case 'down':
        setPlayerPosition(pos => ({ x: pos.x, y: pos.y + 1 }));
        break;
      case 'left':
        setPlayerPosition(pos => ({ x: pos.x - 1, y: pos.y }));
        break;
      case 'right':
        setPlayerPosition(pos => ({ x: pos.x + 1, y: pos.y }));
        break;
    }
  };

  const collectResource = (resource) => {
    // Implement resource collection logic here
    console.log(`Collected ${resource.type}`);
    setResources(resources.filter(res => res !== resource));
  };

  return (
    <div className="h-screen w-screen bg-green-600 dark:bg-gray-800 text-white flex flex-col">
      <header className="bg-green-700 dark:bg-gray-700 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {isDayTime ? <Sun size={20} /> : <Moon size={20} />}
          <span>Day {Math.floor(time / 86400)}</span>
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
        <button className="p-2 rounded-full hover:bg-green-800 dark:hover:bg-gray-600" onClick={() => handleMove('up')}>
          <ChevronUp size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-green-800 dark:hover:bg-gray-600" onClick={() => handleMove('down')}>
          <ChevronDown size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-green-800 dark:hover:bg-gray-600" onClick={() => handleMove('left')}>
          <ChevronLeft size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-green-800 dark:hover:bg-gray-600" onClick={() => handleMove('right')}>
          <ChevronRight size={20} />
        </button>
      </footer>
    </div>
  );
};

export default Forest;
