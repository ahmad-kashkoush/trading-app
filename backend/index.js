const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB(); // Ensure this returns a Promise or handle connection errors

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
