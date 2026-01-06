import express from "express"
import { likeProperty,unlikeProperty,getLikedProperties, getPropertiesByIds } from "../controllers/favoriteController.js"

const router = express.Router()

router.post("/like/:propertyId",likeProperty);
router.post("/unlike/:propertyId",unlikeProperty);
router.get("/liked/:userId",getLikedProperties);


export default router;