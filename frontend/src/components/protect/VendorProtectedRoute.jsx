// components/VendorProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useVendorAuth } from "../../context/VendorAuthContext";

const VendorProtectedRoute = ({ children }) => {
  const { vendor } = useVendorAuth();

  if (!vendor) {
    return <Navigate to="/vendor/register" replace />;
  }

  return children;
};

export default VendorProtectedRoute;
