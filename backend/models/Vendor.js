import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
    },

    role: {
      type: String,
      default: "vendor",
    },
 status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },


    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
