# Quiz API Documentation

## Overview

The Quiz API provides a complete quiz management and delivery system built on Cloudflare Workers with D1 database. It supports multiple question types, session-based quiz taking, and integrates with an authentication service.

**Base URL:** `https://quiz-prod.ekos.my.id`

**Authentication:** Bearer token required for all endpoints. Obtain token from the authentication service.

## Authentication

### Getting an Access Token

First, authenticate with the auth service to get a Bearer token:

```bash
curl -X POST https://auth-prod.ekos.my.id/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

Response:

```json
{
  "session_token": "your_bearer_token_here"
}
```

Use this token in the `Authorization` header for all quiz API requests:

```
Authorization: Bearer your_bearer_token_here
```

## API Endpoints

### Public Endpoints

#### 1. List Quizzes

Get a paginated list of available quizzes.

**Endpoint:** `GET /api/v1/quizzes`

**Query Parameters:**

- `page` (number, default: 0): Page number for pagination
- `category` (string, optional): Filter by category
- `difficulty` (string, optional): Filter by difficulty ('easy', 'medium', 'hard')

**Response:**

```json
{
  "success": true,
  "result": {
    "quizzes": [
      {
        "id": "quiz_id",
        "title": "Sample Quiz",
        "description": "Quiz description",
        "category": "general",
        "difficulty": "easy",
        "time_limit": null,
        "passing_score": 70,
        "created_at": "2025-11-16 03:25:47"
      }
    ]
  }
}
```

#### 2. Get Quiz Details

Get detailed information about a specific quiz.

**Endpoint:** `GET /api/v1/quizzes/{quiz_id}`

**Response:**

```json
{
  "success": true,
  "result": {
    "quiz": {
      "id": "quiz_id",
      "title": "Sample Quiz",
      "description": "Quiz description",
      "category": "general",
      "difficulty": "easy",
      "time_limit": 3600,
      "passing_score": 70,
      "created_at": "2025-11-16 03:25:47"
    }
  }
}
```

#### 3. Start Quiz Session

Begin a quiz session. Creates a randomized question order.

**Endpoint:** `POST /api/v1/quizzes/{quiz_id}/start`

**Response:**

```json
{
  "success": true,
  "result": {
    "session_id": "session_id_here"
  }
}
```

#### 4. Get Session Questions

Retrieve questions for the current session (in randomized order).

**Endpoint:** `GET /api/v1/session/{session_id}/questions`

**Response:**

```json
{
  "success": true,
  "result": {
    "questions": [
      {
        "id": "question_id",
        "quiz_id": "quiz_id",
        "type": "mcq",
        "question_text": "What is 2+2?",
        "explanation": "Basic math",
        "order_index": 0,
        "options": [
          {
            "id": "option_id",
            "question_id": "question_id",
            "option_text": "4",
            "is_correct": 1
          }
        ]
      }
    ]
  }
}
```

#### 5. Submit Answer

Submit an answer for a specific question in the session.

**Endpoint:** `POST /api/v1/session/{session_id}/answer`

**Request Body:**

```json
{
  "question_index": 0,
  "selected_option_ids": ["option_id1", "option_id2"],
  "answer_text": "text_answer"
}
```

**Notes:**

- For MCQ/Multi-select: use `selected_option_ids` array
- For True/False: use `selected_option_ids` with single option
- For Short Answer: use `answer_text`

**Response:**

```json
{
  "success": true,
  "result": {
    "is_correct": true
  }
}
```

#### 6. Finish Quiz

Complete the quiz and calculate final score.

**Endpoint:** `POST /api/v1/session/{session_id}/finish`

**Response:**

```json
{
  "success": true,
  "result": {
    "score": 8,
    "total_questions": 10,
    "passed": true
  }
}
```

#### 7. Get Quiz Results

Retrieve detailed results for a completed quiz.

**Endpoint:** `GET /api/v1/session/{session_id}/result`

**Response:**

```json
{
  "success": true,
  "result": {
    "score": 8,
    "total_questions": 10,
    "passed": true,
    "detailed_breakdown": [
      {
        "question_id": "question_id",
        "is_correct": true
      }
    ]
  }
}
```

### Admin Endpoints

#### 8. Create Quiz

Create a new quiz.

**Endpoint:** `POST /api/v1/admin/quiz`

**Request Body:**

```json
{
  "title": "New Quiz",
  "description": "Quiz description",
  "category": "math",
  "difficulty": "medium",
  "time_limit": 1800,
  "passing_score": 80
}
```

**Response:**

```json
{
  "success": true,
  "result": {
    "quiz": {
      "id": "new_quiz_id",
      "title": "New Quiz",
      "description": "Quiz description",
      "category": "math",
      "difficulty": "medium",
      "time_limit": 1800,
      "passing_score": 80,
      "created_at": "2025-11-16 03:25:47"
    }
  }
}
```

#### 9. Add Question to Quiz

Add a question to an existing quiz.

**Endpoint:** `POST /api/v1/admin/quiz/{quiz_id}/question`

**Request Body:**

```json
{
  "type": "mcq",
  "question_text": "What is the capital of France?",
  "explanation": "Geography question",
  "order_index": 0,
  "options": [
    {
      "option_text": "London",
      "is_correct": false
    },
    {
      "option_text": "Paris",
      "is_correct": true
    },
    {
      "option_text": "Berlin",
      "is_correct": false
    }
  ]
}
```

**Notes:**

- `type`: "mcq" (single choice), "multi" (multiple choice), "bool" (true/false), "short" (text answer)
- For "short" type, omit `options` array

**Response:**

```json
{
  "success": true,
  "result": {
    "question": {
      "id": "new_question_id",
      "quiz_id": "quiz_id",
      "type": "mcq",
      "question_text": "What is the capital of France?",
      "explanation": "Geography question",
      "order_index": 0
    }
  }
}
```

## Next.js Frontend Integration

### Setup

1. Install required packages:

```bash
npm install swr axios
```

2. Create API client utility:

```typescript
// lib/api.ts
const API_BASE_URL = 'https://your-quiz-worker.example.com';

export const apiClient = {
  get: (endpoint: string, token: string) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()),

  post: (endpoint: string, data: any, token: string) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json()),
};
```

### Authentication Context

```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const response = await fetch('https://your-auth-service.example.com/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.session_token) {
      setToken(data.session_token);
      localStorage.setItem('auth_token', data.session_token);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

### Quiz List Component

```typescript
// components/QuizList.tsx
import { useState } from 'react';
import useSWR from 'swr';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../lib/api';

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  passing_score: number;
}

export default function QuizList() {
  const { token } = useAuth();
  const [page, setPage] = useState(0);

  const { data, error } = useSWR(
    token ? [`/api/v1/quizzes?page=${page}`, token] : null,
    ([endpoint, token]) => apiClient.get(endpoint, token)
  );

  if (error) return <div>Failed to load quizzes</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Available Quizzes</h2>
      {data.result.quizzes.map((quiz: Quiz) => (
        <div key={quiz.id} className="quiz-card">
          <h3>{quiz.title}</h3>
          <p>{quiz.description}</p>
          <p>Category: {quiz.category}</p>
          <p>Difficulty: {quiz.difficulty}</p>
          <p>Passing Score: {quiz.passing_score}%</p>
          <button onClick={() => startQuiz(quiz.id)}>Start Quiz</button>
        </div>
      ))}
      <button onClick={() => setPage(page + 1)}>Next Page</button>
    </div>
  );
}
```

### Quiz Taking Component

```typescript
// components/QuizSession.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../lib/api';

interface Question {
  id: string;
  type: string;
  question_text: string;
  options?: Array<{
    id: string;
    option_text: string;
  }>;
}

interface QuizSessionProps {
  quizId: string;
  onComplete: (result: any) => void;
}

export default function QuizSession({ quizId, onComplete }: QuizSessionProps) {
  const { token } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(false);

  // Start quiz session
  useEffect(() => {
    if (token && quizId) {
      apiClient.post(`/api/v1/quizzes/${quizId}/start`, {}, token)
        .then(response => {
          setSessionId(response.result.session_id);
        });
    }
  }, [token, quizId]);

  // Load questions
  useEffect(() => {
    if (sessionId && token) {
      apiClient.get(`/api/v1/session/${sessionId}/questions`, token)
        .then(response => {
          setQuestions(response.result.questions);
        });
    }
  }, [sessionId, token]);

  const submitAnswer = async (questionIndex: number, answer: any) => {
    if (!sessionId || !token) return;

    setLoading(true);
    try {
      await apiClient.post(`/api/v1/session/${sessionId}/answer`, {
        question_index: questionIndex,
        ...answer
      }, token);

      setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    } finally {
      setLoading(false);
    }
  };

  const finishQuiz = async () => {
    if (!sessionId || !token) return;

    const result = await apiClient.post(`/api/v1/session/${sessionId}/finish`, {}, token);
    onComplete(result.result);
  };

  const currentQ = questions[currentQuestion];

  if (!currentQ) return <div>Loading questions...</div>;

  return (
    <div>
      <h3>Question {currentQuestion + 1} of {questions.length}</h3>
      <p>{currentQ.question_text}</p>

      {currentQ.type === 'mcq' && currentQ.options && (
        <div>
          {currentQ.options.map(option => (
            <button
              key={option.id}
              onClick={() => submitAnswer(currentQuestion, {
                selected_option_ids: [option.id]
              })}
              disabled={loading}
            >
              {option.option_text}
            </button>
          ))}
        </div>
      )}

      {currentQ.type === 'short' && (
        <div>
          <input
            type="text"
            onChange={(e) => setAnswers(prev => ({
              ...prev,
              [currentQuestion]: { answer_text: e.target.value }
            }))}
          />
          <button
            onClick={() => submitAnswer(currentQuestion, answers[currentQuestion])}
            disabled={loading}
          >
            Submit Answer
          </button>
        </div>
      )}

      <div>
        <button
          onClick={() => setCurrentQuestion(prev => prev - 1)}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentQuestion(prev => prev + 1)}
          disabled={currentQuestion === questions.length - 1}
        >
          Next
        </button>
        {currentQuestion === questions.length - 1 && (
          <button onClick={finishQuiz}>Finish Quiz</button>
        )}
      </div>
    </div>
  );
}
```

### Results Component

```typescript
// components/QuizResults.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../lib/api';

interface QuizResult {
  score: number;
  total_questions: number;
  passed: boolean;
  detailed_breakdown: Array<{
    question_id: string;
    is_correct: boolean;
  }>;
}

interface QuizResultsProps {
  sessionId: string;
}

export default function QuizResults({ sessionId }: QuizResultsProps) {
  const { token } = useAuth();
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (token && sessionId) {
      apiClient.get(`/api/v1/session/${sessionId}/result`, token)
        .then(response => {
          setResult(response.result);
        });
    }
  }, [token, sessionId]);

  if (!result) return <div>Loading results...</div>;

  const percentage = (result.score / result.total_questions) * 100;

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Score: {result.score}/{result.total_questions} ({percentage.toFixed(1)}%)</p>
      <p>Status: {result.passed ? 'Passed' : 'Failed'}</p>

      <h3>Detailed Breakdown</h3>
      <ul>
        {result.detailed_breakdown.map((item, index) => (
          <li key={item.question_id}>
            Question {index + 1}: {item.is_correct ? 'Correct' : 'Incorrect'}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Error Handling

All API responses follow this structure:

```json
{
  "success": true|false,
  "result": { ... } | "error": "error message"
}
```

### Common Error Scenarios:

- **401 Unauthorized**: Invalid or missing token
- **404 Not Found**: Quiz/session/question not found
- **400 Bad Request**: Invalid request data
- **500 Internal Server Error**: Server error

### Error Handling in Next.js:

```typescript
const { data, error } = useSWR([endpoint, token], fetcher);

if (error) {
  if (error.status === 401) {
    // Redirect to login
    router.push('/login');
  } else {
    // Show error message
    setError('Failed to load data');
  }
}
```

## Data Types

```typescript
interface Quiz {
  id: string;
  title: string;
  description?: string;
  category?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  time_limit?: number;
  passing_score?: number;
  created_at: string;
}

interface Question {
  id: string;
  quiz_id: string;
  type: 'mcq' | 'multi' | 'bool' | 'short';
  question_text: string;
  explanation?: string;
  order_index: number;
  options?: Option[];
}

interface Option {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
}

interface QuizSession {
  id: string;
  quiz_id: string;
  user_id: string;
  start_time: string;
  end_time?: string;
  status: 'ongoing' | 'completed' | 'expired';
  score?: number;
}

interface Answer {
  id: string;
  session_id: string;
  question_id: string;
  selected_option_ids?: string[];
  answer_text?: string;
  is_correct: boolean;
  created_at: string;
}
```

## Rate Limiting

The API includes built-in rate limiting. If you exceed the limit, you'll receive a 429 status code.

## Security Notes

- All endpoints require valid Bearer tokens
- Sessions expire automatically based on quiz time limits
- Answers are validated server-side to prevent cheating
- Question content is only revealed during active sessions

This documentation provides everything needed to integrate the Quiz API into your Next.js frontend application.</content>
<parameter name="filePath">/Users/ekosupriyono/Projects/cloudflare-workers/quiz-api-docs.md
