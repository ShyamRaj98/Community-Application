import { useEffect, useState } from "react";
import IssueCard from "../components/IssueCard";
import api from "../services/api";

export default function Issues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    api.get("/issues").then((res) => setIssues(res.data));
  }, []);

  return (
    <div>
      <h2>Community Issues</h2>

      {issues.map((issue) => (
        <IssueCard key={issue._id} issue={issue} />
      ))}
    </div>
  );
}
