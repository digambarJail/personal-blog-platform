export default function PostCard({ post }: { post: any }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        {post.title}
      </h3>
      {post.image && (
        <img src={post.image} alt="Post Image" className="w-full h-60 object-cover rounded-md mt-4" />
      )}
      <div className="whitespace-pre-line mt-5">
        {post.content}
      </div>      
      
      <small className="text-gray-500 dark:text-gray-400">
        By {post.authorId?.email || "Unknown Author"}
      </small>
    </div>
  );
}
