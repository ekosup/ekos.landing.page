"use client";

import { Button } from "@/components/ui/button";

interface Option {
 id: string;
 option_text: string;
}

interface AnswerOptionsProps {
 options: Option[];
 selectedOptionId?: string;
 onOptionSelect: (optionId: string) => void;
}

export function AnswerOptions({
 options,
 selectedOptionId,
 onOptionSelect,
}: AnswerOptionsProps) {
 return (
  <div className="space-y-2">
   {options.map((option) => (
    <Button
     key={option.id}
     variant={selectedOptionId === option.id ? "default" : "outline"}
     onClick={() => onOptionSelect(option.id)}
     className="w-full text-left justify-start"
    >
     {option.option_text}
    </Button>
   ))}
  </div>
 );
}
