import React, { useState, useEffect } from 'react';
import { ClipboardCheck, Video, Brain, Users, Play, Clock, Award, ChevronRight, BarChart, Book, Code, Database, ChevronLeft, ArrowRight, X } from 'lucide-react';

// Add a simple toast function
const useCustomToast = () => {
  const showToast = ({ title, description, variant = "default" }) => {
    console.log(`[Toast] ${title}: ${description}`);
    // In a real app, you would show a UI toast here
  };
  
  return { toast: showToast };
};

interface Test {
  name: string;
  duration: string;
  questions: number;
  difficulty?: string;
  topics?: string[];
  score?: string | null;
}

interface Category {
  name: string;
  icon: React.ElementType;
  tests: Test[];
}

interface AssessmentType {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  categories: Category[];
}

interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: number;
}

interface AssessmentResult {
  id: string;
  candidateId: string;
  jobId: string;
  score: number;
  feedback: string;
  completedAt: string;
}

export default function AssessmentCenter() {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedType, setSelectedType] = useState<AssessmentType | null>(null);
  const [isAssessmentActive, setIsAssessmentActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  // Use the custom toast
  const { toast } = useCustomToast();

  // Sample assessment questions (for personal assessment)
  const personalAssessmentQuestions: AssessmentQuestion[] = [
    {
      id: 1,
      question: "I prefer working in teams rather than individually.",
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    },
    {
      id: 2,
      question: "I am comfortable giving presentations to large groups.",
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    },
    {
      id: 3,
      question: "I enjoy taking on leadership roles in group settings.",
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    },
    {
      id: 4,
      question: "I prefer structured processes over flexible approaches.",
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    },
    {
      id: 5,
      question: "I am comfortable with ambiguity and uncertainty in projects.",
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    }
  ];

  // Sample technical assessment questions
  const technicalAssessmentQuestions: AssessmentQuestion[] = [
    {
      id: 1,
      question: "Which data structure would be most efficient for implementing a priority queue?",
      options: ["Array", "Linked List", "Heap", "Hash Table"],
      correctAnswer: 2
    },
    {
      id: 2,
      question: "What is the time complexity of quicksort in the average case?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "Which of the following is NOT a RESTful API method?",
      options: ["GET", "POST", "PUT", "SEARCH"],
      correctAnswer: 3
    },
    {
      id: 4,
      question: "In the context of cloud computing, what does 'IaaS' stand for?",
      options: ["Internet as a Service", "Infrastructure as a Service", "Integration as a Service", "Intelligence as a Service"],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "Which of the following is a statically-typed language?",
      options: ["JavaScript", "Python", "TypeScript", "Ruby"],
      correctAnswer: 2
    }
  ];

  // Sample cognitive assessment questions
  const cognitiveAssessmentQuestions: AssessmentQuestion[] = [
    {
      id: 1,
      question: "If a shirt costs $20 and is discounted by 25%, what is the final price?",
      options: ["$5", "$15", "$16", "$18"],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Complete the sequence: 3, 6, 9, 12, ?",
      options: ["13", "14", "15", "16"],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "If all Blips are Bloops, and some Bloops are Bleeps, which statement must be true?",
      options: ["All Blips are Bleeps", "Some Blips are Bleeps", "No Blips are Bleeps", "None of the above"],
      correctAnswer: 1
    },
    {
      id: 4,
      question: "Which figure comes next in the sequence?",
      options: ["Circle", "Triangle", "Square", "Pentagon"],
      correctAnswer: 2
    },
    {
      id: 5,
      question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
      options: ["5 minutes", "20 minutes", "100 minutes", "500 minutes"],
      correctAnswer: 0
    }
  ];

  // Function to get the appropriate question set based on selected assessment type
  const getActiveQuestions = (): AssessmentQuestion[] => {
    if (selectedType) {
      switch (selectedType.id) {
        case 'technical':
          return technicalAssessmentQuestions;
        case 'cognitive':
          return cognitiveAssessmentQuestions;
        case 'personality':
          return personalAssessmentQuestions;
        default:
          return personalAssessmentQuestions;
      }
    }
    return personalAssessmentQuestions;
  };

  const assessmentTypes: AssessmentType[] = [
    {
      id: 'technical',
      name: 'Technical Skills',
      description: 'Evaluate your technical knowledge and coding abilities',
      icon: Code,
      categories: [
        {
          name: 'Programming Fundamentals',
          icon: Database,
          tests: [
            {
              name: 'Computer Fundamentals',
              duration: '45 mins',
              questions: 30,
              difficulty: 'Intermediate',
              topics: ['OS Concepts', 'Networking', 'Data Structures', 'Algorithms'],
              score: null
            },
            {
              name: 'Full-Stack Development',
              duration: '60 mins',
              questions: 40,
              difficulty: 'Advanced',
              topics: ['Frontend', 'Backend', 'Databases', 'API Design'],
              score: '85%'
            },
            {
              name: 'System Design',
              duration: '90 mins',
              questions: 20,
              difficulty: 'Expert',
              topics: ['Architecture', 'Scalability', 'Performance', 'Security'],
              score: null
            }
          ]
        },
        {
          name: 'Cloud & DevOps',
          icon: BarChart,
          tests: [
            {
              name: 'AWS Fundamentals',
              duration: '60 mins',
              questions: 35,
              difficulty: 'Intermediate',
              topics: ['EC2', 'S3', 'Lambda', 'VPC'],
              score: null
            }
          ]
        }
      ]
    },
    {
      id: 'cognitive',
      name: 'Cognitive Ability',
      description: 'Test your problem-solving and analytical thinking',
      icon: Brain,
      categories: [
        {
          name: 'Problem Solving',
          icon: Brain,
          tests: [
            {
              name: 'Logical Reasoning',
              duration: '30 mins',
              questions: 25,
              difficulty: 'Intermediate',
              topics: ['Logic', 'Pattern Recognition', 'Critical Thinking'],
              score: '92%'
            }
          ]
        }
      ]
    },
    {
      id: 'personality',
      name: 'Personal Assessment',
      description: 'Understand your work style and team compatibility',
      icon: Users,
      categories: [
        {
          name: 'Personal Assessment',
          icon: Users,
          tests: [
            {
              name: 'Take your Personal Assessment',
              duration: '20 mins',
              questions: 50,
              topics: ['Communication', 'Leadership', 'Team Dynamics'],
              score: 'Complete'
            }
          ]
        }
      ]
    }
  ];

  const programmingLanguages = [
    { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: "All Levels" },
    { name: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: "Beginner to Advanced" },
    { name: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", level: "Intermediate" },
    { name: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", level: "Advanced" },
    { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: "All Levels" },
    { name: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: "Intermediate" },
    { name: "Go", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", level: "Intermediate" },
    { name: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: "All Levels" },
  ];

  // Start an assessment
  const startAssessment = () => {
    setSelectedTest(null);
    setIsAssessmentActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setAssessmentCompleted(false);
    setAssessmentResult(null);
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  // Move to next question
  const goToNextQuestion = () => {
    const activeQuestions = getActiveQuestions();
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question - complete the assessment
      completeAssessment();
    }
  };

  // Move to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Complete the assessment and calculate score
  const completeAssessment = async () => {
    const activeQuestions = getActiveQuestions();
    let scorePercentage = 0;
    
    // For technical and cognitive assessments, check answers against correctAnswer
    if (selectedType && (selectedType.id === 'technical' || selectedType.id === 'cognitive')) {
      const correctAnswers = userAnswers.reduce((count, answer, index) => {
        return count + (answer === activeQuestions[index].correctAnswer ? 1 : 0);
      }, 0);
      scorePercentage = (correctAnswers / activeQuestions.length) * 100;
    } else {
      // For personal assessment, we'll use a simple percentage of questions answered
      const answeredQuestions = userAnswers.filter(answer => answer !== undefined).length;
      scorePercentage = (answeredQuestions / activeQuestions.length) * 100;
    }
    
    try {
      // Mock API call - in a real app, this would interact with your database
      const result = await saveAssessmentResult(scorePercentage);
      setAssessmentResult(result);
      setAssessmentCompleted(true);
      
      // Update the relevant test in the assessmentTypes array with the new score
      if (selectedType && selectedCategory) {
        const updatedTypes = [...assessmentTypes];
        const typeIndex = updatedTypes.findIndex(type => type.id === selectedType.id);
        if (typeIndex !== -1) {
          const categoryIndex = updatedTypes[typeIndex].categories.findIndex(
            cat => cat.name === selectedCategory.name
          );
          if (categoryIndex !== -1) {
            updatedTypes[typeIndex].categories[categoryIndex].tests[0].score = `${scorePercentage.toFixed(0)}%`;
          }
        }
      }

      toast({
        title: "Assessment Completed",
        description: `Your score has been recorded: ${scorePercentage.toFixed(0)}%`,
      });
    } catch (error) {
      console.error("Error saving assessment result:", error);
      toast({
        title: "Error",
        description: "Failed to save your assessment results.",
        variant: "destructive",
      });
    }
  };

  // Mock function to save assessment result to database
  const saveAssessmentResult = async (score: number): Promise<AssessmentResult> => {
    // In a real application, this would be an API call to your backend
    // For this example, we'll simulate a successful response
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock result
    const result: AssessmentResult = {
      id: crypto.randomUUID(),
      candidateId: "user-" + crypto.randomUUID().slice(0, 8),
      jobId: "job-" + crypto.randomUUID().slice(0, 8),
      score: score,
      feedback: score > 80 ? "Excellent work! You show great potential." : 
               score > 60 ? "Good job! There are some areas for improvement." :
               "You may need additional preparation in this area.",
      completedAt: new Date().toISOString()
    };
    
    console.log("Assessment result saved to database:", result);
    return result;
  };

  // Exit assessment view
  const exitAssessment = () => {
    setIsAssessmentActive(false);
    setAssessmentCompleted(false);
  };

  return (
    <div id="assessment" className="py-20 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Assessment Active View */}
        {isAssessmentActive ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-8">
            {/* Assessment Completed Result */}
            {assessmentCompleted ? (
              <div className="text-center py-10">
                <div className="mb-6 inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Award className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Assessment Completed!</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  Your score: <span className="text-green-600 dark:text-green-400 font-bold">{assessmentResult?.score.toFixed(0)}%</span>
                </p>
                <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg mb-8 text-left">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Feedback</h3>
                  <p className="text-gray-600 dark:text-gray-300">{assessmentResult?.feedback}</p>
                </div>
                <div className="flex justify-center">
                  <button 
                    onClick={exitAssessment}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transform transition-all hover:-translate-y-0.5"
                  >
                    Return to Assessment Center
                  </button>
                </div>
              </div>
            ) : (
              /* Active Assessment Questions */
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedType?.id === 'technical' ? 'Technical Skills Assessment' : 
                     selectedType?.id === 'cognitive' ? 'Cognitive Ability Assessment' : 
                     'Personal Assessment'}
                  </h2>
                  <button 
                    onClick={exitAssessment}
                    className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Question {currentQuestionIndex + 1} of {getActiveQuestions().length}
                    </span>
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {Math.round(((currentQuestionIndex + 1) / getActiveQuestions().length) * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${((currentQuestionIndex + 1) / getActiveQuestions().length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {getActiveQuestions()[currentQuestionIndex].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {getActiveQuestions()[currentQuestionIndex].options.map((option, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all 
                          ${userAnswers[currentQuestionIndex] === idx 
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 dark:border-purple-400' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'}`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center 
                            ${userAnswers[currentQuestionIndex] === idx 
                              ? 'border-purple-500 bg-purple-500 dark:border-purple-400 dark:bg-purple-400' 
                              : 'border-gray-300 dark:border-gray-600'}`}
                          >
                            {userAnswers[currentQuestionIndex] === idx && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className={`${userAnswers[currentQuestionIndex] === idx 
                            ? 'text-gray-900 dark:text-white font-medium' 
                            : 'text-gray-700 dark:text-gray-300'}`}
                          >
                            {option}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`px-6 py-2 rounded-lg flex items-center 
                      ${currentQuestionIndex === 0 
                        ? 'text-gray-400 cursor-not-allowed dark:text-gray-600' 
                        : 'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300'}`}
                  >
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    Previous
                  </button>
                  
                  <button
                    onClick={goToNextQuestion}
                    disabled={userAnswers[currentQuestionIndex] === undefined}
                    className={`px-6 py-2 rounded-lg flex items-center 
                      ${userAnswers[currentQuestionIndex] === undefined 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500' 
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transform transition-all hover:-translate-y-0.5'}`}
                  >
                    {currentQuestionIndex === getActiveQuestions().length - 1 ? 'Complete' : 'Next'}
                    {currentQuestionIndex < getActiveQuestions().length - 1 && (
                      <ChevronRight className="h-5 w-5 ml-1" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Regular Assessment Center View */
          <>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center justify-center p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl mb-4">
                <ClipboardCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                Assessment Center
              </h2>
              <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 mx-auto">
                Evaluate your skills and get certified with our comprehensive assessment platform
              </p>
            </div>

            {!selectedType ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {assessmentTypes.map((type) => (
                  <div
                    key={type.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <type.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{type.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{type.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {type.categories.map((category) => (
                          <div key={category.name} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                            <category.icon className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                            <span>{category.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
                      <button 
                        onClick={() => setSelectedType(type)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Explore Assessments
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : !selectedCategory ? (
              <div>
                <div className="flex items-center mb-8">
                  <button
                    onClick={() => setSelectedType(null)}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back to Assessment Types
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {selectedType.categories.map((category) => (
                    <div
                      key={category.name}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <category.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                        </div>
                        
                        <div className="space-y-2">
                          {category.tests.map((test) => (
                            <div key={test.name} className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                              <span>{test.name}</span>
                              {test.score && (
                                <span className="text-green-600 dark:text-green-400 font-medium">{test.score}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className="w-full flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-600 dark:text-gray-300">
                            {category.tests.length} Assessments
                          </span>
                          <span className="text-purple-600 dark:text-purple-400 font-medium flex items-center">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-8">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back to {selectedType.name}
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <selectedCategory.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCategory.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Select an assessment to begin</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedCategory.tests.map((test) => (
                        <button
                          key={test.name}
                          onClick={() => {
                            if (selectedType.id === 'personality' && test.name === 'Take your Personal Assessment') {
                              startAssessment();
                            } else {
                              setSelectedTest(test);
                            }
                          }}
                          className="text-left p-6 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-100 dark:border-gray-700"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{test.name}</h4>
                            {test.score && (
                              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm font-medium">
                                {test.score}
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <Clock className="w-4 h-4 mr-2 text-purple-500 dark:text-purple-400" />
                              {test.duration}
                              <span className="mx-2">•</span>
                              {test.questions} questions
                            </div>
                            
                            {test.difficulty && (
                              <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                                test.difficulty === 'Expert' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' :
                                test.difficulty === 'Advanced' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                                'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                              }`}>
                                {test.difficulty}
                              </span>
                            )}
                            
                            {test.topics && (
                              <div className="flex flex-wrap gap-2">
                                {test.topics.map((topic) => (
                                  <span key={topic} className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTest && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm dark:bg-black/70 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedTest.name}</h3>
                    <button
                      onClick={() => setSelectedTest(null)}
                      className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Clock className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
                        Duration: {selectedTest.duration}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <ClipboardCheck className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
                        Questions: {selectedTest.questions}
                      </div>
                    </div>

                    {selectedTest.difficulty && (
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Difficulty Level</h4>
                        <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                          selectedTest.difficulty === 'Expert' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' :
                          selectedTest.difficulty === 'Advanced' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                          'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                        }`}>
                          {selectedTest.difficulty}
                        </span>
                      </div>
                    )}

                    {selectedTest.topics && (
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Topics Covered</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTest.topics.map((topic) => (
                            <span key={topic} className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800/30">
                      <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Before You Begin</h4>
                      <ul className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                        <li className="flex items-center">
                          <ChevronRight className="w-4 h-4 mr-2" />
                          Ensure you have a stable internet connection
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="w-4 h-4 mr-2" />
                          Find a quiet place without distractions
                        </li>
                        <li className="flex items-center">
                          <ChevronRight className="w-4 h-4 mr-2" />
                          You cannot pause the test once started
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end space-x-4">
                    <button
                      onClick={() => setSelectedTest(null)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={startAssessment}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transform transition-all hover:-translate-y-0.5 flex items-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Test
                    </button>
                  </div>
                </div> 
              </div>
            )}
            
            {!selectedType && (
              <div className="mt-24 mb-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Programming Language Assessments
                  </h3>
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    Test your skills in the most popular programming languages and frameworks
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {programmingLanguages.map((lang) => (
                    <div 
                      key={lang.name}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group hover:-translate-y-1"
                    >
                      <div className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <img 
                            src={lang.image} 
                            alt={lang.name} 
                            className="h-16 w-16 transform transition-transform duration-300 group-hover:scale-110" 
                          />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{lang.name}</h4>
                        <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">{lang.level}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/30 p-3 border-t border-gray-100 dark:border-gray-700">
                        <button 
                          className="w-full text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors flex items-center justify-center"
                        >
                          View Tests
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {!selectedType && (
              <div className="mt-20 bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-8 border border-purple-100 dark:border-purple-800/30">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Need a custom assessment?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                      We can create tailored assessments specific to your organization's technology stack and requirements.
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transform transition-all hover:-translate-y-0.5 whitespace-nowrap flex items-center">
                    <Book className="mr-2 h-5 w-5" />
                    Request Custom Test
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}