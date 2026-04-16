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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--surface)" }}>
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        background: "rgba(245, 246, 252, 0.85)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid var(--outline-variant)",
        fontFamily: "var(--font-manrope)",
      }}>
        <span style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "var(--primary)",
          letterSpacing: "-0.03em",
        }}>
          ALL
        </span>
        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontSize: "14px",
                textDecoration: "none",
                color: pathname === item.href ? "var(--primary)" : "var(--on-surface-variant)",
                fontWeight: pathname === item.href ? 600 : 400,
                transition: "color 0.2s",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "var(--primary-container)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 600,
          color: "var(--primary)",
        }}>
          J
        </div>
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        <aside style={{
          width: "220px",
          flexShrink: 0,
          padding: "32px 16px",
          background: "var(--surface-low)",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}>
          <div style={{ padding: "0 12px", marginBottom: "24px" }}>
            <p style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--primary)",
              letterSpacing: "-0.02em",
            }}>ALL</p>
            <p style={{
              fontSize: "11px",
              color: "var(--on-surface-variant)",
              marginTop: "2px",
            }}>AI Life Logger</p>
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontSize: "14px",
                textDecoration: "none",
                padding: "10px 12px",
                borderRadius: "12px",
                color: pathname === item.href ? "var(--primary)" : "var(--on-surface-variant)",
                background: pathname === item.href ? "var(--primary-container)" : "transparent",
                fontWeight: pathname === item.href ? 600 : 400,
                transition: "all 0.2s",
              }}
            >
              {item.label}
            </Link>
          ))}
        </aside>

        <main style={{ flex: 1, minWidth: 0 }}>
          {children}
        </main>
      </div>
    </div>
  );
}