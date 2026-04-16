import SidebarLayout from "../components/ui/SidebarLayout";
import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import ChatBox from "../components/ChatBox";
import PatternReport from "../components/PatternReport";
import WeeklyReport from "../components/WeeklyReport";
import StreakTracker from "../components/StreakTracker";

export default function JournalPage() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <SidebarLayout>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 32px" }}>
        <h1 style={{
          fontFamily: "var(--font-newsreader)",
          fontStyle: "italic",
          fontSize: "42px",
          fontWeight: 400,
          color: "var(--on-surface)",
          marginBottom: "4px",
          lineHeight: 1.2,
        }}>
          How are you today?
        </h1>
        <p style={{
          fontSize: "13px",
          color: "var(--on-surface-variant)",
          marginBottom: "32px",
        }}>
          {today}
        </p>
        <StreakTracker />
        <EntryForm />
        <WeeklyReport />
        <PatternReport />
        <ChatBox />
        <EntryList />
      </div>
    </SidebarLayout>
  );
}