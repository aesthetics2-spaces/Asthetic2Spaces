import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import {
  Heart,
  ArrowLeft,
  PhoneCall,
  Mail,
  MapPin,
  Bed,
  Bath,
  Square,
  User
} from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const [isFav, setIsFav] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/properties/details/${id}`);
      setProperty(res.data.property);
      setSimilar(res.data.similar || []);

      if (userId) {
        const favRes = await axios.get(
          `http://localhost:5000/api/favorites/liked/${userId}`
        );
        setIsFav(favRes.data.likedProperties.includes(id));
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const toggleFav = async () => {
    if (!userId) return alert("Please login to save favourites");

    const prev = isFav;
    setIsFav(!prev);

    try {
      const endpoint = prev ? "unlike" : "like";
      await axios.post(
        `http://localhost:5000/api/favorites/${endpoint}/${id}`,
        { userId }
      );
    } catch (err) {
      console.log(err);
      setIsFav(prev);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-neutral">Loading...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral">
        Property Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== Top Header ===== */}
      <div className="sticky top-0  z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-neutral text-sm hover:underline"
          >
            <ArrowLeft size={16} className="text-neutral" />
            Back to Listings
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-2">

        {/* Slider */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border">
          <Slider {...sliderSettings}>
            {property.images?.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt=""
                  className="w-full h-[450px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* Title + Price */}
            <div className="bg-white rounded-2xl shadow-md p-6 border">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-semibold text-neutral mb-1">
                    {property.title}
                  </h1>

                  <p className="flex items-center gap-1 text-accent text-sm">
                    <MapPin size={16} />
                    {property.location}
                  </p>

                  <p className="text-3xl font-bold text-primary mt-3">
                    ₹ {Number(property.price).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={toggleFav}
                  className="p-3 rounded-full border hover:bg-red-50 transition"
                >
                  <Heart
                    size={22}
                    className={
                      isFav
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-md p-6 border">
              <h2 className="text-xl font-semibold text-neutral mb-4">
                Description
              </h2>
              <p className="text-neutral text-sm leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-md p-6 border">
              <h2 className="text-xl font-semibold text-neutral mb-4">
                Property Features
              </h2>

              <div className="grid grid-cols-3 gap-6">
                <FeatureCard label="Bedrooms" value={property.bedrooms} Icon={Bed} />
                <FeatureCard label="Bathrooms" value={property.bathrooms} Icon={Bath} />
                <FeatureCard label="Area" value={`${property.area} sq ft`} Icon={Square} />
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-md p-6 border">
              <h2 className="text-xl font-semibold text-neutral mb-4">
                Location
              </h2>
              <iframe
                src={`https://www.google.com/maps?q=${property.location}&output=embed`}
                className="w-full h-72 rounded-xl border"
                loading="lazy"
                title="map"
              ></iframe>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6 lg:sticky lg:top-20 h-fit">

            {/* Contact Agent */}
            <div className="bg-white rounded-2xl shadow-md p-6 border">
              <h2 className="text-lg font-semibold text-neutral mb-4">
                Contact Agent
              </h2>

              <div className="flex gap-3 items-center border-b pb-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-neutral text-sm">
                    {property.vendorId?.vendorName}
                  </p>
                  <p className="text-xs text-muted">Registered Vendor</p>
                </div>
              </div>

              <a
                href={`mailto:${property.vendorId?.email}`}
                className="flex items-center gap-3 text-sm hover:text-accent transition"
              >
                <Mail size={16} />
                {property.vendorId?.email}
              </a>

              <a
                href={`tel:${property.vendorId?.phone}`}
                className="flex items-center gap-3 mt-3 text-sm hover:text-accent transition"
              >
                <PhoneCall size={16} />
                {property.vendorId?.phone}
              </a>

              <button className="w-full bg-primary text-white py-3 rounded-xl font-medium text-sm mt-5 hover:bg-opacity-90 transition">
                Schedule a Visit
              </button>
            </div>

            {/* Important Highlights */}
            <div className="bg-white rounded-2xl shadow-md p-6 border">
              <h2 className="text-lg font-semibold text-neutral mb-4">
                Important Highlights
              </h2>

              <div className="space-y-3">
                <Highlight label="Property Type" value={property.type} />
                <Highlight label="Listed On" value={new Date(property.createdAt).toDateString()} />
                <Highlight label="Built Area" value={`${property.area} sq ft`} />
                <Highlight label="Price" value={`₹ ${Number(property.price).toLocaleString()}`} />
              </div>
            </div>

          </div>

        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-semibold text-neutral mb-6">
              Similar Properties
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {similar.map((item) => (
                <SimilarCard
                  key={item._id}
                  item={item}
                  onClick={() => navigate(`/property/${item._id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const FeatureCard = ({ label, value, Icon }) => (
  <div className="p-4 rounded-xl bg-gray-50 border text-center">
    <Icon size={22} className="text-primary mx-auto mb-2" />
    <p className="text-xs text-muted">{label}</p>
    <p className="font-semibold text-neutral mt-1">{value}</p>
  </div>
);

const Highlight = ({ label, value }) => (
  <div className="flex flex-col bg-gray-50 p-3 rounded-lg border">
    <span className="text-muted text-xs">{label}</span>
    <span className="font-semibold text-neutral mt-1">{value}</span>
  </div>
);

const SimilarCard = ({ item, onClick }) => (
  <div
    className="rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white border"
    onClick={onClick}
  >
    <img src={item.images[0]} alt="" className="w-full h-40 object-cover" />
    <div className="p-3">
      <h3 className="font-medium text-neutral text-sm line-clamp-1">
        {item.title}
      </h3>

      <p className="flex items-center gap-1 text-accent text-xs mt-1">
        <MapPin size={12} />
        {item.location}
      </p>

      <div className="text-xs text-muted flex justify-between mt-2">
        <span>{item.bedrooms} beds</span>
        <span>{item.bathrooms} baths</span>
        <span>{item.area} sqft</span>
      </div>

      <p className="text-primary font-bold text-sm mt-2">
        ₹ {Number(item.price).toLocaleString()}
      </p>
    </div>
  </div>
);

export default PropertyDetails;
