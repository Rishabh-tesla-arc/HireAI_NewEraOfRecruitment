import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Stats from "./components/Stats.tsx";
import Features from "./components/Features.tsx";
import Services from "./components/Services.tsx";
import JobPosting from "./components/JobPosting.tsx";
import CandidateTools from "./components/CandidateTools.tsx";
import AssessmentCenter from "./components/AssessmentCenter.tsx";
import Analytics from "./components/Analytics.tsx";
import Integration from "./components/Integration.tsx";
import Testimonials from "./components/Testimonials.tsx";
import Pricing from "./components/Pricing.tsx";
import CTA from "./components/CTA.tsx";
import Footer from "./components/Footer.tsx";
import AIAssessment from "./components/AIAssessment.tsx"; 
import LoginSignup from "./components/LoginSignup";
import JobCompatibility from "./components/JobCompatibility.tsx";
import Contact from "./components/Contact.tsx";
import ThemeIndicator from "./components/ThemeIndicator";
// import AnimatedLayout from "./components/AnimatedLayout.tsx"; // Temporarily comment this out

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [themeChanged, setThemeChanged] = useState(false);

  useEffect(() => {
    // Initialize dark mode based on user preference or system setting
    const isDark = localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Fetch user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setThemeChanged(true);
    
    // Reset theme changed flag after 2 seconds
    setTimeout(() => setThemeChanged(false), 2000);
    
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {themeChanged && <ThemeIndicator darkMode={!darkMode} />}
      
      {/* Remove AnimatedLayout temporarily to diagnose blue screen */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              {user && (
                <h2 className="text-center text-2xl font-bold mt-4 text-gray-900 dark:text-white transition-colors">
                  Welcome, {user.name}!
                </h2>
              )}
              <Stats />
              <Features />
              <Services />
              <JobPosting />
              <CandidateTools />
              <AssessmentCenter />
              <Analytics />
              <Integration />
              <Testimonials />
              <Pricing />
              <CTA />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/ai-assessment" element={<AIAssessment />} />
        <Route path="/login-signup" element={<LoginSignup setUser={setUser} />} />
        <Route path="/job-compatibility" element={<JobCompatibility />} />
      </Routes>
    </div>
  );
}

export default App;
