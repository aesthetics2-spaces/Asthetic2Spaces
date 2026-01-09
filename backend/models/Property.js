const propertySchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },

  title: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["apartment", "house", "villa", "commercial", "land"],
  },

  price: { type: String, required: true },
  location: { type: String, required: true },

  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  area: { type: Number, default: 0 },

  description: { type: String, required: true },
  designFeatures: { type: String },

  vastuCompliance: {
    type: String,
    enum: ["fully-compliant", "partially-compliant", "not-compliant", ""],
    default: "",
  },

  specialOfferings: { type: String },

  /* ✅ ADMIN VERIFICATION STATUS */
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  /* ✅ RENT / LEASE STATUS */
  availabilityStatus: {
    type: String,
    enum: ["available", "rented", "leased"],
    default: "available",
  },

  verified: { type: Boolean, default: false },
  verifiedAt: { type: Date },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

  likes: { type: Number, default: 0 },

  images: { type: [String], default: [] },

}, { timestamps: true });

import mongoose from "mongoose"

// const propertySchema = new mongoose.Schema({
//     vendorId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Vendor",
//         required:true,
//     },

//     title : {type:String, required:true},
//     type:{type:String,required:true,enum: ["apartment", "house", "villa", "commercial", "land"]},
//     price:{type:String,required:true},
//     location:{type:String,required:true},
//     bedrooms:{type:Number,default:0},
//     bathrooms:{type:Number,default:0},
//     area:{type:Number,default:0},
//     description:{type:String,required:true},

//     designFeatures:{type:String},
//     vastuCompliance:{
//         type:String,
//         enum: ["fully-compliant", "partially-compliant", "not-compliant", ""],
//         default: ""
//     },
//     specialOfferings:{type:String},

//     verified: { type: Boolean, default: false },
//     verifiedAt: { type: Date },
//     verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

//     status: {
//         type: String,
//         enum: ["pending", "approved", "rejected"],
//         default: "pending",
//     },
//       likes: {
//     type: Number,
//     default: 0
//   },

//     images:{type:[String],default: []},

// },{timestamps:true});

// const Property = mongoose.model("Property",propertySchema)

// export default Property  this is the property model 