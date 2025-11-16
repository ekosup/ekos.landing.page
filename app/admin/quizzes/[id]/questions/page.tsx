"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { adminQuizApi, Question } from "@/lib/quiz-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
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

interface QuestionFormData {
 type: string;
 question_text: string;
 explanation: string;
 order_index: number;
 options: Array<{
  option_text: string;
  is_correct: boolean;
 }>;
}

export default function AdminQuizQuestionsPage() {
 const router = useRouter();
 const params = useParams();
 const quizId = params.id as string;
 const { user, isLoading: authLoading, hasRole } = useAuth();
 const [showCreateForm, setShowCreateForm] = useState(false);
 const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
 const [deleteQuestionId, setDeleteQuestionId] = useState<string | null>(null);
 const [showDeleteDialog, setShowDeleteDialog] = useState(false);
 const [formData, setFormData] = useState<QuestionFormData>({
  type: "mcq",
  question_text: "",
  explanation: "",
  order_index: 1,
  options: [
   { option_text: "", is_correct: false },
   { option_text: "", is_correct: false },
   { option_text: "", is_correct: false },
   { option_text: "", is_correct: false },
  ],
 });
 const queryClient = useQueryClient();

 const hasAdminAccess = hasRole("admin") || hasRole("admin_quiz");

 useEffect(() => {
  if (!authLoading && (!user || !hasAdminAccess)) {
   router.push("/");
  }
 }, [user, authLoading, hasAdminAccess, router]);

 // Fetch questions
 const {
  data: questionsData,
  isLoading: questionsLoading,
  error: questionsError,
 } = useQuery({
  queryKey: ["admin-quiz-questions", quizId],
  queryFn: () => adminQuizApi.getQuestions(quizId),
  enabled: !!quizId && !!user && hasAdminAccess,
 });

 const questions = questionsData?.result?.questions || [];

 // Add question mutation
 const addQuestionMutation = useMutation({
  mutationFn: (data: QuestionFormData) =>
   adminQuizApi.addQuestion(quizId, data),
  onSuccess: () => {
   queryClient.invalidateQueries({
    queryKey: ["admin-quiz-questions", quizId],
   });
   toast.success("Question added successfully");
   setShowCreateForm(false);
   resetForm();
  },
  onError: (error: any) => {
   toast.error(error.response?.data?.message || "Failed to add question");
  },
 });

 // Update question mutation
 const updateQuestionMutation = useMutation({
  mutationFn: ({
   questionId,
   data,
  }: {
   questionId: string;
   data: Partial<QuestionFormData>;
  }) => adminQuizApi.updateQuestion(quizId, questionId, data),
  onSuccess: () => {
   queryClient.invalidateQueries({
    queryKey: ["admin-quiz-questions", quizId],
   });
   toast.success("Question updated successfully");
   setEditingQuestion(null);
   resetForm();
  },
  onError: (error: any) => {
   toast.error(error.response?.data?.message || "Failed to update question");
  },
 });

 // Delete question mutation
 const deleteQuestionMutation = useMutation({
  mutationFn: (questionId: string) =>
   adminQuizApi.deleteQuestion(quizId, questionId),
  onSuccess: () => {
   queryClient.invalidateQueries({
    queryKey: ["admin-quiz-questions", quizId],
   });
   toast.success("Question deleted successfully");
   setShowDeleteDialog(false);
   setDeleteQuestionId(null);
  },
  onError: (error: any) => {
   toast.error(error.response?.data?.message || "Failed to delete question");
  },
 });

 const resetForm = () => {
  setFormData({
   type: "mcq",
   question_text: "",
   explanation: "",
   order_index: Math.max(1, questions.length + 1),
   options: [
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
   ],
  });
 };

 const handleCreate = () => {
  resetForm();
  setFormData((prev) => ({
   ...prev,
   order_index: Math.max(1, questions.length + 1),
  }));
  setShowCreateForm(true);
 };

 const handleEdit = (question: Question) => {
  setEditingQuestion(question);
  const options =
   question.options?.map((opt) => ({
    option_text: opt.option_text,
    is_correct: opt.is_correct === 1,
   })) || [];

  // For bool, ensure we have exactly 2 options
  if (question.type === "bool") {
   if (options.length !== 2) {
    options.length = 0;
    options.push({ option_text: "True", is_correct: false });
    options.push({ option_text: "False", is_correct: false });
   }
   // Set the correct answer
   const correctOption = question.options?.find((opt) => opt.is_correct === 1);
   if (correctOption) {
    if (correctOption.option_text.toLowerCase() === "true") {
     options[0].is_correct = true;
     options[1].is_correct = false;
    } else {
     options[0].is_correct = false;
     options[1].is_correct = true;
    }
   }
  }

  setFormData({
   type: question.type,
   question_text: question.question_text || "",
   explanation: question.explanation || "",
   order_index: question.order_index,
   options:
    options.length > 0
     ? options
     : [
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false },
       ],
  });
 };

 const handleDelete = (questionId: string) => {
  setDeleteQuestionId(questionId);
  setShowDeleteDialog(true);
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Ensure no null values are sent to the API
  const cleanData = {
   ...formData,
   question_text: formData.question_text || "",
   explanation: formData.explanation || "",
  };

  if (editingQuestion) {
   updateQuestionMutation.mutate({
    questionId: editingQuestion.id,
    data: cleanData,
   });
  } else {
   addQuestionMutation.mutate(cleanData);
  }
 };

 const addOption = () => {
  setFormData((prev) => ({
   ...prev,
   options: [...prev.options, { option_text: "", is_correct: false }],
  }));
 };

 const removeOption = (index: number) => {
  setFormData((prev) => ({
   ...prev,
   options: prev.options.filter((_, i) => i !== index),
  }));
 };

 const confirmDelete = () => {
  if (deleteQuestionId) {
   deleteQuestionMutation.mutate(deleteQuestionId);
  }
 };

 const updateOption = (
  index: number,
  field: string,
  value: string | boolean
 ) => {
  setFormData((prev) => ({
   ...prev,
   options: prev.options.map((opt, i) =>
    i === index ? { ...opt, [field]: value } : opt
   ),
  }));
 };

 const getQuestionTypeDisplay = (type: string) => {
  switch (type) {
   case "mcq":
    return "Multiple Choice";
   case "multi":
    return "Multiple Answer";
   case "bool":
    return "True/False";
   case "short":
    return "Short Answer";
   default:
    return type.replace("_", " ").toUpperCase();
  }
 };

 if (authLoading || questionsLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
     <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
     <p className="mt-4 text-gray-600">Loading...</p>
    </div>
   </div>
  );
 }

 if (questionsError) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
     <p className="text-red-600 mb-4">Error loading questions</p>
     <Button onClick={() => router.back()}>Go Back</Button>
    </div>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mb-8">
     <div className="flex items-center gap-4 mb-4">
      <Link href="/admin/quizzes">
       <Button variant="outline" size="sm">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Quizzes
       </Button>
      </Link>
      <Link href={`/admin/quizzes/${quizId}/sessions`}>
       <Button variant="outline" size="sm">
        View Sessions
       </Button>
      </Link>
      <div>
       <h1 className="text-3xl font-bold text-gray-900">Quiz Questions</h1>
       <p className="text-gray-600">Manage questions for this quiz</p>
      </div>
     </div>

     <div className="flex justify-between items-center">
      <div className="text-sm text-gray-600">
       Total Questions: {questions.length}
      </div>
      <Button onClick={handleCreate}>
       <Plus className="w-4 h-4 mr-2" />
       Add Question
      </Button>
     </div>
    </div>

    {/* Questions List */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
     {questions.map((question) => (
      <Card key={question.id} className="relative">
       <CardHeader>
        <div className="flex justify-between items-start">
         <Badge variant="secondary">#{question.order_index}</Badge>
         <div className="flex gap-2">
          <Button
           size="sm"
           variant="outline"
           onClick={() => handleEdit(question)}
          >
           <Edit className="w-4 h-4" />
          </Button>
          <Button
           size="sm"
           variant="destructive"
           onClick={() => handleDelete(question.id)}
          >
           <Trash2 className="w-4 h-4" />
          </Button>
         </div>
        </div>
        <CardTitle className="text-lg">{question.question_text}</CardTitle>
       </CardHeader>
       <CardContent>
        <div className="space-y-2">
         <p className="text-sm text-gray-600">
          <strong>Type:</strong> {getQuestionTypeDisplay(question.type)}
         </p>
         {question.options &&
          question.options.length > 0 &&
          question.type !== "short" && (
           <div>
            <p className="text-sm font-medium mb-1">Options:</p>
            <ul className="text-sm space-y-1">
             {question.options.map((option, index) => (
              <li
               key={option.id}
               className={`flex items-center gap-2 ${
                option.is_correct === 1 ? "font-semibold text-green-600" : ""
               }`}
              >
               <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                {String.fromCharCode(65 + index)}
               </span>
               {option.option_text}
               {option.is_correct === 1 && (
                <Badge variant="default">Correct</Badge>
               )}
              </li>
             ))}
            </ul>
           </div>
          )}
         {question.explanation && (
          <p className="text-sm text-gray-600">
           <strong>Explanation:</strong> {question.explanation}
          </p>
         )}
        </div>
       </CardContent>
      </Card>
     ))}
    </div>

    {questions.length === 0 && (
     <div className="text-center py-12">
      <p className="text-gray-500 mb-4">No questions found for this quiz.</p>
      <Button onClick={handleCreate}>
       <Plus className="w-4 h-4 mr-2" />
       Add First Question
      </Button>
     </div>
    )}

    {/* Create/Edit Question Dialog */}
    <Dialog
     open={showCreateForm || !!editingQuestion}
     onOpenChange={(open) => {
      if (!open) {
       setShowCreateForm(false);
       setEditingQuestion(null);
       resetForm();
      }
     }}
    >
     <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
       <DialogTitle>
        {editingQuestion ? "Edit Question" : "Add New Question"}
       </DialogTitle>
       <DialogDescription>
        {editingQuestion
         ? "Update the question details below."
         : "Create a new question for this quiz."}
       </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
       <div className="grid grid-cols-2 gap-4">
        <div>
         <Label htmlFor="type">Question Type</Label>
         <Select
          value={formData.type}
          onValueChange={(value) => {
           setFormData((prev) => {
            let newOptions = prev.options;
            if (value === "bool") {
             newOptions = [
              { option_text: "True", is_correct: false },
              { option_text: "False", is_correct: false },
             ];
            } else if (
             (value === "mcq" || value === "multi") &&
             newOptions.length < 2
            ) {
             newOptions = [
              { option_text: "", is_correct: false },
              { option_text: "", is_correct: false },
              { option_text: "", is_correct: false },
              { option_text: "", is_correct: false },
             ];
            }
            return { ...prev, type: value, options: newOptions };
           });
          }}
         >
          <SelectTrigger>
           <SelectValue />
          </SelectTrigger>
          <SelectContent>
           <SelectItem value="mcq">Multiple Choice</SelectItem>
           <SelectItem value="multi">Multiple Answer</SelectItem>
           <SelectItem value="bool">True/False</SelectItem>
           <SelectItem value="short">Short Answer</SelectItem>
          </SelectContent>
         </Select>
        </div>
        <div>
         <Label htmlFor="order_index">Order Index</Label>
         <Input
          id="order_index"
          type="number"
          value={formData.order_index}
          onChange={(e) =>
           setFormData((prev) => ({
            ...prev,
            order_index: parseInt(e.target.value) || 1,
           }))
          }
          min="1"
         />
        </div>
       </div>

       <div>
        <Label htmlFor="question_text">Question Text</Label>
        <Textarea
         id="question_text"
         value={formData.question_text || ""}
         onChange={(e) =>
          setFormData((prev) => ({ ...prev, question_text: e.target.value }))
         }
         placeholder="Enter the question text..."
         rows={3}
         required
        />
       </div>

       {(formData.type === "mcq" ||
        formData.type === "multi" ||
        formData.type === "bool") && (
        <div>
         <div className="flex justify-between items-center mb-2">
          <Label>Options</Label>
          {formData.type === "mcq" || formData.type === "multi" ? (
           <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addOption}
           >
            Add Option
           </Button>
          ) : null}
         </div>
         <div className="space-y-2">
          {formData.options.map((option, index) => (
           <div key={index} className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
             {String.fromCharCode(65 + index)}
            </span>
            <Input
             value={option.option_text}
             onChange={(e) =>
              updateOption(index, "option_text", e.target.value)
             }
             placeholder={`Option ${String.fromCharCode(65 + index)}`}
             className="flex-1"
             disabled={formData.type === "bool"}
            />
            <input
             type={formData.type === "multi" ? "checkbox" : "radio"}
             name="correct_option"
             checked={option.is_correct}
             onChange={() => {
              if (formData.type === "multi") {
               // For multi, toggle the current option
               setFormData((prev) => ({
                ...prev,
                options: prev.options.map((opt, i) =>
                 i === index ? { ...opt, is_correct: !opt.is_correct } : opt
                ),
               }));
              } else {
               // For mcq and bool, single selection
               setFormData((prev) => ({
                ...prev,
                options: prev.options.map((opt, i) => ({
                 ...opt,
                 is_correct: i === index,
                })),
               }));
              }
             }}
             className="w-4 h-4"
            />
            <Label className="text-sm">Correct</Label>
            {(formData.type === "mcq" || formData.type === "multi") &&
             formData.options.length > 2 && (
              <Button
               type="button"
               variant="outline"
               size="sm"
               onClick={() => removeOption(index)}
              >
               Remove
              </Button>
             )}
           </div>
          ))}
         </div>
        </div>
       )}

       <div>
        <Label htmlFor="explanation">Explanation (Optional)</Label>
        <Textarea
         id="explanation"
         value={formData.explanation || ""}
         onChange={(e) =>
          setFormData((prev) => ({ ...prev, explanation: e.target.value }))
         }
         placeholder="Explain the correct answer..."
         rows={2}
        />
       </div>

       <DialogFooter>
        <Button
         type="button"
         variant="outline"
         onClick={() => {
          setShowCreateForm(false);
          setEditingQuestion(null);
          resetForm();
         }}
        >
         Cancel
        </Button>
        <Button
         type="submit"
         disabled={
          addQuestionMutation.isPending || updateQuestionMutation.isPending
         }
        >
         {addQuestionMutation.isPending || updateQuestionMutation.isPending
          ? "Saving..."
          : editingQuestion
          ? "Update Question"
          : "Add Question"}
        </Button>
       </DialogFooter>
      </form>
     </DialogContent>
    </Dialog>

    {/* Delete Confirmation Dialog */}
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
     <DialogContent>
      <DialogHeader>
       <DialogTitle>Delete Question</DialogTitle>
       <DialogDescription>
        Are you sure you want to delete this question? This action cannot be
        undone. All associated data will be permanently removed.
       </DialogDescription>
      </DialogHeader>
      <DialogFooter>
       <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
        Cancel
       </Button>
       <Button
        variant="destructive"
        onClick={confirmDelete}
        disabled={deleteQuestionMutation.isPending}
       >
        {deleteQuestionMutation.isPending ? "Deleting..." : "Delete Question"}
       </Button>
      </DialogFooter>
     </DialogContent>
    </Dialog>
   </div>
  </div>
 );
}
