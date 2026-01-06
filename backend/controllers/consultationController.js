// controllers/consultationController.js
import Consultation from "../models/ConsultationModel.js";

// Create a new consultation message
export const createConsultation = async (req, res) => {
  try {
    const newConsultation = new Consultation({
      ...req.body,
      user: req.user ? req.user.id : req.body.userId || null  // <-- Save user reference
    });

    const saved = await newConsultation.save();

    res.status(201).json({
      success: true,
      message: "Consultation stored successfully",
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all consultations
export const getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find()
      .populate("user", "firstName lastName email avatar")   
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: consultations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get consultation by ID
export const getConsultationById = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate("user", "firstName lastName email avatar");

    if (!consultation) {
      return res.status(404).json({ success: false, message: "Consultation not found" });
    }

    res.status(200).json({ success: true, data: consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
