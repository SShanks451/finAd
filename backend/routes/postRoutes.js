import express from "express";
import { createpost, getallposts, updatePostLikeCount } from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createpost", authMiddleware, createpost);
router.get("/allposts", authMiddleware, getallposts);
router.put("/updatepostlikecount", authMiddleware, updatePostLikeCount);

export default router;
