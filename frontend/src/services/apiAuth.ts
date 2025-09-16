/**
 * Simple API & Auth client for Trading App
 * All HTTP requ  githubAuth: async (userData: { email: string; fullName: string; password: string }) => {
    try {
      // Try login first
      return await apiAuth.login({ email: userData.email, password: userData.password });
    } catch {
      // If login fails, signup then login
      await axiosInstance.post('/api/user/signup', userData);
      return await apiAuth.login({ email: userData.email, password: userData.password });
    }
  },uthentication using axios
 */

import axios from 'axios';
import { saveTokenToCookie, getTokenFromCookie } from '@/utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

// Configure axios defaults
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  isVerified: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

/**
 * All API functions in one place using axios
 */
export const apiAuth = {
  // === Auth Functions ===
  signup: async (data: { username: string; email: string; password: string }) => {
    const response = await axiosInstance.post<AuthResponse>('/api/user/signup', {
      fullName: data.username,
      email: data.email,
      password: data.password,
    });
    
    // Auto-save token
    if (typeof window !== 'undefined' && response.data.token) {
      saveTokenToCookie(response.data.token);
    }
    
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await axiosInstance.post<AuthResponse>('/api/user/login', data);
    
    // Auto-save token
    if (typeof window !== 'undefined' && response.data.token) {
      saveTokenToCookie(response.data.token);
    }
    
    return response.data;
  },

  githubAuth: async (userData: { email: string; fullName: string; password: string }) => {
    try {
      // Try login first
      return await apiAuth.login({ email: userData.email, password: userData.password });
    } catch{
      // If login fails, signup then login
      await axiosInstance.post('/api/user/signup', userData);
      return await apiAuth.login({ email: userData.email, password: userData.password });
    }
  },

  verifyEmail: async (code: string, token?: string) => {
    const authToken = token || (typeof window !== 'undefined' ? getTokenFromCookie('userToken') : '');
    if (!authToken) throw new Error('Authentication token required');
    
    const response = await axiosInstance.put<{ message: string; token: string; existingUser: User }>(
      '/api/user/verify-email',
      { code },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    
    // Update token if provided
    if (typeof window !== 'undefined' && response.data.token) {
      saveTokenToCookie(response.data.token);
    }
    
    return response.data;
  },

  resendVerificationCode: async (token?: string) => {
    const authToken = token || (typeof window !== 'undefined' ? getTokenFromCookie('userToken') : '');
    if (!authToken) throw new Error('Authentication token required');
    
    const response = await axiosInstance.post<{ message: string }>(
      '/api/user/resend-verification',
      {},
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    
    return response.data;
  },

  // === Generic HTTP Methods (for future use) ===
  get: async <T>(endpoint: string, token?: string) => {
    const response = await axiosInstance.get<T>(endpoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  },

  post: async <T>(endpoint: string, data?: unknown, token?: string) => {
    const response = await axiosInstance.post<T>(endpoint, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  },

  put: async <T>(endpoint: string, data?: unknown, token?: string) => {
    const response = await axiosInstance.put<T>(endpoint, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  },

  delete: async <T>(endpoint: string, token?: string) => {
    const response = await axiosInstance.delete<T>(endpoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  },
};

export default apiAuth;
