import express from "express";
import { getAllUsers, deleteUser, getSingleUser } from "../../controllers/adminUserController.js";
import { protectAdmin } from "../../middleware/admin.js";

const router = express.Router();

router.get("/",protectAdmin, getAllUsers);
router.get("/:id", protectAdmin, getSingleUser);
router.delete("/:id",protectAdmin ,deleteUser);


export default router;

