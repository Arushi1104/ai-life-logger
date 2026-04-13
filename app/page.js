import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";
import ChatBox from "./components/ChatBox";
import PatternReport from "./components/PatternReport";
import WeeklyReport from "./components/WeeklyReport";

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-1">AI Life Logger</h1>
      <p className="text-gray-500 text-sm">A private journal that understands you.</p>
      <EntryForm />
      <WeeklyReport />
      <PatternReport />
      <ChatBox />
      <EntryList />
    </main>
  );
}