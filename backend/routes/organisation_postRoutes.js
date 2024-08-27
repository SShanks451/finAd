import express from "express";
import { createPost, getAllPosts, updateLikesCount, updateReachCount, getPostsByOrganisationId } from "../controllers/organisation_postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createpost", authMiddleware, createPost);
router.get("/getallposts", authMiddleware, getAllPosts);
router.put("/updatelikecount", authMiddleware, updateLikesCount);
router.put("/updatereachcount", authMiddleware, updateReachCount);
router.get("/getpostsbyorgId", authMiddleware, getPostsByOrganisationId);

export default router;
