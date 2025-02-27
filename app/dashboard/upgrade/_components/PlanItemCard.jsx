"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function PlanItemCard({ plan, isPopular }) {
  const { user } = useUser();
  
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
      isPopular ? "border-primary border-2 shadow-md" : "hover:border-primary/50"
    )}>
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg font-medium flex items-center gap-1">
            <Crown size={16} />
            Popular
          </div>
        </div>
      )}
      
      <CardHeader className="text-center pb-2">
        <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
        <div className="mt-2 flex items-center justify-center">
          <span className="text-3xl font-extrabold">${plan.cost}</span>
          <span className="text-sm text-muted-foreground ml-1">/month</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {plan.offering.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2" />
              <span className="text-sm">{item.value}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={cn(
            "w-full transition-all font-medium",
            isPopular ? "bg-primary hover:bg-primary/90" : ""
          )}
          variant={isPopular ? "default" : "outline"}
          size="lg"
        >
          {user ? "Get Started" : "Sign Up & Start"}
          {isPopular && <Sparkles className="ml-2 h-4 w-4" />}
        </Button>
      </CardContent>
    </Card>
  );
}

export default PlanItemCard;