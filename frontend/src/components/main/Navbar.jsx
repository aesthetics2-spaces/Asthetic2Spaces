// components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Search,
  Brush,
  Calendar,
  Info,
  UserPlus,
  UserCircle,
  LogOut,
  Settings,
  LayoutDashboard,
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home", icon: <Home size={18} /> },
    { path: "/properties", label: "Search Properties", icon: <Search size={18} /> },
    { path: "/design-space", label: "Design My Space", icon: <Brush size={18} /> },
    { path: "/consultation", label: "Consultation", icon: <Calendar size={18} /> },
    { path: "/aiassistant", label: "AI Assistant", icon: <Info size={18} /> },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsUserDropdownOpen(false);
  };

  // Show loading state
  

  return (
    <nav
      className={`w-full bg-white fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md border-b border-gray-200" : "border-b border-gray-200"
      }`}
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
      <motion.div variants={itemVariants}>
  <Link to="/" className="flex items-center gap-2 group">
    <motion.img
      src="./assets/logo1.png"
      alt="AstraHomes"
      className="h-10 w-10 rounded-lg transition-transform duration-300 group-hover:scale-105"
      whileHover={{ rotate: 5 }}
    />
    <div className="flex flex-col leading-tight">
      <motion.span
        className="text-lg font-semibold text-primary group-hover:text-[#003D4F] transition-colors"
      >
        AestheToSpace
      </motion.span>
      <span className="text-xs text-gray-500 tracking-wide">
        Design. Define. Delight.
      </span>
    </div>
  </Link>
</motion.div>


        {/* Desktop Navigation */}
        <motion.div
          className="hidden md:flex items-center space-x-6"
          variants={itemVariants}
        >
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative flex flex-col items-center group"
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 text-md transition-all duration-300 ${
                    isActive ? "text-primary" : "text-neutral hover:text-primary"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>

                {/* Active underline */}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-secondary rounded-full"
                    transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Auth Section (Desktop) with Dropdown */}
<motion.div 
  variants={itemVariants} 
  className="hidden md:flex items-center gap-4"
>
  {/* 🔔 Notification Icon */}
{user && (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="relative p-2 rounded-full hover:bg-gray-50 transition-colors"
    onClick={() => navigate("/notificationpage")} // wrap in arrow function
  >
    <Bell size={22} className="text-gray-700 hover:text-primary transition" />
    {/* Optional unread indicator */}
    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
  </motion.button>
)}


  {/* 👤 User or Signup */}
  {!user ? (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to="/signup"
        className="bg-primary text-white items-center gap-1 px-6 py-2.5 rounded-lg hover:bg-[#003d4f] transition-colors duration-300 font-medium shadow-md hover:shadow-lg flex"
      >
        <UserPlus size={18} />
        Sign Up
      </Link>
    </motion.div>
  ) : (
    <div 
      className="relative"
      onMouseEnter={() => setIsUserDropdownOpen(true)}
      onMouseLeave={() => setIsUserDropdownOpen(false)}
    >
      {/* User Profile Button */}
      <motion.button
        className="flex items-center gap-2 text-gray-700 hover:text-primary transition p-2 rounded-lg hover:bg-gray-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.firstName} 
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <UserCircle size={24} />
        )}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isUserDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          >
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
              onClick={() => setIsUserDropdownOpen(false)}
            >
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.firstName} 
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <UserCircle size={24} />
              )}
              <span>Profile</span>
            </Link>

            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
              onClick={() => setIsUserDropdownOpen(false)}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
              onClick={() => setIsUserDropdownOpen(false)}
            >
              <Settings size={18} />
              Settings
            </Link>

            <div className="border-t border-gray-200 my-1"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )}
</motion.div>


        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-light transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          {isOpen ? (
            <X size={24} className="text-primary" />
          ) : (
            <Menu size={24} className="text-primary" />
          )}
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-xl"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item, idx) => (
                <motion.div key={idx} variants={itemVariants} initial="hidden" animate="visible">
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? "text-primary bg-light"
                        : "text-neutral hover:text-primary hover:bg-light"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Auth Buttons */}
              {!user ? (
                <div className="pt-2">
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-[#003d4f] transition-colors duration-300 shadow-md"
                  >
                    <UserPlus size={18} />
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="pt-2 flex flex-col gap-2">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100">
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.firstName} 
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <UserCircle size={24} />
                    )}
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:text-primary transition px-4 py-2"
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:text-primary transition px-4 py-2"
                  >
                    <Settings size={20} />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-red-600 transition-colors shadow-md"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;