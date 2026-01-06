// models/ConsultationModel.js
import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // <-- Connects to User model
      default: null  // If someone books without logging in
    },

    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    consultationType: { type: String, required: true },
    propertyType: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    additional: { type: String },
    price: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Consultation", ConsultationSchema);
