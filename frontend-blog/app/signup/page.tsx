"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "@/lib/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    setError(""); // Reset error state

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signupUser(email, password);
      router.push("/login"); // Redirect to login after successful signup
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border-gray-300 border-2">
        <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">
          Sign Up
        </h2>
        <p className="text-gray-400 text-center mb-2">Create your account</p>


        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="space-y-4 mt-2">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
