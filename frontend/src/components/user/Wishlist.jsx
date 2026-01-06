import { MapPin, ChevronRight, Image, Home, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Wishlist = ({ saved, setSaved }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

const handleUnlike = async (propertyId, e) => {
  e.stopPropagation();

  try {
    await axios.post(
      `https://asthetic2spaces-2.onrender.com/api/favorites/unlike/${propertyId}`,
      { userId: user.id } 
    );

    setSaved(prev => prev.filter(p => p._id !== propertyId));
  } catch (err) {
    console.error("Error unliking property", err);
  }
};


  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Saved Properties</h2>
          <p className="text-sm text-gray-500">
            Properties you’re interested in
          </p>
        </div>

        <Link
          to="/user/saved"
          className="flex items-center gap-1 text-[#004E64] font-medium hover:text-[#46B5D1]"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Empty */}
      {saved.length === 0 ? (
        <div className="text-center py-10">
          <Home className="h-14 w-14 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">
            No saved properties yet
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {saved.slice(0, 3).map((p, index) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/property/${p._id}`)}
              className="relative cursor-pointer flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#46B5D1]/40 hover:shadow-md transition"
            >
              {/* ❌ Remove Button */}
              <button
                onClick={(e) => handleUnlike(p._id, e)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image */}
              <div className="w-28 h-24 rounded-lg overflow-hidden bg-gray-100">
                {p.images?.[0] ? (
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {p.title}
                </h3>

                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin size={14} />
                  <span>{p.location}</span>
                </div>

                <div className="flex gap-3 text-sm text-gray-600 mb-2">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {p.type || "Property"}
                  </span>
                  {p.area && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {p.area} sq.ft
                    </span>
                  )}
                </div>

                <p className="text-lg font-bold text-[#004E64]">
                  ₹{p.price?.toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
