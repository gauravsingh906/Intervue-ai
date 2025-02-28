'use client'

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Clock, 
  Code2, 
  Cpu, 
  Laptop, 
  Server, 
  Lock, 
  Braces, 
  Database, 
  Play, 
  PauseCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
;

const QuickPractice = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("category");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isInterviewReady, setIsInterviewReady] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const categories = [
    { 
      id: "frontend", 
      name: "Frontend Development",
      icon: <Laptop className="h-10 w-10 text-primary" />,
      description: "Practice frontend concepts, frameworks, and UI design patterns",
      topics: ["React", "Vue", "Angular", "CSS", "JavaScript"]
    },
    { 
      id: "backend", 
      name: "Backend Development",
      icon: <Server className="h-10 w-10 text-primary" />,
      description: "Server-side development, APIs, and database integration",
      topics: ["Node.js", "Python", "Java", "Go", "REST APIs"]
    },
    { 
      id: "fullstack", 
      name: "Full Stack Development",
      icon: <Code2 className="h-10 w-10 text-primary" />,
      description: "End-to-end application development and architecture",
      topics: ["MERN Stack", "LAMP Stack", "Django", "Ruby on Rails", "Next.js"]
    },
    { 
      id: "algorithms", 
      name: "Algorithms & Data Structures",
      icon: <Braces className="h-10 w-10 text-primary" />,
      description: "Practice solving common algorithm challenges",
      topics: ["Arrays", "Linked Lists", "Trees", "Dynamic Programming", "Graphs"]
    },
    { 
      id: "database", 
      name: "Database Systems",
      icon: <Database className="h-10 w-10 text-primary" />,
      description: "Database design, optimization and administration",
      topics: ["SQL", "MongoDB", "Redis", "Postgres", "Database Design"]
    },
    { 
      id: "system", 
      name: "System Design",
      icon: <Cpu className="h-10 w-10 text-primary" />,
      description: "Architectural patterns and scalable system design",
      topics: ["Microservices", "Distributed Systems", "Cloud Architecture", "Load Balancing", "Caching"]
    }
  ];

  const sampleQuestions = [
    "What is the virtual DOM and how does it improve performance in React?",
    "Explain the concept of closures in JavaScript and provide an example.",
    "How would you optimize a React application that's experiencing performance issues?",
    "Describe the difference between useEffect and useLayoutEffect hooks.",
    "What are some best practices for writing reusable React components?"
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setActiveTab("topic");
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setActiveTab("configure");
  };

  const startPreparation = () => {
    setIsStarted(true);
    
    // Simulate loading interview questions
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsInterviewReady(true);
      }
    }, 150);
  };

  const startInterview = () => {
    setInterviewStarted(true);
 router.push('/dashboard')
    
  };

  const goBack = () => {
    if (isInterviewReady) {
      setIsInterviewReady(false);
      setIsStarted(false);
      setLoadingProgress(0);
    } else if (activeTab === "configure") {
      setActiveTab("topic");
      setSelectedTopic(null);
    } else if (activeTab === "topic") {
      setActiveTab("category");
      setSelectedCategory(null);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="p-5 md:p-10 max-w-7xl mx-auto">
      {!interviewStarted && (
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={goBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
      )}
      
      <div className="mb-8">
        <h2 className="font-bold text-3xl text-primary">Quick Practice Interview</h2>
        <p className="text-muted-foreground">Start an immediate mock interview session</p>
      </div>

      {!isStarted ? (
        <Tabs defaultValue="category" value={activeTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="category">Select Category</TabsTrigger>
            <TabsTrigger value="topic" disabled={!selectedCategory}>Select Topic</TabsTrigger>
            <TabsTrigger value="configure" disabled={!selectedTopic}>Configure</TabsTrigger>
          </TabsList>
          
          <TabsContent value="category">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card 
                  key={category.id} 
                  className={`cursor-pointer transition-all hover:border-primary ${selectedCategory?.id === category.id ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  <CardHeader className="flex flex-row items-center space-y-0 gap-4">
                    {category.icon}
                    <div>
                      <CardTitle>{category.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="ghost">
                      Select <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="topic">
            {selectedCategory && (
              <>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>{selectedCategory.name}</CardTitle>
                    <CardDescription>Select a specific topic to focus on during your practice session</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {selectedCategory.topics.map((topic) => (
                        <div 
                          key={topic}
                          className={`p-4 border rounded-lg text-center cursor-pointer transition-all hover:border-primary ${selectedTopic === topic ? 'border-primary bg-primary/5' : ''}`}
                          onClick={() => handleTopicSelect(topic)}
                        >
                          <span className="font-medium">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="configure">
            {selectedTopic && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Configure Your Practice Session</CardTitle>
                      <CardDescription>Customize your {selectedTopic} interview</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-primary border-primary">
                      {selectedCategory.name} - {selectedTopic}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Session Duration</h4>
                          <p className="text-sm text-muted-foreground">How long should the interview last?</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="px-3">15 min</Button>
                        <Button variant="default" size="sm" className="px-3">30 min</Button>
                        <Button variant="outline" size="sm" className="px-3">45 min</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Difficulty Level</h4>
                          <p className="text-sm text-muted-foreground">Set the complexity of interview questions</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Beginner</Button>
                        <Button variant="default" size="sm">Intermediate</Button>
                        <Button variant="outline" size="sm">Advanced</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className="ml-auto" onClick={startPreparation}>
                    Start Practice Session
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      ) : isInterviewReady && !interviewStarted ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Your Interview Session is Ready</CardTitle>
            <CardDescription>
              {selectedCategory.name} - {selectedTopic} (Intermediate)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Session Details</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Duration: 30 minutes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-muted-foreground" />
                  <span>5 technical questions with follow-ups</span>
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span>Difficulty: Intermediate</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Sample Questions</h3>
              <ul className="space-y-2">
                {sampleQuestions.slice(0, 3).map((question, index) => (
                  <li key={index} className="p-3 border rounded-md">
                    {question}
                  </li>
                ))}
                <li className="p-3 border rounded-md border-dashed text-muted-foreground">
                  + 2 more questions
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={goBack}>
              Change Settings
            </Button>
            <Button size="lg" onClick={startInterview}>
              Begin Interview <Play className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ) : isInterviewReady && interviewStarted ? (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Ongoing Interview Session</CardTitle>
                <CardDescription>{selectedCategory.name} - {selectedTopic} (Intermediate)</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 28:45 remaining
                </Badge>
                <Button variant="outline" size="sm">
                  <PauseCircle className="h-4 w-4 mr-2" /> Pause
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium">
                      {currentQuestion + 1}
                    </div>
                    <span className="text-sm text-muted-foreground">Question {currentQuestion + 1} of 5</span>
                  </div>
                  <Progress value={(currentQuestion + 1) * 20} className="w-32" />
                </div>
                
                <div className="p-6 border rounded-lg">
                  <h3 className="font-medium text-lg mb-4">{sampleQuestions[currentQuestion]}</h3>
                  
                  <div className="p-4 rounded-lg bg-muted mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">Interviewer</span>
                    </div>
                    <p>Can you explain this in detail? I'm particularly interested in your understanding of how React's rendering optimization works in practice.</p>
                  </div>
                  
                  <Textarea 
                    placeholder="Type your answer here..." 
                    className="min-h-32"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(curr => curr - 1)}>
                Previous Question
              </Button>
              <Button onClick={() => setCurrentQuestion(curr => Math.min(curr + 1, 4))}>
                {currentQuestion < 4 ? 'Next Question' : 'Complete Interview'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Preparing Your Interview Session</CardTitle>
            <CardDescription>Generating tailored questions for {selectedTopic}</CardDescription>
          </CardHeader>
          <CardContent className="py-6">
            <Progress value={loadingProgress} className="mb-4" />
            <p className="text-center text-sm text-muted-foreground">
              Creating a personalized interview experience based on your selections...
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuickPractice;