import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import { VendorAuthProvider } from "./context/VendorAuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AdminAuthProvider>
      <VendorAuthProvider>
      <AuthProvider> 
        <App />
      </AuthProvider>
    </VendorAuthProvider>
    </AdminAuthProvider>

    </BrowserRouter>
  </React.StrictMode>
);
