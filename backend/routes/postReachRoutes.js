import express from "express";
import { reachPost, unreachPost, getReachedPostSingle } from "../controllers/postReachController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/reachpost", authMiddleware, reachPost);
router.delete("/unreachpost", authMiddleware, unreachPost);
router.get("/getreachedpostsingle", authMiddleware, getReachedPostSingle);

export default router;
