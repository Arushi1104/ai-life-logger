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
    <div
      className="rounded-2xl p-6 mt-6"
      style={{
        background: "white",
        boxShadow: "0 20px 40px rgba(72, 84, 167, 0.06)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--on-surface-variant)" }}
        >
          Insights
        </h2>
        <button
          onClick={handleFetch}
          disabled={loading}
          className="text-sm px-4 py-2 rounded-xl font-semibold transition-all"
          style={{
            background: loading
              ? "var(--surface-high)"
              : `linear-gradient(135deg, var(--primary), var(--primary-dim))`,
            color: loading ? "var(--on-surface-variant)" : "white",
            fontFamily: "var(--font-manrope)",
          }}
        >
          {loading ? "Analyzing..." : "Analyze my journal"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {open && message && (
        <p
          className="text-sm"
          style={{
            color: "var(--on-surface-variant)",
            fontFamily: "var(--font-newsreader)",
            fontStyle: "italic",
          }}
        >
          {message}
        </p>
      )}

      {open && patterns && (
        <div className="flex flex-col gap-4">
          <div
            className="rounded-xl p-4"
            style={{ background: "var(--surface-low)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--on-surface-variant)" }}
            >
              Mood trend
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-newsreader)",
                color: "var(--on-surface)",
              }}
            >
              {patterns.mood_pattern}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div
              className="rounded-xl p-4"
              style={{ background: "var(--surface-low)" }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--on-surface-variant)" }}
              >
                Recurring themes
              </p>
              <div className="flex flex-wrap gap-2">
                {patterns.recurring_themes.map((theme, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: "var(--primary-container)",
                      color: "var(--primary)",
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="rounded-xl p-4"
              style={{ background: "var(--surface-low)" }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--on-surface-variant)" }}
              >
                Watch out for
              </p>
              <div className="flex flex-wrap gap-2">
                {patterns.watch_out.map((w, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: "#fee2e2",
                      color: "#991b1b",
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ background: "var(--surface-low)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--on-surface-variant)" }}
            >
              Positive patterns
            </p>
            <ul className="flex flex-col gap-1">
              {patterns.positive_patterns.map((p, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-newsreader)",
                    color: "var(--on-surface)",
                  }}
                >
                  — {p}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-5"
            style={{
              background: `linear-gradient(135deg, var(--primary), var(--primary-dim))`,
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              One honest observation
            </p>
            <p
              className="text-base leading-relaxed"
              style={{
                fontFamily: "var(--font-newsreader)",
                fontStyle: "italic",
                color: "white",
              }}
            >
              "{patterns.one_honest_observation}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}