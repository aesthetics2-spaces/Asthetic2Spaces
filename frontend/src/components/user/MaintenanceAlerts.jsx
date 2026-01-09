import { motion } from "framer-motion";
import { Wrench, Clock, AlertCircle, Home, CheckCircle } from "lucide-react";

const MaintenanceAlerts = () => {
  const alerts = [
    {
      id: 1,
      title: "AC Servicing",
      property: "Modern Villa",
      days: 5,
      priority: "high",
      type: "HVAC",
      completed: false
    },
    {
      id: 2,
      title: "Plumbing Check",
      property: "Urban Apartment",
      days: 12,
      priority: "medium",
      type: "Plumbing",
      completed: false
    },
    {
      id: 3,
      title: "Electrical Audit",
      property: "Luxury Penthouse",
      days: 30,
      priority: "low",
      type: "Electrical",
      completed: false
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-700 border-red-200";
      case "medium": return "bg-secondary/10 text-secondary border-secondary/30";
      case "low": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "HVAC": return <AlertCircle className="h-4 w-4" />;
      case "Plumbing": return <Wrench className="h-4 w-4" />;
      case "Electrical": return <Home className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl border border-muted p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-md">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-semibold text-neutral">Maintenance</h3>
        </div>
        <span className="text-xs text-gray-500">3 pending</span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 3 }}
            className={`flex items-start justify-between p-3 rounded-lg border ${getPriorityColor(alert.priority)}`}
          >
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-white rounded-md">
                {getIcon(alert.type)}
              </div>
              <div>
                <p className="font-medium text-sm text-neutral">{alert.title}</p>
                <p className="text-xs text-gray-600">{alert.property}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-medium">Due in {alert.days}d</span>
              <button className="p-1 hover:bg-white/50 rounded-md transition-colors">
                <CheckCircle className="h-3.5 w-3.5 text-gray-400 hover:text-green-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Schedule All
      </motion.button>
    </motion.div>
  );
};

export default MaintenanceAlerts;