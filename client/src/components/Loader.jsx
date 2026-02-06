export default function Loader({ size = "md", text = "Loading..." }) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <div
        className={`animate-spin rounded-full border-slate-300 border-t-emerald-600 ${sizes[size]}`}
      />
      {text && (
        <p className="text-sm text-slate-500 font-medium">{text}</p>
      )}
    </div>
  );
}
