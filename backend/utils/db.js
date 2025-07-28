const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URL);
    console.log(`connect to mongoDB ${conn.connection.host}`);
  } catch (e) {
    console.log(`failed to connect to mongodb`, e);
    process.exit(1);
  }
};

module.exports = connectDB;
