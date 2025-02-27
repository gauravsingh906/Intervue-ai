"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sun, Moon, Users, Award, BarChart, Heart } from "lucide-react";

const AboutUs = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("mission");
  
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former tech lead at Google with 10+ years experience in AI and machine learning.",
      avatar: "/john2.jpeg"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "MIT graduate with expertise in full-stack development and system architecture.",
      avatar: "/john3.jpg"
    },
    {
      name: "Aisha Patel",
      role: "Head of Product",
      bio: "Product strategist who previously led teams at Microsoft and Amazon.",
      avatar: "/john1.webp"
    },
    {
      name: "David Rodriguez",
      role: "Lead Developer",
      bio: "Open-source contributor and JavaScript expert with focus on user experience.",
      avatar: "/john.jpeg"
    }
  ];
  
  const stats = [
    { label: "Users", value: "10,000+", icon: Users },
    { label: "Countries", value: "45+", icon: BarChart },
    { label: "Success Rate", value: "94%", icon: Award },
    { label: "Satisfaction", value: "4.9/5", icon: Heart }
  ];
  
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">About Us</h1>
       
        </div>
        
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-16 aspect-video">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/30 z-10 flex items-center">
            <div className="p-8 md:p-12 max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Revolutionizing Mock Interviews
              </h2>
              <p className="text-gray-200 text-lg mb-6" >
                We're on a mission to help candidates ace their technical interviews through personalized practice and feedback.
              </p>
              <Button size="lg" variant="secondary">
                Join Our Community
              </Button>
            </div>
          </div>
          <Image
            src="/collaborate.jpg"
            alt="Team collaborating"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:border-primary/50 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center rounded-full p-3 bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Tabs Section */}
        <Tabs 
          defaultValue="mission" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-16"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="mission">Our Mission</TabsTrigger>
              <TabsTrigger value="story">Our Story</TabsTrigger>
              <TabsTrigger value="values">Our Values</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="mission" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Empowering Job Seekers</h3>
                <p className="text-muted-foreground mb-4">
                  Our mission is to level the playing field in tech interviews by providing affordable, 
                  accessible practice tools for everyone, regardless of their background or experience level.
                </p>
                <p className="text-muted-foreground">
                  We believe that with the right preparation, anyone can succeed in technical interviews
                  and build the career they deserve.
                </p>
              </div>
              <div className="relative rounded-lg overflow-hidden aspect-square">
                <Image
                  src="/misson.jpg"
                  alt="Our mission visualization"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="story" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-lg overflow-hidden aspect-square">
                <Image
                  src="/" 
                  alt="Founding team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="">
                <h3 className="text-2xl font-bold mb-4">From Struggle to Solution</h3>
                <p className="text-muted-foreground mb-4">
                  Our company was born from our founder's personal struggle with technical interviews. 
                  After numerous rejections and frustrating experiences, Sarah developed her own 
                  preparation method that ultimately helped her land her dream job.
                </p>
                <p className="text-muted-foreground">
                  What started as a small blog in 2020 has now grown into a comprehensive platform 
                  helping thousands of candidates worldwide prepare for and succeed in their interviews.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="values" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">What We Stand For</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-primary/10 p-1 rounded text-primary mr-3">01</span>
                    <span><strong>Accessibility</strong> - Making quality interview preparation available to everyone</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 p-1 rounded text-primary mr-3">02</span>
                    <span><strong>Quality</strong> - Providing realistic, industry-relevant practice experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 p-1 rounded text-primary mr-3">03</span>
                    <span><strong>Community</strong> - Fostering a supportive environment for growth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 p-1 rounded text-primary mr-3">04</span>
                    <span><strong>Innovation</strong> - Continuously improving our platform with new technologies</span>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-lg overflow-hidden aspect-square">
                <Image
                  src="/api/placeholder/500/500" 
                  alt="Our values"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-contain w-12 transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary/5 rounded-lg p-8 text-center border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Our Journey?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Whether you're preparing for your next interview or just want to sharpen your skills,
            we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">View Plans</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;