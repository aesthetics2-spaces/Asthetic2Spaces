// pages/vendor/EditProperty.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("vendorToken");

  // -----------------------
  // FORM DATA STATE
  // -----------------------
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

  // -----------------------
  // FETCH PROPERTY BY ID
  // -----------------------
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/vendor/property/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.data.success) {
          alert("Property not found!");
          navigate("/vendor/my-properties");
          return;
        }

        const p = res.data.property;

        // Pre-fill form
        setFormData({
          title: p.title || "",
          type: p.type || "apartment",
          price: p.price || "",
          location: p.location || "",
          description: p.description || "",
          bedrooms: p.bedrooms || "",
          bathrooms: p.bathrooms || "",
          area: p.area || "",
          designFeatures: p.designFeatures || "",
          vastuCompliance: p.vastuCompliance || "",
          specialOfferings: p.specialOfferings || "",
        });

        // Set previously uploaded images
        setUploadedImages(
          (p.images || []).map((img, index) => ({
            id: index,
            file: null,
            preview: img,
          }))
        );
      } catch (err) {
        console.log(err);
        alert("Failed to load property!");
      }
    };

    if (token) fetchProperty();
  }, [id, token]);

  // -----------------------
  // HANDLE INPUT CHANGES
  // -----------------------
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // -----------------------
  // IMAGE UPLOAD PREVIEW
  // -----------------------
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImgs = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setUploadedImages((prev) => [...prev, ...newImgs]);
  };

  const removeImage = (id) =>
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));

  // -----------------------
  // UPLOAD IMAGES TO SERVER
  // -----------------------
  const uploadImagesToServer = async () => {
    const newImages = uploadedImages.filter((img) => img.file);

    if (newImages.length === 0) {
      return uploadedImages.map((img) => img.preview);
    }

    const fd = new FormData();
    newImages.forEach((img) => fd.append("images", img.file));

    const res = await axios.post(
      "http://localhost:5000/api/vendor/upload/images",
      fd,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.data.success) throw new Error("Image upload failed");

    const oldImgs = uploadedImages
      .filter((img) => !img.file)
      .map((img) => img.preview);

    return [...oldImgs, ...res.data.urls];
  };

  // -----------------------
  // SUBMIT FORM
  // -----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = await uploadImagesToServer();

      const payload = { ...formData, images: imageUrls };

      const res = await axios.put(
        `http://localhost:5000/api/vendor/property/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("Property updated successfully!");
        navigate("/vendor/my-properties");
      } else {
        alert("Error: " + res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-muted lg:ml-64 sticky top-0 z-20 flex items-center gap-4 px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-muted transition"
        >
          <ArrowLeft className="h-5 w-5 text-neutral" />
        </button>
        <h1 className="text-2xl font-bold text-neutral">Edit Property</h1>
      </div>

      {/* Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-64">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Information */}
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
                  className="w-full px-4 py-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary"
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
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary"
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
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-muted rounded-lg"
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
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary"
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
              className="cursor-pointer flex flex-col items-center gap-3 border-2 border-dashed border-muted rounded-lg p-6 text-center"
            >
              <Upload className="h-12 w-12 text-muted" />
              <p className="text-neutral font-medium">Click to upload images</p>
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {uploadedImages.map((img) => (
                <div key={img.id} className="relative group">
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
                </div>
              ))}
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/vendor/my-properties")}
              className="px-8 py-3 border border-muted rounded-lg text-neutral hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
