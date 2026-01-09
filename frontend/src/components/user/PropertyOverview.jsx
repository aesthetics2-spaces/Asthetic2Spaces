import { motion } from "framer-motion";
import { Home, DollarSign, Sparkles } from "lucide-react";

const stats = [
  { label: "Total Properties", value: 4, icon: Home },
  { label: "Portfolio Value", value: "₹2.4 Cr", icon: DollarSign },
  { label: "Active Designs", value: 6, icon: Sparkles },
];

const PropertyOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-muted rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted">{item.label}</p>
            </div>
            <h2 className="text-2xl font-semibold text-neutral">
              {item.value}
            </h2>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PropertyOverview;
