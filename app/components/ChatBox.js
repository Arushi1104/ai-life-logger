"use client";

import { useState } from "react";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleAsk(e) {
    e.preventDefault();
    if (!question.trim() || loading) rseturn;

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
    <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
        Ask about your journal
      </h2>

      {messages.length === 0 && (
        <div className="flex flex-col gap-2 mb-4">
          {[
            "When was the last time I felt happy?",
            "What do I keep worrying about?",
            "What have I been doing well lately?",
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setQuestion(suggestion)}
              className="text-left text-sm text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm rounded-lg px-4 py-3 ${
              msg.role === "user"
                ? "bg-gray-900 text-white self-end ml-8"
                : "bg-gray-100 text-gray-800 self-start mr-8"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-100 text-gray-400 text-sm rounded-lg px-4 py-3 self-start mr-8">
            Thinking...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk(e)}
          placeholder="Ask anything about your journal..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          onClick={handleAsk}
          disabled={!question.trim() || loading}
          className="bg-gray-900 text-white text-sm px-5 py-2 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors"
        >
          Ask
        </button>
      </div>
    </div>
  );
}