// pages/vendor/MyProperties.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { useVendorAuth } from "../../context/VendorAuthContext";

import {
  PlusCircle,
  Edit,
  Trash2,
  MapPin,
  IndianRupee,
  Bed,
  Bath,
  Square,
  ArrowLeft,
} from "lucide-react";

// ----- PROPERTY CARD -----
const PropertyCard = ({ property, onDelete }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key={property._id}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-xl shadow-sm border border-muted overflow-hidden hover:shadow-md transition"
    >
      {/* Images / Slider */}
      <div className="relative h-48">
        {property.images && property.images.length > 1 ? (
          <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1} arrows>
            {property.images.map((img, index) => (
              <div key={index} className="h-48">
                <img
                  src={img}
                  alt={`${property.title} - ${index + 1}`}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <img
            src={property.images?.[0] || "/placeholder.jpg"}
            alt={property.title}
            className="w-full h-full object-cover rounded-t-xl"
          />
        )}
      </div>

      {/* Details */}
      <div className="p-5 space-y-3">
        <h2 className="text-lg font-semibold text-neutral line-clamp-1">
          {property.title}
        </h2>

        <div className="flex items-center text-muted gap-1">
          <MapPin className="h-4 w-4" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        <div className="flex justify-between text-sm text-neutral pt-2">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" /> {property.bedrooms} Beds
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" /> {property.bathrooms} Bath
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" /> {property.area} sqft
          </div>
        </div>

        <div className="flex items-center gap-1 font-semibold text-primary text-xl pt-1">
          <IndianRupee className="w-4 h-4" />
          {property.price}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            className="flex-1 py-2 border border-muted rounded-lg text-neutral hover:bg-muted transition"
            onClick={() => navigate(`/vendor/edit-property/${property._id}`)}
          >
            <Edit className="h-4 w-4 inline mr-1" /> Edit
          </button>

          <button
            className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={() => onDelete(property._id)}
          >
            <Trash2 className="h-4 w-4 inline mr-1" /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ----- MAIN PAGE -----
const MyProperties = () => {
  const navigate = useNavigate();

  // Context Functions
  const { getMyProperties, deleteProperty } = useVendorAuth();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Properties
  const loadProperties = async () => {
    setLoading(true);

    const data = await getMyProperties();

    if (data.success) {
      setProperties(data.properties);
    } else {
      alert(data.message);
    }

    setLoading(false);
  };

  // Delete
  const handleDelete = async (id) => {
    const res = await deleteProperty(id);

    if (res.success) {
      setProperties((prev) => prev.filter((p) => p._id !== id));
      alert("Property deleted successfully.");
    } else {
      alert(res.message);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral text-xl">
        Loading properties...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light lg:ml-64 pb-10">
      {/* HEADER */}
      <div className="bg-white shadow-sm border-b border-muted sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex justify-between items-center">

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/vendor/dashboard")}
              className="p-2 rounded-xl hover:bg-gray-200 transition"
            >
              <ArrowLeft className="h-6 w-6 text-neutral" />
            </button>

            <h1 className="text-2xl md:text-3xl font-bold text-neutral">
              My Properties
            </h1>
          </div>

          <button
            onClick={() => navigate("/vendor/add-property")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            <PlusCircle className="h-5 w-5" /> Add New Property
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
