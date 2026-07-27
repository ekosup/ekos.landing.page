"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
 const pathname = usePathname();
 const { theme, setTheme } = useTheme();
 const [mounted, setMounted] = useState(false);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 if (pathname?.startsWith("/blogs")) {
  return null;
 }

 const isHome = pathname === "/";

 return (
  <header className="fixed top-0 w-full bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 z-50 transition-colors duration-200">
   <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="flex justify-between items-center h-16">
     {/* Brand / Logo */}
     <div className="flex items-center">
      <Link href="/" className="flex items-center space-x-2.5 group">
       <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-neutral-100">
        Eko Supriyono
       </span>
       <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 hidden sm:inline-block">
        / software engineer
       </span>
      </Link>
     </div>
     
     {/* Desktop Navigation */}
     <nav className="hidden md:flex items-center space-x-8 text-sm">
      <Link
       href={isHome ? "#hero" : "/"}
       className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
       Home
      </Link>
      <Link
       href={isHome ? "#work" : "/#work"}
       className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
       Projects
      </Link>
      <Link
       href={isHome ? "#architecture" : "/#architecture"}
       className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
       Architecture
      </Link>
      <Link
       href={isHome ? "#skills" : "/#skills"}
       className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
       Skills
      </Link>
      <Link
       href={isHome ? "#contact" : "/#contact"}
       className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
       Contact
      </Link>
      <Link
       href="/hire-me"
       className="px-3 py-1.5 rounded-md font-mono text-xs font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-xs"
      >
       Hire Me ✦
      </Link>

      {/* Theme Toggle */}
      {mounted && (
       <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Toggle Theme"
       >
        {theme === "dark" ? (
         <Sun className="h-4 w-4" />
        ) : (
         <Moon className="h-4 w-4" />
        )}
       </button>
      )}
     </nav>

     {/* Mobile Toggle */}
     <div className="md:hidden flex items-center gap-3">
      <Link
       href="/hire-me"
       className="px-2.5 py-1 rounded font-mono text-xs font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
      >
       Hire Me ✦
      </Link>

      {mounted && (
       <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-1.5 rounded-md text-neutral-500"
       >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
       </button>
      )}
      
      <button 
       onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
       className="p-1.5 text-neutral-700 dark:text-neutral-300"
      >
       {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
     </div>
    </div>
   </div>

   {/* Mobile Drawer */}
   {mobileMenuOpen && (
    <div className="md:hidden bg-white dark:bg-[#09090b] border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 space-y-3 text-sm">
     <Link href={isHome ? "#hero" : "/"} onClick={() => setMobileMenuOpen(false)} className="block text-neutral-700 dark:text-neutral-300">Home</Link>
     <Link href={isHome ? "#work" : "/#work"} onClick={() => setMobileMenuOpen(false)} className="block text-neutral-700 dark:text-neutral-300">Projects</Link>
     <Link href={isHome ? "#architecture" : "/#architecture"} onClick={() => setMobileMenuOpen(false)} className="block text-neutral-700 dark:text-neutral-300">Architecture</Link>
     <Link href={isHome ? "#skills" : "/#skills"} onClick={() => setMobileMenuOpen(false)} className="block text-neutral-700 dark:text-neutral-300">Skills</Link>
     <Link href={isHome ? "#contact" : "/#contact"} onClick={() => setMobileMenuOpen(false)} className="block text-neutral-700 dark:text-neutral-300">Contact</Link>
     <Link href="/hire-me" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-emerald-600 dark:text-emerald-400 font-mono">Hire Me ✦</Link>
    </div>
   )}
  </header>
 );
}
