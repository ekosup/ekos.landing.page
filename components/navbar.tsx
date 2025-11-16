"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
 const pathname = usePathname();
 const { user, logout, hasRole } = useAuth();

 // Don't show navbar on blogs pages
 if (pathname?.startsWith("/blogs")) {
  return null;
 }

 // Helper function to get user initials
 const getUserInitials = (email: string) => {
  return email.split("@")[0].substring(0, 2).toUpperCase();
 };

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
      {user ? (
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
         <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
           <AvatarImage src="" alt={user.email} />
           <AvatarFallback>{getUserInitials(user.email)}</AvatarFallback>
          </Avatar>
         </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
         <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
           <p className="text-sm font-medium leading-none">{user.email}</p>
           <p className="text-xs leading-none text-muted-foreground">
            {user.roles?.includes("admin") ? "Administrator" : "User"}
           </p>
          </div>
         </DropdownMenuLabel>
         <DropdownMenuSeparator />
         {(hasRole("admin") || hasRole("admin_quiz")) && (
          <>
           <DropdownMenuItem asChild>
            <Link href="/admin/quizzes">
             <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
             >
              <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth={2}
               d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
             </svg>
             Admin Panel
            </Link>
           </DropdownMenuItem>
           <DropdownMenuSeparator />
          </>
         )}
         <DropdownMenuItem onClick={logout}>
          <svg
           className="mr-2 h-4 w-4"
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24"
          >
           <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
           />
          </svg>
          Log out
         </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
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
