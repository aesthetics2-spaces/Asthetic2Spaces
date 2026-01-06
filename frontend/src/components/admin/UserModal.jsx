// UserModal.jsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  CheckCircle,
  XCircle,
  Trash2,
  X,
} from "lucide-react";

const UserModal = ({ user, onClose, onDelete, onToggleStatus }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  if (!user) return null;

  const getUserName = (user) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.name || user.email?.split('@')[0] || 'User';
  };

  const getStatusIcon = (status) => {
    switch ((status || 'active').toLowerCase()) {
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "inactive":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "suspended":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch ((status || 'active').toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700 border border-green-200";
      case "inactive":
        return "bg-red-100 text-red-700 border border-red-200";
      case "suspended":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-lg max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-5 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={getUserName(user)}
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <User className="h-6 w-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{getUserName(user)}</h2>
              <p className="text-white/90 text-sm">User Profile</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Status and Role Section */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {getStatusIcon(user.status)}
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(user.status)}`}
              >
                {user.status || 'Active'}
              </span>
              <span className="px-4 py-1.5 bg-purple-100 text-purple-700 border border-purple-200 rounded-full text-sm font-semibold">
                {user.role?.toUpperCase() || 'USER'}
              </span>
            </div>
            <p className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
              ID: {user._id?.slice(0, 8) || 'N/A'}
            </p>
          </div>

          {/* Content continues... */}
          <div className="space-y-4">
            <h3 className="font-semibold border-b pb-2">User Information</h3>
            
            {/* Email */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 border rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex justify-center items-center">
                <Mail className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium break-all">{user.email}</p>
              </div>
            </div>
            
            {/* Add other content as needed */}
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this user?")) {
                  onDelete(user._id);
                  onClose();
                }
              }}
              className="w-full py-3 bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 font-medium"
            >
              <Trash2 size={18} />
              Delete User Account
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserModal;