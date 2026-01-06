import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VendorFormModal from "./VendorFormModal"; 
import UserWaitlistModal from "./UserWaitlistModal";

const HeroSection = () => {
  const navigate = useNavigate();

  // 🔥 Modal State
  const [openForm, setOpenForm] = useState(false);

  const images = [
    { img: "/assets/hero1.avif" },
    { img: "/assets/hero2.avif" },
    { img: "/assets/hero3.avif" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
    pauseOnHover: false,
  };

  // Animated Heading Text
  const texts = ["Dream Home", "Smart Space", "Perfect Office", "Luxury Apartment"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ------- Modal -------- */}
      <VendorFormModal open={openForm} onClose={() => setOpenForm(false)} />
      <UserWaitlistModal open={openForm} onClose={()=>setOpenForm(false)}/>


      {/* ------- Hero Section -------- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent z-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          
          {/* ------------- Left ------------- */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Find Your Dream Home
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-gray-900">Discover Your</span>
              <br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={texts[index]}
                  className="text-transparent text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-secondary bg-clip-text inline-block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                >
                  {texts[index]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>

            {/* Sub Text */}
            <motion.p
              className="text-xl text-gray-600 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Browse thousands of hand-picked properties tailored to your lifestyle.
              Modern homes, smart spaces, and real comfort — all in one place.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Explore Button */}
              <motion.button
                className="group bg-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, backgroundColor: "#003D4F" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenForm(true)}
              >
                <Search size={20} />
                Get Start
              </motion.button>

              {/* Vendor Waitlist Button */}
              <motion.button
                className="group bg-white text-primary px-8 py-4 rounded-xl font-semibold flex items-center gap-3 border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenForm(true)}   // 🔥 OPEN MODAL HERE
              >
                <Building2 size={20} className="text-secondary" />
                Vendor Waitlist
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ------------- Right Slider ------------- */}
          <motion.div
            className="relative flex items-center justify-center h-[550px] rounded-3xl overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full h-full border border-white/50 shadow-2xl rounded-3xl overflow-hidden">
              <Slider {...sliderSettings}>
                {images.map((images, index) => (
                  <div key={index} className="relative">
                    <img
                      src={images.img}
                      alt={`Property ${index + 1}`}
                      className="w-full h-[550px] object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent rounded-3xl" />
                  </div>
                ))}
              </Slider>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
