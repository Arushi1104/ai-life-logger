"use client";

import { useState } from "react";

export default function EntryForm() {
  const [entry, setEntry] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!entry.trim()) return;
    console.log("Entry submitted:", entry);
    setSubmitted(true);
    setEntry("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="mt-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        What happened today?
      </label>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows={6}
        placeholder="Write anything — how you feel, what you did, what's on your mind..."
        className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-400">{entry.length} characters</span>
        <button
          onClick={handleSubmit}
          disabled={!entry.trim()}
          className="bg-gray-900 text-white text-sm px-5 py-2 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors"
        >
          Save entry
        </button>
      </div>
      {submitted && (
        <p className="mt-3 text-sm text-green-700">Entry saved successfully.</p>
      )}
    </div>
  );
}