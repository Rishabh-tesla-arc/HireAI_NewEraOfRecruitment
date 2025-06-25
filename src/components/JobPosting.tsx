import React from 'react';
import { Briefcase, Search, Filter, MapPin, Clock, DollarSign } from 'lucide-react';

export default function JobPosting() {
  const jobs = [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $180k',
      description: 'Looking for an experienced software engineer to join our team. Focus on distributed systems and cloud architecture.',
      tags: ['React', 'Node.js', 'AWS', 'Kubernetes'],
      postedDate: '2d ago',
      compatibility: 92,
    },
    {
      title: 'Product Manager',
      company: 'InnovateLabs',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$110k - $160k',
      description: 'Seeking a strategic product manager to lead our AI-driven solutions development.',
      tags: ['Product Strategy', 'Agile', 'AI/ML', 'B2B'],
      postedDate: '1d ago',
      compatibility: 88,
    },
    {
      title: 'UX/UI Designer',
      company: 'DesignFlow',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90k - $130k',
      description: 'Join our creative team to design beautiful and intuitive user experiences for enterprise products.',
      tags: ['Figma', 'User Research', 'Design Systems', 'Prototyping'],
      postedDate: '3d ago',
      compatibility: 95,
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudScale',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$100k - $150k',
      description: 'Help us build and maintain robust CI/CD pipelines and cloud infrastructure.',
      tags: ['AWS', 'Docker', 'Terraform', 'Jenkins'],
      postedDate: '5d ago',
      compatibility: 85,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Find Your Perfect Role
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Discover opportunities matched to your skills and experience
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Search className="w-5 h-5 mr-2" />
              Search
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-soft-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{job.company}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    job.compatibility >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    job.compatibility >= 80 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {job.compatibility}% Match
                  </div>
                  <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
                    {job.postedDate}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {job.type}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {job.salary}
                </div>
              </div>

              <p className="mt-4 text-gray-600 dark:text-gray-400">{job.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                    View Details
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors dark:bg-purple-600 dark:hover:bg-purple-700">
                    Quick Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}