import React, { useState } from 'react';
import { 
  FileText, Target, TrendingUp, Download, Upload, Star, Award, Settings, Edit, Eye, Share2, 
  CheckCircle, ArrowRight, BarChart2, PieChart, LineChart, Zap, Trophy, BookOpen, Play 
} from 'lucide-react';

// Define TypeScript interfaces
interface Stat {
  label: string;
  value: string;
  trend: string;
  icon: React.ElementType;
}

interface PerformanceMetric {
  category: string;
  stats: Stat[];
}

interface InsightSection {
  title: string;
  items: string[];
}

interface Course {
  name: string;
  progress: number;
  type: string;
  modules: number;
  completed: number;
  nextLesson: string;
}

interface LearningPath {
  category: string;
  courses: Course[];
}

interface Certification {
  name: string;
  provider: string;
  status: string;
  dueDate?: string;
  completedDate?: string;
  progress?: number;
  score?: string;
}

interface Action {
  label: string;
  icon: React.ElementType;
  primary?: boolean;
  link?: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  actions: Action[];
  performanceMetrics?: PerformanceMetric[];
  insights?: InsightSection[];
  learningPaths?: LearningPath[];
  certifications?: Certification[];
}

export default function CandidateTools() {
  const [activeTab, setActiveTab] = useState('resume');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const handleButtonClick = (label: string, toolId: string) => {
    let modalTitle = '';
    let modalContent = '';

    // Define different behaviors based on the button and tool
    switch (toolId) {
      case 'resume':
        if (label === 'Create Resume') {
          window.open('https://www.overleaf.com/', '_blank');
          return;
        } else if (label === 'Import') {
          modalTitle = 'Import Your Resume';
          modalContent = 'Drag and drop your resume file here or click to browse files. Supported formats: PDF, DOCX, TXT.';
        } else if (label === 'Export') {
          modalTitle = 'Export Options';
          modalContent = 'Choose your export format: PDF, DOCX, Plain Text, or HTML. Your resume will be optimized for ATS compatibility.';
        }
        break;
      
      case 'compatibility':
        if (label === 'View Matches') {
          modalTitle = 'Your Top Job Matches';
          modalContent = 'Based on your profile, we found 15 high-potential job matches in your area. The top 3 matches are: Senior React Developer (95% match), Frontend Team Lead (92% match), and Full Stack Engineer (89% match).';
        } else if (label === 'Update Profile') {
          modalTitle = 'Update Your Profile';
          modalContent = 'Update your skills, experience, and preferences to get better job matches. Adding specific technical skills and certifications can improve your match rate by up to 40%.';
        } else if (label === 'Share Profile') {
          modalTitle = 'Share Your Profile';
          modalContent = 'Share your professional profile with hiring managers, recruiters, or on social networks. You can control exactly what information is visible when shared.';
        }
        break;
      
      case 'analytics':
        if (label === 'Download Report') {
          modalTitle = 'Download Performance Report';
          modalContent = 'Your performance report is ready for download. This comprehensive analysis includes application metrics, interview success rates, and personalized recommendations for improving your job search.';
        } else if (label === 'Set Goals') {
          modalTitle = 'Set Career Goals';
          modalContent = 'Define your short-term and long-term career goals. Setting specific, measurable goals helps our AI provide more targeted recommendations and track your progress effectively.';
        } else if (label === 'Share Stats') {
          modalTitle = 'Share Your Performance Stats';
          modalContent = 'Share your job search performance with your career coach, mentor, or potential employers. Choose which metrics to include in your shared report.';
        }
        break;
      
      case 'learning':
        if (label === 'Start Learning') {
          modalTitle = 'Learning Pathways';
          modalContent = 'Begin your personalized learning journey with courses specifically selected to enhance your career prospects. Start with the recommended "Full Stack Development" pathway or choose from our catalog.';
        } else if (label === 'View Roadmap') {
          modalTitle = 'Your Learning Roadmap';
          modalContent = 'Here\'s your personalized learning roadmap for the next 3 months. Complete these courses to increase your job match rate by an estimated 35% and qualify for higher-paying positions.';
        } else if (label === 'Track Progress') {
          modalTitle = 'Learning Progress Dashboard';
          modalContent = 'You\'ve completed 65% of your recommended learning path. Keep up the good work! At your current pace, you\'ll complete all essential courses in approximately 6 weeks.';
        }
        break;
    }

    setModalContent({ title: modalTitle, content: modalContent });
    setShowModal(true);
  };

  const tools: Tool[] = [
    {
      id: 'resume',
      name: 'Smart Resume Builder',
      description: 'Create and optimize your resume with AI assistance',
      icon: FileText,
      features: [
        'AI-powered content suggestions',
        'ATS optimization',
        'Multiple templates',
        'Export to multiple formats',
        'Version control',
        'Keyword optimization'
      ],
      actions: [
        { label: 'Create Resume', icon: Edit, primary: true, link:"https://www.overleaf.com/" },
        { label: 'Import', icon: Upload },
        { label: 'Export', icon: Download },
      ]
    },
    {
      id: 'compatibility',
      name: 'Career Compatibility',
      description: 'Find the perfect job match based on your profile',
      icon: Target,
      features: [
        'Skills analysis',
        'Job role matching',
        'Career path suggestions',
        'Industry insights',
        'Salary expectations',
        'Growth opportunities'
      ],
      actions: [
        { label: 'View Matches', icon: Star, primary: true },
        { label: 'Update Profile', icon: Settings },
        { label: 'Share Profile', icon: Share2 },
      ]
    },
    {
      id: 'analytics',
      name: 'Performance Analytics',
      description: 'Track your application performance and success metrics',
      icon: TrendingUp,
      features: [
        'Real-time application tracking',
        'Interview success metrics',
        'Comparative industry analysis',
        'Personalized recommendations',
        'Skill gap identification',
        'Career progression tracking'
      ],
      actions: [
        { label: 'Download Report', icon: Download, primary: true },
        { label: 'Set Goals', icon: Target },
        { label: 'Share Stats', icon: Share2 },
      ],
      performanceMetrics: [
        {
          category: 'Application Success',
          stats: [
            { label: 'Applications', value: '24', trend: '+12%', icon: BarChart2 },
            { label: 'Interviews', value: '8', trend: '+50%', icon: LineChart },
            { label: 'Response Rate', value: '68%', trend: '+15%', icon: PieChart }
          ]
        },
        {
          category: 'Profile Performance',
          stats: [
            { label: 'Profile Views', value: '156', trend: '+28%', icon: Eye },
            { label: 'Skill Match', value: '92%', trend: '+5%', icon: Target },
            { label: 'Industry Rank', value: 'Top 15%', trend: '+10%', icon: Trophy }
          ]
        }
      ],
      insights: [
        {
          title: 'Performance Highlights',
          items: [
            'Your profile performs 35% better than average',
            'Skills in high demand: React, Node.js, AWS',
            'Suggested: Add cloud certification for 25% more matches'
          ]
        },
        {
          title: 'Action Items',
          items: [
            'Complete AWS certification to increase match rate',
            'Add more project examples to portfolio',
            'Update skills section with latest technologies'
          ]
        }
      ]
    },
    {
      id: 'learning',
      name: 'Learning Resources',
      description: 'Access curated learning materials and interview prep',
      icon: BookOpen,
      features: [
        'Personalized learning paths',
        'Interactive course content',
        'Real-world projects',
        'Expert mentorship',
        'Skill assessments',
        'Industry certifications'
      ],
      actions: [
        { label: 'Start Learning', icon: Play, primary: true },
        { label: 'View Roadmap', icon: Target },
        { label: 'Track Progress', icon: BarChart2 }
      ],
      learningPaths: [
        {
          category: 'Technical Skills',
          courses: [
            {
              name: 'Full Stack Development',
              progress: 75,
              type: 'Advanced',
              modules: 12,
              completed: 9,
              nextLesson: 'Advanced React Patterns'
            },
            {
              name: 'Cloud Architecture',
              progress: 60,
              type: 'Intermediate',
              modules: 8,
              completed: 5,
              nextLesson: 'AWS Solutions Architecture'
            }
          ]
        },
        {
          category: 'Professional Development',
          courses: [
            {
              name: 'Leadership & Management',
              progress: 90,
              type: 'Essential',
              modules: 6,
              completed: 5,
              nextLesson: 'Team Dynamics'
            },
            {
              name: 'Communication Skills',
              progress: 85,
              type: 'Core',
              modules: 4,
              completed: 3,
              nextLesson: 'Executive Presence'
            }
          ]
        }
      ],
      certifications: [
        {
          name: 'AWS Certified Solutions Architect',
          provider: 'Amazon Web Services',
          status: 'In Progress',
          dueDate: '2024-03-15',
          progress: 65
        },
        {
          name: 'Professional Scrum Master',
          provider: 'Scrum.org',
          status: 'Completed',
          completedDate: '2024-01-20',
          score: '95%'
        }
      ]
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Tools for Candidates
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Everything you need to succeed in your job search
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tool.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <tool.icon className="w-4 h-4" />
                <span>{tool.name}</span>
              </div>
            </button>
          ))}
        </div>

        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`${activeTab === tool.id ? 'block' : 'hidden'}`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <tool.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    {tool.actions.map((action) => (
                      <button
                        onClick={() => handleButtonClick(action.label, tool.id)}
                        key={action.label}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          action.primary
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <action.icon className="w-4 h-4 mr-2" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>

                {tool.id === 'analytics' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      {tool.performanceMetrics?.map((section) => (
                        <div key={section.category} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
                          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{section.category}</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {section.stats.map((stat) => (
                              <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex items-center justify-between mb-2">
                                  <stat.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                  <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                                    stat.trend.startsWith('+') 
                                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                                      : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                  }`}>
                                    {stat.trend}
                                  </span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-6">
                      {tool.insights?.map((section) => (
                        <div key={section.title} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{section.title}</h4>
                          <div className="space-y-3">
                            {section.items.map((item, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="w-2 h-2 mt-2 bg-purple-600 dark:bg-purple-400 rounded-full" />
                                <span className="text-gray-700 dark:text-gray-300">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(tool.id === 'resume' || tool.id === 'compatibility') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Key Features</h4>
                      <div className="space-y-3">
                        {tool.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Getting Started</h4>
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">
                          Follow these steps to create a professional resume:
                        </p>
                        <ol className="space-y-3">
                          <li className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-medium">
                              1
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Upload your existing resume or start from scratch
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-medium">
                              2
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Use AI suggestions to enhance your content
                            </span>
                          </li>
                          <li className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-medium">
                              3
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Preview and export in your preferred format
                            </span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}

                {tool.id === 'learning' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      {tool.learningPaths?.map((path) => (
                        <div key={path.category} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
                          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{path.category}</h4>
                          <div className="space-y-4">
                            {path.courses.map((course) => (
                              <div key={course.name} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                  <div>
                                    <h5 className="font-medium text-gray-900 dark:text-white">{course.name}</h5>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded-full text-xs">
                                        {course.type}
                                      </span>
                                      <span className="mx-2">•</span>
                                      <span>{course.completed}/{course.modules} modules</span>
                                    </div>
                                  </div>
                                  <span className="text-purple-600 dark:text-purple-400 font-semibold">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                                  <div
                                    className="bg-purple-600 rounded-full h-2 transition-all duration-500"
                                    style={{ width: `${course.progress}%` }}
                                  />
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">Next: {course.nextLesson}</span>
                                  <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium flex items-center">
                                    Continue
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Certifications</h4>
                        <div className="space-y-4">
                          {tool.certifications?.map((cert) => (
                            <div key={cert.name} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                              <h5 className="font-medium text-gray-900 dark:text-white">{cert.name}</h5>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{cert.provider}</p>
                              
                              <div className="flex justify-between items-center mt-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  cert.status === 'Completed' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                }`}>
                                  {cert.status}
                                </span>
                                {cert.status === 'Completed' ? (
                                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-1" />
                                    <span>Completed {cert.completedDate}</span>
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Due: {cert.dueDate}
                                  </div>
                                )}
                              </div>
                              
                              {cert.progress && (
                                <div className="mt-2">
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                      className="bg-purple-600 rounded-full h-2 transition-all duration-500"
                                      style={{ width: `${cert.progress}%` }}
                                    />
                                  </div>
                                  <div className="flex justify-between mt-1">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{cert.progress}% complete</span>
                                    <button className="text-xs text-purple-600 dark:text-purple-400 font-medium">Resume</button>
                                  </div>
                                </div>
                              )}
                              
                              {cert.score && (
                                <div className="mt-2 flex items-center">
                                  <Award className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-1" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Score: <span className="font-semibold text-gray-900 dark:text-white">{cert.score}</span>
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Getting Started</h4>
                        <div className="space-y-4">
                          <p className="text-gray-600 dark:text-gray-400">
                            Follow these steps to make the most of our {tool.name.toLowerCase()} tools:
                          </p>
                          <ol className="space-y-3">
                            <li className="flex items-center space-x-3">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-medium">
                                1
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">
                                {tool.id === 'resume' 
                                  ? 'Upload your existing resume or start from scratch'
                                  : 'Complete your profile with detailed information'}
                              </span>
                            </li>
                            <li className="flex items-center space-x-3">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-medium">
                                2
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">
                                {tool.id === 'resume'
                                  ? 'Use AI suggestions to enhance your content'
                                  : 'Set your preferences and career goals'}
                              </span>
                            </li>
                            <li className="flex items-center space-x-3">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-medium">
                                3
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">
                                {tool.id === 'resume'
                                  ? 'Preview and export in your preferred format'
                                  : 'Review matched opportunities and insights'}
                              </span>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Modal for button actions */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{modalContent.title}</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {modalContent.content}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}