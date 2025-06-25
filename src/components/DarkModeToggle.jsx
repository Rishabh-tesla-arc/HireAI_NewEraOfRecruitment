import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle({ className = '' }) {
  // Check user preference and system settings
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full transition-colors ${className}`}
      aria-label="Toggle dark mode"
    >
      <div className="relative w-6 h-6">
        <Sun className="h-6 w-6 text-yellow-400 absolute transition-opacity dark:opacity-0 opacity-100" />
        <Moon className="h-6 w-6 text-purple-400 absolute transition-opacity opacity-0 dark:opacity-100" />
      </div>
    </button>
  );
} 