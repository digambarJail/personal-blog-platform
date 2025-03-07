"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log('authtok',token,!!token)
    setIsLoggedIn(!!token); // True if token exists, else false
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
    setIsLoggedIn(false);

    router.push("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          MyBlog
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          <NavLink href="/">Home</NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/signup">Sign Up</NavLink>
            </>
          ) : (
            <>
              <NavLink href="/dashboard">Dashboard</NavLink>
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// Reusable NavLink Component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
    >
      {children}
    </Link>
  );
}
