import axios, { AxiosInstance } from 'axios';

export class ApiClient {
  private static instance: ApiClient;
  private authApi: AxiosInstance;
  private quizApi: AxiosInstance;

  private constructor() {
    this.authApi = axios.create({
      baseURL: 'https://auth-prod.ekos.my.id/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.quizApi = axios.create({
      baseURL: 'https://quiz-prod.ekos.my.id/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token for both APIs
    [this.authApi, this.quizApi].forEach(api => {
      api.interceptors.request.use((config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
    });
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  getAuthApi(): AxiosInstance {
    return this.authApi;
  }

  getQuizApi(): AxiosInstance {
    return this.quizApi;
  }
}