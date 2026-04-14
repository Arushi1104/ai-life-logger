import SidebarLayout from "../components/ui/SidebarLayout";
import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import ChatBox from "../components/ChatBox";
import PatternReport from "../components/PatternReport";
import WeeklyReport from "../components/WeeklyReport";
import StreakTracker from "../components/StreakTracker";

export default function JournalPage() {
  return (
    <SidebarLayout>
      <div className="max-w-3xl mx-auto px-8 py-10">
        <h1
          className="text-4xl mb-1"
          style={{
            fontFamily: "var(--font-newsreader)",
            fontStyle: "italic",
            color: "var(--on-surface)",
          }}
        >
          How are you today?
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--on-surface-variant)" }}>
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
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