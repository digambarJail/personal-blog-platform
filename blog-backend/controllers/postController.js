import Post from "../models/Post.js";

//  Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content, authorId: req.user.id });
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

    const posts = await Post.find(filter).populate("authorId", "email");

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
