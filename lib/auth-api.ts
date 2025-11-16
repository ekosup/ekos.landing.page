import { ApiClient } from './api-client';

const API_BASE_URL = 'https://auth-prod.ekos.my.id/api/v1';

const api = ApiClient.getInstance().getAuthApi();

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  roles: string[];
}

export interface AuthResponse {
  session_token?: string;
  token?: string;
}

// API functions
export const authApi = {
  register: async (data: RegisterData): Promise<void> => {
    await api.post('/register', data);
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/login', data);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get('/me');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/logout');
  },
};

export default api;