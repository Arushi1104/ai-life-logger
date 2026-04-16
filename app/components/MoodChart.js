"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
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
      <div
        className="rounded-xl px-4 py-3 text-xs"
        style={{
          background: "white",
          boxShadow: "0 20px 40px rgba(72, 84, 167, 0.12)",
          fontFamily: "var(--font-manrope)",
          color: "var(--on-surface)",
        }}
      >
        <p style={{ color: "var(--on-surface-variant)" }}>{d.date}</p>
        <p className="font-semibold capitalize mt-0.5">{d.mood}</p>
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
      <p
        className="text-sm py-4 text-center"
        style={{ color: "var(--on-surface-variant)" }}
      >
        Write at least 2 entries with detected moods to see your chart.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4854a7" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#4854a7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tick={{
            fontSize: 11,
            fill: "#9496a8",
            fontFamily: "var(--font-manrope)",
          }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide domain={[0, 10]} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#4854a7"
          strokeWidth={2}
          fill="url(#moodGradient)"
          dot={({ cx, cy, payload }) => (
            <circle
              key={payload.date}
              cx={cx}
              cy={cy}
              r={5}
              fill={payload.color}
              stroke="white"
              strokeWidth={2}
            />
          )}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}