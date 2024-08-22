import express from "express";
import { likePost, dislikePost, getLikedPostSingle } from "../controllers/postLikeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/likepost", authMiddleware, likePost);
router.delete("/dislikepost", authMiddleware, dislikePost);
router.get("/getlikedpostsingle", authMiddleware, getLikedPostSingle);

export default router;
