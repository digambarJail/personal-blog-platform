import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store in memory


router.post("/post", authMiddleware,upload.single('image'), createPost);
router.get("/posts", getPosts);

export default router;
