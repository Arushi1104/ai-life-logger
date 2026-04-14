"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/journal" },
  { label: "Journal", href: "/journal/archive" },
  { label: "AI Chat", href: "/journal/chat" },
  { label: "Insights", href: "/journal/insights" },
  { label: "Weekly Report", href: "/journal/weekly" },
];

export default function SidebarLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <header
        className="sticky top-0 z-20 border-b flex items-center justify-between px-8 py-4"
        style={{
          background: "rgba(245, 246, 252, 0.85)",
          backdropFilter: "blur(24px)",
          borderColor: "var(--outline-variant)",
          fontFamily: "var(--font-manrope)",
        }}
      >
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--primary)", letterSpacing: "-0.03em" }}
        >
          ALL
        </span>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm transition-colors"
              style={{
                color:
                  pathname === item.href
                    ? "var(--primary)"
                    : "var(--on-surface-variant)",
                fontWeight: pathname === item.href ? 600 : 400,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
          style={{
            background: "var(--primary-container)",
            color: "var(--primary)",
          }}
        >
          J
        </div>
      </header>

      <div className="flex flex-1">
        <aside
          className="hidden md:flex flex-col w-52 shrink-0 px-4 py-8 gap-1"
          style={{ background: "var(--surface-low)" }}
        >
          <p
            className="text-xs font-bold mb-4 px-3"
            style={{ color: "var(--primary)", letterSpacing: "0.05em" }}
          >
            ALL
            <span
              className="block text-xs font-normal mt-0.5"
              style={{ color: "var(--on-surface-variant)", letterSpacing: 0 }}
            >
              AI Life Logger
            </span>
          </p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm px-3 py-2 rounded-xl transition-colors"
              style={{
                color:
                  pathname === item.href
                    ? "var(--primary)"
                    : "var(--on-surface-variant)",
                background:
                  pathname === item.href
                    ? "var(--primary-container)"
                    : "transparent",
                fontWeight: pathname === item.href ? 600 : 400,
              }}
            >
              {item.label}
            </Link>
          ))}
        </aside>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}