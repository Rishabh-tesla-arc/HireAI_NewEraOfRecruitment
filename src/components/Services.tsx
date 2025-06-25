import React from 'react';
import { Video, Calendar, Shield, FileText, Users, Brain, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      name: 'Virtual Interviews',
      description: 'AI-powered video interviews with real-time transcription and sentiment analysis',
      features: ['Live transcription', 'Candidate sentiment analysis', 'Automated scoring', 'Recording & playback'],
      icon: Video,
      link: "https://www.zoom.com/",
      isExternal: true
    },
    {
      name: 'Smart Scheduling',
      description: 'Intelligent calendar management with timezone detection and availability matching',
      features: ['Multi-timezone support', 'Group scheduling', 'Automated reminders', 'Calendar sync'],
      icon: Calendar,
      link: "https://slack.com/intl/en-in",
      isExternal: true
    },
    {
      name: 'Secure Assessment',
      description: 'Comprehensive skills evaluation platform with anti-fraud measures',
      features: ['Identity verification', 'Proctored tests', 'Custom assessments', 'Skill benchmarking'],
      icon: Shield,
      link: "/ai-assessment",
      isExternal: false
    },
    {
      name: 'Resume Builder',
      description: 'AI-powered resume creation and optimization tool',
      features: ['ATS optimization', 'Industry templates', 'Keyword analysis', 'Export options'],
      icon: FileText,
      link: "https://www.overleaf.com/",
      isExternal: true
    },
    {
      name: 'Job Compatibility',
      description: 'Advanced matching algorithm for perfect candidate-role fit',
      features: ['Skills matching', 'Culture fit analysis', 'Career path mapping', 'Growth potential'],
      icon: Users,
      link: "/job-compatibility",
      isExternal: false,
      highlight: true
    },
    {
      name: 'AI Assessment',
      description: 'Generate tailored interview questions and assessment criteria',
      features: ['Auto-generated questions', 'Role-specific assessments', 'Quick evaluation guides', 'Export options'],
      icon: Brain,
      link: "/ai-assessment",
      isExternal: false,
      highlight: true
    },
  ];

  return (
    <div id="services" className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl mb-4">
            <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Comprehensive Recruitment Services
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Everything you need to transform your hiring process with AI-powered tools
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div 
              key={service.name} 
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 relative ${service.highlight ? 'ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-gray-900' : ''}`}
              aria-label={`${service.name} service card`}
            >
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <service.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full">
                    AI Powered
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{service.name}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 min-h-[3rem]">{service.description}</p>
                <div className="mt-6 space-y-2">
                  {service.features.map((feature) => (
                    <div 
                      key={feature} 
                      className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-8 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
                {service.isExternal ? (
                  <a 
                    href={service.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium flex items-center group"
                    aria-label={`Learn more about ${service.name}`}
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <NavLink 
                    to={service.link}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium flex items-center group"
                    aria-label={`Learn more about ${service.name}`}
                  >
                    <span>Try now</span>
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </NavLink>
                )}
              </div>
              {service.highlight && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
                    Featured
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-4">
          <NavLink 
            to="/job-compatibility" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl inline-flex items-center font-medium shadow-md hover:shadow-lg transform transition-all hover:scale-105"
          >
            <Users className="w-5 h-5 mr-2" />
            <span>Match Your Resume</span>
          </NavLink>
          
          <NavLink 
            to="/ai-assessment" 
            className="bg-white dark:bg-gray-800 border border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 px-6 py-4 rounded-xl inline-flex items-center font-medium shadow-md hover:shadow-lg transform transition-all hover:scale-105"
          >
            <Brain className="w-5 h-5 mr-2" />
            <span>Generate Interview Questions</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}