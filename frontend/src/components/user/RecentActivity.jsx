import { motion } from "framer-motion";

const activities = [
  "Saved a property in Hyderabad",
  "Viewed Vastu report",
  "Added a maintenance request",
];

const RecentActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-muted rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold text-neutral mb-4">
        Recent Activity
      </h3>

      <ul className="space-y-3 text-sm text-neutral">
        {activities.map((a, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            • {a}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default RecentActivity;
