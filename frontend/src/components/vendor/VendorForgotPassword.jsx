import React, { useState } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const VendorForgotPassword = ({ onToggleMode }) => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setMsg("");
  setError("");

  try {
    const res = await axios.post(
      "http://localhost:5000/api/vendor/forgot-password",
      { email },
      { headers: { "Content-Type": "application/json" } }
    );

    if (res.data.success) {
      setMsg("Password reset link sent to your email.");
      setEmail(""); // clear input
    }
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <motion.div
      key="forgot"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="bg-white p-8 rounded-xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Forgot Password?
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        Enter your registered vendor email
      </p>

      {msg && <p className="bg-green-100 text-green-700 p-2 rounded text-center">{msg}</p>}
      {error && <p className="bg-red-100 text-red-700 p-2 rounded text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vendor@example.com"
            className="w-full pl-10 pr-4 py-3 border rounded-lg"
          />
        </div>

        <button className="w-full py-3 bg-[#004E64] text-white rounded-lg">
          Send Reset Link
        </button>
      </form>

      <div className="text-center mt-3">
        <button onClick={() => onToggleMode("login")} className="text-[#004E64] underline text-sm">
          Back to Login
        </button>
      </div>
    </motion.div>
  );
};

export default VendorForgotPassword;
