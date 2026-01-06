import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, Compass, Palette } from "lucide-react";

const consultationTypes = [
  {
    id: "vastu",
    title: "Vastu Consultation",
    description: "Expert guidance on Vastu principles for harmony and positive energy",
    icon: <Compass className="w-6 h-6" />,
    price: "₹2,000",
    duration: "60 mins",
    features: ["Energy Flow Analysis", "Remedial Solutions", "Floor Plan Review"],
    color: "bg-orange-50 border-orange-200"
  },
  {
    id: "interior",
    title: "Interior Design",
    description: "Professional interior design consultation and space planning",
    icon: <Palette className="w-6 h-6" />,
    price: "₹3,500",
    duration: "90 mins",
    features: ["Space Planning", "Color Scheme", "Furniture Layout"],
    color: "bg-purple-50 border-purple-200"
  }
];

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

const ConsultationOptions = ({ selectedConsultation, setSelectedConsultation, formData, setFormData }) => {
  const handleSelect = (type) => {
    setSelectedConsultation(type);
    setFormData({ ...formData, consultationType: type.id });
  };

  return (
    <motion.div className="rounded-2xl shadow-lg p-6 bg-white" variants={cardVariants}>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-neutral">
        <Star className="w-6 h-6 text-secondary" /> Choose Your Consultation
      </h2>

      <div className="space-y-4">
        {consultationTypes.map((type) => (
          <motion.div
            key={type.id}
            onClick={() => handleSelect(type)}
            className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedConsultation?.id === type.id
                ? `${type.color} border-current shadow-lg`
                : "bg-white border-gray-200 hover:shadow-md"
            }`}
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${selectedConsultation?.id === type.id ? 'bg-current' : 'bg-gray-100'}`}>
                  <div className={selectedConsultation?.id === type.id ? 'text-white' : 'text-gray-600'}>
                    {type.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral">{type.title}</h3>
                  <p className="text-sm text-muted">{type.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">{type.price}</div>
                <div className="text-sm text-muted">{type.duration}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                {type.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-neutral">
                    <CheckCircle className="w-4 h-4 text-accent" /> {feature}
                  </div>
                ))}
              </div>
              {selectedConsultation?.id === type.id && <CheckCircle className="w-6 h-6 text-accent" />}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ConsultationOptions;
