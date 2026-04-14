export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f9f9f8]">
      <div className="max-w-2xl mx-auto px-8 py-10">
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="grid grid-cols-3 gap-3">
            <div className="h-20 bg-gray-200 rounded-2xl"></div>
            <div className="h-20 bg-gray-200 rounded-2xl"></div>
            <div className="h-20 bg-gray-200 rounded-2xl"></div>
          </div>
          <div className="h-48 bg-gray-200 rounded-2xl mt-4"></div>
          <div className="h-24 bg-gray-200 rounded-2xl"></div>
          <div className="h-24 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}