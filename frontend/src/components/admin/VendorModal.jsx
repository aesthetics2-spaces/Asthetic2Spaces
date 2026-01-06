import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  Building2,
  Calendar,
  Trash,
  User,
  MapPin,
  Globe,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const VendorModal = ({ vendor, onClose, onDelete }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  if (!vendor) return null;

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-[#46B5D1]" />;
      case "pending":
        return <Clock className="h-5 w-5 text-[#E3B04B]" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-[#46B5D1]/10 text-[#004E64] border border-[#46B5D1]/30";
      case "pending":
        return "bg-[#E3B04B]/10 text-[#E3B04B] border border-[#E3B04B]/30";
      case "rejected":
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="
          relative w-full max-w-lg  /* reduced card width */
          max-h-[85vh]             /* allow scrolling if content too big */
          bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#CBD5E1]/50
          flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#004E64] to-[#46B5D1] p-5 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{vendor.name}</h2>
              <p className="text-white/90 text-sm">Vendor Profile</p>
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
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Status Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(vendor.status)}
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(
                  vendor.status
                )}`}
              >
                {vendor.status}
              </span>
            </div>
            <p className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
              ID: {vendor.id.slice(0, 8)}
            </p>
          </div>

          {/* Company Section */}
          <div className="bg-[#F9FAFB] p-4 rounded-xl border border-[#CBD5E1]/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#E3B04B]/10 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-[#E3B04B]" />
              </div>
              <div>
                <h3 className="font-semibold">Company</h3>
                <p className="text-[#004E64] font-medium">{vendor.company}</p>
              </div>
            </div>

            {vendor.address && (
              <div className="flex items-center gap-2 ml-12 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{vendor.address}</span>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-semibold border-b pb-2">Contact Information</h3>

            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                <div className="w-10 h-10 bg-[#46B5D1]/10 rounded-lg flex justify-center items-center">
                  <Mail className="text-[#46B5D1]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{vendor.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                <div className="w-10 h-10 bg-[#004E64]/10 rounded-lg flex justify-center items-center">
                  <Phone className="text-[#004E64]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{vendor.phone}</p>
                </div>
              </div>

              {/* Website (optional) */}
              {vendor.website && (
                <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                  <div className="w-10 h-10 bg-[#E3B04B]/10 rounded-lg flex justify-center items-center">
                    <Globe className="text-[#E3B04B]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <p className="font-medium break-all">{vendor.website}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-[#F9FAFB] p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="text-gray-400" />
                Application Date
              </div>
              <span className="font-medium">
                {new Date(vendor.submittedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-between bg-[#F9FAFB] p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="text-gray-400" />
                Last Updated
              </div>
              <span className="font-medium">
                {new Date(vendor.updatedAt || vendor.submittedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Delete Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this vendor?")) {
                onDelete(vendor.id);
                onClose();
              }
            }}
            className="w-full py-3 bg-red-600 text-white rounded-xl flex items-center justify-center gap-2"
          >
            <Trash size={18} />
            Delete Vendor
          </motion.button>

          <p className="text-center text-xs text-gray-500 pb-2">
            This action cannot be undone
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VendorModal;
