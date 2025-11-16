"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Option {
 id: string;
 option_text: string;
}

interface AnswerOptionsProps {
 options: Option[];
 selectedOptionIds?: string[];
 onOptionSelect: (optionId: string) => void;
 questionType?: string;
}

export function AnswerOptions({
 options,
 selectedOptionIds,
 onOptionSelect,
 questionType,
}: AnswerOptionsProps) {
 const isMultiSelect = questionType === "multi";
 const selectedIds = selectedOptionIds || [];

 if (isMultiSelect) {
  return (
   <div className="space-y-3">
    {options.map((option) => (
     <div key={option.id} className="flex items-center space-x-2">
      <Checkbox
       id={option.id}
       checked={selectedIds.includes(option.id)}
       onCheckedChange={() => onOptionSelect(option.id)}
      />
      <label
       htmlFor={option.id}
       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
       {option.option_text}
      </label>
     </div>
    ))}
   </div>
  );
 }

 // Single select (mcq) - use buttons
 return (
  <div className="space-y-2">
   {options.map((option) => (
    <Button
     key={option.id}
     variant={selectedIds.includes(option.id) ? "default" : "outline"}
     onClick={() => onOptionSelect(option.id)}
     className="w-full text-left justify-start"
    >
     {option.option_text}
    </Button>
   ))}
  </div>
 );
}
