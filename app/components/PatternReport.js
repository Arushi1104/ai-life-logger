"use client";

import { useState } from "react";

export default function PatternReport() {
  const [patterns, setPatterns] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  async function handleFetch() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/patterns");
    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else if (data.message) {
      setMessage(data.message);
      setOpen(true);
    } else {
      setPatterns(data.patterns);
      setOpen(true);
    }

    setLoading(false);
  }

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Pattern report
        </h2>
        <button
          onClick={handleFetch}
          disabled={loading}
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors"
        >
          {loading ? "Analyzing..." : "Analyze my journal"}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {open && message && (
        <p className="text-sm text-gray-500">{message}</p>
      )}

      {open && patterns && (
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Mood trend
            </p>
            <p className="text-sm text-gray-800">{patterns.mood_pattern}</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Recurring themes
            </p>
            <ul className="flex flex-col gap-1">
              {patterns.recurring_themes.map((theme, i) => (
                <li key={i} className="text-sm text-gray-800">
                  — {theme}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Positive patterns
            </p>
            <ul className="flex flex-col gap-1">
              {patterns.positive_patterns.map((p, i) => (
                <li key={i} className="text-sm text-gray-800">
                  — {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Watch out for
            </p>
            <ul className="flex flex-col gap-1">
              {patterns.watch_out.map((w, i) => (
                <li key={i} className="text-sm text-gray-800">
                  — {w}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              One honest observation
            </p>
            <p className="text-sm text-gray-800 italic">
              {patterns.one_honest_observation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}