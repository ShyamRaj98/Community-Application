import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="logo text-xl font-extrabold text-green-600 tracking-tight"
          >
            Fix<span className="text-gray-900">MyArea</span>
          </Link>

          {/* Desktop Menu */}
          {user && (
            <div className="hidden md:flex items-center gap-6">
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
                >
                  Admin Panel
                </Link>
              )}

              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {user && (
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && user && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {user.role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="block w-full rounded-lg px-4 py-2 text-sm font-medium bg-purple-100 text-purple-700"
              >
                Admin Panel
              </Link>
            )}

            <button
              onClick={logout}
              className="block w-full rounded-lg px-4 py-2 text-sm font-semibold text-white bg-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
