import React, { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, Building2, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const VendorRegisterForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    vendorName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await axios.post(
      "https://asthetic2spaces-2.onrender.com/api/vendor/register",
      formData,
      { headers: { "Content-Type": "application/json" } }
    );

    if (res.data.success) {
      alert("Vendor Registered Successfully!");

      // Correct reset fields
      setFormData({
        vendorName: "",
        email: "",
        phone: "",
        password: "",
        address: "",
      });

      // Switch to login mode
      onToggleMode("login");
    } else {
      setError(res.data.message || "Registration failed");
    }

  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  }

  setLoading(false);
};



  return (
    <motion.div
      key="registerForm"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="bg-white p-8 rounded-xl shadow-xl"
    >
      <div className="text-center mb-6">
        <div className="mx-auto w-14 h-14 bg-gradient-to-br from-[#E3B04B] to-[#004E64] rounded-xl flex items-center justify-center shadow-md mb-4">
          <Building2 className="text-white w-7 h-7" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800">Vendor Registration</h2>
        <p className="text-gray-500 text-sm">Create your vendor account</p>
      </div>

      {error && <p className="bg-red-100 text-red-600 p-2 rounded text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Vendor Name */}
        <div>
          <label className="text-sm font-semibold">Vendor Name</label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="vendorName"
              required
              placeholder="Real Estate Ventures"
              value={formData.vendorName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border rounded-lg"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-semibold">Email</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="email"
              name="email"
              required
              placeholder="vendor@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border rounded-lg"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-semibold">Phone</label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="phone"
              required
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border rounded-lg"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-semibold">Business Address</label>
          <div className="relative mt-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="address"
              required
              placeholder="Hyderabad, Telangana"
              value={formData.address}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border rounded-lg"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-semibold">Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 border rounded-lg"
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

        <button className="w-full py-3 bg-[#004E64] text-white rounded-lg">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-3 text-center text-gray-600 text-sm">
        Already have an account?{" "}
        <button onClick={onToggleMode} className="text-[#004E64] font-semibold">
          Login
        </button>
      </p>
    </motion.div>
  );
};

export default VendorRegisterForm;
