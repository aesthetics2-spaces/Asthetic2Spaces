/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const VendorAuthContext = createContext();

export const VendorAuthProvider = ({ children }) => {
  const [vendor, setVendor] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("vendor")) || null;
    } catch {
      return null;
    }
  });

  // Function to get token from localStorage
  const getToken = () => localStorage.getItem("vendorToken");

  // Axios instance with interceptors
  const vendorAxios = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  // Add request interceptor to include token
  vendorAxios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Vendor login function
  const vendorLogin = ({ vendor, token }) => {
    setVendor(vendor);
    localStorage.setItem("vendor", JSON.stringify(vendor));
    localStorage.setItem("vendorToken", token);
  };

  // Vendor logout function
  const vendorLogout = () => {
    setVendor(null);
    localStorage.removeItem("vendor");
    localStorage.removeItem("vendorToken");
  };

  // Fetch vendor properties
  const getMyProperties = async () => {
    try {
      const res = await vendorAxios.get("/vendor/property/my-properties");
      return res.data;
    } catch (error) {
      console.error("Error fetching properties:", error);
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };

  // Delete property
  const deleteProperty = async (id) => {
    try {
      const res = await vendorAxios.delete(`/vendor/property/${id}`);
      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };

  // Optional: auto-login / validate token on page load
  useEffect(() => {
    const token = getToken();
    if (token && !vendor) {
      vendorAxios
        .get("/vendor/me") // Make sure you have this endpoint to return vendor info
        .then((res) => setVendor(res.data.vendor))
        .catch(() => {
          // Invalid token, clear localStorage
          localStorage.removeItem("vendor");
          localStorage.removeItem("vendorToken");
        });
    }
  }, []);

  return (
    <VendorAuthContext.Provider
      value={{ vendor, vendorLogin, vendorLogout, getMyProperties, deleteProperty }}
    >
      {children}
    </VendorAuthContext.Provider>
  );
};

export const useVendorAuth = () => useContext(VendorAuthContext);
