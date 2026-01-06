// 1. AISidebar.jsx - Enhanced with better styling and icons
import { Sparkles, Zap, Crown, Wand2 } from "lucide-react";

const AISidebar = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-br from-[#004E64] to-[#46B5D1] text-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5" />
        <h2 className="font-bold text-xl">AI Property Consultant</h2>
      </div>
      <p className="text-blue-50 mb-4 text-sm">
        Get personalized property recommendations and insights
      </p>
      <button className="flex items-center justify-center gap-2 bg-white text-[#004E64] w-full py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg">
        <Wand2 size={18} /> Launch AI Assistant
      </button>
    </div>

    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-[#E3B04B]" />
        <h2 className="font-bold text-gray-800">Design Generator</h2>
      </div>
      <p className="text-gray-600 mb-4 text-sm">
        Generate interior designs for your properties
      </p>
      <button className="bg-gradient-to-r from-[#E3B04B] to-[#f0c15e] text-white w-full py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg">
        Generate Designs
      </button>
    </div>

    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Crown className="h-5 w-5 text-yellow-500" />
        <h2 className="font-bold text-gray-800">Premium Features</h2>
      </div>
      <ul className="space-y-2 text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 bg-[#46B5D1] rounded-full"></div>
          Advanced AI Analytics
        </li>
        <li className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 bg-[#46B5D1] rounded-full"></div>
          3D Property Tours
        </li>
        <li className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 bg-[#46B5D1] rounded-full"></div>
          Priority Support
        </li>
      </ul>
    </div>
  </div>
);

export default AISidebar;