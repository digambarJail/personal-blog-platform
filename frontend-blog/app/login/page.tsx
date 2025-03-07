"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import axios from "axios";
import { loginUser } from "@/lib/auth";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(email, password);

      dispatch(login());
      localStorage.setItem("userId", data.userId);

      router.push("/dashboard"); // Redirect to dashboard
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (  
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white ">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg border-gray-300 border-2">
        <h2 className="text-3xl font-bold text-center text-blue-400">Welcome Back</h2>
        <p className="text-gray-400 text-center mt-2">Login to your account</p>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

