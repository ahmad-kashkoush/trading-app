"use server";
import axios from "axios";

export const signup = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/signup`,
      {
        fullName: formData.username,
        email: formData.email,
        password: formData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    if (error.response) {
      // Server responded with error status
      throw new Error(
        `Signup failed: ${
          error.response.data?.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("Network error: Unable to connect to server");
    } else {
      // Something else happened
      throw new Error(`Signup failed: ${error.message}`);
    }
  }
};

export const verifyEmail = async (code , token) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/verify-email`,
      { code },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Email verification error:", error);
    if (error.response) {
      throw new Error(
        `Email verification failed: ${
          error.response.data?.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      throw new Error("Network error: Unable to connect to server");
    } else {
      throw new Error(`Email verification failed: ${error.message}`);
    }
  }
};

export const resendVerificationCode = async (token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/resend-verification`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Resend verification code error:", error);
    if (error.response) {
      throw new Error(
        `Resend verification failed: ${
          error.response.data?.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      throw new Error("Network error: Unable to connect to server");
    } else {
      throw new Error(`Resend verification failed: ${error.message}`);
    }
  }
};

