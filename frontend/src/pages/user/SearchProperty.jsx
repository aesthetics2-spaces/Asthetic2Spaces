import React, { useState, useEffect } from 'react';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, MapPin, Bed, Bath, Square, Filter, X, Home, Star, Eye } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; 
import PropertyCard from '../../components/searchproperty/PropertyCard';

const SearchProperty = () => {
   const { user } = useAuth(); 

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [likedList, setLikedList] = useState([]);

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    minArea: '',
    maxArea: '',
    vastuCompliance: '',
    designFeatures: '',
    specialOfferings: ''
  });


  // Fetch Real Properties from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://asthetic2spaces-3.onrender.com/api/vendor/property/verified"
        );

        setProperties(res.data.properties);
        setFilteredProperties(res.data.properties);
        console.log(res.data.properties)
      } catch (error) {
        console.error("Error loading properties:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

const refreshLikes = async () => {
  try {
    if (!userId) return;

    const res = await axios.get(
      `https://asthetic2spaces-3.onrender.com/api/favorites/liked/${userId}`
    );
    // ✅ extract only IDs
    const ids = res.data.likedProperties.map(p => p._id);
    setLikedList(ids);
  } catch (err) {
    console.log("Error refreshing likes", err);
  }
};
console.log(likedList)

  useEffect(() => {
    if (userId) {
      refreshLikes();
    }
  }, [userId]);

  // Search + Filter Logic
  const handleSearch = () => {
    let results = properties;

    // Search
    if (searchQuery) {
      results = results.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filters
    if (filters.type) results = results.filter(p => p.type === filters.type);
    if (filters.minPrice) results = results.filter(p => p.price >= parseInt(filters.minPrice));
    if (filters.maxPrice) results = results.filter(p => p.price <= parseInt(filters.maxPrice));
    if (filters.bedrooms) results = results.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
    if (filters.bathrooms) results = results.filter(p => p.bathrooms >= parseInt(filters.bathrooms));
    if (filters.minArea) results = results.filter(p => p.area >= parseInt(filters.minArea));
    if (filters.maxArea) results = results.filter(p => p.area <= parseInt(filters.maxArea));
    if (filters.vastuCompliance) results = results.filter(p => p.vastuCompliance === filters.vastuCompliance);
    if (filters.designFeatures) results = results.filter(p => p.designFeatures?.toLowerCase().includes(filters.designFeatures.toLowerCase()));
    if (filters.specialOfferings) results = results.filter(p => p.specialOfferings?.toLowerCase().includes(filters.specialOfferings.toLowerCase()));

    setFilteredProperties(results);
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      minArea: '',
      maxArea: '',
      vastuCompliance: '',
      designFeatures: '',
      specialOfferings: ''
    });
    setSearchQuery('');
    setFilteredProperties(properties);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Property Card Component
// 
  return (
    <div className="min-h-screen bg-light">
      {/* Banner Section */}
      <div className="relative bg-primary py-20 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20">
            <Home className="w-full h-full" />
          </div>
          <div className="absolute bottom-10 right-10 w-24 h-24">
            <MapPin className="w-full h-full" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Discover Your Dream Property
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Find the perfect home from our curated collection of premium properties
          </motion.p>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-3xl font-bold mb-2">{properties.length}+</div>
              <p className="text-blue-100">Premium Properties</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-3xl font-bold mb-2">50+</div>
              <p className="text-blue-100">Happy Families</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">Expert Support</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-muted"
        >
          {/* Main Search */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search by location, property name, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-12 pr-4 py-4 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors font-semibold flex items-center gap-2 justify-center"
            >
              <Search size={20} />
              Search
            </button>
          </div>

          {/* Filters Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              <Filter size={20} />
              {filtersOpen ? 'Hide Filters' : 'Show Advanced Filters'}
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted">
                {filteredProperties.length} properties found
              </span>
              <button 
                onClick={resetFilters}
                className="text-accent hover:text-accent/80 transition-colors text-sm font-medium flex items-center gap-1"
              >
                <X size={16} />
                Reset All
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden"
              >
                {[
                  { label: "Property Type", name: "type", type: "select", options: ["", "apartment", "house", "villa"] },
                  { label: "Min Price", name: "minPrice", type: "number" },
                  { label: "Max Price", name: "maxPrice", type: "number" },
                  { label: "Bedrooms", name: "bedrooms", type: "select", options: ["", "1", "2", "3", "4"] },
                  { label: "Bathrooms", name: "bathrooms", type: "select", options: ["", "1", "2", "3"] },
                  { label: "Min Area (sq ft)", name: "minArea", type: "number" },
                  { label: "Max Area (sq ft)", name: "maxArea", type: "number" },
                  { label: "Vastu Compliance", name: "vastuCompliance", type: "select", options: ["", "yes", "no"] },
                  { label: "Design Features", name: "designFeatures", type: "text", placeholder: "Modern, Modular..." },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="font-semibold text-neutral text-sm mb-2 block">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        value={filters[field.name]}
                        onChange={(e) => handleFilterChange(field.name, e.target.value)}
                        className="w-full p-3 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {field.options.map(option => (
                          <option key={option} value={option}>
                            {option === "" ? "Any" : option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={filters[field.name]}
                        onChange={(e) => handleFilterChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full p-3 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Section */}
        <div className="mt-12">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin h-12 w-12 border-b-2 border-primary rounded-full"></div>
            </div>
          ) : filteredProperties.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg border border-muted"
            >
              <Search size={48} className="text-muted mx-auto mb-4" />
              <h3 className="text-xl font-bold text-neutral mb-2">No properties found</h3>
              <p className="text-muted">Try adjusting your search criteria or filters</p>
            </motion.div>
          ) : (
                      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
  key={property._id}
  property={property}
  userId={userId}
  isLiked={likedList.includes(property._id)}
  user={user} 
/>

            ))}
          </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProperty;