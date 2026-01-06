import jwt from "jsonwebtoken"
import Vendor from "../models/Vendor.js";

export const protect = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message:"No token provided"});
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid token"});
    }
};

export const protectVendor = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Vendor not authenticated. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verify vendor exists
        const vendor = await Vendor.findById(decoded.id).select("-password");

        if (!vendor) {
            return res.status(401).json({ message: "Vendor not found or invalid token." });
        }

        req.vendor = vendor; // Attach vendor to request
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired vendor token." });
    }
};