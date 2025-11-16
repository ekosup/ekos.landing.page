import { ApiClient } from './api-client';

const QUIZ_API_BASE_URL = 'https://quiz-prod.ekos.my.id/api/v1';

const quizApi = ApiClient.getInstance().getQuizApi();

export interface Quiz {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    time_limit: number | null;
    passing_score: number;
    created_at: string;
}

export interface QuizListResponse {
    success: boolean;
    result: {
        quizzes: Quiz[];
    };
}

export interface QuizDetailResponse {
    success: boolean;
    result: {
        quiz: Quiz;
    };
}

export interface StartSessionResponse {
    success: boolean;
    result: {
        session_id: string;
    };
}

export interface Question {
    id: string;
    quiz_id: string;
    type: string;
    question_text: string;
    explanation: string;
    order_index: number;
    options?: Array<{
        id: string;
        question_id: string;
        option_text: string;
        is_correct: number;
    }>;
}

export interface QuestionsResponse {
    success: boolean;
    result: {
        questions: Question[];
    };
}

export interface SubmitAnswerRequest {
    question_index: number;
    selected_option_ids?: string[];
    answer_text?: string;
}

export interface SubmitAnswerResponse {
    success: boolean;
    result: {
        is_correct: boolean;
    };
}

export interface FinishQuizResponse {
    success: boolean;
    result: {
        score: number;
        total_questions: number;
        passed: boolean;
    };
}

export interface QuizResultResponse {
    success: boolean;
    result: {
        score: number;
        total_questions: number;
        passed: boolean;
        detailed_breakdown: Array<{
            question_id: string;
            is_correct: boolean;
        }>;
    };
}

// API functions
export const quizApiClient = {
    getQuizzes: async (page: number = 0, category?: string, difficulty?: string): Promise<QuizListResponse> => {
        const params = new URLSearchParams({ page: page.toString() });
        if (category) params.append('category', category);
        if (difficulty) params.append('difficulty', difficulty);
        const response = await quizApi.get(`/quizzes?${params.toString()}`);
        return response.data;
    },

    getQuizDetails: async (quizId: string): Promise<QuizDetailResponse> => {
        const response = await quizApi.get(`/quizzes/${quizId}`);
        return response.data;
    },

    startQuizSession: async (quizId: string): Promise<StartSessionResponse> => {
        const response = await quizApi.post(`/quizzes/${quizId}/start`);
        return response.data;
    },

    getSessionQuestions: async (sessionId: string): Promise<QuestionsResponse> => {
        const response = await quizApi.get(`/session/${sessionId}/questions`);
        return response.data;
    },

    submitAnswer: async (sessionId: string, answer: SubmitAnswerRequest): Promise<SubmitAnswerResponse> => {
        const response = await quizApi.post(`/session/${sessionId}/answer`, answer);
        return response.data;
    },

    finishQuiz: async (sessionId: string): Promise<FinishQuizResponse> => {
        const response = await quizApi.post(`/session/${sessionId}/finish`);
        return response.data;
    },

    getQuizResults: async (sessionId: string): Promise<QuizResultResponse> => {
        const response = await quizApi.get(`/session/${sessionId}/result`);
        return response.data;
    },
};

// Admin API functions
export const adminQuizApi = {
    // Quiz CRUD operations
    createQuiz: async (quizData: {
        title: string;
        description: string;
        category: string;
        difficulty: string;
        time_limit?: number;
        passing_score: number;
    }): Promise<{ success: boolean; result: { quiz: { id: string } } }> => {
        const response = await quizApi.post('/admin/quizzes', quizData);
        return response.data;
    },

    getQuizzes: async (): Promise<{ success: boolean; result: { quizzes: Quiz[] } }> => {
        const response = await quizApi.get('/admin/quizzes');
        return response.data;
    },

    getQuiz: async (quizId: string): Promise<{ success: boolean; result: { quiz: Quiz } }> => {
        const response = await quizApi.get(`/admin/quizzes/${quizId}`);
        return response.data;
    },

    updateQuiz: async (quizId: string, quizData: {
        title?: string;
        description?: string;
        category?: string;
        difficulty?: string;
        time_limit?: number;
        passing_score?: number;
    }): Promise<{ success: boolean; result: { quiz: Quiz } }> => {
        const response = await quizApi.put(`/admin/quizzes/${quizId}`, quizData);
        return response.data;
    },

    deleteQuiz: async (quizId: string): Promise<{ success: boolean }> => {
        const response = await quizApi.delete(`/admin/quizzes/${quizId}`);
        return response.data;
    },

    // Question management
    addQuestion: async (quizId: string, questionData: {
        type: string;
        question_text: string;
        explanation: string;
        order_index: number;
        options?: Array<{
            option_text: string;
            is_correct: boolean;
        }>;
    }): Promise<{ success: boolean; result: { question: { id: string } } }> => {
        const response = await quizApi.post(`/admin/quizzes/${quizId}/question`, questionData);
        return response.data;
    },

    getQuestions: async (quizId: string): Promise<{ success: boolean; result: { questions: Question[] } }> => {
        const response = await quizApi.get(`/admin/quizzes/${quizId}/questions`);
        return response.data;
    },

    updateQuestion: async (quizId: string, questionId: string, questionData: {
        question_text?: string;
        explanation?: string;
        order_index?: number;
        options?: Array<{
            option_text: string;
            is_correct: boolean;
        }>;
    }): Promise<{ success: boolean; result: { question: Question } }> => {
        const response = await quizApi.put(`/admin/quizzes/${quizId}/questions/${questionId}`, questionData);
        return response.data;
    },

    deleteQuestion: async (quizId: string, questionId: string): Promise<{ success: boolean }> => {
        const response = await quizApi.delete(`/admin/quizzes/${quizId}/questions/${questionId}`);
        return response.data;
    },

    getQuizStats: async (quizId: string): Promise<{
        success: boolean;
        result: {
            total_attempts: number;
            average_score: number;
            pass_rate: number;
            completion_rate: number;
        }
    }> => {
        const response = await quizApi.get(`/admin/quizzes/${quizId}/stats`);
        return response.data;
    },
};

export default quizApi;