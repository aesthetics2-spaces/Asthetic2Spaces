// layouts/AdminLayout.jsx
import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import { Menu, User } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        role="admin"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 lg:ml-0 min-h-screen">

          {/* Mobile Top Bar */}
          <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 py-3">

              {/* Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-900" />
              </button>

              {/* Admin Info (mobile only) */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm">Admin User</p>
                  <p className="text-xs text-gray-600">Administrator</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="text-white w-5 h-5" />
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

export default AdminLayout;