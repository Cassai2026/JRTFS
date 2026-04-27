"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCasePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    deceasedName: "",
    deceasedDob: "",
    deceasedDod: "",
    directorEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create case");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">New Case — Intake</h1>
        <p className="text-gray-400 mt-1">
          Register a new case into the Sovereign system with immutable intake timestamp.
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Deceased Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.deceasedName}
              onChange={(e) => setFormData({ ...formData, deceasedName: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              placeholder="Full legal name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.deceasedDob}
                onChange={(e) => setFormData({ ...formData, deceasedDob: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date of Death *
              </label>
              <input
                type="date"
                required
                value={formData.deceasedDod}
                onChange={(e) => setFormData({ ...formData, deceasedDod: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Assign Director (Email)
            </label>
            <input
              type="email"
              value={formData.directorEmail}
              onChange={(e) => setFormData({ ...formData, directorEmail: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              placeholder="director@sovereign.com"
            />
          </div>
          <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
            <p className="text-yellow-300 text-xs">
              ⚠️ <strong>Immutable Record Notice:</strong> Upon submission, the intake timestamp will be permanently recorded in the Sovereign Audit Ledger and cannot be modified.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {loading ? "Creating..." : "Create Case — Begin Intake"}
            </button>
            <a
              href="/dashboard"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-center"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
