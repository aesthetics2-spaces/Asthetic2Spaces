import User from "../models/User.js";
import Property from "../models/Property.js";

export const likeProperty = async (req, res) => {
  try {
    const { userId } = req.body;
    const { propertyId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!Array.isArray(user.likedProperties)) {
      user.likedProperties = [];
    }

await User.findByIdAndUpdate(
  userId,
  { $addToSet: { likedProperties: propertyId } },
  { new: true }
);


    res.json({ success: true, message: "Property liked" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const unlikeProperty = async (req, res) => {
  try {
    const { userId } = req.body;
    const { propertyId } = req.params;

    await User.findByIdAndUpdate(
      userId,
      { $pull: { likedProperties: propertyId } },
      { new: true }
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getLikedProperties = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("likedProperties");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ likedProperties: user.likedProperties });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPropertiesByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    const properties = await Property.find({
      _id: { $in: ids }
    });

    res.json({ properties });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
