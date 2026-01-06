// pages/admin/VendorManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import VendorModal from "../../components/admin/VendorModal";





const VendorManagement = () => {
  const { admin } = useAdminAuth();
  const [vendors, setVendors] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

  const adminAxios = axios.create({
    baseURL: "http://localhost:5000/api/admin/vendor",
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  });

  useEffect(() => {
    if (admin?.token) fetchVendors();
  }, [admin]);

  const fetchVendors = async () => {
    try {
      const { data } = await adminAxios.get("/");
      setVendors(
        data.vendors.map((vendor) => ({
          id: vendor._id,
          name: vendor.vendorName,
          email: vendor.email,
          phone: vendor.phone,
          company: vendor.companyName,
          status: vendor.status,
          submittedAt: vendor.createdAt,
        }))
      );
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const handleApprove = async (vendorId) => {
    try {
      await adminAxios.put(`/approve/${vendorId}`);
      setVendors(vendors.map(v => v.id === vendorId ? { ...v, status: "approved" } : v));
    } catch (error) {
      console.error("Error approving vendor:", error);
    }
  };

  const handleReject = async (vendorId) => {
    try {
      await adminAxios.put(`/reject/${vendorId}`);
      setVendors(vendors.map(v => v.id === vendorId ? { ...v, status: "rejected" } : v));
    } catch (error) {
      console.error("Error rejecting vendor:", error);
    }
  };

  const handleDeleteVendor = async(vendorId)=>{
    try {
      await adminAxios.delete(`/delete/${vendorId}`);
      setVendors(vendors.filter(v=>v.id !== vendorId))
    } catch (error) {
      console.log("error deleting vendor:",error)      
    }
  }

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'bg-[#46B5D1]/10 text-[#004E64] border border-[#46B5D1]/20';
    case 'pending':
      return 'bg-[#E3B04B]/10 text-[#E3B04B] border border-[#E3B04B]/20';
    case 'rejected':
      return 'bg-red-100 text-red-700 border border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || vendor.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 lg:ml-64">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Vendor Management
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Review and manage vendor applications
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search vendors..."
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
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

<div className="space-y-6">
  {filteredVendors.map((vendor) => (
    <motion.div
      key={vendor.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Status indicator */}
        <div className={`lg:w-1.5 ${getStatusColor(vendor.status).split(' ')[0]}`} />
        
        <div className="flex-1 p-6">
         <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">


            {/* Vendor Info Section */}
            <div className="flex-1 space-y-4">
              {/* Header with avatar and name */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#E3B04B]/10 rounded-xl flex items-center justify-center border-2 border-[#E3B04B]/20">
                  <Users className="h-7 w-7 text-[#E3B04B]" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-[#1F2937]">
                      {vendor.name}
                    </h3>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(vendor.status)}`}>
                      {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-[#004E64] font-medium">{vendor.company}</p>
                  
                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <div className="flex items-center gap-3 p-2 bg-[#F9FAFB] rounded-lg">
                      <div className="w-8 h-8 bg-[#46B5D1]/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-4 w-4 text-[#46B5D1]" />
                      </div>
                      <span className="text-[#1F2937] font-medium truncate">{vendor.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 bg-[#F9FAFB] rounded-lg">
                      <div className="w-8 h-8 bg-[#004E64]/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-4 w-4 text-[#004E64]" />
                      </div>
                      <span className="text-[#1F2937] font-medium">{vendor.phone}</span>
                    </div>
                  </div>
                  
                  {/* Application Date */}
                  <div className="flex items-center gap-2 mt-4 text-[#1F2937]">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E3B04B]/10 rounded-lg">
                      <Calendar className="h-4 w-4 text-[#E3B04B]" />
                      <span className="text-sm font-medium">
                        Applied: {new Date(vendor.submittedAt).toLocaleDateString('en-US', { 
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
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px]">
              {vendor.status === "pending" && (
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                  <button
                    onClick={() => handleApprove(vendor.id)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#004E64] text-white rounded-lg hover:bg-[#00384d] transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(vendor.id)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F9FAFB] text-[#1F2937] border border-[#CBD5E1] rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                </div>
              )}
              
              <button 
                onClick={() => {
                  setSelectedVendor(vendor)
                  setIsModalOpen(true)
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-[#004E64] border-2 border-[#46B5D1]/30 rounded-lg hover:bg-[#46B5D1]/5 hover:border-[#46B5D1]/50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              >
                <Eye size={18} />
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>
      </div>
      {isModalOpen && (
  <VendorModal
    vendor={selectedVendor}
    onClose={() => setIsModalOpen(false)}
    onDelete={handleDeleteVendor}
  />
)}

    </div>
    
  );
};

export default VendorManagement;
