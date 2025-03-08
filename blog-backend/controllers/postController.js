import Post from "../models/Post.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";

//  Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    let imageUrl = "";
    if (req.file) {
      const uploadedImage = await uploadImageToCloudinary(req.file.buffer);
      imageUrl = uploadedImage.url;
    }
    const newPost = new Post({
      title,
      content,
      authorId: req.user.id,
      image: imageUrl, // Store image URL
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

//  Get all posts (or by author)
export const getPosts = async (req, res) => {
  try {
    const userId = req.query.author || req.user?.id; // Use query parameter or authenticated user ID

    const filter = userId ? { authorId: userId } : {}; // If no userId, fetch all posts

    const posts = await Post.find(filter).populate("authorId", "email").sort({ createdAt: -1 });;

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
