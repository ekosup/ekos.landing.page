"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useQuery, useMutation } from "@tanstack/react-query";
import { quizApiClient, FinishQuizResponse } from "@/lib/quiz-api";
import { QuizSession, QuizResults } from "@/components/quiz";

export default function QuizSessionPage() {
 const { user, isLoading: authLoading } = useAuth();
 const router = useRouter();
 const params = useParams();
 const quizId = params.id as string;
 const sessionId = params.sessionId as string;

 const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
 const [answers, setAnswers] = useState<
  Record<number, { selected_option_ids?: string[]; answer_text?: string }>
 >({});
 const [showResults, setShowResults] = useState(false);
 const [results, setResults] = useState<FinishQuizResponse["result"] | null>(
  null
 );
 const [timeLeft, setTimeLeft] = useState<number | null>(null);

 // Fetch quiz details
 const {
  data: quizData,
  isLoading: quizLoading,
  error: quizError,
 } = useQuery({
  queryKey: ["quiz", quizId],
  queryFn: () => quizApiClient.getQuizDetails(quizId),
  enabled: !!quizId,
 });

 // Initialize timer when quiz data is loaded
 useEffect(() => {
  if (quizData?.result?.quiz?.time_limit && timeLeft === null) {
   setTimeLeft(quizData.result.quiz.time_limit * 60); // Convert minutes to seconds
  }
 }, [quizData, timeLeft]);

 // Fetch questions
 const { data: questionsData, isLoading: questionsLoading } = useQuery({
  queryKey: ["questions", sessionId],
  queryFn: () => quizApiClient.getSessionQuestions(sessionId),
  enabled: !!sessionId,
 });

 // Submit answer mutation
 const submitAnswerMutation = useMutation({
  mutationFn: ({
   questionIndex,
   answer,
  }: {
   questionIndex: number;
   answer: { selected_option_ids?: string[]; answer_text?: string };
  }) =>
   quizApiClient.submitAnswer(sessionId, {
    question_index: questionIndex,
    ...answer,
   }),
 });

 // Finish quiz mutation
 const finishQuizMutation = useMutation({
  mutationFn: () => quizApiClient.finishQuiz(sessionId),
  onSuccess: (data) => {
   setResults(data.result);
   setShowResults(true);
  },
 });

 useEffect(() => {
  if (!authLoading && !user) {
   router.push("/login");
  }
 }, [user, authLoading, router]);

 // Initialize timer when quiz data is loaded
 useEffect(() => {
  if (quizData?.result?.quiz?.time_limit && timeLeft === null) {
   setTimeLeft(quizData.result.quiz.time_limit * 60); // Convert minutes to seconds
  }
 }, [quizData, timeLeft]);

 // Timer effect
 useEffect(() => {
  if (timeLeft !== null && timeLeft > 0 && !showResults) {
   const timer = setTimeout(() => {
    setTimeLeft(timeLeft - 1);
   }, 1000);
   return () => clearTimeout(timer);
  } else if (timeLeft === 0 && !showResults) {
   // Time's up - finish quiz
   finishQuizMutation.mutate();
  }
 }, [timeLeft, showResults, finishQuizMutation]);

 const hasAnsweredCurrentQuestion = () => {
  return !!answers[currentQuestionIndex];
 };

 const handleAnswerSubmit = async () => {
  const answer = answers[currentQuestionIndex];
  if (!answer) {
   alert("Please select an answer before continuing.");
   return;
  }

  try {
   await submitAnswerMutation.mutateAsync({
    questionIndex: currentQuestionIndex,
    answer,
   });

   if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex((prev) => prev + 1);
   } else {
    // Finish quiz
    finishQuizMutation.mutate();
   }
  } catch (error) {
   console.error("Failed to submit answer:", error);
   alert("Failed to submit answer. Please try again.");
  }
 };

 // Keyboard navigation
 useEffect(() => {
  if (!questionsData?.result?.questions?.length) return;

  const questions = questionsData.result.questions;
  const handleKeyPress = (e: KeyboardEvent) => {
   if (showResults) return;

   if (e.key === "ArrowLeft" && currentQuestionIndex > 0) {
    setCurrentQuestionIndex((prev) => prev - 1);
   } else if (
    e.key === "ArrowRight" &&
    currentQuestionIndex < questions.length - 1 &&
    hasAnsweredCurrentQuestion()
   ) {
    handleAnswerSubmit();
   } else if (e.key === "Enter" && hasAnsweredCurrentQuestion()) {
    handleAnswerSubmit();
   }
  };

  window.addEventListener("keydown", handleKeyPress);
  return () => window.removeEventListener("keydown", handleKeyPress);
 }, [
  currentQuestionIndex,
  questionsData?.result?.questions?.length,
  showResults,
  answers,
  handleAnswerSubmit,
  hasAnsweredCurrentQuestion,
  questionsData?.result?.questions,
 ]);

 if (authLoading || quizLoading || questionsLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg">Loading...</div>
   </div>
  );
 }

 if (!user) {
  return null;
 }

 if (quizError) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg text-red-600">
     Failed to load quiz. Please try again.
    </div>
   </div>
  );
 }

 const quiz = quizData?.result?.quiz;

 if (!quiz) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg">Quiz not found</div>
   </div>
  );
 }

 if (showResults && results) {
  return (
   <QuizResults
    score={results.score}
    totalQuestions={results.total_questions}
    passed={results.passed}
    onBackToQuizzes={() => router.push("/quizzes")}
   />
  );
 }

 const questions = questionsData?.result?.questions || [];
 const currentQuestion = questions[currentQuestionIndex];

 if (!currentQuestion) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg">No questions available</div>
   </div>
  );
 }

 const handleOptionSelect = (optionId: string) => {
  const currentAnswer = answers[currentQuestionIndex];
  const currentSelectedIds = currentAnswer?.selected_option_ids || [];

  if (currentQuestion.type === "multi") {
   // Multi-select: toggle the option
   const isSelected = currentSelectedIds.includes(optionId);
   const newSelectedIds = isSelected
    ? currentSelectedIds.filter((id) => id !== optionId)
    : [...currentSelectedIds, optionId];

   setAnswers((prev) => ({
    ...prev,
    [currentQuestionIndex]: { selected_option_ids: newSelectedIds },
   }));
  } else {
   // Single-select: replace with just this option
   setAnswers((prev) => ({
    ...prev,
    [currentQuestionIndex]: { selected_option_ids: [optionId] },
   }));
  }
 };

 const handleTextAnswer = (text: string) => {
  setAnswers((prev) => ({
   ...prev,
   [currentQuestionIndex]: { answer_text: text },
  }));
 };

 return (
  <QuizSession
   questions={questions}
   currentQuestionIndex={currentQuestionIndex}
   answers={answers}
   timeLeft={timeLeft}
   isSubmitting={submitAnswerMutation.isPending}
   onPrevious={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
   onNext={handleAnswerSubmit}
   onOptionSelect={handleOptionSelect}
   onTextAnswer={handleTextAnswer}
   onExitQuiz={() => router.push("/quizzes")}
  />
 );
}
