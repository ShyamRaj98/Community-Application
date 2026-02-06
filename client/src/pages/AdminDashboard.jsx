import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    api.get("/dashboard/all").then((res) => setStats(res.data));
    api.get("/issues").then((res) => setIssues(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/issues/${id}/admin-status`, { status });
    const res = await api.get("/issues");
    setIssues(res.data);
  };

  if (!stats) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            🛡️ Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage community issues & system health
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard
            title="Total Issues"
            value={stats.totalIssues}
            color="blue"
          />
          <StatCard
            title="Active Issues"
            value={stats.activeIssues}
            color="yellow"
          />
          <StatCard
            title="Resolved"
            value={stats.resolvedIssues}
            color="emerald"
          />
          <StatCard title="Users" value={stats.users} color="purple" />
        </div>

        {/* Issues */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-700">
              Manage Issues
            </h2>
          </div>

          {issues.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No issues available
            </div>
          ) : (
            <div className="divide-y">
              {issues.map((issue) => (
                <div
                  key={issue._id}
                  className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition"
                >
                  {/* Issue Info */}
                  <div>
                    <p className="font-semibold text-gray-800">{issue.title}</p>
                    <p className="text-sm text-gray-500">
                      Category: {issue.category} • Priority: {issue.priority}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadge(
                        issue.status,
                      )}`}
                    >
                      {issue.status}
                    </span>

                    <select
                      value={issue.status}
                      onChange={(e) => updateStatus(issue._id, e.target.value)}
                      className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option>Reported</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function StatCard({ title, value, color }) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    yellow: "from-yellow-500 to-yellow-600",
    emerald: "from-emerald-500 to-emerald-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <div
      className={`bg-gradient-to-r ${colors[color]} text-white rounded-2xl p-5 shadow-lg`}
    >
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-3xl font-extrabold mt-2">{value}</p>
    </div>
  );
}

function statusBadge(status) {
  switch (status) {
    case "Resolved":
      return "bg-emerald-100 text-emerald-700";
    case "In Progress":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
}
