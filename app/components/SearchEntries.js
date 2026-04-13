"use client";

import { useState } from "react";

export default function SearchEntries({ entries }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? entries.filter((e) =>
        e.content.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const moodColors = {
    happy: "bg-yellow-100 text-yellow-800",
    sad: "bg-blue-100 text-blue-800",
    anxious: "bg-orange-100 text-orange-800",
    angry: "bg-red-100 text-red-800",
    calm: "bg-teal-100 text-teal-800",
    motivated: "bg-green-100 text-green-800",
    tired: "bg-gray-100 text-gray-600",
    grateful: "bg-purple-100 text-purple-800",
    confused: "bg-pink-100 text-pink-800",
    excited: "bg-indigo-100 text-indigo-800",
  };

  function highlight(text, query) {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 text-gray-900 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  }

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
        Search entries
      </h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a word or phrase..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      {query.trim() && (
        <div className="mt-4">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400">
              No entries found for "{query}".
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-gray-400">
                {filtered.length} {filtered.length === 1 ? "entry" : "entries"} found
              </p>
              {filtered.map((entry) => (
                <div
                  key={entry.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-400">
                      {new Date(entry.created_at).toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {entry.mood && (
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          moodColors[entry.mood] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {entry.mood}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {highlight(entry.content, query)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}