import express from "express";
import {
  createProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById,
  getAllVerifiedProperties,  
} from "../controllers/propertyController.js";

import { protectVendor } from "../middleware/authMiddleware.js";

const router = express.Router();

//  PUBLIC ROUTES
router.get("/", getAllProperties);

//  ADD THIS ROUTE (must be above /:id)
router.get("/verified", getAllVerifiedProperties);

//  VENDOR ROUTES
router.get("/my-properties", protectVendor, getMyProperties);
router.post("/create", protectVendor, createProperty);
router.put("/:id", protectVendor, updateProperty);
router.delete("/:id", protectVendor, deleteProperty);

//  ALWAYS KEEP THIS LAST
router.get("/:id", getPropertyById);

export default router;
