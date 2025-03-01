"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Mail, 
  MapPin, 
  Phone, 
  MessageSquare, 
  HelpCircle, 
  LifeBuoy,
  CheckCircle,
  Briefcase // Using Briefcase instead of BriefcaseBusiness
} from "lucide-react";
// Removed import { BriefcaseBusiness } from 'lucide-vue-next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  department: z.string(),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority level.",
  }),
});

const ContactPage = () => {
 
  const [activeTab, setActiveTab] = useState("contact-form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      department: "support",
      priority: "medium",
    },
  });

  function onSubmit(values) {
    setIsSubmitting(true);
    // Adding the timeout to simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      console.log(values);
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
      });
    }, 1500);
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@mockinterview.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri, 9am-5pm EST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Tech Lane, San Francisco, CA",
      description: "By appointment only"
    }
  ];

  const faqs = [
    {
      question: "How do I schedule a mock interview?",
      answer: "You can schedule a mock interview by logging into your account, navigating to the 'Interviews' tab, and clicking on 'Schedule New'. Select your preferred time slot and interviewer."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay. For enterprise customers, we also offer invoice payment options."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
    },
    {
      question: "How do I prepare for my mock interview?",
      answer: "We recommend reviewing the job description you're targeting, brushing up on relevant technical concepts, and having your resume handy. Our system will send you preparation materials 24 hours before your scheduled interview."
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">Contact Us</h1>
          
       
        </div>
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Can We Help You?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you have a question about our plans, need technical assistance, or want to partner with us, 
            our team is ready to answer your questions.
          </p>
        </div>
        
        {/* Contact Options Tabs */}
        <Tabs 
          defaultValue="contact-form" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-16"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="contact-form" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Message Us</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Support</span>
              </TabsTrigger>
              <TabsTrigger value="business" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> 
                <span>Business</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Contact Form Tab */}
          <TabsContent value="contact-form" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    {isSuccess ? (
                      <div className="py-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground">
                          Thank you for reaching out. We'll get back to you as soon as possible.
                        </p>
                        <Button 
                          className="mt-6"
                          onClick={() => {
                            form.reset();
                            setIsSuccess(false);
                          }}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="your.email@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="department"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Department</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select department" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="support">Technical Support</SelectItem>
                                      <SelectItem value="billing">Billing & Accounts</SelectItem>
                                      <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                                      <SelectItem value="partnerships">Business Partnerships</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="priority"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel>Priority</FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex space-x-4"
                                    >
                                      <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="low" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          Low
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="medium" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          Medium
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="high" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          High
                                        </FormLabel>
                                      </FormItem>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                  <Input placeholder="What's this about?" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="How can we help you?" 
                                    className="min-h-32" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </Button>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4 flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-wrap font-semibold">{item.details}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="mt-4 bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <LifeBuoy className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-medium">Need Urgent Help?</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Premium users can access our priority support line for immediate assistance.
                    </p>
                    <Button variant="outline" className="w-full">View Support Options</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Support Tab */}
          <TabsContent value="support" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="pb-4 border-b last:border-0">
                      <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-medium mb-3">Still have questions?</h3>
                  <p className="text-muted-foreground mb-4">
                    Our support team is here to help. Reach out to us and we'll get back to you as soon as possible.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={() => setActiveTab("contact-form")} className="flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send a Message
                    </Button>
                    <Button variant="outline">Visit Knowledge Base</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Business Tab */}
          <TabsContent value="business" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Business Solutions</h2>
                    <p className="text-muted-foreground mb-4">
                      Looking to equip your team with interview preparation tools? Our enterprise plans 
                      offer custom solutions for businesses of all sizes.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        <span>Bulk license discounts</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        <span>Custom interview scenarios</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        <span>Analytics and reporting</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        <span>Dedicated account manager</span>
                      </li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button>Request Demo</Button>
                      <Button variant="outline" onClick={() => setActiveTab("contact-form")}>
                        Contact Sales
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Join Our Partners</h3>
                        <p className="text-muted-foreground mb-6">
                          We work with career coaching services, educational institutions, and recruiting firms
                          to provide integrated interview preparation solutions.
                        </p>
                        <form className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Company Name</label>
                              <Input placeholder="Your company" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Industry</label>
                              <Select defaultValue="education">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="education">Education</SelectItem>
                                  <SelectItem value="recruiting">Recruiting</SelectItem>
                                  <SelectItem value="coaching">Career Coaching</SelectItem>
                                  <SelectItem value="technology">Technology</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input placeholder="business@example.com" />
                          </div>
                          <Button className="w-full">Join Partnership Program</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
      </div>
    </div>
  );
};

export default ContactPage;