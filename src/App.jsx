import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import Forest from './components/Forest';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className="border-b border-gray-200 dark:border-gray-800 py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Forest Survival</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <Forest />
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-4 px-4 text-center">
        &copy; {new Date().getFullYear()} Forest Survival
      </footer>
    </div>
  );
}

export default App;
