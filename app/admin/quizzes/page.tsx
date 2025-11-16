"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { adminQuizApi, Quiz } from "@/lib/quiz-api";
import { Button } from "@/components/ui/button";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, BarChart3 } from "lucide-react";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";

interface AdminQuiz extends Quiz {
 updated_at: string;
}

export default function AdminQuizzesPage() {
 const { user, isLoading, hasRole } = useAuth();
 const router = useRouter();
 const [showCreateForm, setShowCreateForm] = useState(false);
 const [editingQuiz, setEditingQuiz] = useState<AdminQuiz | null>(null);
 const [deleteQuizId, setDeleteQuizId] = useState<string | null>(null);
 const [showDeleteDialog, setShowDeleteDialog] = useState(false);
 const [formData, setFormData] = useState({
  title: "",
  description: "",
  category: "",
  difficulty: "easy",
  time_limit: "",
  passing_score: "70",
 });
 const queryClient = useQueryClient();

 const hasAdminAccess = hasRole("admin") || hasRole("admin_quiz");

 useEffect(() => {
  if (!isLoading && (!user || !hasAdminAccess)) {
   router.push("/");
  }
 }, [user, isLoading, hasAdminAccess, router]);

 // Fetch quizzes
 const {
  data,
  isLoading: quizzesLoading,
  error,
 } = useQuery({
  queryKey: ["admin-quizzes"],
  queryFn: async () => {
   const response = await adminQuizApi.getQuizzes();
   return response.result.quizzes;
  },
  enabled: !!user && hasAdminAccess,
 }); // Create quiz mutation
 const createQuizMutation = useMutation({
  mutationFn: (data: typeof formData) =>
   adminQuizApi.createQuiz({
    ...data,
    time_limit: data.time_limit ? parseInt(data.time_limit) : undefined,
    passing_score: parseInt(data.passing_score),
   }),
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] });
   toast.success("Quiz created successfully");
   resetForm();
   setShowCreateForm(false);
  },
  onError: (error: unknown) => {
   const err = error as { response?: { data?: { message?: string } } };
   toast.error(err.response?.data?.message || "Failed to create quiz");
  },
 });

 // Update quiz mutation
 const updateQuizMutation = useMutation({
  mutationFn: ({
   quizId,
   data,
  }: {
   quizId: string;
   data: Partial<typeof formData>;
  }) =>
   adminQuizApi.updateQuiz(quizId, {
    ...data,
    time_limit: data.time_limit ? parseInt(data.time_limit) : undefined,
    passing_score: data.passing_score
     ? parseInt(data.passing_score)
     : undefined,
   }),
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] });
   toast.success("Quiz updated successfully");
   resetForm();
   setEditingQuiz(null);
  },
  onError: (error: unknown) => {
   const err = error as { response?: { data?: { message?: string } } };
   toast.error(err.response?.data?.message || "Failed to update quiz");
  },
 });

 // Delete quiz mutation
 const deleteQuizMutation = useMutation({
  mutationFn: (quizId: string) => adminQuizApi.deleteQuiz(quizId),
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] });
   toast.success("Quiz deleted successfully");
   setShowDeleteDialog(false);
   setDeleteQuizId(null);
  },
  onError: (error: unknown) => {
   const err = error as { response?: { data?: { message?: string } } };
   toast.error(err.response?.data?.message || "Failed to delete quiz");
  },
 });
 const resetForm = () => {
  setFormData({
   title: "",
   description: "",
   category: "",
   difficulty: "easy",
   time_limit: "",
   passing_score: "70",
  });
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (editingQuiz) {
   updateQuizMutation.mutate({ quizId: editingQuiz.id, data: formData });
  } else {
   createQuizMutation.mutate(formData);
  }
 };

 const handleEdit = (quiz: Quiz) => {
  setEditingQuiz(quiz as AdminQuiz);
  setFormData({
   title: quiz.title,
   description: quiz.description,
   category: quiz.category,
   difficulty: quiz.difficulty,
   time_limit: quiz.time_limit?.toString() || "",
   passing_score: quiz.passing_score.toString(),
  });
  setShowCreateForm(true);
 };

 const handleDelete = (quizId: string) => {
  setDeleteQuizId(quizId);
  setShowDeleteDialog(true);
 };

 const confirmDelete = () => {
  if (deleteQuizId) {
   deleteQuizMutation.mutate(deleteQuizId);
  }
 };

 const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
   case "easy":
    return "bg-green-100 text-green-800";
   case "medium":
    return "bg-yellow-100 text-yellow-800";
   case "hard":
    return "bg-red-100 text-red-800";
   default:
    return "bg-gray-100 text-gray-800";
  }
 };

 if (isLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg">Loading...</div>
   </div>
  );
 }

 if (!user || !hasAdminAccess) {
  return null; // Will redirect
 }

 if (quizzesLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg">Loading quizzes...</div>
   </div>
  );
 }

 if (error) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-lg text-red-600">
     Failed to load quizzes. Please try again.
    </div>
   </div>
  );
 }

 const quizzes = data || [];

 return (
  <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-8">
     <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Management</h1>
      <p className="text-xl text-gray-600">Create and manage quizzes</p>
     </div>
     <Button onClick={() => setShowCreateForm(!showCreateForm)}>
      <Plus className="w-4 h-4 mr-2" />
      {showCreateForm ? "Cancel" : "Create Quiz"}
     </Button>
    </div>

    {showCreateForm && (
     <Card className="mb-8">
      <CardHeader>
       <CardTitle>{editingQuiz ? "Edit Quiz" : "Create New Quiz"}</CardTitle>
       <CardDescription>
        {editingQuiz
         ? "Update the quiz details below"
         : "Fill in the details to create a new quiz"}
       </CardDescription>
      </CardHeader>
      <CardContent>
       <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
           id="title"
           value={formData.title}
           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
           required
          />
         </div>
         <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
           value={formData.category}
           onValueChange={(value) =>
            setFormData({ ...formData, category: value })
           }
          >
           <SelectTrigger>
            <SelectValue placeholder="Select category" />
           </SelectTrigger>
           <SelectContent>
            <SelectItem value="it-audit">IT Audit</SelectItem>
            <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
            <SelectItem value="compliance">Compliance</SelectItem>
            <SelectItem value="risk-management">Risk Management</SelectItem>
           </SelectContent>
          </Select>
         </div>
        </div>

        <div className="space-y-2">
         <Label htmlFor="description">Description</Label>
         <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
           setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          required
         />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
           value={formData.difficulty}
           onValueChange={(value) =>
            setFormData({ ...formData, difficulty: value })
           }
          >
           <SelectTrigger>
            <SelectValue />
           </SelectTrigger>
           <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
           </SelectContent>
          </Select>
         </div>
         <div className="space-y-2">
          <Label htmlFor="time_limit">Time Limit (minutes)</Label>
          <Input
           id="time_limit"
           type="number"
           value={formData.time_limit}
           onChange={(e) =>
            setFormData({ ...formData, time_limit: e.target.value })
           }
           placeholder="Optional"
          />
         </div>
         <div className="space-y-2">
          <Label htmlFor="passing_score">Passing Score (%)</Label>
          <Input
           id="passing_score"
           type="number"
           min="0"
           max="100"
           value={formData.passing_score}
           onChange={(e) =>
            setFormData({ ...formData, passing_score: e.target.value })
           }
           required
          />
         </div>
        </div>

        <div className="flex gap-2">
         <Button
          type="submit"
          disabled={
           createQuizMutation.isPending || updateQuizMutation.isPending
          }
         >
          {createQuizMutation.isPending || updateQuizMutation.isPending
           ? "Saving..."
           : editingQuiz
           ? "Update Quiz"
           : "Create Quiz"}
         </Button>
         <Button
          type="button"
          variant="outline"
          onClick={() => {
           setShowCreateForm(false);
           setEditingQuiz(null);
           resetForm();
          }}
         >
          Cancel
         </Button>
        </div>
       </form>
      </CardContent>
     </Card>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {quizzes.map((quiz) => (
      <Card
       key={quiz.id}
       className="hover:shadow-lg transition-shadow flex flex-col h-full"
      >
       <CardHeader className="shrink-0">
        <div className="flex justify-between items-start">
         <div className="flex-1">
          <CardTitle className="text-lg">{quiz.title}</CardTitle>
          <CardDescription className="mt-1">{quiz.description}</CardDescription>
         </div>
         <Badge className={getDifficultyColor(quiz.difficulty)}>
          {quiz.difficulty}
         </Badge>
        </div>
       </CardHeader>
       <CardContent className="mt-auto">
        <div className="space-y-2 text-sm text-gray-600">
         <div>
          Category: <span className="font-medium">{quiz.category}</span>
         </div>
         <div>
          Passing Score:{" "}
          <span className="font-medium">{quiz.passing_score}%</span>
         </div>
         {quiz.time_limit && (
          <div>
           Time Limit:{" "}
           <span className="font-medium">{quiz.time_limit} min</span>
          </div>
         )}
         <div>
          Created:{" "}
          <span className="font-medium">
           {new Date(quiz.created_at).toLocaleDateString()}
          </span>
         </div>
        </div>
        <div className="flex gap-2 mt-2">
         <Button size="sm" variant="outline" onClick={() => handleEdit(quiz)}>
          <Edit className="w-4 h-4" />
         </Button>
         <Button size="sm" variant="outline" asChild>
          <Link href={`/admin/quizzes/${quiz.id}/questions`}>Questions</Link>
         </Button>
         <Button
          size="sm"
          variant="outline"
          onClick={() => {
           /* TODO: Show stats */
          }}
         >
          <BarChart3 className="w-4 h-4" />
         </Button>
         <Button
          size="sm"
          variant="destructive"
          onClick={() => handleDelete(quiz.id)}
         >
          <Trash2 className="w-4 h-4" />
         </Button>
        </div>
       </CardContent>
      </Card>
     ))}
    </div>

    {quizzes.length === 0 && (
     <div className="text-center py-12">
      <p className="text-gray-600 mb-4">No quizzes found.</p>
      <Button onClick={() => setShowCreateForm(true)}>
       Create Your First Quiz
      </Button>
     </div>
    )}

    {/* Delete Confirmation Dialog */}
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
     <DialogContent>
      <DialogHeader>
       <DialogTitle>Delete Quiz</DialogTitle>
       <DialogDescription>
        Are you sure you want to delete this quiz? This action cannot be undone.
        All questions and associated data will be permanently removed.
       </DialogDescription>
      </DialogHeader>
      <DialogFooter>
       <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
        Cancel
       </Button>
       <Button
        variant="destructive"
        onClick={confirmDelete}
        disabled={deleteQuizMutation.isPending}
       >
        {deleteQuizMutation.isPending ? "Deleting..." : "Delete Quiz"}
       </Button>
      </DialogFooter>
     </DialogContent>
    </Dialog>
   </div>
  </div>
 );
}
