// pages/vendor/VendorDashboard.jsx
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useVendorAuth } from "../../context/VendorAuthContext";
import { motion } from "framer-motion";
import {
  Building,
  PlusCircle,
  Home,
  Calendar,
  BarChart3,
  User,
  TrendingUp,
  IndianRupee,
  Mail,
  Eye,
  ArrowRight,
  Edit,
  Trash2,
} from "lucide-react";

const VendorDashboard = () => {
    const { getMyProperties } = useVendorAuth();
  const [properties, setProperties] = useState([]);
    useEffect(() => {
    fetchProperties();
  }, []);
   const fetchProperties = async () => {
    const res = await getMyProperties();
    if (res?.success) {
      setProperties(res.properties);
    }
  }

  const stats = [
    { title: "Total Properties", value: properties.length, icon: Building, color: "bg-primary", link: "/vendor/my-properties" },
    { title: "Active Bookings", value: 3, icon: Calendar, color: "bg-secondary", link: "/vendor/bookings" },
    { title: "Total Revenue", value: "₹2,85,000", icon: IndianRupee, color: "bg-accent", link: "/vendor/bookings" },
    { title: "Inquiries", value: 20, icon: Mail, color: "bg-neutral", link: "/vendor/bookings" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90 },
    },
  };

  return (
    <div className="min-h-screen bg-light lg:ml-64 sticky top-0">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-muted "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-neutral">
                Dashboard Overview
              </h1>
              <p className="text-muted mt-1 text-sm md:text-base">
                Welcome back! Manage and track your property performance.
              </p>
            </div>

            <Link
              to="/vendor/add-property"
              className="bg-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-2 text-sm md:text-base"
            >
              <PlusCircle size={20} /> Add Property
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <Link to={stat.link}>
                <div className="bg-white rounded-xl shadow-sm border border-muted p-5 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted text-sm">{stat.title}</p>
                      <p className="text-xl md:text-2xl font-bold mt-1 text-neutral">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Recent Properties */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-muted p-6"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-neutral">
                Recent Properties
              </h2>
              <Link
                to="/vendor/my-properties"
                className="text-primary flex items-center gap-1 hover:text-primary/80"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>

            {/* List of Properties */}
<div className="space-y-4">
  {properties.length === 0 ? (
    <div className="text-center text-muted py-10 text-lg">
      No properties found
    </div>
  ) : (
    properties.map((property) => (
      <motion.div
        key={property._id}
        whileHover={{ scale: 1.02 }}
        className="bg-white border border-muted rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <img
          src={property.images?.[0] || "/placeholder.jpg"}
          className="w-full sm:w-24 h-24 rounded-lg object-cover"
        />

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-neutral truncate">
            {property.title}
          </h3>

          <p className="font-bold text-primary">
            ₹{property.price?.toLocaleString()}
          </p>

          <div className="flex items-center gap-4 mt-1 text-sm text-muted">
            <span className="flex items-center gap-1">
              <Eye size={14} /> {property.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <Mail size={14} /> {property.inquiries || 0}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="p-2 text-muted hover:text-accent">
            <Edit size={18} />
          </button>
          <button className="p-2 text-muted hover:text-red-500">
            <Trash2 size={18} />
          </button>
        </div>
      </motion.div>
    ))
  )}
</div>

          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-muted p-6"
            >
              <h2 className="text-xl font-semibold text-neutral mb-4">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <Link
                  to="/vendor/add-property"
                  className="flex items-center gap-3 p-3 border border-muted rounded-lg hover:border-primary/70 hover:bg-primary/5 transition"
                >
                  <PlusCircle className="h-5 w-5 text-primary" />
                  <span>Add New Property</span>
                </Link>

                <Link
                  to="/vendor/my-properties"
                  className="flex items-center gap-3 p-3 border border-muted rounded-lg hover:border-accent/70 hover:bg-accent/5 transition"
                >
                  <Edit className="h-5 w-5 text-accent" />
                  <span>Manage Properties</span>
                </Link>

                <Link
                  to="/vendor/analytics"
                  className="flex items-center gap-3 p-3 border border-muted rounded-lg hover:border-secondary/70 hover:bg-secondary/5 transition"
                >
                  <BarChart3 className="h-5 w-5 text-secondary" />
                  <span>View Analytics</span>
                </Link>
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-muted p-6"
            >
              <h2 className="text-xl font-semibold text-neutral mb-4">
                Performance
              </h2>

              <div className="space-y-5">
                <MetricRow label="Conversion Rate" value="12.8%" icon={<TrendingUp className="h-4 w-4 text-primary" />} color="primary" />
                <MetricRow label="Avg. Views" value="122" icon={<Eye className="h-4 w-4 text-accent" />} color="accent" />
                <MetricRow label="Response Time" value="2.1h" icon={<Mail className="h-4 w-4 text-secondary" />} color="secondary" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const MetricRow = ({ label, value, icon }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="bg-muted/20 p-2 rounded-lg">{icon}</div>
      <span className="text-sm font-medium text-neutral">{label}</span>
    </div>
    <span className="font-semibold text-neutral">{value}</span>
  </div>
);

export default VendorDashboard;
