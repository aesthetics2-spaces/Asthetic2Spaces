// 3. LoadingScreen.jsx - Enhanced with better animation
const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#F9FAFB] to-white">
    <div className="relative">
      <div className="h-20 w-20 border-4 border-gray-200 rounded-full"></div>
      <div className="absolute top-0 left-0 h-20 w-20 border-4 border-t-[#004E64] border-r-[#46B5D1] border-b-[#E3B04B] border-l-transparent rounded-full animate-spin"></div>
    </div>
    <p className="mt-6 text-gray-600 font-medium">Loading your dashboard...</p>
    <div className="mt-2 flex space-x-1">
      <div className="h-1 w-1 bg-[#004E64] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="h-1 w-1 bg-[#46B5D1] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="h-1 w-1 bg-[#E3B04B] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  </div>
);

export default LoadingScreen;