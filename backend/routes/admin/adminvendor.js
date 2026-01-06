import express from "express";
import { protectAdmin } from "../../middleware/admin.js";

import {
  getAllVendors,
  approveVendor,
  rejectVendor,
  deleteVendor
} from "../../controllers/adminVendorController.js";

const router = express.Router();

router.get("/", protectAdmin, getAllVendors); 
router.put("/approve/:id", protectAdmin, approveVendor);
router.put("/reject/:id", protectAdmin, rejectVendor);
router.delete("/delete/:id",protectAdmin,deleteVendor)

export default router;
