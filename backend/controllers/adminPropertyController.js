import Property from "../models/Property.js";

// Get ALL properties (any status)
export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find()
            .populate("vendorId", "name email mobile") // include vendor details
            .sort({ createdAt: -1 })
            .lean();

        res.json({ success: true, properties });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Approve a property
export const approveProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property)
            return res.status(404).json({ success: false, message: "Property not found" });

        property.verified = true;
        property.status = "approved";
        property.verifiedAt = new Date();
        property.verifiedBy = req.admin._id;

        await property.save();

        res.json({ success: true, message: "Property approved", property });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Reject a property
export const rejectProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    property.status = "rejected";
    property.verified = false;

    await property.save();

    res.json({ success: true, message: "Property rejected successfully" });
  } catch (err) {
    console.error("Reject Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
