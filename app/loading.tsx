export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-white text-lg font-medium">Loading Know-Your-Rights Cards...</p>
      </div>
    </div>
  );
}
