const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./utils/db");
const userRoutes = require("./routes/user.routes");
const paymentRoutes = require("./routes/payment.routes");
const connectStripe = require("./utils/stripe");
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB(); // Ensure this returns a Promise or handle connection errors

// Connect to Stripe
const stripe = connectStripe();

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:3000", // Next.js default port
    "http://localhost:3001", // Alternative frontend port
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});