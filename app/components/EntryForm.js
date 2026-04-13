"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function EntryForm() {
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!entry.trim()) return;

    setLoading(true);
    setError(null);

    const moodRes = await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: entry.trim() }),
    });

    const moodData = await moodRes.json();
    const mood = moodData.mood || null;

    const { error } = await supabase
      .from("entries")
      .insert({ content: entry.trim(), mood });

    if (error) {
      setError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
      setEntry("");
      router.refresh();
      setTimeout(() => setSubmitted(false), 3000);
    }

    setLoading(false);
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
          disabled={!entry.trim() || loading}
          className="bg-gray-900 text-white text-sm px-5 py-2 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors"
        >
          {loading ? "Saving..." : "Save entry"}
        </button>
      </div>
      {submitted && (
        <p className="mt-3 text-sm text-green-700">Entry saved successfully.</p>
      )}
      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}