import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Bed,
  Bath,
  Square,
  Home,
  User,
  Map,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Building2,
  Calendar,
  Maximize2,
  DollarSign,
  Globe,
  FileText,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PropertyModal = ({ property, onClose, onApprove, onReject, onDelete, isDeleting }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  if (!property) return null;

  // Main slider settings (for large images)
  const mainSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    asNavFor: nav2,
    ref: (slider) => setNav1(slider),
  };

  // Thumbnail slider settings
  const thumbnailSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: property.images?.length > 4 ? 4 : property.images?.length || 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
    asNavFor: nav1,
    ref: (slider) => setNav2(slider),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: property.images?.length > 3 ? 3 : property.images?.length || 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: property.images?.length > 2 ? 2 : property.images?.length || 1,
        }
      }
    ]
  };

  // Custom Next Arrow
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
      >
        <ChevronRight size={24} />
      </button>
    );
  }

  // Custom Prev Arrow
  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft size={24} />
      </button>
    );
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-[#46B5D1]" />;
      case "pending":
        return <Clock className="h-5 w-5 text-[#E3B04B]" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-[#46B5D1]/10 text-[#004E64] border border-[#46B5D1]/30";
      case "pending":
        return "bg-[#E3B04B]/10 text-[#E3B04B] border border-[#E3B04B]/30";
      case "rejected":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  // Static map URL
  const getStaticMapUrl = (location) => {
    const encodedLocation = encodeURIComponent(location);
    return `https://maps.google.com/maps?q=${encodedLocation}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="
          relative w-full max-w-6xl
          max-h-[90vh]
          bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#CBD5E1]/50
          flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#004E64] to-[#46B5D1] p-6 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{property.title}</h2>
              <div className="flex items-center text-white/90 text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Property Details */}
            <div>
              {/* Image Slider */}
              <div className="rounded-xl overflow-hidden mb-6 border border-[#CBD5E1]/50">
                {property.images && property.images.length > 0 ? (
                  <>
                    {/* Main Image Slider */}
                    <div className="relative mb-4">
                      <Slider {...mainSliderSettings}>
                        {property.images.map((img, index) => (
                          <div key={index} className="h-96">
                            <img
                              src={img}
                              alt={`${property.title} - Image ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </Slider>
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {property.images.length} image{property.images.length > 1 ? 's' : ''}
                      </div>
                    </div>

                    {/* Thumbnail Slider - Only show if more than 1 image */}
                    {property.images.length > 1 && (
                      <div className="px-4">
                        <Slider {...thumbnailSliderSettings}>
                          {property.images.map((img, index) => (
                            <div key={index} className="px-1">
                              <div className="h-20 cursor-pointer border-2 border-transparent hover:border-blue-500 rounded overflow-hidden transition-all">
                                <img
                                  src={img}
                                  alt={`Thumbnail ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-72 bg-gradient-to-br from-[#F9FAFB] to-[#CBD5E1]/30 flex items-center justify-center rounded-lg">
                    <Home className="w-20 h-20 text-[#CBD5E1]" />
                  </div>
                )}
              </div>

              {/* Property Information */}
              <div className="space-y-6">
                {/* Price and Status */}
                <div className="flex items-center justify-between p-5 bg-[#F9FAFB] rounded-xl border border-[#CBD5E1]/50">
                  <div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-[#004E64]" />
                      <div className="text-3xl font-bold text-[#004E64]">₹{property.price}</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Property Price</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(property.status)}
                      <span className={`px-4 py-1.5 rounded-full font-semibold text-sm ${getStatusColor(property.status)}`}>
                        {property.status?.toUpperCase() || "PENDING"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Status</div>
                  </div>
                </div>

                {/* Property Specifications */}
                <div className="bg-white border border-[#CBD5E1]/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Property Specifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-[#F9FAFB] rounded-lg border border-[#CBD5E1]/30">
                      <Bed className="h-6 w-6 text-[#004E64] mx-auto mb-2" />
                      <div className="text-xl font-bold text-[#1F2937]">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                    <div className="text-center p-4 bg-[#F9FAFB] rounded-lg border border-[#CBD5E1]/30">
                      <Bath className="h-6 w-6 text-[#004E64] mx-auto mb-2" />
                      <div className="text-xl font-bold text-[#1F2937]">{property.bathrooms}</div>
                      <div className="text-sm text-gray-600">Bathrooms</div>
                    </div>
                    <div className="text-center p-4 bg-[#F9FAFB] rounded-lg border border-[#CBD5E1]/30">
                      <Square className="h-6 w-6 text-[#004E64] mx-auto mb-2" />
                      <div className="text-xl font-bold text-[#1F2937]">{property.area}</div>
                      <div className="text-sm text-gray-600">Sq. Ft.</div>
                    </div>
                    <div className="text-center p-4 bg-[#F9FAFB] rounded-lg border border-[#CBD5E1]/30">
                      <Home className="h-6 w-6 text-[#004E64] mx-auto mb-2" />
                      <div className="text-xl font-bold text-[#1F2937] capitalize">{property.type}</div>
                      <div className="text-sm text-gray-600">Type</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white border border-[#CBD5E1]/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-[#1F2937] mb-3">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{property.description}</p>
                </div>

                {/* Additional Information */}
                <div className="bg-white border border-[#CBD5E1]/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Additional Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {property.furnishing && (
                      <div>
                        <p className="text-sm text-gray-600">Furnishing</p>
                        <p className="font-medium">{property.furnishing}</p>
                      </div>
                    )}
                    {property.floor && (
                      <div>
                        <p className="text-sm text-gray-600">Floor</p>
                        <p className="font-medium">{property.floor}</p>
                      </div>
                    )}
                    {property.age && (
                      <div>
                        <p className="text-sm text-gray-600">Property Age</p>
                        <p className="font-medium">{property.age} years</p>
                      </div>
                    )}
                    {property.parking && (
                      <div>
                        <p className="text-sm text-gray-600">Parking</p>
                        <p className="font-medium">{property.parking}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Map and Actions */}
            <div className="space-y-6">
              {/* Map Section */}
              <div className="bg-white border border-[#CBD5E1]/50 rounded-xl overflow-hidden">
                <div className="p-4 border-b bg-[#F9FAFB]">
                  <h3 className="text-lg font-semibold text-[#1F2937] flex items-center">
                    <Map className="h-5 w-5 text-[#004E64] mr-2" />
                    Property Location
                  </h3>
                </div>
                <div className="h-64">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={getStaticMapUrl(property.location)}
                    allowFullScreen
                    title="Property Location Map"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 border-t">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Address:</strong> {property.location}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#004E64] hover:text-[#00384d] text-sm font-medium"
                  >
                    Open in Google Maps
                    <MapPin className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>

              {/* Vendor Information */}
              <div className="bg-[#F9FAFB] rounded-xl p-5 border border-[#CBD5E1]/50">
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Vendor Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#CBD5E1]/30">
                    <div className="w-10 h-10 bg-[#E3B04B]/10 rounded-lg flex items-center justify-center">
                      <User className="h-5 w-5 text-[#E3B04B]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F2937]">{property.vendorId?.name || "N/A"}</p>
                      <p className="text-sm text-gray-600">Property Owner</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#CBD5E1]/30">
                    <div className="w-10 h-10 bg-[#46B5D1]/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-[#46B5D1]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-[#1F2937] truncate">{property.vendorId?.email || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#CBD5E1]/30">
                    <div className="w-10 h-10 bg-[#004E64]/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-[#004E64]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-[#1F2937]">{property.vendorId?.mobile || "N/A"}</p>
                    </div>
                  </div>
                  
                  {/* Additional Vendor Info */}
                  {property.vendorId?.company && (
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#CBD5E1]/30">
                      <div className="w-10 h-10 bg-[#E3B04B]/10 rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-[#E3B04B]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Company</p>
                        <p className="font-medium text-[#1F2937]">{property.vendorId.company}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {property.status === "pending" && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onApprove(property._id)}
                      className="w-full py-3 bg-[#004E64] text-white rounded-xl hover:bg-[#00384d] transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <Check className="h-5 w-5" />
                      Approve Property
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onReject(property._id)}
                      className="w-full py-3 bg-white text-[#1F2937] border-2 border-[#CBD5E1] rounded-xl hover:bg-gray-50 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <XCircle className="h-5 w-5" />
                      Reject Property
                    </motion.button>
                  </>
                )}

                {/* Delete Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onDelete(property._id)}
                  disabled={isDeleting}
                  className="w-full py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-5 w-5" />
                      Delete Property
                    </>
                  )}
                </motion.button>
              </div>

              {/* Property Statistics */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Property Statistics</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">
                      {property.views || 0}
                    </div>
                    <div className="text-sm text-gray-600">Total Views</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">
                      {property.bookings || 0}
                    </div>
                    <div className="text-sm text-gray-600">Bookings</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-amber-600">
                      {new Date(property.createdAt).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    <div className="text-sm text-gray-600">Listed Date</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-purple-600">
                      {property.status === 'approved' ? '✓' : '...'}
                    </div>
                    <div className="text-sm text-gray-600">Approval</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PropertyModal;