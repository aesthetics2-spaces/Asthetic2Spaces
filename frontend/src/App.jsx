import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import UserLayout from "./layouts/UserLayout";
import VendorLayout from "./layouts/VendorLayout";

// User Pages
import Home from "./pages/user/Home";
import AuthPage from "./pages/user/AuthPage";
import GoogleSuccess from "./pages/user/GoogleSuccess";
import ResetPassword from "./components/ResetPassword";
import UserDashboard from "./pages/user/UserDashboard";
import UserBookings from "./pages/user/UserBookings";
import UserSaved from "./pages/user/UserSaved";
import UserProfile from "./pages/user/UserProfile";
import PropertyDetails from "./pages/user/PropertyDetails";

// Vendor Pages

import VendorDashboard from "./pages/vendor/VendorDashboard";
import AddProperty from "./pages/vendor/AddProperty";

import VendorAuthPage from "./pages/vendor/VendorAuthPage";
import VendorResetPassword from "./components/vendor/VendorResetPassword";
import Profile from "./pages/vendor/Profile";
import Analytics from "./pages/vendor/Analytics";
import Bookings from "./pages/vendor/Bookings";
import MyProperties from "./pages/vendor/MyProperties";
import EditProperty from "./pages/vendor/EditProperty";
import SearchProperty from "./pages/user/SearchProperty";
import VendorProtectedRoute from "./components/protect/VendorProtectedRoute";
import ConsultationPage from "./pages/user/Consultation";
import AIChatAssistant from "./pages/user/Aiassistant";
import NotificationsPage from "./pages/user/NotificationsPage";


// Admin Pages
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VendorManagement from "./pages/admin/VendorManagement";
import AdminLoginForm from "./pages/admin/AdminLoginPage";
import AdminProtectedRoute from "./components/protect/AdminProtectedRoute";
import AdminListingApprovals from "./pages/admin/AdminListingApprovals";
import UsersManagement from "./pages/admin/UsersManagement";



function App() {
  return (
    <Routes>
      {/* -------------------- USER ROUTES -------------------- */}
      <Route
        path="/"
        element={
          <UserLayout>
            <Home />
          </UserLayout>
        }
      />

      <Route
        path="/properties"
        element={
          <UserLayout>
             <SearchProperty/>
          </UserLayout>
        }
      />
      <Route
  path="/property/:id"
  element={
    <UserLayout>
      <PropertyDetails />
    </UserLayout>
  }
/>

  <Route path="/dashboard" element={<UserLayout><UserDashboard /></UserLayout>} />
        <Route path="/bookings" element={<UserLayout><UserBookings /></UserLayout>} />
<Route path="/saved" element={<UserLayout><UserSaved /></UserLayout>} />
<Route path="/profile" element={<UserLayout><UserProfile /></UserLayout>} />

      <Route
        path="/design-space"
        element={
          <UserLayout>
            <div className="p-6">Design</div>
          </UserLayout>
        }
      />

      <Route
        path="/consultation"
        element={
          <UserLayout>
            <ConsultationPage/>
          </UserLayout>
        }
      />

      <Route
        path="/aiassistant"
        element={
          <UserLayout>
            <AIChatAssistant/>
          </UserLayout>
        }
      />
            <Route
        path="/notificationpage"
        element={
          <UserLayout>
            <NotificationsPage/>
          </UserLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <UserLayout>
            <div className="p-6">Contact</div>
          </UserLayout>
        }
      />

   <Route 
  path="/signup" 
  element={
    <UserLayout>
      <AuthPage />
    </UserLayout>
  } 
/>

      <Route path="/google-success" element={<GoogleSuccess />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />



      {/* -------------------- VENDOR ROUTES -------------------- */}
      {/* Vendor Login */}
      <Route path="/vendor/register" element={<VendorAuthPage />} />
        // Vendor Reset Password
<Route path="/vendor/reset-password/:token" element={<VendorResetPassword />} />


      

      {/* Vendor Dashboard Routes */}
<Route
  path="/vendor/dashboard"
  element={
    <VendorProtectedRoute>
      <VendorLayout>
        <VendorDashboard />
      </VendorLayout>
    </VendorProtectedRoute>
  }
/>

      <Route
        path="/vendor/add-property"
        element={
          <VendorProtectedRoute>
          <VendorLayout>
            <AddProperty />
          </VendorLayout>
          </VendorProtectedRoute>

        }
      />
      <Route
  path="/vendor/my-properties"
  element={
    <VendorProtectedRoute>
    <VendorLayout>
      <MyProperties />
    </VendorLayout>
    </VendorProtectedRoute>

  }
/>
 <Route
  path="/vendor/edit-property/:id"
  element={
    <VendorProtectedRoute>
            <VendorLayout>
      <EditProperty/>
    </VendorLayout>
    </VendorProtectedRoute>

  }
/>

<Route
  path="/vendor/bookings"
  element={
    <VendorLayout>
      <Bookings />
    </VendorLayout>
  }
/>

<Route
  path="/vendor/analytics"
  element={
    <VendorLayout>
      <Analytics />
    </VendorLayout>
  }
/>

<Route
  path="/vendor/profile"
  element={
    <VendorLayout>
      <Profile />
    </VendorLayout>
  }
/>

{/* admin routes */}

<Route
path="/admin/login"
element={
    <AdminLoginForm/>
}
/>

<Route
path="/admin/dashboard"
element={
  <AdminProtectedRoute>
  <AdminLayout>
    <AdminDashboard/>
  </AdminLayout>
  </AdminProtectedRoute>

}
/>
<Route
  path="/admin/listings"
  element={
    <AdminProtectedRoute>
      <AdminLayout>
        <AdminListingApprovals />
      </AdminLayout>
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin/all-users"
  element={
    <AdminProtectedRoute>
      <AdminLayout>
        <UsersManagement/>
      </AdminLayout>
    </AdminProtectedRoute>
  }
/>


<Route
  path="/admin/vendors"
  element={
    <AdminProtectedRoute>
    <AdminLayout>
      <VendorManagement />
    </AdminLayout>
    </AdminProtectedRoute>

  }
/>
    </Routes>
  );
}

export default App;
