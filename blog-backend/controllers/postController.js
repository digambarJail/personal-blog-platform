import Post from "../models/Post.js";

// ✅ Create a new post
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

// ✅ Get all posts (or by author)
export const getPosts = async (req, res) => {
  try {
    const filter = req.query.author ? { authorId: req.query.author } : {};
    const posts = await Post.find(filter).populate("authorId", "email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
