import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Calendar,  Award, ArrowRight, BarChart2 } from 'lucide-react';
import {  BriefcaseBusiness } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

function InterviewItemCard({ interview }) {
  const router = useRouter();
  
  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId);
  };
  
  const onFeedbackPress = () => {
    router.push('/dashboard/interview/' + interview.mockId + "/feedback");
  };
  
  // Parse job description to create technology badges
  const technologies = interview?.jobDesc?.split(',').map(tech => tech.trim()) || [];
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden border-t-4 border-t-primary">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg text-primary">{interview?.jobPosition}</h2>
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              < BriefcaseBusiness size={14} />
              <span>{interview?.jobExperience} Years of Experience</span>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar size={14} />
            {interview.createdAt}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 mt-2">
          {technologies.slice(0, 4).map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {technologies.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{technologies.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between gap-3">
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full flex items-center gap-2 hover:border-primary hover:text-primary transition-colors"
          onClick={onFeedbackPress}
        >
          <BarChart2 size={16} />
          Feedback
        </Button>
        <Button 
          size="sm" 
          className="w-full flex items-center gap-2 bg-primary hover:bg-primary/90"
          onClick={onStart}
        >
          Start
          <ArrowRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default InterviewItemCard;