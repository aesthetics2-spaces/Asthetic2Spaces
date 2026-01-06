import express from "express";
import { protectAdmin } from "../../middleware/admin.js";
import { 
  getAllProperties, 
  approveProperty,
  rejectProperty, 
  deleteProperty
} from "../../controllers/adminPropertyController.js";

const router = express.Router();

// Fetch all properties 
router.get("/", protectAdmin, getAllProperties);

router.put("/approve/:id", protectAdmin, approveProperty);
router.put("/reject/:id", protectAdmin, rejectProperty);
router.delete("/delete/:id", protectAdmin, deleteProperty);


export default router;
