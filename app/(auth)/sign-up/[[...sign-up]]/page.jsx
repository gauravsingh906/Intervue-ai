// pages/sign-up.js
import { SignUp } from '@clerk/nextjs';
import {  UserPlus, Building, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Left side - branding and features */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-primary/5">
        <div>
      <div className="flex items-center gap-4">
               <Image
                 src="/logo.svg"
                 width={40}
                 height={40}
                 alt="logo"
                 className="hover:opacity-80 transition-opacity"
               />
               <h1 className="text-3xl font-bold  sm:block">Intervue AI</h1>
             </div>
     
          <p className="text-muted-foreground mt-4">Smart interview assessment platform</p>
        </div>
        
        <div className="space-y-8 my-12">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">AI-Powered Analysis</h3>
              <p className="text-muted-foreground mt-1">Get instant feedback on candidate technical, behavioral, and cultural fit</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Streamlined Hiring</h3>
              <p className="text-muted-foreground mt-1">Reduce bias and make data-driven hiring decisions</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Team Collaboration</h3>
              <p className="text-muted-foreground mt-1">Share assessments and collaborate with your entire hiring team</p>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-primary/10">
          <p className="text-sm text-muted-foreground">
            "InterviewAI has transformed our hiring process, helping us find candidates 
            that truly match our culture and technical needs."
          </p>
          <div className="mt-4 flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">JD</div>
            <div className="ml-3">
              <p className="font-medium">Jane Doe</p>
              <p className="text-sm text-muted-foreground">CTO, TechCorp</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - sign up form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Create your account</h2>
            <p className="text-muted-foreground mt-2">
              Start assessing candidates with AI-powered insights
            </p>
          </div>
          
          <div className="bg-card border rounded-xl shadow-sm ">
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none p-6 pt-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  formButtonPrimary: "bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-md flex items-center justify-center font-medium"
                }
              }}
            />
          </div>
          
        
        </div>
      </div>
    </div>
  );
}