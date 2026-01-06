import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers3,
  Eye,
  Users,
  Home,
  Settings,
  TrendingUp,
  Lock,
  Leaf,
  BatteryCharging,
  CircuitBoard,
  Coins,
  FileCheck,
} from "lucide-react";

const SmartFeatures = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const tabs = [
    { id: "basic", label: "Basic Plan", icon: ShieldCheck },
    { id: "premium", label: "Premium Plan", icon: Sparkles },
    { id: "enterprise", label: "Enterprise Plan", icon: Layers3 },
  ];

  const features = {
    basic: [
      {
        icon: Home,
        title: "Verified Property Listings",
        desc: "Trusted residential, commercial, and land listings with verified authenticity.",
      },
      {
        icon: Eye,
        title: "2.5D Room Designer",
        desc: "Upload rooms and visualize décor with AI-suggested furniture arrangements.",
      },
      {
        icon: Users,
        title: "B2C AI Consultants",
        desc: "Personalized property & vendor recommendations based on your preferences.",
      },
      {
        icon: Settings,
        title: "Auto-Generate Design Options",
        desc: "AI suggests multiple furniture & layout arrangements for your space.",
      },
      {
        icon: TrendingUp,
        title: "Simple B2C Analytics",
        desc: "Track preferences, saved properties, and bookings in one place.",
      },
    ],
    premium: [
      {
        icon: Cpu,
        title: "Advanced Predictive Maintenance",
        desc: "AI + IoT predicts building issues before breakdown (plumbing, electricity, HVAC).",
      },
      {
        icon: Building2,
        title: "Integrated AR/VR Management",
        desc: "View hidden infrastructure & immersive room walkthroughs.",
      },
      {
        icon: Users,
        title: "AI-powered Tenant Screening",
        desc: "Assess reliability based on credit, rental history, and job stability.",
      },
      {
        icon: Leaf,
        title: "Sustainability-focused Features",
        desc: "Smart meters, solar panels, waste segregation, and green living.",
      },
      {
        icon: Sparkles,
        title: "Personalized Resident Experience",
        desc: "Data analytics improve resident services & community engagement.",
      },
    ],
    enterprise: [
      {
        icon: Lock,
        title: "Blockchain Property Transfer",
        desc: "Tamper-proof property records with transparent ownership transfer.",
      },
      {
        icon: FileCheck,
        title: "Virtual Property Management",
        desc: "Manage multiple properties remotely—tenants, payments, repairs, legal docs.",
      },
      {
        icon: Coins,
        title: "Smart Contract Rent System",
        desc: "Automated, transparent rent, deposits, and penalty management.",
      },
      {
        icon: TrendingUp,
        title: "AI Property Valuation & Forecasting",
        desc: "Predict property prices based on history, infrastructure, and demand trends.",
      },
      {
        icon: BatteryCharging,
        title: "IoT Energy Management",
        desc: "Monitor and optimize energy usage across properties with smart systems.",
      },
    ],
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-blue-50/40 to-white overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 text-center relative z-10">
        {/* Section Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Smart Features{" "}
          <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
            You’ll Love
          </span>
        </motion.h2>

        <motion.p
          className="mt-3 text-lg text-gray-600"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Discover what makes A2S the perfect choice for your needs.
        </motion.p>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border text-sm md:text-base font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-secondary text-white shadow-lg"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Features List */}
        <div className="mt-12 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features[activeTab].map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className="group bg-white/80 backdrop-blur-lg border border-gray-100 hover:border-primary/30 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 p-6 flex flex-col items-start text-left"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/20 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SmartFeatures;
