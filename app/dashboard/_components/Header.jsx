'use client'
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ModeToggle'
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Header = () => {
  const path = usePathname();

  const navItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Features", href: "/dashboard/features" },
    { label: "Pricing", href: "/dashboard/upgrade" },
    { label: "About Us", href: "/dashboard/about" },
    { label: "Contact", href: "/dashboard/contacts" },
  ];

  const NavLink = ({ href, label }) => (
    <Link href={href}>
      <li className={`
        hover:text-primary hover:font-bold
        transition-all cursor-pointer
        ${path === href ? 'text-primary font-bold' : ''}
        hover:scale-105
      `}>
        {label}
      </li>
    </Link>
  );

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="flex p-4 items-center justify-between bg-secondary/80 backdrop-blur-sm shadow-md">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            width={30}
            height={30}
            alt="logo"
            className="hover:opacity-80 transition-opacity"
          />
          <h1 className="text-xl font-bold  sm:block">Intervue AI</h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        
        </ul>

        {/* Actions Group */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <NavLink key={item.href} {...item} />
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;