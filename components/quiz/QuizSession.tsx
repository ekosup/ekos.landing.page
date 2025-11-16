"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizTimer } from "./QuizTimer";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";

interface Option {
 id: string;
 option_text: string;
}

interface Question {
 id: string;
 question_text: string;
 type: string;
 options?: Option[];
}

interface QuizSessionProps {
 questions: Question[];
 currentQuestionIndex: number;
 answers: Record<
  number,
  { selected_option_ids?: string[]; answer_text?: string }
 >;
 timeLeft: number | null;
 isSubmitting: boolean;
 onPrevious: () => void;
 onNext: () => void;
 onOptionSelect: (optionId: string) => void;
 onTextAnswer: (text: string) => void;
 onExitQuiz: () => void;
}

export function QuizSession({
 questions,
 currentQuestionIndex,
 answers,
 timeLeft,
 isSubmitting,
 onPrevious,
 onNext,
 onOptionSelect,
 onTextAnswer,
 onExitQuiz,
}: QuizSessionProps) {
 const currentQuestion = questions[currentQuestionIndex];
 const currentAnswer = answers[currentQuestionIndex];

 return (
  <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-2xl mx-auto">
    <div className="mb-6">
     <div className="flex justify-between items-center mb-4">
      <span className="text-sm text-gray-600">
       Question {currentQuestionIndex + 1} of {questions.length}
      </span>
      <div className="flex items-center gap-4">
       <QuizTimer timeLeft={timeLeft} />
       <Button variant="outline" onClick={onExitQuiz}>
        Exit Quiz
       </Button>
      </div>
     </div>
     <ProgressBar current={currentQuestionIndex} total={questions.length} />
    </div>

    <QuestionCard
     question={currentQuestion}
     selectedOptionIds={currentAnswer?.selected_option_ids}
     answerText={currentAnswer?.answer_text}
     onOptionSelect={onOptionSelect}
     onTextAnswer={onTextAnswer}
    />

    <div className="flex justify-between mt-6">
     <Button
      variant="outline"
      onClick={onPrevious}
      disabled={currentQuestionIndex === 0}
     >
      Previous
     </Button>
     <Button onClick={onNext} disabled={!currentAnswer || isSubmitting}>
      {isSubmitting
       ? "Submitting..."
       : currentQuestionIndex < questions.length - 1
       ? "Next"
       : "Finish Quiz"}
     </Button>
    </div>
   </div>
  </div>
 );
}
