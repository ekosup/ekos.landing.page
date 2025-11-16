"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useQuery } from "@tanstack/react-query";
import { quizApiClient, Quiz } from "@/lib/quiz-api";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function QuizzesPage() {
 const { user, isLoading } = useAuth();
 const router = useRouter();

 const {
  data,
  isLoading: quizzesLoading,
  error,
 } = useQuery({
  queryKey: ["quizzes"],
  queryFn: () => quizApiClient.getQuizzes(),
  enabled: !!user, // Only fetch if user is authenticated
 });

 useEffect(() => {
  if (!isLoading && !user) {
   router.push("/login");
  }
 }, [user, isLoading, router]);

 if (isLoading || quizzesLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg">Loading...</div>
   </div>
  );
 }

 if (!user) {
  return null; // Will redirect
 }

 if (error) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg text-red-600">
     Failed to load quizzes. Please try again.
    </div>
   </div>
  );
 }

 const quizzes = data?.result?.quizzes || [];

 return (
  <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
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
     {quizzes.map((quiz: Quiz) => (
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
          <span className="text-gray-600">Difficulty:</span>
          <span className="font-medium">{quiz.difficulty}</span>
         </div>
         <div className="flex justify-between text-sm">
          <span className="text-gray-600">Passing Score:</span>
          <span className="font-medium">{quiz.passing_score}%</span>
         </div>
         {quiz.time_limit && (
          <div className="flex justify-between text-sm">
           <span className="text-gray-600">Time Limit:</span>
           <span className="font-medium">{quiz.time_limit} min</span>
          </div>
         )}
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
