import Vendor from "../models/Vendor.js";

//get all vendors
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find(); // fetch all vendors
    res.status(200).json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// APPROVE vendor
export const approveVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const vendor = await Vendor.findById(id);
    if (!vendor)
      return res.status(404).json({ success: false, message: "Vendor not found" });

    vendor.status = "approved";
    await vendor.save();

    res.json({ success: true, message: "Vendor approved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// REJECT vendor
export const rejectVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const vendor = await Vendor.findById(id);
    if (!vendor)
      return res.status(404).json({ success: false, message: "Vendor not found" });

    vendor.status = "rejected";
    await vendor.save();

    res.json({ success: true, message: "Vendor rejected successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// DELETE vendor
export const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    const deletedVendor = await vendor.deleteOne(); // remove vendor from DB

    res.json({
      success: true,
      message: "Vendor deleted successfully",
    },deleteVendor);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
