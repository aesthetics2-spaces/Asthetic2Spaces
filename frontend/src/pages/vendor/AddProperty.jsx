// pages/vendor/AddProperty.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Home,
  MapPin,
  IndianRupee,
  BedDouble,
  Bath,
  Square,
  Text,
  CheckCircle,
  X,
} from "lucide-react";

const AddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "apartment",
    price: "",
    location: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    designFeatures: "",
    vastuCompliance: "",
    specialOfferings: "",
  });

  const [uploadedImages, setUploadedImages] = useState([]);

  const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imgs = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: crypto.randomUUID(),
    }));

    setUploadedImages([...uploadedImages, ...imgs]);
  };

  const removeImage = (id) => {
    setUploadedImages(uploadedImages.filter((img) => img.id !== id));
  };

  const uploadImagesToServer = async () => {
   if (uploadedImages.length === 0) return [];

    const form = new FormData();
    uploadedImages.forEach((img) => form.append("images", img.file));

  const res = await fetch("https://asthetic2spaces-2.onrender.com/api/vendor/upload/images", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("vendorToken"),
    },
    body: form,
  });

  const data = await res.json();
  if (!data.success) throw new Error("Image upload failed");
  return data.urls;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1) Upload images to Cloudinary
    let uploadedUrls = [];
    if (uploadedImages.length > 0) {
      uploadedUrls = await uploadImagesToServer();
    }

    // 2) Send all form data to backend
    const body = { 
      ...formData,
      images: uploadedUrls 
    };

    const res = await fetch("https://asthetic2spaces-2.onrender.com/api/vendor/property/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("vendorToken"),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.success) {
      alert("Property Added Successfully!");
      navigate("/vendor/dashboard");
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    alert("Something went wrong: " + error.message);
  }
};


  return (
    <div className="min-h-screen bg-light">
{/* Page Header */}
<motion.div
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-white shadow-sm border-b border-muted lg:ml-64 sticky top-0 z-20"
>
  <div className="w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-4">
    
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="p-2 rounded-lg hover:bg-muted transition"
    >
      <ArrowLeft className="h-5 w-5 text-neutral" />
    </button>

    {/* Title Block */}
    <div className="flex flex-col">
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral leading-tight">
        Add New Property
      </h1>
      <p className="text-muted text-sm sm:text-base mt-1">
        List your property to attract potential clients
      </p>
    </div>

  </div>
</motion.div>

      {/* Property Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-64"
      >
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Info */}
          <section className="bg-white rounded-xl shadow-sm border border-muted p-6">
            <h2 className="text-xl font-semibold text-neutral flex items-center gap-2 mb-6">
              <Home className="text-primary h-5 w-5" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="3BHK Luxury Apartment"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Property Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Price (₹) *
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="number"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Enter the price"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Enter address"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Bedrooms
                </label>
                <div className="relative">
                  <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-muted rounded-lg"
                    placeholder="e.g., 3"
                  />
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Bathrooms
                </label>
                <div className="relative">
                  <Bath className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-muted rounded-lg"
                    placeholder="e.g., 2"
                  />
                </div>
              </div>

              {/* Area */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral mb-2">
                  Area (sq ft)
                </label>
                <div className="relative">
                  <Square className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-muted rounded-lg"
                    placeholder="e.g., 1250"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="bg-white rounded-xl shadow-sm border border-muted p-6">
            <h2 className="text-xl font-semibold text-neutral flex items-center gap-2 mb-6">
              <Text className="text-primary h-5 w-5" />
              Description
            </h2>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary"
              placeholder="Write about your property..."
            />
          </section>

          {/* Additional Features */}
          <section className="bg-white rounded-xl shadow-sm border border-muted p-6">
            <h2 className="text-xl font-semibold text-neutral flex items-center gap-2 mb-6">
              <CheckCircle className="text-primary h-5 w-5" />
              Additional Features
            </h2>

            <div className="space-y-5">
              {/* Design */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Design Features
                </label>
                <input
                  type="text"
                  name="designFeatures"
                  value={formData.designFeatures}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-muted rounded-lg"
                  placeholder="Modern interior, modular kitchen, etc."
                />
              </div>

              {/* Vastu */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Vastu Compliance
                </label>
                <select
                  name="vastuCompliance"
                  value={formData.vastuCompliance}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-muted rounded-lg"
                >
                  <option value="">Select Option</option>
                  <option value="fully-compliant">Fully Compliant</option>
                  <option value="partially-compliant">Partially Compliant</option>
                  <option value="not-compliant">Not Compliant</option>
                </select>
              </div>

              {/* Special Offerings */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Special Offerings
                </label>
                <input
                  type="text"
                  name="specialOfferings"
                  value={formData.specialOfferings}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-muted rounded-lg"
                  placeholder="Swimming pool, garden, private parking, etc."
                />
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="bg-white rounded-xl shadow-sm border border-muted p-6">
            <h2 className="text-xl font-semibold text-neutral flex items-center gap-2 mb-6">
              <Upload className="text-primary h-5 w-5" />
              Property Images
            </h2>

            <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
              <input
                type="file"
                className="hidden"
                id="image-upload"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />

              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                <Upload className="h-12 w-12 text-muted" />
                <div>
                  <p className="text-neutral font-medium">
                    Click to upload images
                  </p>
                  <p className="text-sm text-muted">PNG, JPG, WEBP (max 10MB)</p>
                </div>
              </label>
            </div>

            {/* Preview grid */}
            {uploadedImages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-neutral mb-3">
                  Uploaded Images ({uploadedImages.length})
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((img) => (
                    <motion.div
                      key={img.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative group"
                    >
                      <img
                        src={img.preview}
                        className="w-full h-32 object-cover rounded-lg shadow-sm"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/vendor/dashboard")}
              className="px-8 py-3 border border-muted rounded-lg text-neutral hover:bg-muted transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium"
            >
              Add Property
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProperty;
