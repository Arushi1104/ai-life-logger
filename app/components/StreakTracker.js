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

  const startDay = uniqueDays[0] === today || uniqueDays[0] === yesterday
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

  return (
    <div className="mt-8 grid grid-cols-3 gap-3">
      <div className="border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-2xl font-semibold text-gray-900">{streak}</p>
        <p className="text-xs text-gray-400 mt-1">day streak</p>
      </div>
      <div className="border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-2xl font-semibold text-gray-900">{totalEntries}</p>
        <p className="text-xs text-gray-400 mt-1">total entries</p>
      </div>
      <div className="border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-2xl font-semibold text-gray-900">{longestStreak}</p>
        <p className="text-xs text-gray-400 mt-1">longest streak</p>
      </div>
    </div>
  );
}