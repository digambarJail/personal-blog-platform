import axios from "axios";

interface Author {
  email: string;
}

interface Post {
  _id: string;
  title:string;
  authorId: Author;
  content: string;
}

// Fetch posts server-side
export async function fetchPosts(userId: string | null): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log('apissss',apiUrl)
  try {
    const res = await axios.get(`${apiUrl}/api/posts`, {
      withCredentials: true,
      params: { author: userId },
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });

    if (!res) throw new Error(`Failed to fetch posts`);

    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export const createPost = async (title: string, content: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await axios.post(
      `${apiUrl}/api/post`,
      { title, content },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};