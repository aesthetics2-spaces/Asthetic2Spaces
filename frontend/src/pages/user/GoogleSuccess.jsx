// components/GoogleSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
const GoogleSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    const userData = urlParams.get("user");

    if (token && userData) {
      // Parse the user data
      const user = JSON.parse(decodeURIComponent(userData));

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update context
      login({ user, token });
      console.log(user)

      // Redirect after short delay
      setTimeout(() => navigate("/"), 1000);
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Google Login Successful!</h2>
        <p className="text-gray-600">Redirecting you to the home page...</p>
      </div>
    </div>
  );
};

export default GoogleSuccess;
