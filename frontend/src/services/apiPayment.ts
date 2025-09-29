import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PaymentData {
  name: string;
  description?: string;
  amount: number; // in cents
}

export interface CheckoutSessionResponse {
  success: boolean;
  sessionId: string;
  url: string;
}

export interface SessionVerification {
  success: boolean;
  session?: {
    id: string;
    payment_status: string;
    amount_total: number;
    currency: string;
    customer_email?: string;
  };
  error?: string;
}

const apiPayment = {
  // Create checkout session
  createCheckoutSession: async (
    priceData: PaymentData,
    successUrl?: string,
    cancelUrl?: string
  ): Promise<CheckoutSessionResponse> => {
    const response = await axiosInstance.post("/api/payment/checkout", {
      priceData,
      successUrl,
      cancelUrl,
    });
    return response.data;
  },

  // Verify payment session
  verifySession: async (sessionId: string): Promise<SessionVerification> => {
    const response = await axiosInstance.get(`/api/payment/verify-session/${sessionId}`);
    return response.data;
  },

  // Test payment with demo data
  createTestPayment: async (): Promise<CheckoutSessionResponse> => {
    return apiPayment.createCheckoutSession({
      name: "Test Payment",
      description: "Demo payment for testing Stripe integration",
      amount: 2000, // $20.00
    });
  },
};

export default apiPayment;