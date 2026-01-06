// 4. SearchCTA.jsx - Enhanced with better styling
import { Search, ArrowRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const SearchCTA = () => (
  <div className="bg-gradient-to-r from-white to-blue-50 p-6 rounded-xl border shadow-sm relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#46B5D1] opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#004E64] rounded-lg">
          <Home className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Find Your Perfect Property
          </h2>
          <p className="text-gray-600">
            Browse through our exclusive collection
          </p>
        </div>
      </div>
      
      <Link
        to="/properties"
        className="inline-flex items-center gap-3 bg-gradient-to-r from-[#004E64] to-[#46B5D1] text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 shadow-md"
      >
        <Search size={20} />
        <span>Explore Properties</span>
        <ArrowRight size={18} />
      </Link>
    </div>
  </div>
);

export default SearchCTA;