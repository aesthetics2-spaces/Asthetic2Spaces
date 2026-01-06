import Vendor from "../models/Vendor.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken"
import { sendEmail } from "../utils/sendEmail.js";

//generate token
const generateToken = (id)=>{
    return jwt.sign({id,role:"vendor"},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
};

//register

export const registerVendor = async (req, res) => {
  try {
    const { vendorName, email, phone, companyName, address, password } = req.body;

    console.log("Request Body:", req.body);

    if (!vendorName || !email || !phone || !address || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const exist = await Vendor.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Vendor already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const vendor = await Vendor.create({
      vendorName,
      email,
      phone,
      companyName,
      address,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ success: true, message: "Vendor registered successfully", vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login

export const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Check approval status
    if (vendor.status !== "approved") {
      return res.status(403).json({
        success: false,
        message: `Your vendor account is ${vendor.status}.`,
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(vendor._id),
      vendor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//forgot password
export const vendorForgotPassword = async(req,res)=>{
    try {
        const {email} = req.body

        const vendor = await Vendor.findOne({email});
        if(!vendor) return res.status(404).json({success:false,message:"Vendor not found"});

        const resetToken = crypto.randomBytes(20).toString("hex");

           vendor.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

        vendor.resetPasswordExpire = Date.now()+10*60*1000

        await vendor.save();

       const resetUrl = `${process.env.CLIENT_URL}/vendor/reset-password/${resetToken}`;

       const message = `You requested a password reset.\n\nClick below to reset your password:\n${resetUrl}\n\nIf you didn't request this, please ignore this email.`;
       await sendEmail(vendor.email,"vendor password reset",message)

       res.status(200).json({
        success:true,
        message:"Password reset link sent to your email"
       });

    } catch (error) {
        res.status(500).json({success:false,message:"server error"})
    }
};

export const vendorResetPassword = async(req,res)=>{
    try {
        const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")
    const vendor = await Vendor.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });
    if(!vendor){
        return res.status(400).json({success:false,message:"Invalid or expires token"});

    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password,salt);

    vendor.password = hashed;
    vendor.resetPasswordExpire = undefined;
    vendor.resetPasswordToken = undefined;

    await vendor.save()

    res.status(200).json({success:true, message:"password reset successfull"})
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})
    }
}