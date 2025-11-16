"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Placeholder quiz data - replace with API call
const quizzes = [
 {
  id: "it-audit-1",
  title: "IT Audit Fundamentals",
  description: "Basic concepts of IT auditing and compliance",
  category: "IT Audit",
  questions: 20,
  timeLimit: 30,
 },
 {
  id: "cybersecurity-1",
  title: "Cybersecurity Basics",
  description: "Introduction to cybersecurity principles and practices",
  category: "Cybersecurity",
  questions: 25,
  timeLimit: 45,
 },
 {
  id: "it-audit-2",
  title: "Advanced IT Audit",
  description: "Advanced topics in IT auditing and risk assessment",
  category: "IT Audit",
  questions: 30,
  timeLimit: 60,
 },
 {
  id: "cybersecurity-2",
  title: "Network Security",
  description: "Network security concepts and best practices",
  category: "Cybersecurity",
  questions: 22,
  timeLimit: 40,
 },
];

export default function QuizzesPage() {
 const { user, isLoading } = useAuth();
 const router = useRouter();

 useEffect(() => {
  if (!isLoading && !user) {
   router.push("/login");
  }
 }, [user, isLoading, router]);

 if (isLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg">Loading...</div>
   </div>
  );
 }

 if (!user) {
  return null; // Will redirect
 }

 return (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
     <h1 className="text-4xl font-bold text-gray-900 mb-4">
      IT Audit & Cybersecurity Quizzes
     </h1>
     <p className="text-xl text-gray-600">
      Test your knowledge in IT audit and cybersecurity topics
     </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {quizzes.map((quiz) => (
      <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
       <CardHeader>
        <CardTitle className="text-xl">{quiz.title}</CardTitle>
        <CardDescription>{quiz.description}</CardDescription>
       </CardHeader>
       <CardContent>
        <div className="space-y-2 mb-4">
         <div className="flex justify-between text-sm">
          <span className="text-gray-600">Category:</span>
          <span className="font-medium">{quiz.category}</span>
         </div>
         <div className="flex justify-between text-sm">
          <span className="text-gray-600">Questions:</span>
          <span className="font-medium">{quiz.questions}</span>
         </div>
         <div className="flex justify-between text-sm">
          <span className="text-gray-600">Time Limit:</span>
          <span className="font-medium">{quiz.timeLimit} min</span>
         </div>
        </div>
        <Button asChild className="w-full">
         <Link href={`/quizzes/${quiz.id}`}>Start Quiz</Link>
        </Button>
       </CardContent>
      </Card>
     ))}
    </div>
   </div>
  </div>
 );
}
