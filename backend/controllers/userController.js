import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

export const registerUser = async (req,res)=>{
    try{
        const {firstName,lastName,email,password,confirmPassword}= req.body;
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({success:false,message:"User already exists"});
        if(password !== confirmPassword) return res.status(400).json({message:"password didnot match"})
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password,salt)

        const newUser =await User.create({firstName,lastName,email,password:hashed});
        res.status(201).json({success:true,message:"User register successfully",user:newUser});
    }catch(error){
     res.status(500).json({message:error.message})
    }
};

export const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"user not exist"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"invalid credentials"});

        const token = jwt.sign({id:user._id, role:user.role},process.env.JWT_SECRET,{
            expiresIn:"1d"
        });

       res.status(200).json({
  success: true,
  message: "Login successful",
  token,
  user: {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  },
});

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const forgotPassword = async(req,res)=>{
    try {
        const {email}=req.body
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({success:false,message:"user not found"});

        const resetToken = crypto.randomBytes(20).toString("hex");

        user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

        user.resetPasswordExpire = Date.now()+10*60*1000 //token expires in 10 min

        await user.save();

 const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message = `You requested a password reset.\n\nClick below to reset your password:\n${resetUrl}\n\nIf you didn't request this, please ignore this email.`;

    await sendEmail(user.email, "Password Reset Request", message);

    res
      .status(200)
      .json({ success: true, message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};