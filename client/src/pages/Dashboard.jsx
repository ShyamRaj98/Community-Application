import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Loader from "../components/Loader";
import IssueCard from "../components/IssueCard";

export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [recentIssues, setRecentIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const { data } = await api.get("/dashboard");
      setStats(data.stats || {});
      setRecentIssues(data.recentIssues || []);
    } catch (err) {
      console.error("Dashboard load failed", err);
      setStats({});
      setRecentIssues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Please login to access dashboard
      </div>
    );
  }

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Community Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track issues, contribute, and earn rewards 🌱
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard
            label="Reported Issues"
            value={stats.totalIssues || 0}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            label="In Progress"
            value={stats.inProgress || 0}
            color="from-yellow-500 to-yellow-600"
          />
          <StatCard
            label="Resolved"
            value={stats.resolved || 0}
            color="from-emerald-500 to-emerald-600"
          />
          <StatCard
            label="Your Points"
            value={stats.points || 0}
            color="from-purple-500 to-purple-600"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <ActionButton text="Report Issue" href="/report" primary />
          <ActionButton text="Rewards" href="/rewards" />
        </div>

        {/* Recent Issues */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">Recent Issues</h2>
          <a
            href="/issues"
            className={
              "flex items-center justify-center gap-2 px-5 py-2 rounded-xl font-semibold transition-all shadow bg-emerald-600 hover:bg-emerald-700 text-white"
            }
          >
            All
          </a>
        </div>

        {recentIssues.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500 shadow">
            No issues reported yet
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentIssues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function StatCard({ label, value, color }) {
  return (
    <div
      className={`
        bg-gradient-to-r ${color}
        text-white rounded-2xl p-5 shadow-lg
        hover:scale-[1.02] transition-transform
      `}
    >
      <p className="text-sm opacity-90">{label}</p>
      <p className="text-3xl font-extrabold mt-2">{value}</p>
    </div>
  );
}

function ActionButton({ text, href, primary }) {
  return (
    <a
      href={href}
      className={`
        flex items-center justify-center gap-2
        px-6 py-3 rounded-xl font-semibold
        transition-all shadow
        ${
          primary
            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
            : "bg-white hover:bg-gray-50 text-gray-700 border"
        }
      `}
    >
      {text}
    </a>
  );
}
