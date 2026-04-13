"use client";

import { useState } from "react";

export default function WeeklyReport() {
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState(null);
  const [entryCount, setEntryCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  async function handleFetch() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/weekly-report");
    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else if (data.message) {
      setMessage(data.message);
      setOpen(true);
    } else {
      setReport(data.report);
      setEntryCount(data.entryCount);
      setOpen(true);
    }

    setLoading(false);
  }

  const today = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Weekly report
        </h2>
        <button
          onClick={handleFetch}
          disabled={loading}
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors"
        >
          {loading ? "Generating..." : "Generate this week"}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {open && message && (
        <p className="text-sm text-gray-500">{message}</p>
      )}

      {open && report && (
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col gap-5">
          <div className="border-b border-gray-100 pb-4">
            <p className="text-xs text-gray-400 mb-1">{today}</p>
            <p className="text-base font-medium text-gray-900">
              {report.greeting}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Based on {entryCount} {entryCount === 1 ? "entry" : "entries"} this week
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              How your week went
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              {report.mood_arc}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Highlights
            </p>
            <ul className="flex flex-col gap-1">
              {report.highlights.map((h, i) => (
                <li key={i} className="text-sm text-gray-800">
                  — {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Reflection
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              {report.reflection}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-500 italic">
              {report.going_forward}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}