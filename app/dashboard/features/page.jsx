'use client'
import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon, ChevronRightIcon, ArrowRightIcon, CheckCircleIcon, PlayIcon, BarChart3Icon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

const features = [
  {
    icon: <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>,
    title: "AI-Powered Assessments",
    description: "Evaluate technical and soft skills with our intelligent assessment engine that adapts to candidate responses.",
    color: "blue"
  },
  {
    icon: <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>,
    title: "Smart Question Bank",
    description: "Access thousands of curated questions tailored to specific roles, skills, and experience levels.",
    color: "green"
  },
  {
    icon: <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>,
    title: "Bias Detection",
    description: "Identify and eliminate unconscious bias in your hiring process with our advanced NLP algorithms.",
    color: "purple"
  },
  {
    icon: <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    title: "Real-time Analysis",
    description: "Get instant feedback and insights during interviews with our live analysis dashboard.",
    color: "red"
  },
  {
    icon: <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>,
    title: "Team Collaboration",
    description: "Enable seamless collaboration among hiring teams with shared notes, ratings, and candidate profiles.",
    color: "yellow"
  },
  {
    icon: <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>,
    title: "Seamless Integration",
    description: "Connect with your existing ATS and HR tools for a streamlined recruiting workflow.",
    color: "pink"
  }
];

const testimonials = [
  {
    quote: "Intervue AI cut our hiring time by 40% while helping us find better-qualified candidates.",
    author: "Sarah J., CTO at TechGrowth",
    company: "TechGrowth Inc.",
    avatar: "/api/placeholder/50/50"
  },
  {
    quote: "The bias detection feature helped us build a much more diverse engineering team.",
    author: "Michael L., Head of HR",
    company: "Innovate Solutions",
    avatar: "/api/placeholder/50/50"
  },
  {
    quote: "The real-time analysis gives our interviewers powerful insights they never had before.",
    author: "Priya M., Recruiting Manager",
    company: "Global Systems",
    avatar: "/api/placeholder/50/50"
  }
];

// Main component
 const IntervueAIFeaturePage = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDemo, setActiveDemo] = useState('technical');
  const [animateStats, setAnimateStats] = useState(false);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Start animation after component mounts
    setTimeout(() => setAnimateStats(true), 500);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
   

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12">
                <Badge variant="outline" className="mb-4 text-primary border-primary">
                  Revolutionizing Hiring
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Transform Your <span className="text-primary">Interview</span> Process with AI
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Eliminate bias, make data-driven decisions, and find the perfect candidates faster than ever before.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="group">
                    Start Free Trial 
                    <ChevronRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button size="lg" variant="outline" className="flex items-center">
                    <PlayIcon className="mr-2 h-4 w-4" /> Watch Demo
                  </Button>
                </div>
                <div className="mt-8 flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                    <div className="w-8 h-8 rounded-full bg-green-500"></div>
                    <div className="w-8 h-8 rounded-full bg-yellow-500"></div>
                    <div className="w-8 h-8 rounded-full bg-red-500"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">500+</span> companies trust Intervue AI
                  </span>
                </div>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-light rounded-lg blur opacity-30"></div>
                  <Card className="relative bg-card">
                    <CardHeader className="bg-muted/50 border-b">
                      <div className="flex items-center">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mx-auto">
                          <span className="text-sm font-medium">Intervue AI Live Demo</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="border rounded-lg p-3">
                          <p className="text-sm text-muted-foreground mb-2">Question:</p>
                          <p className="font-medium">What's your approach to debugging complex issues in production?</p>
                        </div>
                        <div className="bg-muted/30 border rounded-lg p-3">
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground mr-2">C</div>
                            <p className="text-sm text-muted-foreground">Candidate is answering...</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                            <span className="h-2 w-2 bg-primary rounded-full animate-pulse delay-100"></span>
                            <span className="h-2 w-2 bg-primary rounded-full animate-pulse delay-200"></span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">Live Analysis</Badge>
                          <BarChart3Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {animateStats ? '40%' : '0%'}
                </p>
                <p className="text-sm md:text-base text-muted-foreground">Faster Hiring</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {animateStats ? '85%' : '0%'}
                </p>
                <p className="text-sm md:text-base text-muted-foreground">Improved Match Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {animateStats ? '500+' : '0+'}
                </p>
                <p className="text-sm md:text-base text-muted-foreground">Global Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {animateStats ? '1M+' : '0+'}
                </p>
                <p className="text-sm md:text-base text-muted-foreground">Interviews Analyzed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Features</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Powerful Tools for Modern Recruiting
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform helps you find the best talent with less bias and more efficiency.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-md transition-all duration-300 border-border/50 overflow-hidden">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-${feature.color}-100 dark:bg-${feature.color}-900/20 text-${feature.color}-600 dark:text-${feature.color}-400`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <p className="text-muted-foreground">{feature.description}</p>
                    <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                      <span className="text-sm text-primary">Learn more</span>
                      <ArrowRightIcon className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Interactive Demo</Badge>
              <h2 className="text-3xl font-bold mb-4">
                See Intervue AI in Action
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience how our AI analyzes different types of interviews in real-time.
              </p>
            </div>
            
            <Tabs defaultValue="technical" className="w-full max-w-4xl mx-auto" onValueChange={setActiveDemo}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="technical">Technical Interview</TabsTrigger>
                <TabsTrigger value="behavioral">Behavioral Interview</TabsTrigger>
                <TabsTrigger value="cultural">Cultural Fit Assessment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="technical" className="mt-0">
                <Card className="border-border/50">
                  <CardHeader className="bg-muted/50 border-b">
                    <div className="flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="mx-auto">
                        <span className="text-sm font-medium">Technical Assessment Demo</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="border rounded-lg p-4 mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Coding Challenge:</p>
                      <p className="font-medium">Implement a function to find the longest palindromic substring in a given string.</p>
                    </div>
                    <div className="border rounded-lg p-4 mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Candidate Solution:</p>
                      <div className="bg-muted/30 p-3 rounded font-mono text-sm overflow-x-auto">
                        <pre>{`function longestPalindrome(s) {
  if (!s || s.length < 1) return "";
  
  let start = 0, maxLength = 1;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLength = right - left + 1;
      if (currentLength > maxLength) {
        maxLength = currentLength;
        start = left;
      }
      left--;
      right++;
    }
  }
  
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i - 1, i + 1); // Odd length
    expandAroundCenter(i, i + 1);     // Even length
  }
  
  return s.substring(start, start + maxLength);
}`}</pre>
                      </div>
                    </div>
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-primary text-lg flex items-center">
                          <CheckCircleIcon className="mr-2 h-5 w-5" /> AI Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Algorithm Knowledge:</span>
                              <span className="font-medium">9.0/10</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Code Quality:</span>
                              <span className="font-medium">8.5/10</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Time Complexity:</span>
                              <span className="font-medium">O(n²)</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full">
                              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t border-border/50 text-muted-foreground">
                            <p>The candidate demonstrates excellent understanding of dynamic programming and string manipulation. The solution is correct with O(n²) time complexity and O(1) space complexity. Consider discussing optimization approaches.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="behavioral" className="mt-0">
                <Card className="border-border/50">
                  <CardHeader className="bg-muted/50 border-b">
                    <div className="flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="mx-auto">
                        <span className="text-sm font-medium">Behavioral Assessment Demo</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="border rounded-lg p-4 mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Question:</p>
                      <p className="font-medium">Describe a challenging project you worked on and how you overcame obstacles.</p>
                    </div>
                    <div className="border rounded-lg p-4 mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Candidate Response:</p>
                      <div className="bg-muted/30 p-3 rounded">
                        <p>In my previous role, I led a team of 5 developers to redesign our company's customer portal. The main challenge was integrating with legacy systems while implementing modern UI/UX principles. We faced significant resistance from stakeholders who were comfortable with the old system.</p>
                        <p className="mt-2">I approached this by first creating a detailed migration plan that addressed all concerns. Then I organized workshops with key stakeholders to demonstrate how the new system would improve their workflows. For the technical challenges, we implemented an adapter layer that allowed gradual migration rather than a complete overhaul.</p>
                        <p className="mt-2">The project was delivered on time, and user satisfaction increased by 42% within three months of launch.</p>
                      </div>
                    </div>
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-primary text-lg flex items-center">
                          <CheckCircleIcon className="mr-2 h-5 w-5" /> AI Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Leadership Skills:</span>
                              <span className="font-medium">8.5/10</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Problem Solving:</span>
                              <span className="font-medium">9.0/10</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Communication:</span>
                              <span className="font-medium">7.5/10</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full">
                              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t border-border/50 text-muted-foreground">
                            <p>The candidate demonstrates strong leadership and problem-solving abilities, with clear examples of overcoming both technical and interpersonal challenges. Their strategic approach to stakeholder management is particularly noteworthy.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="cultural" className="mt-0">
  <Card className="border-border/50">
    <CardHeader className="bg-muted/50 border-b">
      <div className="flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto">
          <span className="text-sm font-medium">Cultural Fit Assessment Demo</span>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-6">
      <div className="border rounded-lg p-4 mb-4">
        <p className="text-sm text-muted-foreground mb-2">Question:</p>
        <p className="font-medium">How do you approach collaboration when working with cross-functional teams?</p>
      </div>
      <div className="border rounded-lg p-4 mb-4">
        <p className="text-sm text-muted-foreground mb-2">Candidate Response:</p>
        <div className="bg-muted/30 p-3 rounded">
          <p>I believe effective cross-functional collaboration begins with understanding each team's objectives and constraints. When I worked on our company's mobile app redesign, I started by scheduling individual meetings with stakeholders from marketing, engineering, and customer support to understand their specific needs and challenges.</p>
          <p className="mt-2">I then created a shared documentation space where all requirements were transparently documented, allowing everyone to see the full picture. For our weekly sync meetings, I implemented a rotating facilitation model where each department took turns leading discussions about their priorities.</p>
          <p className="mt-2">When conflicts arose about feature priorities, I facilitated workshops using the MoSCoW method (Must have, Should have, Could have, Won't have) to reach consensus. This approach resulted in a 30% faster decision-making process and significantly higher team satisfaction compared to previous cross-functional projects.</p>
        </div>
      </div>
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <CheckCircleIcon className="mr-2 h-5 w-5" /> AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Team Orientation:</span>
                <span className="font-medium">8.5/10</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Conflict Resolution:</span>
                <span className="font-medium">9.0/10</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Adaptability:</span>
                <span className="font-medium">8.0/10</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/50 text-muted-foreground">
              <p>The candidate demonstrates excellent collaboration skills with a structured yet flexible approach to cross-functional teamwork. Their emphasis on transparency, shared ownership, and data-driven conflict resolution aligns well with our collaborative culture. The concrete examples and measurable outcomes indicate a thoughtful approach to team dynamics.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </CardContent>
  </Card>
</TabsContent>
           </Tabs></div></section>
           </main>
           </div>
  )
  }

  export default IntervueAIFeaturePage