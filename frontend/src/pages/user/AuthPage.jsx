import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import ForgotPassword from "../../components/ForgotPassword";

const AuthPage = () => {
  const [mode, setMode] = useState("login"); // "login" | "register" | "forgot"

  const handleToggleMode = (target) => {
    setMode(target);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white flex-grow">
      {/* Left Side - Branding */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#004E64] via-[#003D4F] to-[#46B5D1] text-white p-12 flex-col justify-between relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#E3B04B] rounded-full opacity-20"
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}

          {/* Gradient shapes */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-48 -left-48 w-96 h-96 bg-[#E3B04B] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [45, 135, 225],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#46B5D1] rounded-full"
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(#E3B04B 1px, transparent 1px),
                                   linear-gradient(90deg, #E3B04B 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>
        </div>

        {/* Branding / Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="relative z-10"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-br from-[#E3B04B] to-[#46B5D1] rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-lg">A2S</span>
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#E3B04B] bg-clip-text text-transparent">
              AsthticToSpace
            </h1>
          </div>
        </motion.div>

        {/* Dynamic Headings */}
        <div className="relative z-10 max-w-2xl mx-auto text-center flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h2
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#E3B04B] to-white bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "200%", "0%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              {mode === "forgot"
                ? "Reset Your Password!"
                : mode === "login"
                ? "Welcome Home!"
                : "Start Your Property Journey!"}
            </motion.h2>

            <motion.p
              className="text-xl opacity-90 leading-relaxed mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {mode === "forgot"
                ? "Enter your email to receive a password reset link."
                : mode === "login"
                ? "Sign in to explore verified properties, manage listings, and connect with top agents across the city."
                : "Join our community of buyers, sellers, and designers to discover your dream property and bring it to life."}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Forms */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(#004E64 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <div className="w-full max-w-md relative z-10">
          <AnimatePresence mode="wait">
            {mode === "login" && (
              <LoginForm
                key="login"
                onToggleMode={() => handleToggleMode("register")}
                onForgotPassword={() => handleToggleMode("forgot")}
              />
            )}

            {mode === "register" && (
              <RegisterForm
                key="register"
                onToggleMode={() => handleToggleMode("login")}
              />
            )}

            {mode === "forgot" && (
              <ForgotPassword
                key="forgot"
                onToggleMode={(target) => handleToggleMode(target)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
