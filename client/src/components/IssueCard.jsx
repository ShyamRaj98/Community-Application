import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function IssueCard({ issue }) {
  return (
    <Link to={`/issues/${issue._id}`}>
      <div className="bg-white p-4 rounded shadow hover:shadow-md transition mb-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">
            {issue.title}
          </h3>
          <StatusBadge status={issue.status} />
        </div>

        <p className="text-sm text-gray-600 mt-1">
          {issue.category} • Priority: {issue.priority}
        </p>

        <p className="text-xs mt-2 text-gray-500">
          Reported by {issue.reportedBy?.name}
        </p>
      </div>
    </Link>
  );
}
