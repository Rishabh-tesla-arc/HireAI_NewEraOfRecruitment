import React, { useState, useEffect } from "react";
import { ArrowLeft, Brain, Search, Copy, Download, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function AIAssessment() {
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [serverPort, setServerPort] = useState(5000); // Default port
  const [copied, setCopied] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState("");

  // Popular job templates
  const jobTemplates = [
    { title: "Software Engineer", icon: "💻" },
    { title: "Data Scientist", icon: "📊" },
    { title: "Product Manager", icon: "📱" },
    { title: "UX Designer", icon: "🎨" },
    { title: "Marketing Specialist", icon: "📢" },
    { title: "Sales Representative", icon: "💼" }
  ];

  // Detect server port on component mount
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

  const handleSelectJobTemplate = (title: string) => {
    setSelectedJobType(title);
    setJobTitle(title);
    // Add a basic job description template based on the selected job
    let template = `Job Title: ${title}\n\nResponsibilities:\n- `;
    
    switch(title) {
      case "Software Engineer":
        template += "Develop and maintain software applications\n- Write clean, efficient code\n- Collaborate with cross-functional teams\n- Troubleshoot and debug applications\n\nRequirements:\n- Proficiency in programming languages (e.g., JavaScript, Python)\n- Experience with web frameworks\n- Knowledge of databases and data structures\n- Problem-solving aptitude";
        break;
      case "Data Scientist":
        template += "Analyze large datasets to extract insights\n- Build predictive models\n- Create data visualizations\n- Collaborate with stakeholders\n\nRequirements:\n- Strong statistical and mathematical skills\n- Experience with Python, R, or similar\n- Knowledge of machine learning algorithms\n- Data visualization expertise";
        break;
      case "Product Manager":
        template += "Define product vision and strategy\n- Gather and prioritize requirements\n- Work with engineering teams\n- Analyze market trends\n\nRequirements:\n- Experience in product development lifecycle\n- Strong analytical and problem-solving skills\n- Excellent communication abilities\n- User-centric mindset";
        break;
      default:
        template += "Perform key responsibilities for this role\n- Collaborate with team members\n- Deliver high-quality work\n\nRequirements:\n- Relevant skills and experience\n- Good communication abilities\n- Problem-solving aptitude";
    }
    
    setJobDescription(template);
  };

  const generateQuestions = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    const prompt = `Generate 10 structured interview questions and their answers for the following job description: ${jobDescription}. Format them as:
    
    1. Question
      - Answer`;

    try {
      // Use the detected server port
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? window.location.origin 
        : `http://localhost:${serverPort}`;
        
      const res = await fetch(`${baseUrl}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate questions. Please try again.");
      }

      const data = await res.json();

      if (data.text) {
        setResponse(data.text);
        // Scroll to results
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        throw new Error(data.error || "Failed to generate response");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsText = () => {
    const element = document.createElement("a");
    const file = new Blob([`Interview Questions for ${jobTitle || "Job Position"}\n\n${response}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `interview_questions_${jobTitle.toLowerCase().replace(/\s+/g, '_') || "job_position"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
            <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            AI Interview Question Generator
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-500 dark:text-gray-300 max-w-3xl mx-auto">
            Generate tailored interview questions and assessment criteria with AI assistance
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              1. Select Job Type or Enter Custom Details
        </h2>
            
            {/* Job Template Selection */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
              {jobTemplates.map((job) => (
                <button
                  key={job.title}
                  onClick={() => handleSelectJobTemplate(job.title)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                    selectedJobType === job.title 
                      ? 'bg-purple-50 border-purple-300 dark:bg-purple-900/30 dark:border-purple-600' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-2xl mb-2">{job.icon}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                    {job.title}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Job Title Input */}
            <div className="mb-4">
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>
            
            {/* Job Description Textarea */}
            <div className="mb-6">
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Description
              </label>
        <textarea
                id="jobDescription"
                rows={8}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 rounded">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              </div>
            )}

        {/* Generate Button */}
        <button
              onClick={generateQuestions}
          disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating Questions...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Generate Interview Questions
                </>
              )}
        </button>
          </div>
        </div>

        {/* Results Section */}
        {response && (
          <div id="results" className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 transform">
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex flex-wrap justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {jobTitle ? `Interview Questions for ${jobTitle}` : 'Generated Questions & Answers'}
              </h2>
              
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All
                    </>
                  )}
                </button>
                
                <button
                  onClick={downloadAsText}
                  className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-auto max-h-[600px]">
              <div className="whitespace-pre-wrap font-mono text-sm md:text-base bg-gray-50 dark:bg-gray-900/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                {response.split('\n\n').map((paragraph, i) => (
                  <div key={i} className={`mb-4 ${paragraph.trim().startsWith('1.') ? 'mt-0' : ''}`}>
                    {paragraph.trim().match(/^\d+\./) ? (
                      <div className="font-bold text-purple-700 dark:text-purple-400 text-lg mt-6 mb-2">{paragraph}</div>
                    ) : (
                      <div className="pl-6 text-gray-700 dark:text-gray-300">{paragraph}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-6 py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                These questions are AI-generated based on the provided job description. Customize as needed for your specific requirements.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}