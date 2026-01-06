import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, X, CheckCircle, Trash2, Mail, AlertCircle, Info, Users } from "lucide-react";

// Dummy notifications data
const dummyNotifications = [
  {
    id: 1,
    sender: "Admin",
    title: "Welcome to A2S Platform!",
    message: "Your account has been successfully created. Explore properties now!",
    timestamp: "2025-11-30 09:30 AM",
    read: false,
    type: "info",
  },
  {
    id: 2,
    sender: "Vendor",
    title: "Property Inquiry",
    message: "Someone is interested in your 2BHK apartment. Check details now.",
    timestamp: "2025-11-29 05:45 PM",
    read: false,
    type: "alert",
  },
  {
    id: 3,
    sender: "Admin",
    title: "New Feature Alert",
    message: "We have added AI Assistant for property suggestions. Try it now!",
    timestamp: "2025-11-28 11:00 AM",
    read: true,
    type: "info",
  },
  {
    id: 4,
    sender: "Vendor",
    title: "Offer Update",
    message: "Your listed villa has a new discounted offer. Check it out!",
    timestamp: "2025-11-27 03:15 PM",
    read: true,
    type: "alert",
  },
  {
    id: 5,
    sender: "System",
    title: "Profile Verification Complete",
    message: "Your vendor profile has been successfully verified. You can now list properties.",
    timestamp: "2025-11-26 10:00 AM",
    read: true,
    type: "success",
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [filter, setFilter] = useState("all");

  // Filter notifications based on selection
  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-5 h-5 text-secondary" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-accent" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "alert":
        return "border-secondary";
      case "success":
        return "border-green-500";
      default:
        return "border-accent";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-light">
      {/* Banner Section */}
      <div className="bg-primary py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Notifications Center
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Stay updated with property inquiries, system alerts, and important announcements
          </motion.p>
          
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bell className="w-5 h-5" />
                <span className="text-2xl font-bold">{notifications.length}</span>
              </div>
              <p className="text-sm">Total Notifications</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail className="w-5 h-5" />
                <span className="text-2xl font-bold">{unreadCount}</span>
              </div>
              <p className="text-sm">Unread Messages</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5" />
                <span className="text-2xl font-bold">{notifications.filter(n => n.sender === "Vendor").length}</span>
              </div>
              <p className="text-sm">Vendor Updates</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral flex items-center gap-2">
              <Bell className="w-6 h-6 text-primary" />
              Your Notifications
              {unreadCount > 0 && (
                <span className="bg-secondary text-white text-sm px-2 py-1 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </h2>
            <p className="text-muted mt-1">Manage your notifications and stay updated</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Filter Buttons */}
            <div className="flex bg-light rounded-lg p-1">
              {[
                { key: "all", label: "All" },
                { key: "unread", label: "Unread" },
                { key: "alert", label: "Alerts" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    filter === item.key
                      ? "bg-primary text-white"
                      : "text-muted hover:text-neutral"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
              >
                Mark All Read
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-white border border-muted text-neutral rounded-lg hover:bg-light transition-colors text-sm font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Bell className="w-16 h-16 text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral mb-2">No notifications</h3>
              <p className="text-muted">You're all caught up! New notifications will appear here.</p>
            </motion.div>
          ) : (
            filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`bg-white p-6 rounded-xl shadow-lg border-l-4 transition-all hover:shadow-xl ${
                  notification.read 
                    ? "border-muted" 
                    : `${getNotificationColor(notification.type)} bg-blue-50`
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-2 rounded-lg ${
                      notification.read ? "bg-light" : "bg-accent/10"
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-lg font-semibold ${
                          notification.read ? "text-neutral" : "text-primary"
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full ml-2">
                            New
                          </span>
                        )}
                      </div>
                      
                      <p className="text-muted mb-3">{notification.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            notification.sender === "Admin" 
                              ? "bg-primary/10 text-primary"
                              : notification.sender === "Vendor"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-accent/10 text-accent"
                          }`}>
                            {notification.sender}
                          </span>
                          <span className="text-muted">{notification.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;