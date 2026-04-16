"use client";

import { useState } from "react";

const suggestions = [
  "When was the last time I felt happy?",
  "What do I keep worrying about?",
  "What have I been doing well lately?",
];

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim() || loading) return;

    const userMessage = question.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setQuestion("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userMessage }),
    });

    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.answer || data.error || "Something went wrong.",
      },
    ]);

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
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-6"
        style={{ color: "var(--on-surface-variant)" }}
      >
        Your reflection partner
      </h2>

      {messages.length === 0 && (
        <div className="flex flex-col gap-2 mb-6">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuestion(s)}
              className="text-left text-sm px-4 py-3 rounded-xl transition-all"
              style={{
                background: "var(--surface-low)",
                color: "var(--on-surface-variant)",
                fontFamily: "var(--font-newsreader)",
                fontStyle: "italic",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <p
                className="text-xs uppercase tracking-widest mb-1 self-start"
                style={{ color: "var(--on-surface-variant)" }}
              >
                The Observer
              </p>
            )}
            <div
              className="text-sm rounded-2xl px-5 py-4 max-w-sm"
              style={{
                background:
                  msg.role === "user"
                    ? `linear-gradient(135deg, var(--primary), var(--primary-dim))`
                    : "var(--surface-low)",
                color:
                  msg.role === "user" ? "white" : "var(--on-surface)",
                fontFamily: "var(--font-newsreader)",
                fontSize: "15px",
                lineHeight: "1.7",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div
              className="text-sm rounded-2xl px-5 py-4"
              style={{
                background: "var(--surface-low)",
                color: "var(--on-surface-variant)",
                fontFamily: "var(--font-newsreader)",
                fontStyle: "italic",
              }}
            >
              Partnering is reflecting...
            </div>
          </div>
        )}
      </div>

      <div
        className="flex gap-2 mt-4 pt-4"
        style={{ borderTop: "1px solid var(--outline-variant)" }}
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Write your thoughts..."
          className="flex-1 px-5 py-3 rounded-2xl text-sm"
          style={{
            background: "var(--surface-low)",
            border: "none",
            fontFamily: "var(--font-newsreader)",
            fontStyle: "italic",
            color: "var(--on-surface)",
            caretColor: "var(--primary)",
          }}
        />
        <button
          onClick={handleAsk}
          disabled={!question.trim() || loading}
          className="px-5 py-3 rounded-2xl text-sm font-semibold transition-all"
          style={{
            background:
              !question.trim() || loading
                ? "var(--surface-high)"
                : `linear-gradient(135deg, var(--primary), var(--primary-dim))`,
            color:
              !question.trim() || loading
                ? "var(--on-surface-variant)"
                : "white",
            fontFamily: "var(--font-manrope)",
          }}
        >
          Ask
        </button>
      </div>
    </div>
  );
}