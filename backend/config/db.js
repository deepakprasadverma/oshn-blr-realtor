const mongoose = require("mongoose");

global.dbConnectionStatus = { connected: false, error: null };

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is missing!");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    global.dbConnectionStatus = { connected: true, error: null };
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    global.dbConnectionStatus = { connected: false, error: error.message };
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