import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from "lucide-react";
import axios from "axios";

const RegisterForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
     setError("");
    setSuccess("");
    if(formData.password !== formData.confirmPassword){
      setError("Password do not match")
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://asthetic2spaces-3.onrender.com/api/auth/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers:{"Content-Type":"application/json"}
        }
      );
      if(res.data?.success){
        setSuccess("Account created successfully! You can log in.");
         setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => onToggleMode(), 1500);
      }else{
        setError(res.data.message || "registration failed")
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mx-auto w-14 h-14 bg-gradient-to-br from-[#E3B04B] to-[#004E64] rounded-2xl flex items-center justify-center shadow-md mb-4">
          <UserPlus className="text-white w-7 h-7" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-500 mt-1">Join us and start your journey</p>
      </div>
         {/* Alerts */}
      {error && (
        <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md text-center mb-2">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 text-sm p-2 rounded-md text-center mb-2">
          {success}
        </div>
      )}
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="grid grid-cols-2 gap-4">
          {["firstName", "lastName"].map((name) => (
            <div key={name}>
              <label className="text-sm font-semibold text-gray-700 capitalize">
                {name === "firstName" ? "First Name" : "Last Name"}
              </label>
              <div className="relative mt-1">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={name === "firstName" ? "John" : "Doe"}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004E64] focus:border-[#004E64] outline-none transition"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <div className="relative mt-1">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004E64] focus:border-[#004E64] outline-none transition"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <div className="relative mt-1">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004E64] focus:border-[#004E64] outline-none transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#004E64]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Confirm Password
          </label>
          <div className="relative mt-1">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004E64] focus:border-[#004E64] outline-none transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#004E64]"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-[#E3B04B] to-[#004E64] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </motion.button>
      </form>

      {/* Toggle */}
      <p className="text-center text-gray-600 mt-6 text-sm">
        Already have an account?{" "}
        <button
          onClick={onToggleMode}
          className="text-[#004E64] hover:text-[#46B5D1] font-semibold"
        >
          Sign in
        </button>
      </p>
       <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-white text-gray-400 text-sm">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button 
        onClick={()=>window.open("https://asthetic2spaces-2.onrender.com/auth/google","_self")}
        className="flex w-full items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:border-[#004E64] hover:shadow-md transition">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          <span className="font-medium text-gray-700">Login with Google</span>
        </button>
      </div>

    </motion.div>
  );
};

export default RegisterForm;
