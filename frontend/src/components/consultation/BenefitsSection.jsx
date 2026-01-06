import React from "react";
import { Star, Calendar, Home, Clock } from "lucide-react";

const BenefitsSection = () => {
  return (
    <div className="rounded-2xl shadow-lg p-6 bg-white">
      <h3 className="text-lg font-semibold mb-4 text-neutral">Why Choose Our Consultants?</h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: <Star className="w-4 h-4 text-accent" />, text: "Certified Experts" },
          { icon: <Calendar className="w-4 h-4 text-accent" />, text: "Flexible Scheduling" },
          { icon: <Home className="w-4 h-4 text-accent" />, text: "Personalized Solutions" },
          { icon: <Clock className="w-4 h-4 text-accent" />, text: "On-time Service" }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent/20">{item.icon}</div>
            <span className="text-sm text-neutral">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
