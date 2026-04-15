"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const moodSuggestions = [
  "Feeling Grateful",
  "Feeling Anxious",
  "Feeling Motivated",
  "Feeling Tired",
  "Feeling Happy",
  "Feeling Reflective",
];

export default function EntryForm() {
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [activeSuggestion, setActiveSuggestion] = useState(null);
  const router = useRouter();

  async function handleSubmit() {
    if (!entry.trim()) return;
    setLoading(true);
    setError(null);

    const fullContent = activeSuggestion
      ? `${activeSuggestion}. ${entry.trim()}`
      : entry.trim();

    const moodRes = await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: fullContent }),
    });

    const moodData = await moodRes.json();
    const mood = moodData.mood || null;

    const { error } = await supabase
      .from("entries")
      .insert({ content: fullContent, mood });

    if (error) {
      setError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
      setEntry("");
      setActiveSuggestion(null);
      router.refresh();
      setTimeout(() => setSubmitted(false), 3000);
    }

    setLoading(false);
  }

  return (
    <div
      className="rounded-2xl p-6 mb-8"
      style={{
        background: "white",
        boxShadow: "0 20px 40px rgba(72, 84, 167, 0.06)",
      }}
    >
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows={5}
        placeholder="Write a few lines about your day..."
        className="w-full text-sm leading-relaxed resize-none bg-transparent"
        style={{
          fontFamily: "var(--font-newsreader)",
          fontSize: "16px",
          color: "var(--on-surface)",
          caretColor: "var(--primary)",
          border: "none",
        }}
      />

      <div className="flex items-center justify-between mt-4 pt-4"
        style={{ borderTop: "1px solid var(--outline-variant)" }}
      >
        <div className="flex flex-wrap gap-2">
          {moodSuggestions.map((s) => (
            <button
              key={s}
              onClick={() =>
                setActiveSuggestion(activeSuggestion === s ? null : s)
              }
              className="text-xs px-3 py-1.5 rounded-full transition-all"
              style={{
                background:
                  activeSuggestion === s
                    ? "var(--primary)"
                    : "var(--secondary-container)",
                color:
                  activeSuggestion === s
                    ? "white"
                    : "var(--on-secondary-container)",
                fontFamily: "var(--font-manrope)",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!entry.trim() || loading}
          className="text-sm px-5 py-2 rounded-xl font-semibold transition-all shrink-0 ml-4"
          style={{
            background: !entry.trim() || loading
              ? "var(--surface-high)"
              : `linear-gradient(135deg, var(--primary), var(--primary-dim))`,
            color: !entry.trim() || loading
              ? "var(--on-surface-variant)"
              : "white",
            fontFamily: "var(--font-manrope)",
          }}
        >
          {loading ? "Saving..." : "Save Entry"}
        </button>
      </div>

      {submitted && (
        <p className="mt-3 text-sm" style={{ color: "var(--primary)" }}>
          Entry saved successfully.
        </p>
      )}
      {error && (
        <p className="mt-3 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}