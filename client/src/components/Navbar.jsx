import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-5xl mx-auto flex justify-between p-4">
        <Link to="/" className="font-bold text-lg text-green-600">
          FixMyArea
        </Link>

        {user && (
          <div className="flex gap-4 items-center">
            {user.role === "admin" && (
              <Link to="/admin">Admin</Link>
            )}
            <button
              onClick={logout}
              className="text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
