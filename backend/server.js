// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import vendorRoutes from "./routes/vendorRoutes.js";
import "./config/passport.js";
import authRoute from "./routes/authRoute.js";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import publicPropertyRoutes from "./routes/publicPropertyRoutes.js";
import { sendEmail } from "./utils/sendEmail.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminPropertyRoutes from "./routes/admin/property.js";
import adminVendor from "./routes/admin/adminvendor.js"
import adminUsers from "./routes/admin/adminuser.js"
import consultationRoutes from "./routes/consultationRoutes.js"


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [
  "https://asthetic2spaces-7snq.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS not allowed"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.options("*", cors());



// Handle preflight OPTIONS requests
app.options("*", cors());
// Session configuration (required for Passport)
app.use(
  session({
    secret: process.env.JWT_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }
  })
);

//for testing purpose is u r nodemailer is working or not
app.get("/test-email", async (req, res) => {
  try {
    await sendEmail(
      "smanish18467@gmail.com", // any test email (could be same Gmail or different)
      "Test Email from Nodemailer",
      " This is a test email sent from your Node.js app using Gmail!"
    );
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Add this before your routes in server.js
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    next();
});
// Routes
// Correct Order
// Vendor routes
app.use("/api/vendor/property", propertyRoutes);  
app.use("/api/vendor", vendorRoutes);             

// User & Auth routes
app.use("/auth", authRoute);
app.use("/api/auth", userRoutes);
app.use("/api/properties", publicPropertyRoutes);
app.use("/api/vendor/upload", uploadRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/consultation", consultationRoutes);

// Admin routes (add here)
app.use("/api/admin", adminRoutes);
app.use("/api/admin/property", adminPropertyRoutes);
app.use("/api/admin/vendor", adminVendor);
app.use('/api/admin/users',adminUsers)



// Health check
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));