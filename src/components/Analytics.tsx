import React, { useState } from 'react';
import { BarChart, LineChart, PieChart, Activity, Users, Clock, TrendingUp, Filter, Calendar, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollAnimator from './ScrollAnimator';

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('This Month');
  const [department, setDepartment] = useState('All Departments');

  const metrics = [
    { label: 'Active Candidates', value: '2,847', change: '+12%', trend: 'up', icon: Users },
    { label: 'Time to Hire', value: '18 days', change: '-25%', trend: 'down', icon: Clock },
    { label: 'Success Rate', value: '92%', change: '+5%', trend: 'up', icon: TrendingUp },
  ];

  const pipelineStages = [
    { name: 'Applied', count: 1200, color: 'bg-blue-500' },
    { name: 'Screening', count: 800, color: 'bg-indigo-500' },
    { name: 'Interview', count: 400, color: 'bg-purple-500' },
    { name: 'Assessment', count: 200, color: 'bg-pink-500' },
    { name: 'Offer', count: 100, color: 'bg-red-500' },
    { name: 'Hired', count: 80, color: 'bg-green-500' },
  ];

  const sourceDistribution = [
    { source: 'LinkedIn', percentage: 35, color: 'bg-blue-500' },
    { source: 'Company Website', percentage: 25, color: 'bg-green-500' },
    { source: 'Referrals', percentage: 20, color: 'bg-purple-500' },
    { source: 'Job Boards', percentage: 15, color: 'bg-yellow-500' },
    { source: 'Others', percentage: 5, color: 'bg-gray-500' },
  ];

  return (
    <div id="analytics" className="py-16 bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimator animation="fadeIn">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                Real-time Analytics
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Track your recruitment metrics and make data-driven decisions
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
                  <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                  {timeframe}
                  <ChevronDown className="w-4 h-4 ml-2 text-purple-500" />
                </button>
              </motion.div>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
                  <Filter className="w-4 h-4 mr-2 text-purple-500" />
                  {department}
                  <ChevronDown className="w-4 h-4 ml-2 text-purple-500" />
                </button>
              </motion.div>
            </div>
          </div>
        </ScrollAnimator>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-12">
          {metrics.map((metric, index) => (
            <ScrollAnimator key={metric.label} delay={index * 0.1}>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transform transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                      <metric.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      metric.trend === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {metric.change}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{metric.label}</h3>
                    <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{metric.value}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollAnimator>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ScrollAnimator animation="slideLeft">
            <motion.div 
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Hiring Pipeline</h3>
              <div className="space-y-4">
                {pipelineStages.map((stage, index) => (
                  <div key={stage.name}>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>{stage.name}</span>
                      <span>{stage.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`${stage.color} rounded-full h-2`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stage.count / 1200) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </ScrollAnimator>

          <ScrollAnimator animation="slideRight">
            <motion.div 
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Source Distribution</h3>
              <div className="flex flex-col space-y-4">
                {sourceDistribution.map((source, index) => (
                  <div key={source.source}>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>{source.source}</span>
                      <span>{source.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`${source.color} rounded-full h-2`}
                        initial={{ width: 0 }}
                        animate={{ width: `${source.percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </ScrollAnimator>
        </div>
      </div>
    </div>
  );
}