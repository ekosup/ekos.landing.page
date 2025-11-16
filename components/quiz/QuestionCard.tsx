"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnswerOptions } from "./AnswerOptions";

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

interface QuestionCardProps {
 question: Question;
 selectedOptionId?: string;
 answerText?: string;
 onOptionSelect: (optionId: string) => void;
 onTextAnswer: (text: string) => void;
}

export function QuestionCard({
 question,
 selectedOptionId,
 answerText,
 onOptionSelect,
 onTextAnswer,
}: QuestionCardProps) {
 return (
  <Card>
   <CardHeader>
    <CardTitle>{question.question_text}</CardTitle>
   </CardHeader>
   <CardContent>
    {question.type === "mcq" && question.options && (
     <AnswerOptions
      options={question.options}
      selectedOptionId={selectedOptionId}
      onOptionSelect={onOptionSelect}
     />
    )}

    {question.type === "short" && (
     <Input
      type="text"
      placeholder="Enter your answer"
      value={answerText || ""}
      onChange={(e) => onTextAnswer(e.target.value)}
     />
    )}
   </CardContent>
  </Card>
 );
}
