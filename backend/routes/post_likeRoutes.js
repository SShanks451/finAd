import express from "express";
import { likePost, unlikePost, getLikedPostByPostIdAndUserId } from "../controllers/post_LikeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/likepost", authMiddleware, likePost);
router.delete("/dislikepost", authMiddleware, unlikePost);
router.get("/getlikedpostbypostidanduserid", authMiddleware, getLikedPostByPostIdAndUserId);

export default router;
