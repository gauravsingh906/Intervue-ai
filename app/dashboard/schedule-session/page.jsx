'use client'

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Clock, ArrowLeft, Users, List , Briefcase} from 'lucide-react';


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const interviewTypes = [
  { id: "frontend", name: "Frontend Development" },
  { id: "backend", name: "Backend Development" },
  { id: "fullstack", name: "Full Stack Development" },
  { id: "devops", name: "DevOps" },
  { id: "data", name: "Data Science" },
  { id: "product", name: "Product Management" },
  { id: "design", name: "UX/UI Design" },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const ScheduleSession = () => {
  const router = useRouter();
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Show success and redirect
      router.push('/dashboard');
    }, 1500);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="p-5 md:p-10 max-w-7xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={goBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back
      </Button>
      
      <div className="mb-8">
        <h2 className="font-bold text-3xl text-primary">Schedule Interview Session</h2>
        <p className="text-muted-foreground">Plan your next mock interview with our AI system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Setup Progress</CardTitle>
            <CardDescription>Complete all steps to schedule your session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>1</div>
                <span className="font-medium">Choose Interview Type</span>
              </div>
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>2</div>
                <span className="font-medium">Select Date & Time</span>
              </div>
              <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>3</div>
                <span className="font-medium">Add Details</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Select Interview Type"}
              {step === 2 && "Choose Date and Time"}
              {step === 3 && "Interview Details"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "What kind of interview would you like to practice?"}
              {step === 2 && "When would you like to schedule your interview?"}
              {step === 3 && "Add a title and any preparation notes"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Interview Type */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {interviewTypes.map((type) => (
                    <div 
                      key={type.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${interviewType === type.id ? 'border-primary bg-primary/5' : 'border-border'}`}
                      onClick={() => setInterviewType(type.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Briefcase className={`h-5 w-5 ${interviewType === type.id ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="font-medium">{type.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Date and Time Selection */}
              {step === 2 && (
                <div className="flex flex-col space-y-6">
                  <div>
                    <Label className="mb-2 block">Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="border rounded-md p-4"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Select Time Slot</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <div
                          key={time}
                          className={`p-2 border rounded-md text-center cursor-pointer ${timeSlot === time ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                          onClick={() => setTimeSlot(time)}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Additional Details */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Interview Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., React Developer Interview Practice" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="experience-level">Experience Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Preparation Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Add any specific topics you'd like to cover or technologies to focus on..." 
                      rows={4}
                      value={notes} 
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button 
                onClick={() => setStep(step + 1)} 
                disabled={(step === 1 && !interviewType) || (step === 2 && (!date || !timeSlot))}
              >
                Continue
              </Button>
            ) : (
              <Button type="submit" onClick={handleSubmit} disabled={loading || !title}>
                {loading ? 'Scheduling...' : 'Schedule Interview'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleSession;