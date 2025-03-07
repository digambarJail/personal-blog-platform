'use client';

import { useState, useEffect } from 'react';
import PostCard from './PostCard';

interface AuthorFilterProps {
  authors: string[];
  posts: any[];
}

export default function AuthorFilter({ authors, posts }: AuthorFilterProps) {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // useEffect to update filtered posts when posts or authors change
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAuthor = e.target.value;

    // Filter posts based on selected author or show all posts if no author is selected
    const newFilteredPosts = selectedAuthor
      ? posts.filter((post) => post.authorId.email === selectedAuthor)
      : posts;

    setFilteredPosts(newFilteredPosts);
  };

  return (
    <div className="mb-6">
      <form>
        <select
            name="author"
            className="px-4 mb-5 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={handleFilterChange}
            >
            <option value="" className="bg-gray-800 text-white">All Authors</option>
            {authors.map((author) => (
                <option key={author} value={author} className="bg-gray-800 text-white">
                {author}
                </option>
            ))}
        </select>
      </form>

      {/* Display filtered posts */}
      <div className="grid gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No posts available for this author. ✍️
          </p>
        )}
      </div>
    </div>
  );
}
