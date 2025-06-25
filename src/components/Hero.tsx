import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Play, ArrowRight, Check, X, ChevronRight, Award } from 'lucide-react';

export default function Hero() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div id="home" className="relative overflow-hidden bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
        <div className="absolute right-0 bottom-0 -mb-48 -mr-48 h-96 w-96 border-4 border-purple-200 dark:border-purple-900 rounded-full"></div>
        <div className="absolute left-0 top-0 -mt-48 -ml-48 h-96 w-96 border-4 border-indigo-200 dark:border-indigo-900 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pt-10 pb-20 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-2 animate-fadeIn">
                <Award className="h-4 w-4 mr-2" />
                <span>AI-powered recruitment solution</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                <span className="block mb-2">Focus on the people,</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                  leave admin to AI
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-300 max-w-2xl">
                Our AI is designed to streamline your recruitment process by automating repetitive tasks and providing data-driven insights to help you find the perfect candidates.
              </p>
              
              <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                <NavLink to="/login-signup" className="block w-full sm:w-auto">
                  <button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg md:py-4 md:text-lg md:px-10 transform transition-all hover:-translate-y-1">
                    Get started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </NavLink>
                
                <button 
                  onClick={() => setShowDemo(true)}
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg border-2 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-purple-50 dark:hover:bg-purple-900/20 md:py-4 md:text-lg md:px-10 transform transition-all hover:-translate-y-1"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch demo
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <a href="#assessment" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Skills Assessment</span>
                </a>
                <a href="#features" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Resume Analysis</span>
                </a>
                <NavLink to="/job-compatibility" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Job Compatibility</span>
                </NavLink>
                <a href="#pricing" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Flexible Pricing</span>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                  alt="Team collaboration"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-lg">AI-Driven Recruitment</h3>
                      <p className="text-gray-200 text-sm">Transform your hiring process</p>
                    </div>
                    <NavLink to="/job-compatibility">
                      <button className="flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full text-white transition-all">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                  </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Video Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Recruit Demo</h3>
              <button 
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                onClick={() => setShowDemo(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  className="w-full h-[40vh] rounded-lg"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="AI Recruit Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-6 text-gray-600 dark:text-gray-300">
                <p>This demo showcases how AI Recruit transforms your recruitment process, from automated candidate screening to intelligent interview scheduling.</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                      <Check className="absolute h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm">AI-powered resume screening saves 85% of time in the initial selection process</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                      <Check className="absolute h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm">Intelligent skill matching improves candidate-job fit by 62%</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                      <Check className="absolute h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-sm">Automated assessment tests for technical and soft skills validation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end">
              <NavLink to="/login-signup" className="mr-3">
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                  Get Started
                </button>
              </NavLink>
              <button
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setShowDemo(false)}
              >
                Close
              </button>
            </div>
          </div>
      </div>
      )}
    </div>
  );
}