"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminQuizApi, QuizSession } from "@/lib/quiz-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export default function QuizSessionsPage() {
 const { id: quizId } = useParams();
 const router = useRouter();
 const queryClient = useQueryClient();
 const [offset, setOffset] = useState(0);
 const limit = 10;

 const {
  data: sessionsData,
  isLoading,
  error,
 } = useQuery({
  queryKey: ["admin", "quiz-sessions", quizId, offset],
  queryFn: () => adminQuizApi.getQuizSessions(quizId as string, offset, limit),
  enabled: !!quizId,
 });

 const deleteSessionMutation = useMutation({
  mutationFn: (sessionId: string) => adminQuizApi.deleteSession(sessionId),
  onSuccess: () => {
   queryClient.invalidateQueries({
    queryKey: ["admin", "quiz-sessions", quizId],
   });
  },
 });

 const sessions = sessionsData?.result?.sessions || [];
 const total = sessionsData?.result?.total || 0;

 const getStatusBadge = (status: string, score: number | null) => {
  switch (status) {
   case "completed":
    return (
     <Badge variant={score !== null && score >= 70 ? "default" : "destructive"}>
      <CheckCircle className="w-3 h-3 mr-1" />
      Completed ({score}%)
     </Badge>
    );
   case "ongoing":
    return (
     <Badge variant="secondary">
      <Clock className="w-3 h-3 mr-1" />
      Ongoing
     </Badge>
    );
   default:
    return <Badge variant="outline">{status}</Badge>;
  }
 };

 const formatDateTime = (dateString: string) => {
  try {
   return format(new Date(dateString), "MMM dd, yyyy HH:mm:ss");
  } catch {
   return dateString;
  }
 };

 if (isLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg">Loading sessions...</div>
   </div>
  );
 }

 if (error) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg text-red-600">Failed to load sessions</div>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-6xl mx-auto">
    <div className="mb-6">
     <Button
      variant="outline"
      onClick={() => router.push("/admin/quizzes")}
      className="mb-4"
     >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Quizzes
     </Button>
     <h1 className="text-3xl font-bold text-gray-900">Quiz Sessions</h1>
     <p className="text-gray-600 mt-2">Total sessions: {total}</p>
    </div>

    <div className="grid gap-4">
     {sessions.map((session: QuizSession) => (
      <Card key={session.id}>
       <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
         <div>
          <CardTitle className="text-lg">
           Session {session.id.slice(-8)}
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
           User: {session.user_id.slice(-8)}
          </p>
         </div>
         <div className="flex items-center gap-2">
          {getStatusBadge(session.status, session.score)}
          <Button
           variant="outline"
           size="sm"
           onClick={() => deleteSessionMutation.mutate(session.id)}
           disabled={deleteSessionMutation.isPending}
           className="text-red-600 hover:text-red-700"
          >
           <Trash2 className="w-4 h-4" />
          </Button>
         </div>
        </div>
       </CardHeader>
       <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
         <div>
          <span className="font-medium text-gray-700">Started:</span>
          <p className="text-gray-600">{formatDateTime(session.start_time)}</p>
         </div>
         <div>
          <span className="font-medium text-gray-700">Ended:</span>
          <p className="text-gray-600">
           {session.end_time
            ? formatDateTime(session.end_time)
            : "Not completed"}
          </p>
         </div>
         <div>
          <span className="font-medium text-gray-700">Duration:</span>
          <p className="text-gray-600">
           {session.end_time
            ? `${Math.round(
               (new Date(session.end_time).getTime() -
                new Date(session.start_time).getTime()) /
                60000
              )} minutes`
            : "Ongoing"}
          </p>
         </div>
        </div>
       </CardContent>
      </Card>
     ))}
    </div>

    {sessions.length === 0 && (
     <div className="text-center py-12">
      <p className="text-gray-500">No sessions found for this quiz.</p>
     </div>
    )}

    {/* Pagination */}
    {total > limit && (
     <div className="flex justify-center mt-8 gap-2">
      <Button
       variant="outline"
       onClick={() => setOffset(Math.max(0, offset - limit))}
       disabled={offset === 0}
      >
       Previous
      </Button>
      <span className="flex items-center px-4">
       Page {Math.floor(offset / limit) + 1} of {Math.ceil(total / limit)}
      </span>
      <Button
       variant="outline"
       onClick={() => setOffset(offset + limit)}
       disabled={offset + limit >= total}
      >
       Next
      </Button>
     </div>
    )}
   </div>
  </div>
 );
}
