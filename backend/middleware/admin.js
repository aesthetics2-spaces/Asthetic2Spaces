// middleware/admin.js
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js"; // create this model if not exists

export const protectAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Admin not authenticated. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verify admin exists
        const admin = await Admin.findById(decoded.id).select("-password");
        if (!admin) {
            return res.status(401).json({ message: "Admin not found or invalid token." });
        }

        req.admin = admin; // Attach admin to request
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired admin token." });
    }
};
