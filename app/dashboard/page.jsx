'use client'
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import { MoonIcon, SunIcon, LayoutDashboardIcon, ClockIcon, CalendarIcon, BarChart3Icon } from 'lucide-react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from 'next-themes';
import {Link} from 'next/link';
import { useRouter } from 'next/navigation';
function Dashboard() {
  const { setTheme, theme } = useTheme();
const router = useRouter();
  
  // Sample stats for the dashboard
  const stats = [
    {
      title: "Total Interviews",
      value: "12",
      icon: <LayoutDashboardIcon className="h-4 w-4 text-muted-foreground" />,
      description: "This month"
    },
    {
      title: "Average Score",
      value: "78%",
      icon: <BarChart3Icon className="h-4 w-4 text-muted-foreground" />,
      description: "Last 5 interviews"
    },
    {
      title: "Upcoming",
      value: "3",
      icon: <CalendarIcon className="h-4 w-4 text-muted-foreground" />,
      description: "Scheduled interviews"
    },
    {
      title: "Practice Time",
      value: "7.5h",
      icon: <ClockIcon className="h-4 w-4 text-muted-foreground" />,
      description: "This month"
    }
  ];

  return (
    <div className="p-5 md:p-10 max-w-7xl mx-auto" >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
       
          <h2 className="font-bold text-3xl text-primary">Interview Dashboard</h2>
          <p className="text-muted-foreground">Create and track your AI mockup interviews</p>
      
        

      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Quick Actions and Add New Interview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start a practice session or schedule an interview</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
    
        <Button  onClick={() => router.push('/dashboard/quick-practice')}  className="w-full" size="lg">
        
            <LayoutDashboardIcon className="mr-2 h-4 w-4" /> Quick Practice
          
        </Button>
   
     
        <Button onClick={() => router.push('/dashboard/schedule-session')}  variant="outline" className="w-full" size="lg">
        
            <CalendarIcon className="mr-2 h-4 w-4" /> Schedule Session
          
        </Button>
     
    
          </CardContent>
        </Card>
        
        <AddNewInterview />
      </div>
      
      {/* Interview History Tabs */}
      <Tabs defaultValue="all" className="w-full">
      
        
      
      </Tabs>
    </div>
  );
}

export default Dashboard;