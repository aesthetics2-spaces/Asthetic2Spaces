/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useVendorAuth } from "../../context/VendorAuthContext";

const VendorLoginForm = ({ onToggleMode, onForgotPassword }) => {

  // ✅ Hooks MUST be inside component
  const { vendorLogin } = useVendorAuth(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://asthetic2spaces-2.onrender.com/api/vendor/login",
        formData
      );

      if (res.data.success) {
        vendorLogin({
          vendor: res.data.vendor,
          token: res.data.token
        });

        navigate("/vendor/dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      key="loginForm"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="bg-white p-8 rounded-xl shadow-xl"
    >
      <div className="text-center mb-6">
        <div className="mx-auto w-14 h-14 bg-gradient-to-br from-[#E3B04B] to-[#004E64] rounded-xl flex items-center justify-center shadow-md mb-4">
          <Building2 className="text-white w-7 h-7" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Vendor Login</h2>
        <p className="text-gray-500 text-sm">Access your vendor dashboard</p>
      </div>

      {error && <p className="bg-red-100 text-red-600 p-2 rounded text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Email Address</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="vendor@example.com"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#004E64]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[#004E64]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#004E64] text-white rounded-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="text-center mt-3">
        <button
          onClick={() => onForgotPassword("forgot")}
          className="text-[#004E64] text-sm underline"
        >
          Forgot Password?
        </button>
      </div>

      <p className="mt-3 text-center text-gray-600 text-sm">
        Don’t have an account?{" "}
        <button onClick={onToggleMode} className="text-[#004E64] font-semibold">
          Register here
        </button>
      </p>
    </motion.div>
  );
};

export default VendorLoginForm;
