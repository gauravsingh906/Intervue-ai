"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">No questions available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Question Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {mockInterviewQuestion.map((question, index) => (
          <Badge
            key={index}
            variant={activeQuestionIndex === index ? "default" : "outline"}
            className={`py-1.5 cursor-pointer hover:opacity-90 transition-all ${
              activeQuestionIndex === index 
                ? "bg-primary text-primary-foreground" 
                : ""
            }`}
            onClick={() => setActiveQuestionIndex && setActiveQuestionIndex(index)}
          >
            Question {index + 1}
          </Badge>
        ))}
      </div>

      {/* Current Question Display */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium">Question {activeQuestionIndex + 1}</h3>
          <button
            onClick={() => {
              const questionText = 
                mockInterviewQuestion[activeQuestionIndex]?.question || 
                mockInterviewQuestion[activeQuestionIndex]?.Question || 
                "No question available";
              textToSpeech(questionText);
            }}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Volume2 className="h-4 w-4" />
            <span className="hidden sm:inline">Listen</span>
          </button>
        </div>

        <div className="text-lg">
          {/* Display the question regardless of case (question or Question) */}
          {mockInterviewQuestion[activeQuestionIndex]?.question || 
           mockInterviewQuestion[activeQuestionIndex]?.Question || 
           "No question available"}
        </div>
      </div>

      {/* Note Section */}
      <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 mb-2">
            <Lightbulb className="h-4 w-4" />
            <span className="font-medium">NOTE:</span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE || 
             "Take your time to formulate a comprehensive answer. Speak clearly and confidently."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuestionsSection;