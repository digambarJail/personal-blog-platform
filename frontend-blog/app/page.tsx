export const dynamic = "force-dynamic"; // Ensures fresh data on every request

import AuthorFilter from "../components/AuthorFilter";
import { fetchPosts } from "../lib/postsService";


// HomePage component (Server-Side Rendering)
export default async function HomePage() {
  const posts = await fetchPosts(null); // User Id null means fetch all posts
  const authors: string[] = [...new Set(posts.map((post) => post.authorId.email))];

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gray-900 border-2 border-gray-300 shadow-lg rounded-xl">
      <h1 className="text-4xl font-extrabold text-center text-blue-400 dark:text-gray-100 mb-8 tracking-tight">
        📖 All Blog Posts
      </h1>

      {/* Pass authors to AuthorFilter (CSR) */}
      <AuthorFilter authors={authors} posts={posts} />
    </div>
  );
}
