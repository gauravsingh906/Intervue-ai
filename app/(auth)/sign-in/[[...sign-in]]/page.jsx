// pages/sign-in.js
import { SignIn } from '@clerk/nextjs';
import { ArrowRight, ShieldCheck, Zap, BarChart } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Left side - sign in form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground mt-2">
              Sign in to continue to your InterviewAI dashboard
            </p>
          </div>
          
          <div className="bg-card border rounded-xl shadow-sm ">
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none ",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  formButtonPrimary: "bg-primary hover:bg-primary/90 text-white   rounded-md flex items-center justify-center font-medium"
                }
              }}
            />
          </div>
          
         
        </div>
      </div>
      
      {/* Right side - stats and metrics */}
      <div className="hidden lg:flex lg:w-1/2 flex-col p-12 bg-primary/5 order-1 lg:order-2 justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-2">InterviewAI</h1>
          <p className="text-xl text-muted-foreground mb-8">Your hiring metrics this month</p>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-card border rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-muted-foreground text-sm">Interviews Conducted</p>
                  <h3 className="text-3xl font-bold">42</h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="text-sm text-green-600 flex items-center">
                <span>↑ 12% from last month</span>
              </div>
            </div>
            
            <div className="bg-card border rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-muted-foreground text-sm">Time Saved</p>
                  <h3 className="text-3xl font-bold">18h</h3>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="text-sm text-green-600 flex items-center">
                <span>↑ 24% from last month</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-medium mb-4 flex items-center">
              <ShieldCheck className="h-5 w-5 text-primary mr-2" />
              Your secure dashboard is waiting
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Sign in to access your full interviewing toolkit, view recent candidate 
              assessments, and collaborate with your team.
            </p>
            <div className="flex">
              <a href="/sign-in" className="text-primary flex items-center text-sm font-medium hover:underline">
                Go to dashboard
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}