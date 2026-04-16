import Link from "next/link";

const features = [
  {
    title: "AI-Powered Journaling",
    description:
      "Write your day and watch your thoughts organize themselves into beautiful, searchable archives.",
    accent: "var(--surface-low)",
  },
  {
    title: "Mood Atmosphere",
    description:
      "A non-invasive way to track your emotional baseline. No sliders or star ratings — just genuine sentiment analysis from your words.",
    accent: "#4854a7",
    dark: true,
  },
  {
    title: "Weekly Reports",
    description:
      "Every Sunday receive a beautifully curated digest of your week's narrative. Identify patterns you never knew existed.",
    accent: "var(--surface-low)",
  },
  {
    title: "Reflection Partner",
    description:
      "Not a chatbot, but a mirror. The Observer asks the questions that help you dig deeper into your own experiences.",
    accent: "var(--primary-container)",
  },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--surface)", fontFamily: "var(--font-manrope)" }}
    >
      <header
        className="sticky top-0 z-20 px-8 py-5 flex items-center justify-between"
        style={{
          background: "rgba(245, 246, 252, 0.85)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--outline-variant)",
        }}
      >
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--primary)", letterSpacing: "-0.03em" }}
        >
          ALL
        </span>
        <nav className="hidden md:flex items-center gap-8">
          {["Features", "Reflection", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm transition-colors"
              style={{ color: "var(--on-surface-variant)" }}
            >
              {item}
            </a>
          ))}
        </nav>
        <Link
          href="/journal"
          className="text-sm px-5 py-2 rounded-xl font-semibold transition-all"
          style={{
            background: `linear-gradient(135deg, var(--primary), var(--primary-dim))`,
            color: "white",
          }}
        >
          Open journal
        </Link>
      </header>

      <section className="max-w-5xl mx-auto px-8 pt-24 pb-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1
            className="text-7xl font-bold mb-2 leading-none"
            style={{ color: "var(--primary)", letterSpacing: "-0.04em" }}
          >
            ALL
          </h1>
          <p
            className="text-xl mb-6 leading-snug"
            style={{
              fontFamily: "var(--font-newsreader)",
              fontStyle: "italic",
              color: "var(--on-surface)",
            }}
          >
            ALL you need.
          </p>
          <p
            className="text-base leading-relaxed mb-10"
            style={{ color: "var(--on-surface-variant)", maxWidth: "360px" }}
          >
            The quiet observer of your life. An AI-powered journal that listens,
            remembers, and reflects with you. Private, intelligent, and deeply
            personal.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/journal"
              className="text-sm px-6 py-3 rounded-xl font-semibold transition-all"
              style={{
                background: `linear-gradient(135deg, var(--primary), var(--primary-dim))`,
                color: "white",
              }}
            >
              Start your journey
            </Link>
            <a
              href="#features"
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--on-surface-variant)" }}
            >
              See how it works
            </a>
          </div>
        </div>

        <div
          className="rounded-2xl p-6 relative"
          style={{
            background: "white",
            boxShadow: "0 20px 40px rgba(72, 84, 167, 0.08)",
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--on-surface-variant)" }}
          >
            AI Reflection
          </p>
          <p
            className="text-base leading-relaxed"
            style={{
              fontFamily: "var(--font-newsreader)",
              fontStyle: "italic",
              color: "var(--on-surface)",
              fontSize: "17px",
            }}
          >
            "I noticed you've been mentioning the morning fog lately. Is there a
            specific calm you find in the haze?"
          </p>
          <div className="flex gap-2 mt-4">
            {["Calm", "Pensive"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "var(--secondary-container)",
                  color: "var(--on-secondary-container)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="max-w-5xl mx-auto px-8 py-20"
        style={{ borderTop: "1px solid var(--outline-variant)" }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--on-surface-variant)" }}
        >
          The ecosystem
        </p>
        <h2
          className="text-3xl mb-12"
          style={{
            fontFamily: "var(--font-newsreader)",
            fontStyle: "italic",
            color: "var(--on-surface)",
          }}
        >
          A sanctuary for your thoughts.
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl p-8"
              style={{
                background: feature.dark ? feature.accent : feature.accent,
                boxShadow: "0 20px 40px rgba(72, 84, 167, 0.06)",
              }}
            >
              <h3
                className="text-base font-semibold mb-3"
                style={{
                  color: feature.dark ? "white" : "var(--on-surface)",
                  fontFamily: "var(--font-manrope)",
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: feature.dark
                    ? "rgba(255,255,255,0.75)"
                    : "var(--on-surface-variant)",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="pricing"
        className="max-w-5xl mx-auto px-8 py-20"
        style={{ borderTop: "1px solid var(--outline-variant)" }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4 text-center"
          style={{ color: "var(--on-surface-variant)" }}
        >
          Pricing
        </p>
        <h2
          className="text-3xl mb-12 text-center"
          style={{
            fontFamily: "var(--font-newsreader)",
            fontStyle: "italic",
            color: "var(--on-surface)",
          }}
        >
          Invest in your inner peace.
        </h2>
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div
            className="rounded-2xl p-8"
            style={{
              background: "white",
              boxShadow: "0 20px 40px rgba(72, 84, 167, 0.06)",
            }}
          >
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: "var(--on-surface)" }}
            >
              The Observer
            </p>
            <p
              className="text-4xl font-bold mb-6"
              style={{ color: "var(--primary)" }}
            >
              $0
              <span
                className="text-sm font-normal ml-1"
                style={{ color: "var(--on-surface-variant)" }}
              >
                /month
              </span>
            </p>
            {[
              "Unlimited basic journaling",
              "Daily mood tracking",
              "Local data encryption",
            ].map((f) => (
              <p
                key={f}
                className="text-sm mb-2"
                style={{ color: "var(--on-surface-variant)" }}
              >
                — {f}
              </p>
            ))}
            <Link
              href="/journal"
              className="block text-center text-sm font-semibold mt-6 px-5 py-2.5 rounded-xl transition-all"
              style={{
                border: "1px solid var(--primary)",
                color: "var(--primary)",
              }}
            >
              Get started
            </Link>
          </div>

          <div
            className="rounded-2xl p-8 relative"
            style={{
              background: `linear-gradient(135deg, var(--primary), var(--primary-dim))`,
              boxShadow: "0 20px 40px rgba(72, 84, 167, 0.2)",
            }}
          >
            <span
              className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: "white", color: "var(--primary)" }}
            >
              Recommended
            </span>
            <p className="text-sm font-semibold mb-1 text-white">
              The Philosopher
            </p>
            <p className="text-4xl font-bold mb-6 text-white">
              $12
              <span className="text-sm font-normal ml-1 opacity-75">
                /month
              </span>
            </p>
            {[
              "All Observer features",
              "AI Reflection Partner",
              "Weekly automated reports",
              "Voice-to-thought transcription",
            ].map((f) => (
              <p key={f} className="text-sm mb-2 text-white opacity-90">
                — {f}
              </p>
            ))}
            <Link
              href="/journal"
              className="block text-center text-sm font-semibold mt-6 px-5 py-2.5 rounded-xl transition-all"
              style={{ background: "white", color: "var(--primary)" }}
            >
              Go premium
            </Link>
          </div>
        </div>
      </section>

      <section
        className="py-24 text-center"
        style={{
          background: "var(--primary)",
        }}
      >
        <h2
          className="text-4xl mb-4 text-white"
          style={{
            fontFamily: "var(--font-newsreader)",
            fontStyle: "italic",
          }}
        >
          Ready to meet yourself?
        </h2>
        <p
          className="text-sm mb-10 opacity-75 text-white"
        >
          Join thousands of thinkers documenting their human experience.
        </p>
        <Link
          href="/journal"
          className="text-sm font-semibold px-8 py-3 rounded-xl transition-all"
          style={{ background: "white", color: "var(--primary)" }}
        >
          Start your journey
        </Link>
      </section>

      <footer
        className="px-8 py-8"
        style={{ borderTop: "1px solid var(--outline-variant)" }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span
            className="text-lg font-bold"
            style={{ color: "var(--primary)", letterSpacing: "-0.03em" }}
          >
            ALL
          </span>
          <p className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
            Reflecting the depth of your life, one thought at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}