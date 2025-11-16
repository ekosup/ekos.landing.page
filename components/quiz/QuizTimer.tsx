"use client";

interface QuizTimerProps {
 timeLeft: number | null;
}

export function QuizTimer({ timeLeft }: QuizTimerProps) {
 const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
 };

 if (timeLeft === null) return null;

 return (
  <span
   className={`text-sm font-medium ${
    timeLeft < 300 ? "text-red-600" : "text-gray-600"
   }`}
  >
   Time: {formatTime(timeLeft)}
  </span>
 );
}
