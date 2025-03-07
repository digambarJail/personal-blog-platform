import "@/app/globals.css";
import PostCard from "../components/PostCard";

async function fetchPosts() {
  try {
    const res = await fetch("http://localhost:5000/api/getPosts");

    if (!res.ok) {
      throw new Error(`Failed to fetch posts, status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await fetchPosts();

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white dark:bg-gray-900 shadow-lg rounded-xl">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
        📖 All Blog Posts
      </h1>
      <div className="grid gap-6">
        {posts.length > 0 ? (
          posts.map((post: any) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No posts available. Be the first to write one! ✍️
          </p>
        )}
      </div>
    </div>
  );
}
