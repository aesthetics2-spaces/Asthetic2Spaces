import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Star,
  Building2,
  CheckCircle2,
  Crown,
  Briefcase,
} from "lucide-react";

const plans = [
  {
    id: 1,
    title: "Basic",
    tag: "Budget-Friendly",
    description: "Perfect for individual homeowners and renters",
    icon: <Home className="w-8 h-8 text-[#E3B04B]" />,
    features: [
      "Verified Property Search (residential, commercial, land)",
      "Designer Room (2.5D) – upload rooms, visualize layouts",
      "AI Consultants (B2C) – property & vendor suggestions",
      "Auto-Generate Design Options – multiple arrangements",
      "Simple B2C Analytics – track preferences & bookings",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    id: 2,
    title: "Premium",
    tag: "Most Popular",
    description: "Advanced features for luxury living and professionals",
    icon: <Crown className="w-8 h-8 text-[#E3B04B]" />,
    features: [
      "Everything in Basic",
      "AR/VR Property Management – immersive walkthroughs",
      "Advanced Predictive Maintenance – AI + IoT predictions",
      "AI-powered Tenant Screening – comprehensive analysis",
      "Personalized Resident Experience – data-based recommendations",
      "Sustainability Features – smart meters, solar panels",
    ],
    buttonText: "Get Started",
    popular: true,
  },
  {
    id: 3,
    title: "Enterprise",
    tag: "B2B Solution",
    description: "Complete solution for property management businesses",
    icon: <Briefcase className="w-8 h-8 text-[#E3B04B]" />,
    features: [
      "Everything in Premium",
      "Blockchain Property Ownership Transfer",
      "Smart Contract Rent Payment System",
      "Virtual Property Management – multiple properties",
      "AI Property Valuation & Forecasting",
      "Dedicated Account Manager & Priority Support",
    ],
    buttonText: "Get Started",
    popular: false,
  },
];

const PlanSection = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Choose Your <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text"> Perfect Plan</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 text-lg"
        >
          Tailored solutions for every need and budget
        </motion.p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className={`relative rounded-2xl shadow-lg border p-8 flex flex-col justify-between transition-transform duration-300 ${
              plan.popular
                ? "bg-gradient-to-br from-[#004E64] to-[#46B5D1] text-white border-transparent"
                : "bg-white border-gray-200 text-gray-800"
            }`}
          >
            {/* Tag */}
            {plan.tag && (
              <div
                className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm font-semibold rounded-full ${
                  plan.popular
                    ? "bg-[#E3B04B] text-[#004E64]"
                    : "bg-[#004E64]/10 text-[#004E64]"
                }`}
              >
                {plan.tag}
              </div>
            )}

            {/* Icon + Title */}
            <div className="flex flex-col items-center mb-4">
              <div className="mb-3">{plan.icon}</div>
              <h2
                className={`text-2xl font-bold ${
                  plan.popular ? "text-white" : "text-[#004E64]"
                }`}
              >
                {plan.title}
              </h2>
            </div>

            {/* Description */}
            <p
              className={`text-sm mb-6 text-center ${
                plan.popular ? "text-white/80" : "text-gray-600"
              }`}
            >
              {plan.description}
            </p>

            {/* Features */}
            <ul className="text-left space-y-3">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-2 text-sm ${
                    plan.popular ? "text-white" : "text-gray-700"
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 mt-[2px] ${
                      plan.popular ? "text-[#E3B04B]" : "text-[#004E64]"
                    }`}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Button with Left-to-Right Hover Animation */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`relative mt-8 w-full py-3 font-semibold rounded-lg overflow-hidden group transition-colors ${
                plan.popular
                  ? "bg-[#E3B04B] text-[#004E64]"
                  : "bg-[#004E64] text-white"
              }`}
            >
              <span className="relative z-10">{plan.buttonText}</span>
              <span
                className={`absolute inset-0 w-0 bg-white/20 transition-all duration-500 group-hover:w-full ${
                  plan.popular ? "bg-[#004E64]/20" : "bg-[#E3B04B]/30"
                }`}
              ></span>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PlanSection;
