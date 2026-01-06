import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Users } from "lucide-react";

const UserWaitlistModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan: "",
    location: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Disable background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.plan) {
      newErrors.plan = "Please select a preferred plan";
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = "Please tell us why you want to join";
    } else if (formData.reason.trim().length < 20) {
      newErrors.reason = "Please provide more details (at least 20 characters)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Waitlist form submitted:", formData);
      
      // Show success message
      alert("🎉 Thanks for joining our waitlist! We'll notify you when we launch.");
      
      // Reset form and close modal
      setFormData({
        name: "",
        email: "",
        plan: "",
        location: "",
        reason: "",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to join waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          {/* Modal Box */}
          <motion.div
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative flex flex-col max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition z-10"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={22} className="text-gray-700" />
            </button>

            {/* Fixed Header */}
            <div className="p-6 pb-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Join User Waitlist
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Be the first to experience our platform
                  </p>
                </div>
              </div>
            </div>

            {/* Scrollable Form Area */}
            <div className="flex-1 overflow-y-auto p-6 pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/50 focus:outline-none transition ${
                      errors.name ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Contact (Email) */}
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/50 focus:outline-none transition ${
                      errors.email ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Preferred Plan */}
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Preferred Plan *
                  </label>
                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/50 focus:outline-none transition appearance-none ${
                      errors.plan ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"
                    }`}
                  >
                    <option value="">Select a plan</option>
                    <option value="basic">Basic - Free access</option>
                    <option value="pro">Pro - Advanced features</option>
                    <option value="premium">Premium - Full access</option>
                    <option value="enterprise">Enterprise - Custom solution</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                  {errors.plan && (
                    <p className="text-red-500 text-xs mt-1">{errors.plan}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your city/state"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/50 focus:outline-none transition ${
                      errors.location ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"
                    }`}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                  )}
                </div>

                {/* Why do you want to use this platform? */}
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Why do you want to use this platform? *
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us what attracted you to our platform and how you plan to use it..."
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/50 focus:outline-none transition resize-none ${
                      errors.reason ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"
                    }`}
                  />
                  {errors.reason && (
                    <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {formData.reason.length}/500 characters
                  </div>
                </div>
              </form>
            </div>

            {/* Fixed Footer with Submit Button */}
            <div className="p-6 pt-4 border-t border-gray-100 flex-shrink-0">
              <motion.button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Joining Waitlist...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Join Waitlist
                  </>
                )}
              </motion.button>
              <p className="text-xs text-gray-500 text-center mt-3">
                * Required fields. We'll notify you when we launch! 🚀
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserWaitlistModal;