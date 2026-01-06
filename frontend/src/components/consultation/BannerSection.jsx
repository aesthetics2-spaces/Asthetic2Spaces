import React from "react";
import { motion } from "framer-motion";
import { Users, Shield, Clock4, Award, Compass, Palette } from "lucide-react";

const bannerFeatures = [
  { icon: <Users className="w-5 h-5" />, text: "1000+ Happy Clients" },
  { icon: <Shield className="w-5 h-5" />, text: "Certified Experts" },
  { icon: <Clock4 className="w-5 h-5" />, text: "Flexible Scheduling" },
  { icon: <Award className="w-5 h-5" />, text: "Quality Guaranteed" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const BannerSection = () => {
  return (
    <motion.div className="relative py-16 px-4 bg-primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1 className="text-4xl md:text-5xl font-bold text-white mb-6" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          Transform Your Space with Expert Guidance
        </motion.h1>
        <motion.p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
          Connect with certified Vastu consultants and interior designers to create harmonious, beautiful living spaces that reflect your personality and aspirations
        </motion.p>

        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12" variants={containerVariants} initial="hidden" animate="visible">
          {bannerFeatures.map((feature, index) => (
            <motion.div key={index} className="flex flex-col items-center text-white" variants={itemVariants}>
              <div className="p-3 rounded-full mb-3 bg-accent">{feature.icon}</div>
              <span className="text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-10"><Compass className="w-full h-full" /></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10"><Palette className="w-full h-full" /></div>
    </motion.div>
  );
};

export default BannerSection;
