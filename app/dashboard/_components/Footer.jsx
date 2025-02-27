"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Github as GithubIcon,
  Send, 
  ExternalLink, 
  ChevronUp, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Heart, 
  GitHub,
  Youtube,
  Github
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  
  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes('@') && email.includes('.')) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // Detect scroll position for "scroll to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Get current date for copyright and latest blog posts
  const currentDate = new Date();
  
  return (
    <footer className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-[#212124] dark:to-[#212124] pt-16 pb-8 border-t border-slate-200 dark:border-slate-700 transition-colors duration-200">
      <div className="container mx-auto px-4">
        {/* Top banner - special announcement */}
        <div className="mb-12 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-4 bg-blue-500 text-white p-2 rounded-full">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-300">Join our upcoming webinar</h3>
                <p className="text-slate-600 dark:text-slate-300">Master AI-powered interview techniques - March 15, 2025</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Register Now
            </Button>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor" />
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Intervue AI</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 max-w-xs">
              Empowering careers through AI-powered interview preparation and job-seeking assistance.
            </p>
            <div className="flex flex-wrap gap-3">
  <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">
    <Facebook size={20} />
  </a>
  <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">
    <Twitter size={20} />
  </a>
  <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">
    <Linkedin size={20} />
  </a>
  <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">
    <Instagram size={20} />
  </a>
  <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">
    <Youtube size={20} />
  </a>
  <a href="#" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">
    <Github size={20} />
  </a>
</div>

            
            {/* Contact Info */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-3">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                  <MapPin size={16} className="mr-2 text-blue-500" />
                  <span>123 AI Innovation Ave, San Francisco, CA</span>
                </li>
                <li className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                  <Phone size={16} className="mr-2 text-blue-500" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                  <Mail size={16} className="mr-2 text-blue-500" />
                  <span>contact@intervueai.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 transition-colors flex items-center group">
                  <span>Features</span>
                  <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 transition-colors flex items-center group">
                  <span>Pricing</span>
                  <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 transition-colors flex items-center group">
                  <span>Enterprise</span>
                  <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 transition-colors flex items-center group">
                  <span>Testimonials</span>
                  <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/what-new" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 transition-colors flex items-center group">
                  <span>What's New</span>
                  <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full">New</span>
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 transition-colors flex items-center group">
                  <span>Integrations</span>
                </Link>
              </li>
            </ul>
            
            {/* App Download Links */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-semibold mb-3 text-slate-800 dark:text-white">Download Our App</h4>
              <div className="flex flex-col ">
                <a href="#" className="inline-block">
                  <img src="/app-store.svg" alt="App Store" className="h-10" />
                </a>
                <a href="#" className="inline-block">
                  <img src="/google-play.svg" alt="Google Play" className="h-20" />
                </a>
              </div>
            </div>
          </div>

          {/* Resources & Latest Blog Posts */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 transition-colors flex items-center group">
                  <span>Blog</span>
                  <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 transition-colors flex items-center group">
                  <span>Documentation</span>
                  <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 transition-colors flex items-center group">
                  <span>Guides</span>
                  <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 transition-colors flex items-center group">
                  <span>Help Center</span>
                  <ExternalLink size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/webinars" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 transition-colors flex items-center group">
                  <span>Webinars</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300 transition-colors flex items-center group">
                  <span>Careers</span>
                </Link>
              </li>
            </ul>
            
            {/* Latest Blog Posts */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-semibold mb-3 text-slate-800 dark:text-white">Latest Articles</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/blog/ai-interviews" className="group">
                    <h5 className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">How AI is Revolutionizing Job Interviews</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock size={12} className="mr-1" />
                      Feb 20, 2025
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/resume-tips" className="group">
                    <h5 className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">10 Resume Tips for 2025 Job Market</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                      <Clock size={12} className="mr-1" />
                      Feb 15, 2025
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter, Language Selection & Theme Toggle */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">Stay Updated</h3>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <Button 
                    type="submit" 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Send size={16} />
                  </Button>
                </div>
                {subscribed && (
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    Thank you for subscribing!
                  </p>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Get the latest news and updates from Intervue AI.
                </p>
              </form>
            </div>
            
            {/* Language Selector */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-semibold mb-3 text-slate-800 dark:text-white">Language</h4>
              <div className="relative">
                <select 
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Español</option>
                  <option value="French">Français</option>
                  <option value="German">Deutsch</option>
                  <option value="Japanese">日本語</option>
                  <option value="Chinese">中文</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Theme Toggle */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">Dark Mode</span>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-semibold mb-3 text-slate-800 dark:text-white">Trusted By</h4>
              <div className="flex flex-wrap gap-2 justify-start">
                <img src="/intuit.svg" alt="Trust Badge 1" className="h-6 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                <img src="/microsoft.svg" alt="Trust Badge 2" className="h-6 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                <img src="/gitlab.svg" alt="Trust Badge 3" className="h-6 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="mt-16 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {currentDate.getFullYear()} Intervue AI. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0 justify-center">
              <Link href="/privacy" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">
                Accessibility
              </Link>
              <Link href="/sitemap" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          
          {/* Made with love badge */}
          <div className="flex justify-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
              Made with <Heart size={12} className="mx-1 text-red-500" /> by the Intervue AI Team
            </span>
          </div>
        </div>
      </div>
      
      {/* Cookie consent banner - could be shown based on state */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-lg border-t border-slate-200 dark:border-slate-700 p-4 z-40">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0 sm:mr-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" className="text-slate-600 border-slate-300 dark:text-slate-300 dark:border-slate-600">
              Privacy Policy
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              Accept All
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-20 right-24 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </footer>
  );
}