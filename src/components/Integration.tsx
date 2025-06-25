import React from 'react';
import { Globe, Shield, MessageSquare, Database, Clock, RefreshCw, ExternalLink } from 'lucide-react';

export default function Integration() {
  const features = [
    {
      name: 'Global Integration',
      description: 'Connect with major job boards and recruitment platforms worldwide',
      icon: Globe,
    },
    {
      name: 'Secure & Compliant',
      description: 'Enterprise-grade security with GDPR and data protection compliance',
      icon: Shield,
    },
    {
      name: 'Real-time Support',
      description: '24/7 AI-powered chat support and expert assistance',
      icon: MessageSquare,
    },
    {
      name: 'Data Migration',
      description: 'Seamlessly transfer existing candidate data into our system',
      icon: Database,
    },
    {
      name: 'Quick Setup',
      description: 'Get up and running in minutes with our step-by-step wizard',
      icon: Clock,
    },
    {
      name: 'Automatic Updates',
      description: 'Always stay up-to-date with continuous feature enhancements',
      icon: RefreshCw,
    },
  ];

  return (
    <div id="integrations" className="py-20 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl mb-4">
            <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Seamless Integration & Enterprise Support
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Connect with your favorite tools and recruitment platforms, with security and support when you need it
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div 
              key={feature.name} 
              className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-xl transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transform hover:-translate-y-1"
            >
              <div className="p-8">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 inline-block mb-4">
                  <feature.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">{feature.name}</h3>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
          
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-8 shadow-lg border border-purple-200 dark:border-purple-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need a custom integration?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Our team can build tailored integrations with your existing HR systems,
              ATS platforms, or custom workflows to ensure seamless data flow.
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transform transition-all hover:-translate-y-1"
            >
              Request Custom Integration <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}