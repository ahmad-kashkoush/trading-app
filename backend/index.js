const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./utils/db");
const userRoutes = require("./routes/user.routes");
const paymentRoutes = require("./routes/payment.routes");
const AppError = require("./utils/globalError");
const connectStripe = require("./utils/stripe");
// const { app, server } = require("./utils/socket");
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB(); // Ensure this returns a Promise or handle connection errors

// Connect to Stripe
const stripe = connectStripe();

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Next.js default port
      "http://localhost:3001", // Alternative frontend port
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

app.use((req, res, next) => {
  return next(new AppError("Not Found Route", 404));
});
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
