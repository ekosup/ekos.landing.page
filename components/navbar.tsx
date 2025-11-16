"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export function Navbar() {
 const pathname = usePathname();
 const { user, logout } = useAuth();

 // Don't show navbar on blogs pages
 if (pathname?.startsWith("/blogs")) {
  return null;
 }

 return (
  <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
     <div className="flex items-center">
      <Link href="/" className="flex items-center space-x-2">
       <Image
        src="/logo.svg"
        alt="Eko Supriyono Logo"
        width={32}
        height={32}
        className="w-8 h-8"
       />
       <span className="text-xl font-bold text-gray-900">Eko Supriyono</span>
      </Link>
     </div>
     <div className="hidden md:flex items-center space-x-8">
      <Link
       href="/"
       className="text-gray-700 hover:text-gray-900 transition-colors"
      >
       Home
      </Link>
      <Link
       href="/blogs"
       className="text-gray-700 hover:text-gray-900 transition-colors"
      >
       Blogs
      </Link>
      <Link
       href="/quizzes"
       className="text-gray-700 hover:text-gray-900 transition-colors"
      >
       Quizzes
      </Link>
      <Link
       href="#about"
       className="text-gray-700 hover:text-gray-900 transition-colors"
      >
       About
      </Link>
      <Link
       href="#projects"
       className="text-gray-700 hover:text-gray-900 transition-colors"
      >
       Projects
      </Link>
      <Link
       href="#contact"
       className="text-gray-700 hover:text-gray-900 transition-colors"
      >
       Contact
      </Link>
      {user ? (
       <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">{user.email}</span>
        <Button onClick={logout} variant="outline" size="sm">
         Logout
        </Button>
       </div>
      ) : (
       <Link href="/login">
        <Button variant="outline" size="sm">
         Login
        </Button>
       </Link>
      )}
     </div>
     <div className="md:hidden">
      {/* Mobile menu button - can be expanded later */}
      <button className="text-gray-700 hover:text-gray-900">
       <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
       >
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M4 6h16M4 12h16M4 18h16"
        />
       </svg>
      </button>
     </div>
    </div>
   </div>
  </nav>
 );
}
