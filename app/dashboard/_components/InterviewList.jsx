"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';
import { SearchCheck, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  useEffect(() => {
    if (interviewList.length > 0) {
      applyFilters();
    }
  }, [searchQuery, sortOrder, interviewList]);

  const GetInterviewList = async () => {
    setLoading(true);
    try {
      const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));

      console.log(result);
      setInterviewList(result);
      setFilteredList(result);
    } catch (error) {
      console.error("Failed to fetch interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...interviewList];
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.jobPosition.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.jobDesc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === "experience-high") {
      filtered.sort((a, b) => b.jobExperience - a.jobExperience);
    } else if (sortOrder === "experience-low") {
      filtered.sort((a, b) => a.jobExperience - b.jobExperience);
    }
    
    setFilteredList(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <h1 className="text-2xl font-bold">My Interview Sessions</h1>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-grow max-w-md">
            <SearchCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search by position or tech..." 
              className="pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="experience-high">Highest experience</SelectItem>
              <SelectItem value="experience-low">Lowest experience</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {!loading && filteredList.length > 0 ? (
          filteredList.map((interview, index) => (
            <InterviewItemCard 
              interview={interview}
              key={index} 
            />
          ))
        ) : loading ? (
          Array(3).fill(0).map((_, index) => (
            <div key={index} className="rounded-lg border">
              <div className="h-8 w-2/3 bg-gray-200 animate-pulse rounded m-4"></div>
              <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mx-4 mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded mx-4 mb-4"></div>
              <div className="flex gap-2 mx-4 mb-4">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
                ))}
              </div>
              <div className="flex justify-between border-t p-4">
                <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Briefcase size={36} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">No interviews found</h3>
            <p className="text-gray-500 mt-1">
              Try adjusting your search or create a new interview session.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewList;