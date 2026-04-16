import { supabase } from "../lib/supabase";
import MoodChart from "./MoodChart";
import SearchEntries from "./SearchEntries";

export default async function EntryList() {
  const { data: entries, error } = await supabase
    .from("entries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <p className="text-sm mt-8" style={{ color: "var(--on-surface-variant)" }}>
        Could not load entries.
      </p>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <p className="text-sm mt-8" style={{ color: "var(--on-surface-variant)" }}>
        No entries yet. Write your first one above.
      </p>
    );
  }

  const moodStyles = {
    happy: { background: "#fef9c3", color: "#854d0e" },
    sad: { background: "#dbeafe", color: "#1e40af" },
    anxious: { background: "#ffedd5", color: "#9a3412" },
    angry: { background: "#fee2e2", color: "#991b1b" },
    calm: { background: "#ccfbf1", color: "#134e4a" },
    motivated: { background: "#dcfce7", color: "#166534" },
    tired: { background: "#f3f4f6", color: "#374151" },
    grateful: { background: "#ede9fe", color: "#5b21b6" },
    confused: { background: "#fce7f3", color: "#9d174d" },
    excited: { background: "#e0e7ff", color: "#3730a3" },
  };

  const grouped = entries.reduce((acc, entry) => {
    const month = new Date(entry.created_at).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
    if (!acc[month]) acc[month] = [];
    acc[month].push(entry);
    return acc;
  }, {});

  return (
    <div className="mt-10">
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-6"
        style={{ color: "var(--on-surface-variant)" }}
      >
        Mood over time
      </h2>
      <div
        className="rounded-2xl p-6 mb-10"
        style={{
          background: "white",
          boxShadow: "0 20px 40px rgba(72, 84, 167, 0.06)",
        }}
      >
        <MoodChart entries={entries} />
      </div>

      <SearchEntries entries={entries} />

      <h2
        className="text-xs font-semibold uppercase tracking-widest mt-10 mb-6"
        style={{ color: "var(--on-surface-variant)" }}
      >
        Recent reflections
      </h2>

      {Object.entries(grouped).map(([month, monthEntries]) => (
        <div key={month} className="mb-8">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--on-surface-variant)", opacity: 0.6 }}
          >
            {month}
          </p>
          <div className="flex flex-col gap-4">
            {monthEntries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl p-6"
                style={{
                  background: "white",
                  boxShadow: "0 20px 40px rgba(72, 84, 167, 0.06)",
                  borderLeft: "3px solid var(--primary-container)",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <p
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "var(--on-surface-variant)" }}
                  >
                    {new Date(entry.created_at).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {entry.mood && (
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full shrink-0 ml-3"
                      style={
                        moodStyles[entry.mood] || {
                          background: "var(--secondary-container)",
                          color: "var(--on-secondary-container)",
                        }
                      }
                    >
                      {entry.mood}
                    </span>
                  )}
                </div>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: "var(--font-newsreader)",
                    color: "var(--on-surface)",
                  }}
                >
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}