import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/issues");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            Welcome Back
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Login to report and track community issues
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition disabled:opacity-60"
          >
            {loading ? <Loader size="sm" text={null} /> : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-4">
          Don’t have an account?{" "}
          <span className="text-emerald-600 font-medium cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
