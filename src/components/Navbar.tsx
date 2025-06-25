import React, { useState, useEffect } from "react";
import { Brain, Moon, Sun, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface User {
  name: string;
  email: string;
  [key: string]: any;
}

interface NavItem {
  id: string;
  label: string;
  target: string;
}

interface NavbarProps {
  user?: User | null;
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

export default function Navbar({ user: propUser, darkMode, toggleDarkMode }: NavbarProps) {
  const userJSON = localStorage.getItem("user");
  const user = propUser || (userJSON ? JSON.parse(userJSON) : null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems: NavItem[] = [
    { id: 'solutions', label: 'Solutions', target: '#services' },
    { id: 'features', label: 'Features', target: '#features' },
    { id: 'assessment', label: 'Assessment', target: '#assessment' },
    { id: 'integrations', label: 'Integrations', target: '#integrations' },
    { id: 'pricing', label: 'Pricing', target: '#pricing' },
    { id: 'contact', label: 'Contact', target: '#contact' }
  ];
  
  // Handle scroll event to update navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);
      
      // Update active section based on scroll position
      if (location.pathname === '/') {
        const sections = ['services', 'features', 'assessment', 'integrations', 'pricing', 'contact'];
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); // Refresh to update UI
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      // If we're not on the homepage, navigate to home with a hash
      window.location.href = `/${sectionId}`;
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`bg-white dark:bg-gray-900 sticky top-0 z-50 ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    } transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">AI Recruit</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-2 py-1 relative ${
                  activeSection === item.id ? 'text-purple-600 dark:text-purple-400 font-medium' : ''
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
                )}
              </button>
            ))}

            {/* Dark mode toggle (desktop) */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              <div className="relative w-6 h-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="absolute h-6 w-6 text-yellow-500 transition-opacity dark:opacity-0 opacity-100"
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="absolute h-6 w-6 text-purple-400 transition-opacity opacity-0 dark:opacity-100"
                >
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              </div>
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-gray-900 dark:text-white font-medium bg-purple-100 dark:bg-purple-900/50 py-1 px-3 rounded-full">
                  <span className="text-purple-600 dark:text-purple-400">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors shadow-sm hover:shadow"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login-signup" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-indigo-700 shadow-sm hover:shadow transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button and dark mode toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark mode toggle (mobile) */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              <div className="relative w-5 h-5">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="absolute h-5 w-5 text-yellow-500 transition-opacity dark:opacity-0 opacity-100"
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="absolute h-5 w-5 text-purple-400 transition-opacity opacity-0 dark:opacity-100"
                >
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 divide-y divide-gray-200 dark:divide-gray-700">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                activeSection === item.id ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
          
          {user ? (
            <div className="pt-2">
              <div className="px-3 py-2 text-gray-900 dark:text-white font-medium">
                Welcome, {user.name}
              </div>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-base font-medium bg-red-500 text-white hover:bg-red-600 rounded-md mt-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <Link 
                to="/login-signup"
                className="block w-full text-center px-3 py-2 text-base font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 rounded-md mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
