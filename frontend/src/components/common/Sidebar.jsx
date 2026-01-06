import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useVendorAuth } from "../../context/VendorAuthContext"; 
import { useAuth } from "../../context/AuthContext";
import { useAdminAuth } from "../../context/AdminAuthContext";

import {
  Home,
  PlusCircle,
  Building,
  Calendar,
  BarChart3,
  Users,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
  FileText,
  FileCheck,  
  MessageSquare,  
  X,
} from "lucide-react";

const Sidebar = ({ role = "vendor", isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
   const { vendor,vendorLogout } = useVendorAuth();
   const {user,logout} = useAuth();
   const {adminLogout} = useAdminAuth();
   console.log(vendor)
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";   // disable background scroll
  } else {
    document.body.style.overflow = "auto";     // enable again when closed
  }

  return () => {
    document.body.style.overflow = "auto";     // cleanup
  };
}, [isOpen]);

  const menuItems = {
    vendor: [
      { label: "Dashboard", path: "/vendor/dashboard", icon: Home },
      { label: "Add Property", path: "/vendor/add-property", icon: PlusCircle },
      { label: "My Properties", path: "/vendor/my-properties", icon: Building },
      { label: "Bookings", path: "/vendor/bookings", icon: Calendar },
      { label: "Analytics", path: "/vendor/analytics", icon: BarChart3 },
    ],
    admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: Home },
    { label: "Vendor Approvals", path: "/admin/vendors", icon: Users },
    { label: "Listing Approvals", path: "/admin/listings", icon: FileCheck },
    { label: "Support Tickets", path: "/admin/tickets", icon: MessageSquare },
    { label: "All Users", path: "/admin/all-users", icon: Users },
    { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },

  ],
    user: [
      { label: "Home", path: "/user/dashboard", icon: Home },
      { label: "My Bookings", path: "/user/bookings", icon: Calendar },
      { label: "Saved Properties", path: "/user/saved", icon: Building },
      { label: "My Profile", path: "/user/profile", icon: User },
    ],
  };

  const accountMenu = [
    { label: "Profile", path: `/${role}/profile`, icon: User },
    { label: "Settings", path: `/${role}/settings`, icon: Settings },
    { label: "Support", path: `/${role}/support`, icon: HelpCircle },
  ];

const handleLogout = () => {
  if (role === "vendor") {
    vendorLogout();
    navigate("/vendor/register");
  } else if (role === "user") {
    logout();
    navigate("/login"); 
  } else if (role === "admin") {
    adminLogout();
    navigate("/admin/login");
  }
};


  const roleMenus = menuItems[role] || [];

  return (
    <>
      {/* Dim Background - Mobile Only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 w-64 z-50 bg-white shadow-lg border-r border-muted 
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 transition-transform duration-300
        flex flex-col`}
      >
        {/* Header: Title + Close Button in Same Row */}
<div className="flex items-center justify-between p-5 border-b border-muted">
  <div>
    <h1 className="text-xl font-bold text-neutral">
      {role === "admin"
        ? "Admin Panel"
        : role === "vendor"
        ? "Vendor Panel"
        : "User Panel"}
    </h1>

    {/* Dynamic Greeting */}
    {(role === "vendor" || role === "user") && (
      <p className="text-sm font-semibold text-primary mt-1">
        👋 Hi, {(role === "vendor" ? vendor?.vendorName : user?.firstName) || "Guest"}
      </p>
    )}

    <p className="text-xs text-muted capitalize">{role} dashboard</p>
  </div>

  <button className="lg:hidden" onClick={onClose}>
    <X className="h-6 w-6 text-neutral" />
  </button>
</div>


        {/* Scroll Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          {/* Main Menu */}
          <nav className="space-y-1">
            {roleMenus.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-neutral hover:bg-light"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Account Menu */}
          <nav className="pt-3 border-t border-muted space-y-1">
            {accountMenu.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-neutral hover:bg-light"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-muted">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-neutral hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
          <p className="text-xs text-muted text-center mt-3">v3.0 • RealEstate</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
