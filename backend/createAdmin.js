import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/adminModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const createAdmin = async () => {
  try {
    const admin = new Admin({
      name: "Super Admin",
      email: "admin@example.com",
      password: "123456"
    });
    await admin.save();
    console.log("Admin created");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
