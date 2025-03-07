import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-wide">
          MyBlog
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/login">Login</NavLink>
          <NavLink href="/signup">Sign Up</NavLink>
          <NavLink href="/dashboard">Dashboard</NavLink>
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
      className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 px-4 py-2"
    >
      {children}
    </Link>
  );
}
