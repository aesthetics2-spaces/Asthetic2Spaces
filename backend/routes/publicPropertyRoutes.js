import express from "express";
import {
  getAllProperties,
  getPropertyById
} from "../controllers/propertyController.js";

const router = express.Router();

// PUBLIC: Get all properties (for search page)
router.get("/", getAllProperties);

// PUBLIC: Get property details by ID (for property details page)
router.get("/details/:id", getPropertyById);


export default router;
