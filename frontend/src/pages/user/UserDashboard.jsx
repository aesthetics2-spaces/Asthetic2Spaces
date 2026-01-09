import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import axios from "axios";

import LoadingScreen from "../../components/user/LoadingScreen";
import WelcomeSection from "../../components/user/WelcomeSection";
import Wishlist from "../../components/user/Wishlist";
import AISidebar from "../../components/user/AISidebar";

// Dashboard components
import PropertyOverview from "../../components/user/PropertyOverview";
import SavedDesignsPreview from "../../components/user/SavedDesignsPreview";
import VastuScoreCard from "../../components/user/VastuScoreCard";
import MaintenanceAlerts from "../../components/user/MaintenanceAlerts";
import RecentActivity from "../../components/user/RecentActivity";

const UserDashboard = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLikedProperties = async () => {
    try {
      if (!user?.id) return;

      const res = await axios.get(
        `https://asthetic2spaces-3.onrender.com/api/favorites/liked/${user.id}`
      );

      setSaved(res.data.likedProperties || []);
    } catch (err) {
      console.error("Error fetching liked properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedProperties();
  }, [user]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* Welcome */}
        <WelcomeSection user={user} />

        {/* Property Overview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PropertyOverview />
        </motion.div>

        {/* Main Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-8">

              {/* Wishlist */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Wishlist saved={saved} setSaved={setSaved} />
              </motion.div>

              {/* Saved Designs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SavedDesignsPreview />
              </motion.div>

              {/* Vastu */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <VastuScoreCard />
              </motion.div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-1 space-y-8">

              {/* AI Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <AISidebar />
              </motion.div>

              {/* Maintenance Alerts */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <MaintenanceAlerts />
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <RecentActivity />
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl p-5 border border-muted"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral">Quick Stats</h3>
                  <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Properties Saved</span>
                    <span className="font-medium text-primary">
                      {saved.length}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Designs Saved</span>
                    <span className="font-medium text-secondary">6</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Alerts</span>
                    <span className="font-medium text-accent">3</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;