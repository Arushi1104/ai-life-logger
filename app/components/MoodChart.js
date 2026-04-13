"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const moodScore = {
  excited: 10,
  happy: 9,
  grateful: 8,
  motivated: 7,
  calm: 6,
  confused: 4,
  tired: 3,
  anxious: 2,
  sad: 1,
  angry: 0,
};

const moodColor = {
  excited: "#6366f1",
  happy: "#eab308",
  grateful: "#a855f7",
  motivated: "#22c55e",
  calm: "#14b8a6",
  confused: "#ec4899",
  tired: "#6b7280",
  anxious: "#f97316",
  sad: "#3b82f6",
  angry: "#ef4444",
};

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs shadow-sm">
        <p className="text-gray-500">{d.date}</p>
        <p className="font-medium text-gray-900 capitalize">{d.mood}</p>
      </div>
    );
  }
  return null;
}

export default function MoodChart({ entries }) {
  const data = entries
    .filter((e) => e.mood && moodScore[e.mood] !== undefined)
    .map((e) => ({
      date: new Date(e.created_at).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      }),
      score: moodScore[e.mood],
      mood: e.mood,
      color: moodColor[e.mood],
    }))
    .reverse();

  if (data.length < 2) {
    return (
      <p className="text-sm text-gray-400">
        Write at least 2 entries with detected moods to see your chart.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide domain={[0, 10]} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#111827"
          strokeWidth={1.5}
          dot={({ cx, cy, payload }) => (
            <circle
              key={payload.date}
              cx={cx}
              cy={cy}
              r={4}
              fill={payload.color}
              stroke="white"
              strokeWidth={1.5}
            />
          )}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}