import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ReportIssue() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Road",
    priority: "Low"
  });

  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 📍 Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => {
        setError("Location permission denied");
      }
    );
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      if (location) {
        formData.append("lat", location.lat);
        formData.append("lng", location.lng);
      }

      images.forEach((img) => formData.append("images", img));

      await api.post("/issues", formData);
      navigate("/");
    } catch {
      setError("Failed to submit issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={submit}
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Report a Community Issue
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Help make your neighborhood better
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Issue title"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            placeholder="Describe the issue in detail"
            rows="4"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* Grid for selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option>Road</option>
              <option>Garbage</option>
              <option>Streetlight</option>
              <option>Graffiti</option>
              <option>Public Space</option>
            </select>

            <select
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full"
              onChange={(e) =>
                setImages(Array.from(e.target.files))
              }
            />
            <p className="text-xs text-gray-500 mt-2">
              Upload up to 3 images
            </p>
          </div>

          {/* Location Status */}
          <div className="text-xs">
            {location ? (
              <span className="text-green-600">
                📍 Location captured automatically
              </span>
            ) : (
              <span className="text-yellow-600">
                ⏳ Capturing location…
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
}
