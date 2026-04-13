import { supabase } from "../lib/supabase";

const moodColors = {
  happy: "bg-yellow-100 text-yellow-800",
  sad: "bg-blue-100 text-blue-800",
  anxious: "bg-orange-100 text-orange-800",
  angry: "bg-red-100 text-red-800",
  calm: "bg-teal-100 text-teal-800",
  motivated: "bg-green-100 text-green-800",
  tired: "bg-gray-100 text-gray-600",
  grateful: "bg-purple-100 text-purple-800",
  confused: "bg-pink-100 text-pink-800",
  excited: "bg-indigo-100 text-indigo-800",
};

export default async function EntryList() {
  const { data: entries, error } = await supabase
    .from("entries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-sm text-red-600 mt-8">Could not load entries.</p>;
  }

  if (!entries || entries.length === 0) {
    return (
      <p className="text-sm text-gray-400 mt-8">
        No entries yet. Write your first one above.
      </p>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
        Past entries
      </h2>

      <div className="flex flex-col gap-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400">
                {new Date(entry.created_at).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {entry.mood && (
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    moodColors[entry.mood] ||
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {entry.mood}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-400 whitespace-pre-wrap leading-relaxed">
              {entry.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}