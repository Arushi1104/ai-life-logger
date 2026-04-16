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
    <div className="mb-10">
    <h2
      className="text-xs font-semibold uppercase tracking-widest mb-4"
      style={{ color: "var(--on-surface-variant)" }}
    >
      Search entries
    </h2>
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for a word or phrase..."
      className="w-full px-5 py-3 rounded-2xl text-sm transition-all"
      style={{
        background: "var(--surface-low)",
        border: "none",
        fontFamily: "var(--font-manrope)",
        color: "var(--on-surface)",
        caretColor: "var(--primary)",
      }}
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
                  className="rounded-2xl p-6"
                  style={{
                    background: "white",
                    boxShadow: "0 20px 40px rgba(72, 84, 167, 0.06)",
                    borderLeft: "3px solid var(--primary-container)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p
                      className="text-xs uppercase tracking-widest"
                      style={{ color: "var(--on-surface-variant)" }}
                    >
                      {new Date(entry.created_at).toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {entry.mood && (
                      <span
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                          background: "var(--secondary-container)",
                          color: "var(--on-secondary-container)",
                        }}
                      >
                        {entry.mood}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      fontFamily: "var(--font-newsreader)",
                      color: "var(--on-surface)",
                    }}
                  >
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