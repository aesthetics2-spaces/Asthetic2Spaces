// routes/consultationRoutes.js
import express from "express";
import {
  createConsultation,
  getAllConsultations,
  getConsultationById
} from "../controllers/consultationController.js";
import { protectAdmin } from "../middleware/admin.js";

const router = express.Router();

router.post("/", createConsultation);        // Create booking
router.get("/",protectAdmin,getAllConsultations);       // Fetch all
router.get("/:id",protectAdmin, getConsultationById);    // Fetch single

export default router;
