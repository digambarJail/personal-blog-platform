import axios from "axios";

export interface LoginResponse {
  userId: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  
  try {
    const res = await axios.post(
      `${apiUrl}/api/auth/login`,
      { email, password },
      { withCredentials: true } // Ensures cookies are stored
    );

    if (!res || !res.data.userId) throw new Error("Login failed");

    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed! Please try again");
  }
}

export const signupUser = async (email: string, password: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    try {
      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!res.ok) {
        throw new Error("Signup failed. Try again.");
      }
  
      return res.json(); // Return response data
    } catch (error) {
      throw new Error("An error occurred during signup.");
    }
  };
  