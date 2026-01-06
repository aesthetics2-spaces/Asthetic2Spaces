// 6. WelcomeSection.jsx - Enhanced with gradient and animation
import { motion } from "framer-motion";
import { Sparkles, Sun } from "lucide-react";

const WelcomeSection = ({ user }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden bg-gradient-to-r from-[#004E64] via-[#2A8BA5] to-[#46B5D1] rounded-2xl p-8 text-white mb-8 shadow-xl"
  >
    {/* Background elements */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E3B04B]/10 rounded-full -translate-x-24 translate-y-24"></div>
    
    <div className="relative flex flex-col lg:flex-row justify-between items-center">
      <div className="lg:w-2/3">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Sun className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium text-blue-100">
            Good Morning
          </span>
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl">
          Manage your bookings, explore your wishlist, and discover new properties tailored just for you.
        </p>
        
        <div className="flex gap-4 mt-6">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Dashboard Updated</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 lg:mt-0">
        <div className="relative">
          <Sparkles className="h-16 w-16 text-[#E3B04B]" />
          <div className="absolute inset-0 bg-[#E3B04B] rounded-full blur-xl opacity-30"></div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default WelcomeSection;