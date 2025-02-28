"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ className }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const selectDate = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  return (
    <div className={cn("p-4 bg-white rounded-lg shadow-md", className)}>
      {/* Header Navigation */}
      <div className="flex justify-between items-center mb-3">
        <button onClick={prevMonth} className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 p-0")}> 
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-lg font-medium">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button onClick={nextMonth} className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 p-0")}> 
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-1 text-center font-medium text-sm text-gray-600">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 mt-2">
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={`empty-${index}`} className="text-transparent">.</div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth();
          const isToday =
            day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear();

          return (
            <button
              key={day}
              onClick={() => selectDate(day)}
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-md text-sm",
                isSelected ? "bg-primary text-white" : "hover:bg-gray-200",
                isToday ? "border border-primary text-primary font-bold" : ""
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { Calendar };
