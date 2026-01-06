// src/components/ResetPassword.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Lock, KeyRound } from "lucide-react";

const VendorResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `https://asthetic2spaces-2.onrender.com/api/vendor/reset-password/${token}`,
        { password }
      );
      if (res.data.success) {
        setMessage("✅ Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/vendor/register"), 2000);
      } else {
        setError(res.data.message || "Reset failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#004E64] via-[#003D4F] to-[#46B5D1] p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md border border-gray-100"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-[#004E64] to-[#46B5D1] rounded-2xl flex items-center justify-center shadow-md mb-4">
            <KeyRound className="text-white w-7 h-7" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Reset Your Password
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Enter and confirm your new password below.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 text-sm p-3 rounded-lg text-center mb-3">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-100 border border-green-200 text-green-700 text-sm p-3 rounded-lg text-center mb-3">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004E64] focus:border-[#004E64] outline-none transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004E64] focus:border-[#004E64] outline-none transition"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#004E64] to-[#46B5D1] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-70"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default VendorResetPassword;
