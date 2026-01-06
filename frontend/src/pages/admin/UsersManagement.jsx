// UsersManagement.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Eye,
  Search,
  Calendar,
  Trash2,
} from "lucide-react";
import UserModal from "../../components/admin/UserModal"; // Import the extracted modal

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const adminToken = JSON.parse(localStorage.getItem("adminInfo"))?.token;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminToken) fetchUsers();
  }, [adminToken]);

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSingleUser = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setSelectedUser(res.data.user);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (user) => {
    if (user.status) {
      switch (user.status.toLowerCase()) {
        case 'active':
          return 'bg-[#46B5D1]/10 text-[#004E64] border border-[#46B5D1]/20';
        case 'inactive':
          return 'bg-[#E3B04B]/10 text-[#E3B04B] border border-[#E3B04B]/20';
        case 'suspended':
          return 'bg-red-100 text-red-700 border border-red-200';
        default:
          return 'bg-gray-100 text-gray-700 border border-gray-200';
      }
    }
    
    return 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  const getUserName = (user) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.name || user.email?.split('@')[0] || 'User';
  };

  const filteredUsers = users.filter(user => {
    const name = getUserName(user).toLowerCase();
    const email = user.email?.toLowerCase() || '';
    const matchesSearch = 
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || 
      (user.status && user.status.toLowerCase() === filter.toLowerCase()) ||
      (filter === "user" && user.role === "user") ||
      (filter === "admin" && user.role === "admin");
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="lg:ml-60 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:ml-64">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Users Management
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Manage and monitor user accounts
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Users</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="user">Regular Users</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-6">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">No users found</h3>
              <p className="text-gray-600 mt-1">
                {searchTerm ? "Try adjusting your search criteria" : "No users in the system yet"}
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className={`lg:w-1.5 ${getStatusColor(user).split(' ')[0]}`} />
                  
                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      {/* User Info Section */}
                      <div className="flex-1 space-y-4">
                        {/* Header with avatar and name */}
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center border-2 border-blue-200">
                            {user.avatar ? (
                              <img 
                                src={user.avatar} 
                                alt={getUserName(user)}
                                className="w-full h-full rounded-xl object-cover"
                              />
                            ) : (
                              <User className="h-7 w-7 text-blue-600" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-[#1F2937]">
                                {getUserName(user)}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(user)}`}>
                                  {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Active'}
                                </span>
                                <span className="px-3 py-1.5 bg-purple-100 text-purple-700 border border-purple-200 rounded-full text-xs font-semibold">
                                  {user.role?.toUpperCase() || 'USER'}
                                </span>
                                {user.googleId && (
                                  <span className="px-3 py-1.5 bg-green-100 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
                                    Google Auth
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Contact Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                              <div className="flex items-center gap-3 p-2 bg-[#F9FAFB] rounded-lg">
                                <div className="w-8 h-8 bg-[#46B5D1]/10 rounded-lg flex items-center justify-center">
                                  <Mail className="h-4 w-4 text-[#46B5D1]" />
                                </div>
                                <span className="text-[#1F2937] font-medium truncate">{user.email}</span>
                              </div>
                              
                              {user.phone && (
                                <div className="flex items-center gap-3 p-2 bg-[#F9FAFB] rounded-lg">
                                  <div className="w-8 h-8 bg-[#004E64]/10 rounded-lg flex items-center justify-center">
                                    <Phone className="h-4 w-4 text-[#004E64]" />
                                  </div>
                                  <span className="text-[#1F2937] font-medium">{user.phone}</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Additional Info */}
                            <div className="flex flex-wrap items-center gap-3 mt-4">
                              {/* Registration Date */}
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium">
                                  Joined: {new Date(user.createdAt).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons Section */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[180px]">
                        {/* View Details */}
                        <button
                          onClick={() => {
                            if (user.email && user.firstName) {
                              setSelectedUser(user);
                              setIsModalOpen(true);
                            } else {
                              fetchSingleUser(user._id);
                            }
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#004E64] border-2 border-[#46B5D1]/30 rounded-lg hover:bg-[#46B5D1]/5 hover:border-[#46B5D1]/50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                        >
                          <Eye size={16} />
                          View Details
                        </button>
                        
                        {/* Delete */}
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                        >
                          <Trash2 size={16} />
                          Delete User
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={() => setIsModalOpen(false)}
            onDelete={deleteUser}
            onToggleStatus={toggleUserStatus}
          />
        )}
      </AnimatePresence>
    </div>
  );
}