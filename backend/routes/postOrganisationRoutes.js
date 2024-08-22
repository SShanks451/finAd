import express from "express";
import {
  createPostOrganisation,
  getPostsByOrganisation,
  updateLikesCount,
  updateReachCount,
  getPostsByOrganisationId,
} from "../controllers/postOrganisationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createpostorganisation", authMiddleware, createPostOrganisation);
router.get("/allpostsorganisation", authMiddleware, getPostsByOrganisation);
router.put("/updatelikecount", authMiddleware, updateLikesCount);
router.put("/updatereachcount", authMiddleware, updateReachCount);
router.post("/getpostsbyorganisationId", authMiddleware, getPostsByOrganisationId);

export default router;
