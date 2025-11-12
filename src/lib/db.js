import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://jooyosef173_db_user:nZ2Lv5kuXbDN35rr@cluster0.in98l92.mongodb.net/myDatabase?retryWrites=true&w=majority";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      connectTimeoutMS: 30000,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

export default connectDB;
