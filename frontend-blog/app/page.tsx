import PostCard from "../components/PostCard";
import AuthorFilter from "../components/AuthorFilter";

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
    const res = await fetch(`${apiUrl}/api/posts`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch posts, status: ${res.status}`);
    return await res.json();
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
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white dark:bg-gray-900 shadow-lg rounded-xl">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
        📖 All Blog Posts
      </h1>

      {/* Pass authors to AuthorFilter (CSR) */}
      <AuthorFilter authors={authors} posts={posts} />
    </div>
  );
}
