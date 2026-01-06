import React from "react";
import { motion } from "framer-motion";
import { Home, Globe2, Users, Shield } from "lucide-react";

const AboutSection = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-blue-50/30 to-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          About{" "}
          <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
            A2S
          </span>
        </motion.h2>

        <motion.p
          className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Because every space deserves to feel like home.
        </motion.p>

        {/* Description */}
        <motion.div
          className="mt-10 text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto space-y-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          <p>
            At <strong>A2S</strong>, we're more than just a prop-tech platform—
            we help you find, design, and manage spaces that truly feel like home.
          </p>
          <p>
            No more juggling between agents, designers, and vendors. With A2S, explore verified
            properties, connect with experts, and bring your vision to life — all in one place.
          </p>
        </motion.div>

        {/* Features */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Verified Properties", desc: "Every listing is thoroughly vetted." },
            { icon: Users, title: "Expert Network", desc: "Work with trusted designers and professionals." },
            { icon: Home, title: "Virtual Design", desc: "Visualize and customize your dream space." },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3 + i}
              whileHover={{ scale: 1.03 }}
            >
              <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission and Vision */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <motion.div
            className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={6}
          >
            <Home className="w-10 h-10 text-primary mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To blend technology with heart — making every step of discovering and managing a space simple, inspiring, and trustworthy.
            </p>
          </motion.div>

          <motion.div
            className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={7}
          >
            <Globe2 className="w-10 h-10 text-secondary mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              A future where everyone can design spaces that reflect who they are — where beauty meets function and sustainability comes naturally.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
