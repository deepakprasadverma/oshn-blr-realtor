const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.log("❌ MongoDB Connection Failed");
    console.log("----------------------------");
    console.log("Name:", error.name);
    console.log("Message:", error.message);
    console.log("Code:", error.code);

    if (error.cause) {
      console.log("Cause:", error.cause);
    }

    console.dir(error, { depth: null });
    console.log("⚠️ Running without MongoDB connection.");
  }
};

module.exports = connectDB;