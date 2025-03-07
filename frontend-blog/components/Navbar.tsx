"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <nav className="bg-gray-900 shadow-md py-5">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          MyBlog
        </Link>

        {/* Hamburger Menu Button (Small Screens) */}
        <button
          className="block md:hidden text-gray-300 text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Navigation Links - Visible on Large Screens */}
        <div className="hidden md:flex gap-6">
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
                className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-500 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Shown when isOpen is true */}
      {isOpen && (
        <div className="md:hidden flex mt-2 flex-col gap-4 items-center py-4 bg-gray-800">
          <NavLink href="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          {!isLoggedIn ? (
            <>
              <NavLink href="/login" onClick={() => setIsOpen(false)}>Login</NavLink>
              <NavLink href="/signup" onClick={() => setIsOpen(false)}>Sign Up</NavLink>
            </>
          ) : (
            <>
              <NavLink href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-500 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

// Reusable NavLink Component
function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-gray-300 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}
