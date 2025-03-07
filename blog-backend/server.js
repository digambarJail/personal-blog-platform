import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";


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
  

app.use("/api/auth", authRoutes);
app.use("/api", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
