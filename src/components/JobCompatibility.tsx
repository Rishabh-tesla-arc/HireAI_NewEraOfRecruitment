import React, { useState, useEffect } from 'react';
import { FileText, Upload, Check, AlertCircle, Users, BarChart2, Upload as UploadIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CompatibilityResult {
  score: number;
  skillsMatch: { skill: string; match: number }[];
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

const JobCompatibility: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [serverPort, setServerPort] = useState(5000); // Default port
  
  // Detect the server port on component mount
  useEffect(() => {
    async function detectServerPort() {
      try {
        // Try default port first
        const portResponse = await fetch('http://localhost:5000/api/serverinfo').catch(() => null);
        
        if (portResponse?.ok) {
          const data = await portResponse.json();
          if (data.port && data.port !== 5000) {
            setServerPort(data.port);
            console.log(`Server detected on port ${data.port}`);
          }
        } else {
          // Try the next port if default fails
          const backupResponse = await fetch('http://localhost:5001/api/serverinfo').catch(() => null);
          if (backupResponse?.ok) {
            const data = await backupResponse.json();
            setServerPort(data.port);
            console.log(`Server detected on port ${data.port}`);
          }
        }
      } catch (err) {
        console.warn('Could not auto-detect server port, using default');
      }
    }
    
    detectServerPort();
  }, []);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Check if file is a PDF
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        setResume(null);
        setResumeName('');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        setResume(null);
        setResumeName('');
        return;
      }
      
      setResume(file);
      setResumeName(file.name);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }
    
    if (!resume) {
      setError('Please upload your resume');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Create FormData to send to backend
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('resume', resume);
    
    try {
      // Use the detected server port or fallback to origin in production
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? window.location.origin 
        : `http://localhost:${serverPort}`;
        
      const response = await fetch(`${baseUrl}/api/job-compatibility`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze compatibility');
      }
      
      const data = await response.json();
      setResult(data);
      
      // Scroll to results
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // For demo purposes, we'll simulate a result when running locally
  const handleSimulateResult = () => {
    if (!jobDescription.trim() || !resume) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const simulatedResult: CompatibilityResult = {
        score: 82,
        skillsMatch: [
          { skill: 'React', match: 95 },
          { skill: 'TypeScript', match: 88 },
          { skill: 'Node.js', match: 75 },
          { skill: 'AWS', match: 60 },
          { skill: 'Python', match: 70 }
        ],
        strengths: [
          'Strong frontend development skills',
          'Experience with modern JavaScript frameworks',
          'Good understanding of UI/UX principles'
        ],
        gaps: [
          'Limited experience with cloud infrastructure',
          'No mention of CI/CD pipelines'
        ],
        recommendations: [
          'Add more details about backend development experience',
          'Consider AWS certification to strengthen cloud skills',
          'Highlight any experience with testing frameworks'
        ]
      };
      
      setResult(simulatedResult);
      setLoading(false);
      
      // Scroll to results
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
        
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl mb-4">
            <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Job Compatibility Analysis
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-500 dark:text-gray-300 max-w-3xl mx-auto">
            Find out how well your resume matches the job requirements using our AI-powered analysis
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700">
          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Match Your Profile
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload your resume and paste the job description to get started
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded-md animate-pulse">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Description
                  </label>
                  <textarea
                    id="jobDescription"
                    rows={6}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Include full job description for better analysis
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Resume (PDF only)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="space-y-1 text-center">
                      {!resume ? (
                        <>
                          <UploadIcon className="mx-auto h-10 w-10 text-gray-400 animate-pulse" />
                          <div className="flex flex-col sm:flex-row text-sm text-gray-600 dark:text-gray-400">
                            <label
                              htmlFor="resume-upload"
                              className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 focus-within:outline-none mb-2 sm:mb-0"
                            >
                              <span>Upload a file</span>
                              <input
                                id="resume-upload"
                                name="resume-upload"
                                type="file"
                                className="sr-only"
                                accept=".pdf"
                                onChange={handleResumeChange}
                                required
                              />
                            </label>
                            <p className="sm:pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PDF up to 5MB
                          </p>
                        </>
                      ) : (
                        <div className="flex items-center justify-center">
                          <div className="flex items-center bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg">
                            <FileText className="h-6 w-6 text-purple-600 mr-2" />
                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{resumeName}</span>
                            <button 
                              type="button" 
                              onClick={() => {
                                setResume(null);
                                setResumeName('');
                              }}
                              className="ml-3 text-sm text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <span>Analyze Compatibility</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Results Section */}
        {result && (
          <div id="results" className="mt-10 md:mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-500 transform translate-y-0 opacity-100">
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-8">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Compatibility Results
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Based on AI analysis of your resume and the job description
                  </p>
                </div>
              </div>
              
              <div className="mb-10">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Overall Match</h3>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">{result.score}%</span>
                    <div className="ml-2 text-xs font-medium px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      {result.score >= 80 ? 'Excellent' : result.score >= 60 ? 'Good' : 'Needs Improvement'}
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                    </div>
                    Skills Match
                  </h3>
                  <div className="space-y-4">
                    {result.skillsMatch.map((skill) => (
                      <div key={skill.skill} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 transition-all hover:shadow-md">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.skill}</span>
                          <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                            skill.match > 80 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                              : skill.match > 50 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                            {skill.match}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              skill.match > 80 
                                ? 'bg-green-500' 
                                : skill.match > 50 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${skill.match}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg p-4 border border-green-100 dark:border-green-900/20">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      Your Strengths
                    </h3>
                    <ul className="space-y-2">
                      {result.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 rounded-lg p-4 border border-amber-100 dark:border-amber-900/20">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-2">
                        <AlertCircle className="h-3 w-3 text-amber-600" />
                      </div>
                      Areas to Improve
                    </h3>
                    <ul className="space-y-2">
                      {result.gaps.map((gap, index) => (
                        <li key={index} className="flex items-start bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm">
                          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-2">
                    <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                  </div>
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 p-4 rounded-lg shadow-sm border border-purple-100 dark:border-purple-900/20">
                      <div className="bg-purple-100 dark:bg-purple-800 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-xs font-bold text-purple-800 dark:text-purple-200">{index + 1}</span>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{recommendation}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setResult(null);
                      setResume(null);
                      setResumeName('');
                      setJobDescription('');
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Analyze Another Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCompatibility; 