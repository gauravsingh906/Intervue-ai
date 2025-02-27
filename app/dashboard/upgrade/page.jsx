"use client";

import React, { useState } from "react";
import planData from "@/utils/planData";
import PlanItemCard from "./_components/PlanItemCard";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Upgrade() {
  const { theme, setTheme } = useTheme();
  const [billingCycle, setBillingCycle] = useState("monthly");
  
  // Find the most popular plan
  const popularPlanIndex = planData.findIndex(plan => plan.isPopular) !== -1 
    ? planData.findIndex(plan => plan.isPopular) 
    : 1; // Default to middle plan if none marked as popular
  
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      {/* Header with Theme Toggle */}
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Upgrade Your Plan <span className="text-primary">🚀</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Unlock unlimited mock interviews with a premium plan that fits your needs.
            </p>
          </div>
          
       
        </div>
        
        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <Tabs 
            defaultValue="monthly" 
            value={billingCycle}
            onValueChange={setBillingCycle}
            className="mb-8"
          >
            <TabsList className="grid w-64 grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Save 20%
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {planData.map((plan, index) => (
            <div 
              key={index}
              className={`transform transition-transform duration-300 ${
                index === popularPlanIndex ? "md:-translate-y-4" : ""
              }`}
            >
              <PlanItemCard 
                plan={{
                  ...plan,
                  cost: billingCycle === "yearly" 
                    ? Math.round(plan.cost * 0.8) 
                    : plan.cost
                }} 
                isPopular={index === popularPlanIndex}
              />
            </div>
          ))}
        </div>
        
        {/* Testimonial */}
        <div className="mt-16 p-6 bg-primary/5 rounded-lg border border-primary/10">
          <blockquote className="text-center">
            <p className="text-lg italic text-muted-foreground">
              "This platform has helped me land my dream job at a FAANG company. The premium mock interviews were game-changers!"
            </p>
            <footer className="mt-2 font-medium">— Sarah J., Software Engineer</footer>
          </blockquote>
        </div>
        
        {/* FAQ or Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Have questions about our plans? <a href="#" className="font-medium text-primary hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;