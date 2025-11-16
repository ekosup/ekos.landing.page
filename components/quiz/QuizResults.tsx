"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizResultsProps {
 score: number;
 totalQuestions: number;
 passed: boolean;
 onBackToQuizzes: () => void;
}

export function QuizResults({
 score,
 totalQuestions,
 passed,
 onBackToQuizzes,
}: QuizResultsProps) {
 const percentage = ((score / totalQuestions) * 100).toFixed(1);

 return (
  <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-2xl mx-auto">
    <Card>
     <CardHeader>
      <CardTitle className="text-2xl text-center">Quiz Results</CardTitle>
     </CardHeader>
     <CardContent className="space-y-4">
      <div className="text-center">
       <p className="text-4xl font-bold">
        {score}/{totalQuestions}
       </p>
       <p className="text-xl">{percentage}%</p>
       <p
        className={`text-lg font-semibold ${
         passed ? "text-green-600" : "text-red-600"
        }`}
       >
        {passed ? "Passed" : "Failed"}
       </p>
      </div>
      <Button onClick={onBackToQuizzes} className="w-full">
       Back to Quizzes
      </Button>
     </CardContent>
    </Card>
   </div>
  </div>
 );
}
