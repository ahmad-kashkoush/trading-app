import { getTokenFromCookie } from "@/utils";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiSubscriptions = {
  // Fetch all subscriptions
  fetchSubscriptions: async (token: string = "") => {
    // Use provided token or fallback to cookie token
    const authToken = token || (typeof window !== 'undefined' ? getTokenFromCookie("userToken") : '');
    console.log('Using token:', authToken ? 'Token present' : 'No token');
    
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const response = await axiosInstance.get("/api/subscription", { headers });
    return response.data;
  },
};

export default apiSubscriptions;