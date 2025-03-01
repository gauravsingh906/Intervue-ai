"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle, Plus, FileSpreadsheet,  Clock, X } from 'lucide-react';
import {  BriefcaseBusiness } from 'lucide-vue-next';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState(2);
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const InputPrompt = "Job position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience : " + jobExperience + " , Depends on Job Position, Job Description & Years of Experience give us " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + " Interview question along with Answer in JSON format, Give us question and answer field on JSON";

      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
      console.log(JSON.parse(MockJsonResp));
      setJsonResponse(MockJsonResp);

      if (MockJsonResp) {
        const resp = await db.insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy')
          }).returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID:", resp);
        if (resp) {
          setOpenDialog(false);
          router.push('/dashboard/interview/' + resp[0]?.mockId);
        }
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.error("Error creating interview:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const resetForm = () => {
    setJobPosition('');
    setJobDesc('');
    setJobExperience(2);
    setCurrentStep(1);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  return (
    <div>
      <Card 
        className="p-6 border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10
        hover:shadow-lg cursor-pointer transition-all border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <CardContent className="p-0 flex flex-col items-center justify-center h-40">
          <div className="bg-primary/10 p-3 rounded-full mb-3">
            <Plus className="text-primary h-6 w-6" />
          </div>
          <h2 className="text-lg font-medium text-center">Create New Interview</h2>
          <p className="text-sm text-gray-500 mt-1">Set up custom interview questions</p>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <  BriefcaseBusiness className="text-primary" />
              New Interview Session
            </DialogTitle>
            <DialogDescription>
              <div className="mt-2 mb-6">
                <div className="flex justify-between mb-1">
                  <div className="flex space-x-1">
                    <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <div className={`w-3 h-3 rounded-full ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                    <div className={`w-3 h-3 rounded-full ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                  </div>
                  <span className="text-xs text-gray-500">Step {currentStep} of 3</span>
                </div>
                <div className="w-full bg-gray-200 h-1 rounded-full">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all" 
                    style={{width: `${(currentStep / 3) * 100}%`}}
                  ></div>
                </div>
              </div>

              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Tell us about the position</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="jobPosition" className="text-sm font-medium">
                        Job Role / Position
                      </Label>
                      <Input 
                        id="jobPosition"
                        placeholder="Ex. Full Stack Developer" 
                        value={jobPosition}
                        onChange={(e) => setJobPosition(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button 
                      onClick={handleNext} 
                      disabled={!jobPosition}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Tell us about the requirements</h3>
                  <div>
                    <Label htmlFor="jobDesc" className="text-sm font-medium">
                      Tech Stack / Skills Required
                    </Label>
                    <Textarea 
                      id="jobDesc"
                      placeholder="Ex. React, Angular, NodeJs, MySQL etc" 
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      className="mt-1 min-h-32"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate different technologies with commas
                    </p>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button 
                      onClick={handleNext} 
                      disabled={!jobDesc}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <form onSubmit={onSubmit} className="space-y-4">
                  <h3 className="font-medium">Experience level</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="experience" className="text-sm font-medium">
                          Years of experience: <span className="text-primary font-semibold">{jobExperience}</span>
                        </Label>
                      </div>
                      <div className="px-1">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Entry level</span>
                          <span>Expert</span>
                        </div>
                        <Slider 
                          id="experience"
                          min={0} 
                          max={15} 
                          step={1} 
                          value={[jobExperience]} 
                          onValueChange={(value) => setJobExperience(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0 years</span>
                          <span>15+ years</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Interview Summary</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <  BriefcaseBusiness size={16} className="text-gray-500 mr-2" />
                          <span className="text-sm">{jobPosition}</span>
                        </div>
                        <div className="flex items-center">
                          <FileSpreadsheet size={16} className="text-gray-500 mr-2" />
                          <span className="text-sm">{jobDesc.split(',').slice(0, 3).join(', ')}{jobDesc.split(',').length > 3 ? '...' : ''}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="text-gray-500 mr-2" />
                          <span className="text-sm">{jobExperience} years of experience</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button type="submit" disabled={loading} className="relative">
                      {loading ? (
                        <>
                          <LoaderCircle className="animate-spin mr-2" size={16} />
                          Generating Questions...
                        </>
                      ) : (
                        'Start Interview'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;