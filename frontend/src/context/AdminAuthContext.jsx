/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load admin from localStorage on page refresh
  useEffect(() => {
    const stored = localStorage.getItem("adminInfo");
    if (stored) {
      setAdmin(JSON.parse(stored)); // { admin, token }
    }
    setLoading(false);
  }, []);

  // Admin login
  const adminLogin = async (email, password) => {
    try {
      const { data } = await axios.post("https://asthetic2spaces-2.onrender.com/api/admin/login", {
        email,
        password,
      });

      const adminData = {
        admin: data.admin,
        token: data.token,
      };

      localStorage.setItem("adminInfo", JSON.stringify(adminData));
      setAdmin(adminData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const adminLogout = () => {
    localStorage.removeItem("adminInfo");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, adminLogin, adminLogout, loading }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
