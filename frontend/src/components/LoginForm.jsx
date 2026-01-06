import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import axios from "axios"
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onToggleMode,onForgotPassword}) => {
  const {login} = useAuth()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try{
      const res = await axios.post("http://localhost:5000/api/auth/login",formData,{
        headers:{"Content-Type":"application/json"}
      });
      if(res.data?.success){
        login(res.data);
        alert("login successfull");
        navigate("/")
      }else{
        setError(res.data.message)
      }
    }catch(err){
      console.error(err);
      setError(err.response?.data?.message || "something went wrong");
    }finally {
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
        <div className="mx-auto w-14 h-14 bg-gradient-to-br from-[#004E64] to-[#46B5D1] rounded-2xl flex items-center justify-center shadow-md mb-4">
          <LogIn className="text-white w-7 h-7" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 mt-1">Sign in to your account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md text-center">
            {error}
          </div>
        )}
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
          <label className="text-sm font-semibold text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
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

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-600">
            <input type="checkbox" className="mr-2 accent-[#004E64]" />
            Remember me
          </label>
<button
  type="button"
  onClick={onForgotPassword}
  className="text-sm font-semibold text-[#004E64] hover:text-[#46B5D1] transition-colors"
>
  Forgot Password?
</button>

        </div>


        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-[#004E64] to-[#46B5D1] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
        </motion.button>
      </form>

      {/* Divider */}
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

      {/* Social Login */}

      <div className="flex items-center justify-center">
        <button 
        onClick={()=>window.open("http://localhost:5000/auth/google","_self")}
        className="flex w-full items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:border-[#004E64] hover:shadow-md transition">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          <span className="font-medium text-gray-700">Login with Google</span>
        </button>
      </div>

      {/* Toggle */}
      <p className="text-center text-gray-600 text-sm">
        Don’t have an account?{" "}
        <button
          onClick={onToggleMode}
          className="text-[#004E64] hover:text-[#46B5D1] font-semibold"
        >
          Sign up
        </button>
      </p>
    </motion.div>
  );
};

export default LoginForm;
