import React from 'react';
import { FileText, Users, BarChart3 } from 'lucide-react';

export default function Features() {
  const features = [
    {
      name: 'Resume Analysis',
      description: 'AI-powered resume parsing and scoring based on job requirements',
      icon: FileText,
    },
    {
      name: 'Candidate Matching',
      description: 'Smart matching algorithm to find the perfect candidate-job fit',
      icon: Users,
    },
    {
      name: 'Analytics Dashboard',
      description: 'Comprehensive insights into your recruitment process',
      icon: BarChart3,
    },
  ];

  return (
    <div id="features" className="py-12 bg-white dark:bg-gray-900 gradient-pattern-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Transform Your Recruitment Process
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Leverage AI to streamline hiring and find the best talent.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root card-gradient rounded-lg px-6 pb-8 hover-lift">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}