import React from "react";
import { motion } from "framer-motion";

const VendorSection = () => {
  const opportunities = [
    {
      id: 1,
      title: "Vastu Consultants",
      subtitle: "Professionals only",
      description:
        "Provide traditional Vastu Shastra consultation for homes and commercial spaces to ensure positive energy flow and prosperity.",
      icon: "🏛️",
    },
    {
      id: 2,
      title: "Interior Consultants",
      subtitle: "Students/artists allowed",
      description:
        "Create beautiful, functional interior designs for residential and commercial spaces using the latest design trends and technologies.",
      icon: "🎨",
    },
    {
      id: 3,
      title: "Business Consultants",
      subtitle: "Students/artists allowed",
      description:
        "Help businesses optimize their commercial spaces for productivity, efficiency, and employee satisfaction.",
      icon: "💼",
    },
    {
      id: 4,
      title: "Factories / Carpenters / Furniture Makers",
      subtitle: "Professionals only",
      description:
        "Partner with us to provide high-quality custom furniture, fixtures, and construction services for our design projects.",
      icon: "🔨",
    },
  ];

  return (
    <section className="bg-white py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Vendor <span className="text-transparent bg-gradient-to-r  from-primary to-secondary bg-clip-text">Opportunities</span> 
          </h1>
          <p className="text-xl text-gray-600">
            Join our network and grow your business
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {opportunities.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }} // lift effect
              className="relative h-80 rounded-xl overflow-hidden group shadow-lg cursor-pointer bg-gradient-to-br from-[#004E64] to-[#46B5D1] text-white transition-transform duration-300"
            >
              {/* Front Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center transition-all duration-300 group-hover:opacity-0">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-secondary text-sm font-medium mb-3">
                  {item.subtitle}
                </p>
                <p className="text-sm">{item.description}</p>
              </div>

              {/* Hover Buttons - Slide Up to Center */}
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              >
                <button className="w-40 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-secondary transition-colors">
                  Learn More
                </button>
                <button className="w-40 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
                  Join Vendor List
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorSection;
