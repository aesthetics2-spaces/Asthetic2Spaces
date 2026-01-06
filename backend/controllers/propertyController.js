import Property from "../models/Property.js";

export const createProperty = async (req,res)=>{
    try {
        const property = await Property.create({
            vendorId:req.vendor._id,
            ...req.body,
            images: req.body.images || []
        });

        res.json({success:true,property});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

export const getMyProperties = async (req, res) => {
    try {
        console.log("Fetching properties for vendor:", req.vendor?._id);
        
        if (!req.vendor || !req.vendor._id) {
            return res.status(401).json({ 
                success: false, 
                message: "Vendor authentication required" 
            });
        }

        const properties = await Property.find({ vendorId: req.vendor._id })
            .sort({ createdAt: -1 })
            .lean();

        console.log(`Found ${properties.length} properties for vendor ${req.vendor._id}`);
        
        res.json({ 
            success: true, 
            properties,
            count: properties.length 
        });
    } catch (error) {
        console.error("Error in getMyProperties:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}

export const updateProperty = async(req,res)=>{
    try {
        const updated = await Property.findOneAndUpdate(
            {
                _id:req.params.id,vendorId:req.vendor._id
            },
            req.body,
            {new:true}
        );
        if(!updated) return res.status(404).json({success:false,message:"Property not found or unauthozider"});
        res.json({success:true,property: updated});
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
};

export const deleteProperty = async(req,res)=>{
    try {
        const deleted = await Property.findOneAndDelete({
            _id:req.params.id,
            vendorId:req.vendor._id
        });
        if(!deleted) return res.status(404).json({success:false,message:"Property not found or Unauthorized"});
        res.json({success:true,message:"Property deleted"});
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
};

export const getPropertyById = async (req, res) => {
  try {
    const propertyId = req.params.id;

    // Get property + vendor info
    const property = await Property.findById(propertyId)
      .populate("vendorId", "name email phone")  // vendor info
      .lean();

    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    // Fetch similar properties (same type OR location)
    const similar = await Property.find({
      _id: { $ne: propertyId },
      type: property.type,
      location: property.location
    })
      .limit(6)
      .lean();

    return res.json({
      success: true,
      property,
      similar
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json({ success: true, properties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllVerifiedProperties = async (req, res) => {
    try {
        const properties = await Property.find({ verified: true })
            .sort({ createdAt: -1 })
            .lean();

        res.json({ success: true, properties });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

