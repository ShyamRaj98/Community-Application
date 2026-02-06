import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import IssueMap from "../components/IssueMap";
import StatusBadge from "../components/StatusBadge";

export default function IssueDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchIssue = async () => {
    const res = await api.get(`/issues/${id}`);
    setIssue(res.data);
  };

  useEffect(() => {
    fetchIssue();
  }, [id]);

  const volunteer = async () => {
    setLoading(true);
    await api.post(`/issues/${id}/volunteer`);
    await fetchIssue();
    setLoading(false);
  };

  if (!issue) return <p>Loading...</p>;

  const alreadyVolunteered = issue.volunteers?.some((v) => v._id === user._id);

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{issue.title}</h2>
        <StatusBadge status={issue.status} />
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {issue.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="issue"
            className="rounded h-24 object-cover"
          />
        ))}
      </div>

      <p className="mt-4">{issue.description}</p>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <p>
          <b>Category:</b> {issue.category}
        </p>
        <p>
          <b>Priority:</b> {issue.priority}
        </p>
        <p>
          <b>Reported by:</b> {issue.reportedBy.name}
        </p>
        <p>
          <b>Volunteers:</b> {issue.volunteers.length}
        </p>
      </div>
      <IssueMap lat={issue.location.lat} lng={issue.location.lng} />
      <button
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        disabled={alreadyVolunteered}
        onClick={volunteer}
      >
        {alreadyVolunteered ? "Already Volunteered" : "Volunteer"}
      </button>
    </div>
  );
}
