import cloudinary from "../config/cloudinary.js";

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // Upload all files in parallel
    const uploadPromises = req.files.map(file =>
      cloudinary.uploader.upload(file.path, { folder: "properties" })
    );

    const results = await Promise.all(uploadPromises);

    const urls = results.map(img => img.secure_url);

    return res.json({ success: true, urls });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
