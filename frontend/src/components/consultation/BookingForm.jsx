import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { User, Mail, Phone, Home, Calendar, Clock, ArrowRight } from "lucide-react";

const BookingForm = ({ selectedConsultation, formData, setFormData }) => {
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedConsultation)
      return alert("Please select a consultation type");

    try {
      const user = JSON.parse(localStorage.getItem("user")); // logged-in user (if any)

      const payload = {
        ...formData,
        consultationType: selectedConsultation.title,
        price: selectedConsultation.price,
        userId: user?._id || null, // Attach user ID
      };

      const response = await axios.post(
        "http://localhost:5000/api/consultations",
        payload
      );

      alert("Consultation booked successfully!");
      console.log("Saved:", response.data);

      // Reset the form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        consultationType: "",
        propertyType: "",
        date: "",
        time: "",
        additional: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <motion.div className="rounded-2xl shadow-lg p-8 bg-white">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-neutral">Book Your Session</h2>
        {selectedConsultation && (
          <div className="flex items-center gap-2 text-lg text-neutral">
            <span>Selected:</span>
            <span className="font-semibold text-primary">{selectedConsultation.title}</span>
            <span className="font-bold">{selectedConsultation.price}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2 text-neutral">
            <User className="w-5 h-5" /> Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "fullName", type: "text", placeholder: "Full Name", icon: <User className="absolute left-3 top-3 w-5 h-5 text-muted" /> },
              { name: "email", type: "email", placeholder: "Email Address", icon: <Mail className="absolute left-3 top-3 w-5 h-5 text-muted" /> },
              { name: "phone", type: "tel", placeholder: "Phone Number", icon: <Phone className="absolute left-3 top-3 w-5 h-5 text-muted" /> }
            ].map((field, i) => (
              <div key={i} className="relative">
                {field.icon}
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full pl-10 p-3 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  required
                />
              </div>
            ))}
            {/* Property Type */}
            <div className="relative">
              <Home className="absolute left-3 top-3 w-5 h-5 text-muted" />
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors appearance-none bg-white"
                required
              >
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="office">Office Space</option>
                <option value="plot">Empty Plot</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scheduling */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2 text-neutral">
            <Calendar className="w-5 h-5" /> Schedule Your Session
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-muted" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 p-3 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                required
              />
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-3 w-5 h-5 text-muted" />
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors appearance-none bg-white"
                required
              >
                <option value="">Preferred Time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="17:00">05:00 PM</option>
                <option value="18:00">06:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-neutral">Additional Requirements</h3>
          <textarea
            name="additional"
            value={formData.additional}
            onChange={handleChange}
            rows={4}
            placeholder="Please share your specific requirements..."
            className="w-full p-3 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
          />
        </div>

        <motion.button
          type="submit"
          disabled={!selectedConsultation}
          className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
            selectedConsultation ? 'bg-primary shadow-lg hover:shadow-xl' : 'bg-muted cursor-not-allowed'
          }`}
          whileHover={selectedConsultation ? { scale: 1.02 } : {}}
          whileTap={selectedConsultation ? { scale: 0.98 } : {}}
        >
          Confirm Booking <ArrowRight className="w-5 h-5" />
        </motion.button>

        <p className="text-center text-sm text-muted">
          You'll receive a confirmation email with meeting details within 30 minutes
        </p>
      </form>
    </motion.div>
  );
};

export default BookingForm;
