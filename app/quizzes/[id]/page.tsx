"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useQuery, useMutation } from "@tanstack/react-query";
import { quizApiClient } from "@/lib/quiz-api";
import { QuizOverview } from "@/components/quiz";

export default function QuizDetailPage() {
 const { user, isLoading: authLoading } = useAuth();
 const router = useRouter();
 const params = useParams();
 const quizId = params.id as string;

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

 // Start quiz session
 const startSessionMutation = useMutation({
  mutationFn: () => quizApiClient.startQuizSession(quizId),
  onSuccess: (data) => {
   router.push(`/quizzes/${quizId}/session/${data.result.session_id}`);
  },
 });

 useEffect(() => {
  if (!authLoading && !user) {
   router.push("/login");
  }
 }, [user, authLoading, router]);

 if (authLoading || quizLoading) {
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

 return (
  <QuizOverview
   quiz={quiz}
   onStartQuiz={() => startSessionMutation.mutate()}
   onBackToQuizzes={() => router.push("/quizzes")}
  />
 );
}
