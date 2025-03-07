import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createPost", authMiddleware, createPost);
router.get("/getPosts", getPosts);

export default router;
