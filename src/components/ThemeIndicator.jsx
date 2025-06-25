import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeIndicator({ darkMode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the indicator whenever the theme changes
    setVisible(true);
    
    // Hide it after 2 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [darkMode]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-full px-4 py-2 flex items-center space-x-2 border border-gray-200 dark:border-gray-700">
        {darkMode ? (
          <>
            <Moon className="text-purple-500 h-5 w-5" />
            <span className="text-gray-800 dark:text-white font-medium text-sm">Dark mode</span>
          </>
        ) : (
          <>
            <Sun className="text-yellow-500 h-5 w-5" />
            <span className="text-gray-800 dark:text-white font-medium text-sm">Light mode</span>
          </>
        )}
      </div>
    </div>
  );
} 