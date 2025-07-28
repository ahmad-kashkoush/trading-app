const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const userRoutes = require("./routes/user.routes");
const app = express();
dotenv.config();
connectDB(); // Connect to DB before starting server
app.use("/api/user", userRoutes);
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
