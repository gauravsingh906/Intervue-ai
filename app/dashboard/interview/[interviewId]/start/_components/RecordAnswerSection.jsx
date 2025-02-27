"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Loader2, Mic, Save, StopCircle, Trash2, Video, Volume2 } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {
    const [userAnswer, setUserAnswer] = useState('');
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const [showCamera, setShowCamera] = useState(true);
    const [recordingTime, setRecordingTime] = useState(0);
    const [maxRecordingTime] = useState(180); // 3 minutes max
    const [saveDisabled, setSaveDisabled] = useState(true);
    
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    // Update recording timer
    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingTime(prev => {
                    if (prev >= maxRecordingTime) {
                        stopSpeechToText();
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        
        return () => clearInterval(interval);
    }, [isRecording, maxRecordingTime, stopSpeechToText]);

    // Process speech results
    useEffect(() => {
        if (results && results.length > 0) {
            const transcript = results.map(result => result.transcript).join(' ');
            setUserAnswer(transcript);
            setSaveDisabled(transcript.trim().length < 10);
        }
    }, [results]);

    // Handle recording toggle
    const toggleRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            setResults([]);
            setUserAnswer('');
            setRecordingTime(0);
            setSaveDisabled(true);
            startSpeechToText();
        }
    };

    // Clear current answer
    const clearAnswer = () => {
        setUserAnswer('');
        setResults([]);
        setSaveDisabled(true);
    };

    // Save answer and get AI feedback
    const saveAnswer = async () => {
        if (userAnswer.trim().length < 10) {
            toast.error('Your answer is too short');
            return;
        }

        setLoading(true);
        
        try {
            // Prepare prompt for AI
            const feedbackPrompt = `Question: ${
                mockInterviewQuestion[activeQuestionIndex]?.question || 
                mockInterviewQuestion[activeQuestionIndex]?.Question
            }, User Answer: ${userAnswer}. Based on the question and user answer, please provide:
            1. A rating from 1-10
            2. 3-5 lines of specific feedback on areas for improvement
            Return in JSON format with 'rating' and 'feedback' fields only.`;

            // Get AI feedback
            const result = await chatSession.sendMessage(feedbackPrompt);
            let mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
            const JsonFeedbackResp = JSON.parse(mockJsonResp);
            
            // Save to database
            const resp = await db.insert(UserAnswer)
            .values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question || 
                          mockInterviewQuestion[activeQuestionIndex]?.Question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer || 
                            mockInterviewQuestion[activeQuestionIndex]?.Answer || "",
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            });

            if (resp) {
                toast.success('Answer recorded successfully');
                clearAnswer();
            }
        } catch (error) {
            console.error("Error saving answer:", error);
            toast.error('Failed to save your answer');
        } finally {
            setLoading(false);
        }
    };

    // Format time for display
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="space-y-6">
            {/* Camera/Webcam Section */}
            <Card className={`overflow-hidden bg-black/5 dark:bg-black/20 border-0 ${!showCamera ? 'hidden' : ''}`}>
                <CardContent className="p-0 relative aspect-video flex items-center justify-center">
                    {!showCamera ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-2 p-8">
                            <Video className="h-12 w-12 text-muted-foreground opacity-50" />
                            <p className="text-muted-foreground">Camera is turned off</p>
                        </div>
                    ) : (
                        <>
                            {/* Placeholder when webcam is not available */}
                            <Image 
                                src="/webcam.png" 
                                width={200} 
                                height={200} 
                                alt="Webcam placeholder"
                                className="absolute opacity-30 object-contain"
                            />
                            
                            {/* Actual webcam */}
                            <Webcam
                                mirrored={true}
                                audio={false}
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Recording indicator */}
                            {isRecording && (
                                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 text-white px-3 py-1.5 rounded-full">
                                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
            
            {/* Controls and Answer Section */}
            <div className="space-y-4">
                {/* Recording Progress */}
                {isRecording && (
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span>Recording: {formatTime(recordingTime)}</span>
                            <span>Max: {formatTime(maxRecordingTime)}</span>
                        </div>
                        <Progress value={(recordingTime / maxRecordingTime) * 100} />
                    </div>
                )}
                
                {/* Camera Toggle */}
                <div className="flex items-center space-x-2">
                    <Switch 
                        id="camera-toggle" 
                        checked={showCamera} 
                        onCheckedChange={setShowCamera} 
                    />
                    <Label htmlFor="camera-toggle">Camera</Label>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button 
                        variant={isRecording ? "destructive" : "default"}
                        onClick={toggleRecording}
                        disabled={loading}
                        className={`w-full ${isRecording ? 'animate-pulse' : ''}`}
                    >
                        {isRecording ? (
                            <>
                                <StopCircle className="mr-2 h-4 w-4" />
                                Stop Recording
                            </>
                        ) : (
                            <>
                                <Mic className="mr-2 h-4 w-4" />
                                Record Answer
                            </>
                        )}
                    </Button>
                    
                    <Button 
                        variant="outline" 
                        onClick={clearAnswer}
                        disabled={loading || userAnswer.trim().length === 0}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                
                <Separator />
                
                {/* Transcript/Answer Area */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Your Answer</h3>
                        {isRecording && interimResult && (
                            <span className="text-xs text-muted-foreground italic">Listening...</span>
                        )}
                    </div>
                    
                    <Textarea 
                        value={userAnswer}
                        onChange={(e) => {
                            setUserAnswer(e.target.value);
                            setSaveDisabled(e.target.value.trim().length < 10);
                        }}
                        placeholder="Your answer will appear here as you speak. You can also type or edit your answer."
                        rows={6}
                        className="resize-none"
                    />
                    
                    {error && (
                        <p className="text-xs text-destructive">
                            {error.message || "An error occurred with speech recognition"}
                        </p>
                    )}
                </div>
                
                {/* Save Button */}
                <Button 
                    variant="default" 
                    className="w-full"
                    onClick={saveAnswer}
                    disabled={loading || saveDisabled}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Answer
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}

export default RecordAnswerSection;