// layouts/VendorLayout.jsx
import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';   // UPDATED IMPORT
import { Menu, User } from 'lucide-react';
import { useVendorAuth } from '../context/VendorAuthContext';

const VendorLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {vendor} = useVendorAuth()

  return (
    <div className="min-h-screen bg-light">
      <Sidebar 
  role="vendor"
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
/>
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 lg:ml-0 min-h-screen">

          {/* Mobile Top Bar */}
          <div className="lg:hidden bg-white shadow-sm border-b border-muted sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 py-3">

              {/* Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5 text-neutral" />
              </button>

              {/* Vendor Info (mobile only) */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-medium text-neutral text-sm">{vendor.vendorName}</p>
                  <p className="text-xs text-muted">Vendor</p>
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                 <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
  <User className="text-white w-5 h-5" />
</div>
                </div>
              </div>

            </div>
          </div>

          {/* Page Content */}
          <main className="p-4 lg:p-6">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
};

export default VendorLayout;
