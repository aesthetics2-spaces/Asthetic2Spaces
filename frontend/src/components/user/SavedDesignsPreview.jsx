import { motion } from "framer-motion";
import { X } from "lucide-react";
import Slider from "react-slick";

const SavedDesignsPreview = () => {
  const designs = [
    {
      id: 1,
      name: "Modern Scandinavian",
      image: "/designs/design1.jpg",
    },
    {
      id: 2,
      name: "Classic Heritage",
      image: "/designs/design2.jpg",
    },
    {
      id: 3,
      name: "Urban Loft Style",
      image: "/designs/design3.jpg",
    },
    {
      id: 4,
      name: "Minimal Japandi",
      image: "/designs/design4.jpg",
    },
  ];

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
      <div className="mb-5 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-neutral">
          Saved Designs
        </h2>
        <button className="text-sm text-primary hover:text-accent transition">
          View all
        </button>
      </div>

      <Slider {...sliderSettings}>
        {designs.map((design) => (
          <div key={design.id} className="px-2">
            <motion.div
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative aspect-square rounded-xl overflow-hidden bg-light border border-muted cursor-pointer group"
            >
              {/* ❌ Remove */}
              <button
                className="absolute top-2 right-2 z-20 bg-white/90 p-1.5 rounded-full
                           text-gray-500 hover:text-red-500 shadow-sm transition"
              >
                <X size={16} />
              </button>

              {/* Image */}
              <img
                src={design.image}
                alt={design.name}
                className="w-full h-full object-cover"
              />

              {/* Hover Overlay */}
              <motion.div
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1 },
                }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
              >
                <button
                  className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium
                             hover:bg-accent transition"
                >
                  Preview Design
                </button>
              </motion.div>

              {/* Title */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white text-sm font-semibold truncate">
                  {design.name}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default SavedDesignsPreview;
