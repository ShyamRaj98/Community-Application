import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Rewards() {
  const { user } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get("/users/leaderboard");
        setLeaders(res.data);
      } catch (err) {
        console.error("Leaderboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            🏆 Community Heroes
          </h1>
          <p className="text-gray-500 mt-2">
            Earn points by reporting and resolving issues
          </p>
        </div>

        {/* User Points Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Your Total Points</p>
            <p className="text-4xl font-extrabold mt-1">
              {typeof user?.points === "number" ? user.points : 0}
            </p>
          </div>
          <div className="text-6xl opacity-30">⭐</div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-700">Leaderboard</h2>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <ul className="divide-y animate-pulse">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="px-6 py-4 flex justify-between">
                  <div className="flex gap-4">
                    <div className="w-8 h-6 bg-gray-200 rounded" />
                    <div>
                      <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                      <div className="h-3 w-24 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </li>
              ))}
            </ul>
          )}

          {/* Empty State */}
          {!loading && leaders.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No leaderboard data yet 🚀
            </div>
          )}

          {/* Data */}
          {!loading && leaders.length > 0 && (
            <ul className="divide-y">
              {leaders.map((u, i) => {
                const isCurrentUser = user?._id === u._id;

                return (
                  <li
                    key={u._id}
                    className={`
                      flex items-center justify-between px-6 py-4 transition
                      ${
                        isCurrentUser
                          ? "bg-emerald-50 ring-2 ring-emerald-400"
                          : "hover:bg-gray-50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <span className="text-xl font-bold w-8 text-center">
                        {i === 0 && "🥇"}
                        {i === 1 && "🥈"}
                        {i === 2 && "🥉"}
                        {i > 2 && i + 1}
                      </span>

                      {/* Name */}
                      <div>
                        <p className="font-medium text-gray-800 flex items-center gap-2">
                          {u.name}
                          {isCurrentUser && (
                            <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">
                          Community Member
                        </p>
                      </div>
                    </div>

                    {/* Points */}
                    <span className="font-bold text-emerald-600">
                      {u.points} pts
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
