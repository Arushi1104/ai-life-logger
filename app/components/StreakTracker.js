import { supabase } from "../lib/supabase";

export default async function StreakTracker() {
  const { data: entries, error } = await supabase
    .from("entries")
    .select("created_at")
    .order("created_at", { ascending: false });

  if (error || !entries || entries.length === 0) {
    return null;
  }

  const uniqueDays = [
    ...new Set(
      entries.map((e) =>
        new Date(e.created_at).toLocaleDateString("en-CA")
      )
    ),
  ];

  let streak = 0;
  const today = new Date().toLocaleDateString("en-CA");
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("en-CA");

  const startDay =
    uniqueDays[0] === today || uniqueDays[0] === yesterday
      ? uniqueDays[0]
      : null;

  if (startDay) {
    let current = new Date(startDay);
    for (const day of uniqueDays) {
      const expected = current.toLocaleDateString("en-CA");
      if (day === expected) {
        streak++;
        current = new Date(current.getTime() - 86400000);
      } else {
        break;
      }
    }
  }

  const totalEntries = entries.length;
  const longestStreak = (() => {
    let longest = 0;
    let current = 1;
    for (let i = 1; i < uniqueDays.length; i++) {
      const prev = new Date(uniqueDays[i - 1]);
      const curr = new Date(uniqueDays[i]);
      const diffDays = Math.round((prev - curr) / 86400000);
      if (diffDays === 1) {
        current++;
        if (current > longest) longest = current;
      } else {
        current = 1;
      }
    }
    return Math.max(longest, streak);
  })();

  const stats = [
    { value: streak, label: "day streak" },
    { value: totalEntries, label: "total entries" },
    { value: longestStreak, label: "longest streak" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl p-4 text-center"
          style={{
            background: "white",
            boxShadow: "0 20px 40px rgba(72, 84, 167, 0.06)",
          }}
        >
          <p
            className="text-3xl font-bold"
            style={{ color: "var(--primary)" }}
          >
            {stat.value}
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--on-surface-variant)" }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}