export default function StatusBadge({ status }) {
  const styles = {
    Reported: "bg-slate-100 text-slate-700 border-slate-200",
    "In Progress": "bg-amber-100 text-amber-700 border-amber-200",
    Resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${
        styles[status] || "bg-slate-100 text-slate-700 border-slate-200"
      }`}
    >
      {status.toUpperCase()}
      
    </span>
  );
}
