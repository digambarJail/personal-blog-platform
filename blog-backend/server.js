import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";
import cron from "node-cron"

dotenv.config();
connectDB();

const app = express();
app.use(
    cors({
      origin: ["http://localhost:3000", "https://personal-blog-platform-sigma.vercel.app"],
      credentials: true,
    })
  );
app.use(express.json());
app.use(cookieParser()); 
 
cron.schedule("*/5 * * * *", async () => { // Runs every 5 minutes
  console.log("Pinging the server to keep it awake...");
  try {
    await fetch("https://personal-blog-platform-7jot.onrender.com/ping");
  } catch (error) {
    console.error("Ping failed:", error);
  }
});

app.get("/ping", (req, res) => {
  res.send("Server is awake!");
});

app.use("/api/auth", authRoutes);
app.use("/api", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
