// src/layouts/UserLayout.jsx
import React from "react";
import Navbar from "../components/main/Navbar";
import Footer from "../components/main/Footer";

const UserLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow pt-20">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
