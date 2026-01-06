import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  X, 
  Eye, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Home,
  User,
  Mail,
  Phone,
  Trash2,
  Map
} from "lucide-react";
import PropertyModal from "../../components/admin/PropertyModal";
 // Import the new modal component

export default function AdminListingApprovals() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const adminToken = JSON.parse(localStorage.getItem("adminInfo"))?.token;

  // Slider settings for property images
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://asthetic2spaces-2.onrender.com/api/admin/property/",
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      setProperties(res.data.properties || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(err.response?.data?.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminToken) fetchProperties();
  }, [adminToken]);

  const approveProperty = async (id) => {
    try {
      await axios.put(`https://asthetic2spaces-2.onrender.com/api/admin/property/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      fetchProperties();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to approve property");
    }
  };

  const rejectProperty = async (id) => {
    try {
      await axios.put(`https://asthetic2spaces-2.onrender.com/api/admin/property/reject/${id}`, {}, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      fetchProperties();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to reject property");
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this property? This action cannot be undone.")) {
      return;
    }

    try {
      setIsDeleting(true);
      await axios.delete(`https://asthetic2spaces-2.onrender.com/api/admin/property/delete/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      alert("Property deleted successfully!");
      setIsModalOpen(false);
      fetchProperties();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete property");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-red-500 text-center">
            <X className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Error Loading Properties</h3>
            <p>{error}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="lg:ml-60 min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
        <p className="text-gray-600 mt-2">
          Review, approve, and manage property listings
        </p>
        <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-primary-800 font-medium">
              {properties.length} {properties.length === 1 ? 'property' : 'properties'} in total
            </p>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                Approved: {properties.filter(p => p.status === 'approved').length}
              </span>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                Pending: {properties.filter(p => p.status === 'pending').length}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
            <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600">No properties have been listed yet.</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {properties.map((property) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              {/* Image Slider */}
              <div className="relative h-56 overflow-hidden">
                {property.images && property.images.length > 0 ? (
                  <Slider {...sliderSettings}>
                    {property.images.map((img, index) => (
                      <div key={index} className="h-56">
                        <img
                          src={img}
                          alt={`${property.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Home className="w-16 h-16 text-gray-400" />
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    property.status === "approved" ? "bg-emerald-500 text-white" :
                    property.status === "rejected" ? "bg-rose-500 text-white" :
                    "bg-amber-500 text-white"
                  }`}>
                    {property.status?.toUpperCase() || "PENDING"}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-3 right-3 z-10 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg">
                  <span className="text-white font-bold text-sm">₹{property.price}</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 ease-out flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProperty(property);
                        setIsModalOpen(true);
                      }}
                      className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Simple Card Footer - Only Title and Type */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base mb-1 truncate">{property.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="truncate max-w-[120px]">{property.location}</span>
                  </div>
                  <span className="text-primary-600 text-sm font-medium bg-primary-50 px-2 py-1 rounded">
                    {property.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Use the separate PropertyModal component */}
      <AnimatePresence>
        {isModalOpen && selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            onClose={() => setIsModalOpen(false)}
            onApprove={approveProperty}
            onReject={rejectProperty}
            onDelete={deleteProperty}
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}