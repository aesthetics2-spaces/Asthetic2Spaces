import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
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
        `https://asthetic2spaces-3.onrender.com/api/favorites/unlike/${propertyId}`,
        { userId: user.id }
      );
      setSaved((prev) => prev.filter((p) => p._id !== propertyId));
    } catch (err) {
      console.error("Error unliking property", err);
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1.2 } },
    ],
  };

  return (
    <section className="bg-white rounded-2xl border border-muted p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-neutral">
          Saved Properties
        </h2>
        <p className="text-sm text-gray-500">
          Your shortlisted homes
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="py-14 text-center text-gray-500">
          No saved properties yet
        </div>
      ) : (
        <Slider {...sliderSettings}>
          {saved.map((p) => (
            <div key={p._id} className="px-2">
              <motion.div
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="relative group aspect-square rounded-xl overflow-hidden bg-light border border-muted cursor-pointer"
              >
                {/* ❌ Remove */}
                <button
                  onClick={(e) => handleUnlike(p._id, e)}
                  className="absolute top-2 right-2 z-20 bg-white/90 p-1.5 rounded-full
                             text-gray-500 hover:text-red-500 shadow-sm transition"
                >
                  <X size={16} />
                </button>

                {/* Image */}
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <motion.div
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1 },
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                >
                  <button
                    onClick={() => navigate(`/property/${p._id}`)}
                    className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium
                               hover:bg-accent transition"
                  >
                    View Details
                  </button>
                </motion.div>

                {/* Title */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-semibold truncate">
                    {p.title}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};

export default Wishlist;
