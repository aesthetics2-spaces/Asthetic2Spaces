import express from "express"
import {registerVendor,loginVendor,vendorForgotPassword, vendorResetPassword} from "../controllers/vendorController.js"

const router = express.Router()

router.post("/register",registerVendor)
router.post("/login",loginVendor)
router.post("/forgot-password",vendorForgotPassword)
router.post("/reset-password/:token", vendorResetPassword );

export default router;