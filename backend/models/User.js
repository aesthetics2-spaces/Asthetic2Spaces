// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  googleId: { 
    type: String 
  },
  avatar: { 
    type: String 
  },
  role: {
    type: String,
    default: "user"
  },
  likedProperties: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  }
],
  resetPasswordToken:String,
  resetPasswordExpire:Date,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;