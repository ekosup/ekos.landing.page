"use client";

interface ProgressBarProps {
 current: number;
 total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
 const progress = ((current + 1) / total) * 100;

 return (
  <div className="w-full bg-gray-200 rounded-full h-2">
   <div
    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
    style={{ width: `${progress}%` }}
   ></div>
  </div>
 );
}
