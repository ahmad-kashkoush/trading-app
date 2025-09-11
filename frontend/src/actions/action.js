"use server";
import { apiAuth } from '@/services';

export const signup = async (formData) => {
  try {
    return await apiAuth.signup(formData);
  } catch (error) {
    console.error("Signup error:", error);
    throw new Error(error.response?.data?.message || error.message || 'Signup failed');
  }
};

export const verifyEmail = async (code, token) => {
  try {
    return await apiAuth.verifyEmail(code, token);
  } catch (error) {
    console.error("Email verification error:", error);
    throw new Error(error.response?.data?.message || error.message || 'Email verification failed');
  }
};

export const resendVerificationCode = async (token) => {
  try {
    return await apiAuth.resendVerificationCode(token);
  } catch (error) {
    console.error("Resend verification code error:", error);
    throw new Error(error.response?.data?.message || error.message || 'Resend verification failed');
  }
};

