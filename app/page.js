import Link from "next/link";

const features = [
  {
    title: "Mood detection",
    description:
      "Every entry is automatically analyzed and tagged with your mood. No manual input needed.",
  },
  {
    title: "Ask your journal",
    description:
      "Ask questions like 'when was the last time I felt happy?' and get answers from your own words.",
  },
  {
    title: "Pattern detection",
    description:
      "An AI agent reads across all your entries and surfaces recurring themes and emotional patterns.",
  },
  {
    title: "Weekly report",
    description:
      "Every week a personal report is generated — a mood arc, highlights, and an honest reflection.",
  },
  {
    title: "Streak tracker",
    description:
      "See how many days in a row you have written. Building the habit is half the work.",
  },
  {
    title: "Mood chart",
    description:
      "A visual graph of your emotional journey over time, built from your entries automatically.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f8]">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            AI Life Logger
          </span>
          <Link
            href="/journal"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Open journal
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8">
        <section className="py-24 max-w-2xl">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-6">
            Private. Personal. Intelligent.
          </p>
          <h1 className="text-5xl font-semibold text-gray-900 leading-tight mb-6">
            A journal that understands your life.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-10">
            Write about your day. AI Life Logger reads your entries, detects
            your mood, finds patterns, and has real conversations with you about
            your own life.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/journal"
              className="bg-gray-900 text-white text-sm px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors font-medium"
            >
              Start journaling
            </Link>
            <span className="text-sm text-gray-400">Free to use. No account needed yet.</span>
          </div>
        </section>

        <section className="py-16 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-10">
            What it does
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-200 rounded-2xl p-6"
              >
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-gray-200">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Built for reflection, not distraction.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              No social features. No notifications. No feed. Just you, your
              thoughts, and an AI that helps you understand yourself better over
              time.
            </p>
            <Link
              href="/journal"
              className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors"
            >
              Open your journal
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <p className="text-xs text-gray-400">
            AI Life Logger — built with Next.js, Supabase, and Groq.
          </p>
        </div>
      </footer>
    </div>
  );
}