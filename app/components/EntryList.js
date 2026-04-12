import { supabase } from "../lib/supabase";

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
            <p className="text-xs text-gray-400 mb-2">
              {new Date(entry.created_at).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
              {entry.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}