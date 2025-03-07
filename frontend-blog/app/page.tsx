import PostCard from "../components/PostCard";
import AuthorFilter from "../components/AuthorFilter";
import axios from "axios";

interface Author {
  email: string;
}

interface Post {
  _id: string;
  authorId: Author;
  // Other post properties
}

// Fetch posts server-side
async function fetchPosts(): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await axios.get(`${apiUrl}/api/posts`, {
      withCredentials: true, // Ensures authentication credentials are sent if needed
    });    
    
    if (!res) throw new Error(`Failed to fetch posts`);

    return await res.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// HomePage component (Server-Side Rendering)
export default async function HomePage() {
  const posts = await fetchPosts();

  // Extract unique authors from posts
  const authors: string[] = [...new Set(posts.map((post) => post.authorId.email))];

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gray-900 shadow-lg rounded-xl">
      <h1 className="text-4xl font-extrabold text-center text-blue-400 dark:text-gray-100 mb-8 tracking-tight">
        📖 All Blog Posts
      </h1>

      {/* Pass authors to AuthorFilter (CSR) */}
      <AuthorFilter authors={authors} posts={posts} />
    </div>
  );
}
