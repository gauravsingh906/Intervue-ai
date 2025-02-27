'use client'
import { useRef, useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  AlertCircle,
  Award,
  BookOpen,
  ChevronsUpDown,
  FileText,
  Home,
  LineChart,
  Lightbulb,
  Moon,
  PieChart,
  Printer,
  Star,
  Sun,
  ThumbsUp,
  TrendingUp,
  Clock,
  Video,
  Calendar1Icon
} from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Toaster } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'

import { useTheme } from 'next-themes'
import { GeneratePDFButton } from '@/app/dashboard/_components/GeneratePDFButton'

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallScore, setOverallScore] = useState(0);
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("summary");
  const router = useRouter();
  const feedbackContentRef = useRef(null);
  const params = useParams();
  const interviewId = params.interviewId;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setMounted(true);
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);

      // Enhanced data with mock strengths and weaknesses
      const enhancedResult = result.map((item, index) => ({
        ...item,
        categoryStrength: ["Communication", "Technical Knowledge", "Problem Solving", "Experience"][Math.floor(Math.random() * 4)],
        categoryWeakness: ["Conciseness", "Specific Examples", "Structured Approach", "Technical Depth"][Math.floor(Math.random() * 4)],
        timeToAnswer: Math.floor(Math.random() * 120) + 30, // Random time between 30-150 seconds
        questionNumber: index + 1
      }));

      setFeedbackList(enhancedResult);

      // Calculate overall score based on ratings
      if (enhancedResult.length > 0) {
        const totalScore = enhancedResult.reduce((sum, item) => sum + item.rating, 0);
        setOverallScore(Math.round((totalScore / (enhancedResult.length * 10)) * 100));
      }

      // Extract strengths and weaknesses
      const strengthsMap = new Map();
      const weaknessesMap = new Map();

      enhancedResult.forEach(item => {
        if (item.categoryStrength) {
          strengthsMap.set(item.categoryStrength, (strengthsMap.get(item.categoryStrength) || 0) + 1);
        }
        if (item.categoryWeakness) {
          weaknessesMap.set(item.categoryWeakness, (weaknessesMap.get(item.categoryWeakness) || 0) + 1);
        }
      });

      const strengthsList = Array.from(strengthsMap.entries()).map(([category, count]) => ({ category, count }));
      const weaknessesList = Array.from(weaknessesMap.entries()).map(([category, count]) => ({ category, count }));

      setStrengths(strengthsList);
      setWeaknesses(weaknessesList);

      // Prepare chart data
      setChartData([
        ...strengthsList.map(item => ({
          name: item.category,
          value: item.count,
          type: 'Strength'
        })),
        ...weaknessesList.map(item => ({
          name: item.category,
          value: item.count,
          type: 'Weakness'
        }))
      ]);

    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  }

  const getScoreBadge = (rating) => {
    const percentage = (rating / 10) * 100;
    if (percentage >= 80) return <Badge className="bg-green-500 dark:bg-green-600">Excellent</Badge>;
    if (percentage >= 70) return <Badge className="bg-green-400 dark:bg-green-500">Good</Badge>;
    if (percentage >= 60) return <Badge className="bg-yellow-500 dark:bg-yellow-600">Satisfactory</Badge>;
    if (percentage >= 50) return <Badge className="bg-orange-500 dark:bg-orange-600">Needs Improvement</Badge>;
    return <Badge className="bg-red-500 dark:bg-red-600">Poor</Badge>;
  }

  const getFormattedDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className='p-4 md:p-10 max-w-7xl mx-auto'>
      <Toaster />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Interview Feedback</h1>
       
      </div>

      {feedbackList?.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className='text-xl text-gray-700 dark:text-gray-200'>No Interview Feedback Available</CardTitle>
            <CardDescription>Your interview feedback will appear here once it's been processed.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.replace('/dashboard')} className="flex items-center gap-2">
              <Home className="h-4 w-4" /> Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
        <div  ref={feedbackContentRef} >
          {/* Congratulations Banner with Animation */}
          <div  className="text-center space-y-2 mb-6 p-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg animate-fade-in">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-800/50 rounded-full mb-3 animate-bounce-slow">
              <Award className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className='text-3xl font-bold text-green-600 dark:text-green-400'>Congratulations!</h1>
            <p className='text-gray-600 dark:text-gray-300'>You've completed your interview. Here's your personalized feedback.</p>
          </div>

          {/* Tabs for organizing content */}
          <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="summary" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Summary</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="answers" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Answers</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Recommendations</span>
              </TabsTrigger>
            </TabsList>

            {/* Summary Tab Content */}
            <TabsContent value="summary" className="space-y-6">
              <div >
                {/* PDF Header (only visible in PDF) */}
                <div className="hidden print:block flex justify-between items-center border-b pb-4 mb-6">
                  <div>
                    <h1 className="text-2xl font-bold">Interview Feedback Report</h1>
                    <p className="text-gray-500">Generated on: {getFormattedDate()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Interview ID: {params.interviewId}</p>
                    <p className="text-gray-500">Questions: {feedbackList.length}</p>
                  </div>
                </div>

                {/* Overall Score Card */}
                <Card className="border-2 border-primary/20 overflow-hidden">
                  <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent"></div>
                  <CardHeader>
                    <CardTitle className="flex justify-between  items-center">
                      <span>Overall Performance</span>
                      <div className="flex flex-col items-end">
                        <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}%</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {overallScore >= 80 ? "Excellent" :
                            overallScore >= 70 ? "Good" :
                              overallScore >= 60 ? "Satisfactory" :
                                overallScore >= 50 ? "Needs Improvement" : "Poor"}
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={overallScore} className="h-3" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                        <ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertTitle>Key Strengths</AlertTitle>
                        <AlertDescription>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {strengths.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="text-sm">{item.category}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>

                      <Alert variant="default" className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <AlertTitle>Areas for Improvement</AlertTitle>
                        <AlertDescription>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {weaknesses.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="text-sm">{item.category}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>

                {/* Analytics Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
                  <Card className="group hover:border-primary/40 transition-all">
                    <CardHeader className="pb-2 bg-gradient-to-r from-transparent to-primary/5 group-hover:to-primary/10 transition-all">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" /> Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">{overallScore}%</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Overall interview score</p>
                    </CardContent>
                  </Card>

                  <Card className="group hover:border-primary/40 transition-all">
                    <CardHeader className="pb-2 bg-gradient-to-r from-transparent to-primary/5 group-hover:to-primary/10 transition-all">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" /> Questions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">{feedbackList.length}</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total questions answered</p>
                    </CardContent>
                  </Card>

                  <Card className="group hover:border-primary/40 transition-all">
                    <CardHeader className="pb-2 bg-gradient-to-r from-transparent to-primary/5 group-hover:to-primary/10 transition-all">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" /> Avg. Response Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">
                        {Math.round(feedbackList.reduce((sum, item) => sum + (item.timeToAnswer || 0), 0) / feedbackList.length)}s
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Average time per question</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab Content */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Skills Analysis
                  </CardTitle>
                  <CardDescription>Breakdown of your strengths and areas for improvement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <RechartsTooltip
                          formatter={(value, name, props) => [
                            `${value} ${value === 1 ? 'question' : 'questions'}`,
                            props.payload.type
                          ]}
                        />
                        <Bar
                          dataKey="value"
                          fill={theme === 'dark' ? '#8884d8' : '#4f46e5'}
                          name="Count"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance by Question</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={feedbackList.map(item => ({
                          name: item.questionNumber,
                          score: item.rating
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" label={{ value: 'Question #', position: 'insideBottom', offset: -5 }} />
                          <YAxis domain={[0, 10]} label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
                          <RechartsTooltip formatter={(value) => [`${value}/10`, 'Score']} />
                          <Bar
                            dataKey="score"
                            fill={theme === 'dark' ? '#22c55e' : '#10b981'}
                            name="Score"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Response Time by Question</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={feedbackList.map(item => ({
                          name: item.questionNumber,
                          time: item.timeToAnswer
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" label={{ value: 'Question #', position: 'insideBottom', offset: -5 }} />
                          <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
                          <RechartsTooltip formatter={(value) => [`${value} seconds`, 'Time']} />
                          <Bar
                            dataKey="time"
                            fill={theme === 'dark' ? '#3b82f6' : '#2563eb'}
                            name="Time"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Answers Tab Content */}
            <TabsContent value="answers" className="space-y-4">
              <h2 className='text-lg font-medium mb-4 flex items-center gap-2'>
                <BookOpen className="h-5 w-5 text-primary" /> Detailed Question Feedback
              </h2>
              {feedbackList.map((item, index) => (
                <Collapsible key={index} className='mb-4 border rounded-lg overflow-hidden dark:border-gray-700 hover:border-primary/40 dark:hover:border-primary/40 transition-all' defaultOpen={index === 0}>
                  <CollapsibleTrigger className='p-4 flex justify-between items-center w-full hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left'>
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-medium truncate max-w-md">{item.question}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getScoreBadge(item.rating)}
                          <span className="text-xs text-gray-500 dark:text-gray-400">Rating: {item.rating}/10</span>
                        </div>
                      </div>
                    </div>
                    <ChevronsUpDown className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="border-t dark:border-gray-700">
                    <div className='grid gap-4 p-4'>
                      <div className='p-3 rounded-lg bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800'>
                        <h4 className='font-semibold text-blue-800 dark:text-blue-300 mb-1'>Your Answer</h4>
                        <p className='text-sm text-blue-900 dark:text-blue-200'>{item.userAns}</p>
                      </div>

                      <div className='p-3 rounded-lg bg-green-50 border border-green-100 dark:bg-green-900/20 dark:border-green-800'>
                        <h4 className='font-semibold text-green-800 dark:text-green-300 mb-1'>Model Answer</h4>
                        <p className='text-sm text-green-900 dark:text-green-200'>{item.correctAns}</p>
                      </div>

                      <div className='p-3 rounded-lg bg-purple-50 border border-purple-100 dark:bg-purple-900/20 dark:border-purple-800'>
                        <h4 className='font-semibold text-purple-800 dark:text-purple-300 mb-1'>Personalized Feedback</h4>
                        <p className='text-sm text-purple-900 dark:text-purple-200'>{item.feedback}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 dark:bg-amber-900/20 dark:border-amber-800">
                          <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Area for Improvement</h4>
                          <p className="text-sm text-amber-900 dark:text-amber-200">{item.categoryWeakness}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800">
                          <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Strength Demonstrated</h4>
                          <p className="text-sm text-emerald-900 dark:text-emerald-200">{item.categoryStrength}</p>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </TabsContent>

            {/* Recommendations Tab Content */}
            <TabsContent  value="recommendations" className="space-y-6">
              <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" /> Key Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul  className="space-y-4">
                    {weaknesses.slice(0, 3).map((weakness, idx) => (
                      <li key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <h3 className="text-blue-800 dark:text-blue-300 font-medium mb-2">
                          Improve {weakness.category}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {weakness.category === "Conciseness" && "Practice delivering your answers more concisely while maintaining essential details. Try the STAR method but focus on keeping each section brief and impactful."}
                          {weakness.category === "Specific Examples" && "Prepare more concrete examples from your past experience to illustrate your skills. Use metrics and quantifiable outcomes whenever possible to demonstrate your impact."}
                          {weakness.category === "Structured Approach" && "Use frameworks like STAR (Situation, Task, Action, Result) to structure your answers. This helps interviewers follow your thought process and ensures you cover all important aspects."}
                          {weakness.category === "Technical Depth" && "Review technical concepts and be prepared to explain them in more detail. Practice breaking down complex concepts into simpler terms and demonstrating your understanding beyond surface level."}
                        </p>
                        <div className="mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium">
                          Practice Exercise:
                          <span className="text-gray-600 dark:text-gray-400 font-normal ml-1">
                            {weakness.category === "Conciseness" && "Take a previous long answer and challenge yourself to convey the same information in half the time."}
                            {weakness.category === "Specific Examples" && "For each skill on your resume, prepare at least two STAR stories with specific metrics and outcomes."}
                            {weakness.category === "Structured Approach" && "Record yourself answering common interview questions and review if your answers follow a clear, logical structure."}
                            {weakness.category === "Technical Depth" && "For each technical skill you claim, prepare explanations at three levels: beginner, intermediate, and expert."}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              {/* Suggested Learning Resources Card - NEW SECTION */}
              <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-100">Suggested Learning Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 hover:border-primary/40 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer">
                      <div className="flex items-start gap-3">
                        <BookOpen className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h3 className="font-medium dark:text-gray-100">Interview Preparation Guide</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Comprehensive strategies to improve your interview performance with practical examples.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:border-primary/40 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer">
                      <div className="flex items-start gap-3">
                        <Video className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h3 className="font-medium dark:text-gray-100">Mock Interview Videos</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Watch expert-led interview examples with commentary on effective techniques.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:border-primary/40 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h3 className="font-medium dark:text-gray-100">Answer Templates</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Structured frameworks for common interview questions across different industries.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:border-primary/40 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer">
                      <div className="flex items-start gap-3">
                        <Calendar1Icon className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h3 className="font-medium dark:text-gray-100">Practice Sessions</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Schedule one-on-one practice interviews with feedback from experienced coaches.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>


            

          
             

              </TabsContent> </Tabs>
                  {/* Action Buttons - Only visible in UI (not in PDF) */}
            

              </div>      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button onClick={() => router.replace('/dashboard')} className="flex items-center gap-2">
              <Home className="h-4 w-4" /> Return to Dashboard
            </Button>
            <GeneratePDFButton
              contentRef={feedbackContentRef} 
              fileName={`interview-feedback-${params.interviewId}.pdf`} 
            />
          </div></>)}
              </div>
      )
    }
    export default Feedback


