import express from "express";
import { reachPost, getReachedPostByPostIdAndUserId } from "../controllers/post_reachController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/reachpost", authMiddleware, reachPost);
router.get("/getreachedpostbypostidanduserid", authMiddleware, getReachedPostByPostIdAndUserId);

export default router;
