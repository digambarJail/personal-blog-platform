"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import { createPost, fetchPosts } from "@/lib/postsService";

interface Author {
  email: string;
}

interface Post {
  _id: string;
  title: string;
  authorId: Author;
  content: string;
}

export default function Dashboard() {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);  // Get authentication state from Redux
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login"); // Redirect to login if not authenticated
    } else {

      const getPosts = async () =>{
        const userId = localStorage.getItem("userId");

        const postsData = await fetchPosts(userId);  // Fetch posts if authenticated
        setPosts(postsData)
      }

      getPosts();
    }
  }, [isAuthenticated]);

  const handlePost = async () => {
    const userId = localStorage.getItem('userId')
    if (!title || !content) {
      alert("Please enter both title and content.");
      return;
    }
    try {
      await createPost(title, content);
      setTitle("");
      setContent("");
      const postsData = await fetchPosts(userId);
      setPosts(postsData)
    } catch (error) {
      alert("Failed to create post.");
    }
  };

  if (isAuthenticated === null) {
    return <p className="text-center text-lg text-gray-600">Checking authentication...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white dark:bg-gray-900 shadow-lg rounded-xl border-gray-300 border-2">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">📊 Dashboard</h2>

      {/* Create Post Section */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Create a New Post</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md mb-3 h-24 focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          onClick={handlePost}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Post
        </button>
      </div>

      {/* Display Posts */}
      <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">Your Posts</h3>
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{post.title}</h4>
              <div className="whitespace-pre-line">
                {post.content}
              </div>  
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
