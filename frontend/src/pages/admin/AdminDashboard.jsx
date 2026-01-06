// pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Building,
  FileCheck,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  ArrowRight,
  Shield,
  Mail,
  BarChart3,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    pendingVendors: 0,
    pendingListings: 0,
    activeUsers: 0,
    openTickets: 0,
    totalRevenue: 0,
    approvedServices: 0
  });

  const [pendingActions, setPendingActions] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      setStats({
        pendingVendors: 12,
        pendingListings: 8,
        activeUsers: 1542,
        openTickets: 23,
        totalRevenue: 125000,
        approvedServices: 89
      });

      setPendingActions([
        {
          id: 1,
          type: "vendor",
          name: "John's Real Estate",
          email: "john@example.com",
          submittedAt: "2024-01-15",
          status: "pending"
        },
        {
          id: 2,
          type: "listing",
          title: "Luxury Villa in Mumbai",
          vendor: "Premium Properties",
          submittedAt: "2024-01-14",
          status: "pending"
        },
        {
          id: 3,
          type: "ticket",
          subject: "Payment issue",
          user: "user@example.com",
          submittedAt: "2024-01-14",
          status: "open"
        }
      ]);

      setRecentActivities([
        {
          id: 1,
          action: "approved",
          type: "vendor",
          name: "City Builders",
          admin: "Admin User",
          timestamp: "2024-01-15 14:30"
        },
        {
          id: 2,
          action: "rejected",
          type: "listing",
          name: "Beach House Goa",
          admin: "Admin User",
          timestamp: "2024-01-15 13:15"
        },
        {
          id: 3,
          action: "resolved",
          type: "ticket",
          name: "Login problem",
          admin: "Admin User",
          timestamp: "2024-01-15 12:00"
        }
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const statsData = [
    { 
      title: "Pending Vendors", 
      value: stats.pendingVendors, 
      icon: Users, 
      color: "bg-orange-500", 
      link: "/admin/vendors" 
    },
    { 
      title: "Pending Listings", 
      value: stats.pendingListings, 
      icon: Building, 
      color: "bg-blue-500", 
      link: "/admin/listings" 
    },
    { 
      title: "Open Tickets", 
      value: stats.openTickets, 
      icon: MessageSquare, 
      color: "bg-red-500", 
      link: "/admin/tickets" 
    },
    { 
      title: "Total Revenue", 
      value: `₹${stats.totalRevenue.toLocaleString()}`, 
      icon: TrendingUp, 
      color: "bg-green-500", 
      link: "/admin/analytics" 
    },
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      case 'resolved':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:ml-64">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Manage vendors, listings, and user support tickets.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/admin/vendors"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 text-sm"
              >
                <Shield size={20} /> Manage Vendors
              </Link>
              <Link
                to="/admin/tickets"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2 text-sm"
              >
                <MessageSquare size={20} /> Support Tickets
              </Link>
            </div>
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
          {statsData.map((stat) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <Link to={stat.link}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{stat.title}</p>
                      <p className="text-xl md:text-2xl font-bold mt-1 text-gray-900">
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
          {/* Pending Actions */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-900">
                Pending Actions
              </h2>
              <Link
                to="/admin/pending"
                className="text-blue-600 flex items-center gap-1 hover:text-blue-800"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="space-y-4">
              {pendingActions.length === 0 ? (
                <div className="text-center text-gray-500 py-10 text-lg">
                  No pending actions
                </div>
              ) : (
                pendingActions.map((action) => (
                  <motion.div
                    key={action.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        action.type === 'vendor' ? 'bg-orange-100' : 
                        action.type === 'listing' ? 'bg-blue-100' : 'bg-red-100'
                      }`}>
                        {action.type === 'vendor' ? <Users className="h-5 w-5 text-orange-600" /> :
                         action.type === 'listing' ? <Building className="h-5 w-5 text-blue-600" /> :
                         <MessageSquare className="h-5 w-5 text-red-600" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {action.type === 'vendor' ? action.name :
                           action.type === 'listing' ? action.title :
                           action.subject}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {action.type === 'vendor' ? action.email :
                           action.type === 'listing' ? `by ${action.vendor}` :
                           `from ${action.user}`}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Submitted: {new Date(action.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/${action.type}s/${action.id}`}
                        className="p-2 text-gray-600 hover:text-blue-600"
                      >
                        <Eye size={18} />
                      </Link>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Activities
              </h2>

              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${getActionColor(activity.action)}`}>
                      {getStatusIcon(activity.action)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.name}
                      </p>
                      <p className="text-xs text-gray-600 capitalize">
                        {activity.action} {activity.type} by {activity.admin}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <Link
                  to="/admin/vendors"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition"
                >
                  <Users className="h-5 w-5 text-orange-600" />
                  <span>Vendor Approvals</span>
                </Link>

                <Link
                  to="/admin/listings"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition"
                >
                  <Building className="h-5 w-5 text-blue-600" />
                  <span>Listing Approvals</span>
                </Link>

                <Link
                  to="/admin/tickets"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition"
                >
                  <MessageSquare className="h-5 w-5 text-red-600" />
                  <span>Support Tickets</span>
                </Link>

                <Link
                  to="/admin/analytics"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition"
                >
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <span>View Analytics</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;