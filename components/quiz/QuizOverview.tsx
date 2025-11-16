"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Quiz {
 id: string;
 title: string;
 description: string;
 category: string;
 difficulty: string;
 passing_score: number;
 time_limit: number | null;
}

interface QuizOverviewProps {
 quiz: Quiz;
 onStartQuiz: () => void;
 onBackToQuizzes: () => void;
}

export function QuizOverview({
 quiz,
 onStartQuiz,
 onBackToQuizzes,
}: QuizOverviewProps) {
 return (
  <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-2xl mx-auto">
    <Card>
     <CardHeader>
      <CardTitle className="text-3xl">{quiz.title}</CardTitle>
      <p className="text-gray-600 mt-2">{quiz.description}</p>
     </CardHeader>
     <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
       <div>
        <span className="font-medium">Category:</span> {quiz.category}
       </div>
       <div>
        <span className="font-medium">Difficulty:</span> {quiz.difficulty}
       </div>
       <div>
        <span className="font-medium">Passing Score:</span> {quiz.passing_score}
        %
       </div>
       {quiz.time_limit && (
        <div>
         <span className="font-medium">Time Limit:</span> {quiz.time_limit}{" "}
         minutes
        </div>
       )}
      </div>
      <div className="flex gap-4 pt-4">
       <Button onClick={onStartQuiz} className="flex-1">
        Start Quiz
       </Button>
       <Button variant="outline" onClick={onBackToQuizzes}>
        Back to Quizzes
       </Button>
      </div>
     </CardContent>
    </Card>
   </div>
  </div>
 );
}
