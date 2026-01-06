// 2. Bookings.jsx - Enhanced with better card design
import { Clock, Users, Calendar, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Bookings = ({ bookings }) => (
  <div className="bg-white p-6 rounded-xl border shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-800">My Bookings</h2>
      <span className="text-sm text-[#004E64] font-medium">
        {bookings.length} total
      </span>
    </div>

    {bookings.length === 0 ? (
      <div className="text-center py-8">
        <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No bookings yet</p>
        <p className="text-sm text-gray-400 mt-1">
          Start exploring properties to make your first booking
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        {bookings.map((b, index) => (
          <motion.div
            key={b._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-100 p-4 rounded-xl hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-800">{b.property.title}</h3>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={14} className="text-[#E3B04B]" />
              <span className="text-sm text-gray-600">{b.property.location}</span>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-lg">
                <Clock size={14} className="text-[#004E64]" />
                <span className="text-[#004E64] font-medium">
                  {new Date(b.checkIn).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-lg">
                <Users size={14} className="text-[#E3B04B]" />
                <span className="text-[#E3B04B] font-medium">{b.guests} guests</span>
              </div>
              
              <div className="ml-auto">
                <span className="font-bold text-lg text-[#004E64]">
                  ₹{b.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </div>
);

export default Bookings;