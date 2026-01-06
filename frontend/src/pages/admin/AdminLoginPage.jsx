// pages/admin/AdminLoginPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, LogIn, Shield } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminLoginForm = () => {
  const {adminLogin} = useAdminAuth()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const result = await adminLogin(formData.email, formData.password); // ✅ Pass email/password
    if (result.success) {
      navigate("/admin/dashboard"); // ✅ Wait until login is done
    } else {
      setError(result.message);
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section - Brand & Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/5 bg-gradient-to-br from-[#004E64] via-[#003D4F] to-[#46B5D1] text-white p-8 lg:p-12 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Animated Elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#46B5D1] rounded-full blur-3xl opacity-20" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#E3B04B] rounded-full blur-3xl opacity-20" />

            <div className="relative z-10 h-full flex flex-col justify-center">
              {/* Brand Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#E3B04B] to-[#46B5D1] rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Admin Portal</h1>
                <p className="text-lg opacity-90 leading-relaxed">
                  Manage users, vendors, and all platform settings securely.
                </p>
              </motion.div>

              {/* Feature Highlights */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 mt-8"
              >
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Secure Access Control</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <LogIn className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Real-time Monitoring</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Advanced Security</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-3/5 p-8 lg:p-12 flex items-center justify-center"
          >
            <div className="w-full max-w-md">
              {/* Mobile Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8 lg:hidden"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#E3B04B] to-[#46B5D1] rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h2>
                <p className="text-gray-600">Enter your credentials to continue</p>
              </motion.div>

              {/* Desktop Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8 hidden lg:block"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Administrator Login</h2>
                <p className="text-gray-600">Enter your credentials to access the dashboard</p>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004E64] focus:border-[#004E64] outline-none transition-all duration-200 bg-gray-50/50"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004E64] focus:border-[#004E64] outline-none transition-all duration-200 bg-gray-50/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#004E64] transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-[#004E64] to-[#46B5D1] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Login to Dashboard</span>
                    </>
                  )}
                </motion.button>
              </motion.form>

              {/* Security Notice */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#004E64] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#004E64] mb-1">
                      Secure Admin Access
                    </h4>
                    <p className="text-xs text-gray-600">
                      This portal is for authorized administrators only. All activities are logged and monitored.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Back to Home */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center mt-6"
              >
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-[#004E64] transition-colors inline-flex items-center gap-1"
                >
                  ← Back to homepage
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;