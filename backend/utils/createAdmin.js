const mongoose = require("mongoose");
const User = require("../Models/user");
require("dotenv").config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
    console.log("good");
  }
};

// Function to create admin user
const createAdminUser = async (adminData) => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.email);
      return;
    }

    // Create new admin user
    const adminUser = new User({
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      email: adminData.email,
      password: adminData.password,
      phone: adminData.phone || "",
      role: "admin",
      isVerified: true,
    });

    await adminUser.save();
    console.log("Admin user created successfully:", adminUser.email);
    console.log("Admin user details:", {
      _id: adminUser._id,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      email: adminUser.email,
      role: adminUser.role,
    });
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

// Example usage
const runScript = async () => {
  await connectDB();

  // You can modify these values or pass them as environment variables
  const adminData = {
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    password: "admin123", // Remember to use a strong password in production
    phone: "+1234567890",
  };

  await createAdminUser(adminData);

  // Close connection
  await mongoose.connection.close();
  console.log("Script completed");
};

// Run the script if this file is executed directly
if (require.main === module) {
  runScript();
}

module.exports = { createAdminUser };
