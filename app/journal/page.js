import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import ChatBox from "../components/ChatBox";
import PatternReport from "../components/PatternReport";
import WeeklyReport from "../components/WeeklyReport";
import StreakTracker from "../components/StreakTracker";

export default function JournalPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-gray-900 leading-none">
              AI Life Logger
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              A private journal that understands you
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
            <span className="text-white text-xs font-medium">J</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-10">
        <StreakTracker />
        <EntryForm />
        <WeeklyReport />
        <PatternReport />
        <ChatBox />
        <EntryList />
      </main>
    </div>
  );
}