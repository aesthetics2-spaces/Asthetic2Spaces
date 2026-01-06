// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send } from "lucide-react";
import axios from "axios";

const ForgotPassword = ({ onToggleMode }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "https://asthetic2spaces-2.onrender.com/api/auth/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data?.success) {
        setMessage("✅ Password reset link sent to your email.");
      } else {
        setError(res.data.message || "Unable to send reset email.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl px-8 py-10 mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="mx-auto w-16 h-16 bg-gradient-to-tr from-[#004E64] to-[#46B5D1] rounded-2xl flex items-center justify-center shadow-md mb-4"
        >
          <Send className="text-white w-7 h-7" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800">Forgot Password?</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Enter your registered email to receive a reset link
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg text-center mb-3">
          {error}
        </div>
      )}
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg text-center mb-3">
          {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative mt-2">
            <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004E64] focus:border-[#004E64] outline-none transition duration-200 bg-white/70"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-[#004E64] to-[#46B5D1] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </motion.button>
      </form>

      {/* Footer */}
      <div className="flex items-center justify-center mt-8 gap-2 text-sm text-gray-600">
        <ArrowLeft className="w-4 h-4 text-[#004E64]" />
        <button
          onClick={() => onToggleMode("login")}
          className="font-semibold text-[#004E64] hover:text-[#46B5D1] transition-colors"
        >
          Back to Sign In
        </button>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
