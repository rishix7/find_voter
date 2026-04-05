const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const allowInsecureTls = process.env.MONGO_TLS_INSECURE === "true";

    await mongoose.connect(mongoUri, {
      dbName: "Voter_list",
      serverSelectionTimeoutMS: 10000,
      family: 4,
      tls: true,
      tlsAllowInvalidCertificates: allowInsecureTls,
      tlsAllowInvalidHostnames: allowInsecureTls
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    if (error.code) {
      console.error("MongoDB error code:", error.code);
    }
    if (error.cause?.message) {
      console.error("Root cause:", error.cause.message);
    }
    process.exit(1);
  }
};

module.exports = connectDB;
