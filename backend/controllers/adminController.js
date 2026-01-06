import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      success: true,
      admin: { id: admin._id, name: admin.name, email: admin.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

