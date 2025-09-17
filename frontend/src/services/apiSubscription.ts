import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface UserSubscription {
  hasAccess: boolean;
  activePackages: {
    package: string;
    expiresAt: string;
    daysRemaining: number;
    totalDays?: number; // Total access period for progress calculation
    id: string;
  }[];
}

const apiSubscription = {
  // Check user's active subscriptions by ID (preferred) or email (fallback for guests)
  checkUserAccess: async (userIdentifier: string): Promise<UserSubscription> => {
    const response = await axiosInstance.get(`/api/payment/check-access/${userIdentifier}`);
    return response.data;
  },
};

export default apiSubscription;
