import express from "express"
import { uploadImages } from "../controllers/uploadController.js"
import { upload } from "../middleware/upload.js"
import { protectVendor } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/images",protectVendor,upload.array("images",10),uploadImages)

export default router