export default function Loading() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-1">AI Life Logger</h1>
      <p className="text-gray-500 text-sm">A private journal that understands you.</p>

      <div className="mt-8 flex flex-col gap-3 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-28 bg-gray-200 rounded-lg"></div>
        <div className="h-8 bg-gray-200 rounded-lg w-24 self-end"></div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col gap-3 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-40"></div>
        <div className="h-10 bg-gray-200 rounded-lg"></div>
        <div className="h-10 bg-gray-200 rounded-lg"></div>
        <div className="h-10 bg-gray-200 rounded-lg"></div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col gap-3 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-20 bg-gray-200 rounded-lg"></div>
        <div className="h-20 bg-gray-200 rounded-lg"></div>
      </div>
    </main>
  );
}