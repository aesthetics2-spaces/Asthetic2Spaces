// 5. StatsCards.jsx - Enhanced with better animations
import { Heart, Calendar, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const StatsCards = ({ saved, bookings }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <Stat 
      title="Saved Properties" 
      value={saved.length} 
      icon={<Heart className="h-5 w-5" />} 
      color="bg-gradient-to-br from-amber-50 to-amber-100"
      iconColor="bg-gradient-to-br from-[#E3B04B] to-amber-400"
      delay={0.1}
    />
    <Stat 
      title="My Bookings" 
      value={bookings.length} 
      icon={<Calendar className="h-5 w-5" />} 
      color="bg-gradient-to-br from-blue-50 to-cyan-50"
      iconColor="bg-gradient-to-br from-[#004E64] to-[#46B5D1]"
      delay={0.2}
    />
    <Stat 
      title="AI Suggestions" 
      value="Smart" 
      icon={<Sparkles className="h-5 w-5" />} 
      color="bg-gradient-to-br from-cyan-50 to-blue-50"
      iconColor="bg-gradient-to-br from-[#46B5D1] to-cyan-400"
      delay={0.3}
    />
  </div>
);

const Stat = ({ title, value, icon, color, iconColor, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.03, y: -5 }}
    className="bg-white p-6 rounded-xl border shadow-sm"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-600 mb-2">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`${iconColor} p-3 rounded-xl text-white shadow-lg`}>
        {icon}
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <TrendingUp className="h-4 w-4" />
        <span>Updated in real-time</span>
      </div>
    </div>
  </motion.div>
);

export default StatsCards;