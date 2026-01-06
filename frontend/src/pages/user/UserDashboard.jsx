import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import axios from "axios";

import LoadingScreen from "../../components/user/LoadingScreen";
import WelcomeSection from "../../components/user/WelcomeSection";
import Wishlist from "../../components/user/Wishlist";
import AISidebar from "../../components/user/AISidebar";

const UserDashboard = () => {
  const { user,likedProperties } = useAuth();

  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchLikedProperties = async () => {
  try {
    if (!user?.id) return; // ✅ FIX HERE

    const res = await axios.get(
      `https://asthetic2spaces-2.onrender.com/api/favorites/liked/${user.id}` // ✅ FIX HERE
    );

    console.log("API response:", res.data); // DEBUG
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
    <div className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <WelcomeSection user={user} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Wishlist saved={saved} setSaved={setSaved} />
            </div>

            <div className="lg:col-span-1">
              <AISidebar />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
