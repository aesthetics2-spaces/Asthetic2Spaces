import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property, userId, isLiked }) => {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(isLiked);

  useEffect(() => {
    setIsFav(isLiked);
  }, [isLiked]);

  const toggleFav = async (e) => {
    e.stopPropagation();

    if (!userId) {
      alert("Please login to save properties");
      return;
    }

    const next = !isFav;
    setIsFav(next);

    try {
      await fetch(
        `https://asthetic2spaces-3.onrender.com/api/favorites/${next ? "like" : "unlike"}/${property._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
    } catch {
      setIsFav(!next);
    }
  };

  const image =
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800";

  const badgeText = property.type
    ? property.type.charAt(0).toUpperCase() + property.type.slice(1)
    : "Property";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover="hover"
      className="relative h-[320px] mb-10 rounded-2xl overflow-hidden cursor-pointer shadow-md bg-neutral"
      
    >
      {/* Image */}
      <img
        src={image}
        alt={property.title}
        className="w-full h-full object-cover"
      />

      {/* 🔖 Permanent Badge */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-neutral text-xs font-semibold px-3 py-1 rounded-full shadow">
        {badgeText}
      </div>

      {/* Dark Overlay on Hover */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40"
      />

      {/* ❤️ Favorite */}
      <motion.button
        onClick={toggleFav}
        variants={{ hover: { y: 0, opacity: 1 } }}
        initial={{ y: -20, opacity: 0 }}
        className="absolute top-4 right-4 z-20 bg-white p-2 rounded-full shadow"
      >
        <Heart
          size={18}
          className={isFav ? "text-red-500 fill-red-500" : "text-neutral"}
        />
      </motion.button>

      {/* 👁 View Details */}
      <motion.div
        variants={{ hover: { opacity: 1, scale: 1 } }}
        initial={{ opacity: 0, scale: 0.9 }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <button 
        className="bg-white text-neutral px-6 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg"
        onClick={() => navigate(`/property/${property._id}`)}
        >
          <Eye size={16} />
          View Details
        </button>
      </motion.div>

      {/* Bottom Info */}
      <motion.div
        variants={{ hover: { y: 0, opacity: 1 } }}
        initial={{ y: 30, opacity: 0 }}
        className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end text-white z-10"
      >
        <div>
          <h3 className="font-semibold text-lg leading-tight">
            {property.title}
          </h3>
          <p className="text-sm text-gray-200 line-clamp-1">
            {property.location}
          </p>
        </div>

        <div className="text-lg font-bold">
          ₹{property.price?.toLocaleString()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PropertyCard;
