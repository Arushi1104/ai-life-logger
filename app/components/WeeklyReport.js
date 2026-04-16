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
          Weekly report
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
          {loading ? "Generating..." : "Generate this week"}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

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

      {open && report && (
        <div className="flex flex-col gap-5">
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--on-surface-variant)" }}
            >
              {today} — {entryCount}{" "}
              {entryCount === 1 ? "entry" : "entries"} this week
            </p>
            <h3
              className="text-2xl leading-snug"
              style={{
                fontFamily: "var(--font-newsreader)",
                fontStyle: "italic",
                color: "var(--on-surface)",
              }}
            >
              {report.greeting}
            </h3>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ background: "var(--surface-low)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--on-surface-variant)" }}
            >
              How your week went
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-newsreader)",
                color: "var(--on-surface)",
              }}
            >
              {report.mood_arc}
            </p>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ background: "var(--surface-low)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--on-surface-variant)" }}
            >
              Highlights
            </p>
            <ul className="flex flex-col gap-2">
              {report.highlights.map((h, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-newsreader)",
                    color: "var(--on-surface)",
                  }}
                >
                  — {h}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ background: "var(--surface-low)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--on-surface-variant)" }}
            >
              Reflection
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-newsreader)",
                color: "var(--on-surface)",
              }}
            >
              {report.reflection}
            </p>
          </div>

          <div
            className="rounded-xl p-5"
            style={{
              background: `linear-gradient(135deg, var(--primary), var(--primary-dim))`,
            }}
          >
            <p
              className="text-base leading-relaxed"
              style={{
                fontFamily: "var(--font-newsreader)",
                fontStyle: "italic",
                color: "white",
              }}
            >
              "{report.going_forward}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}