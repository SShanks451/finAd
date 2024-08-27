import express from "express";
import { followOrg, unfollowOrg, getFollowedOrgByUserIdAndOrgId } from "../controllers/organisation_followerController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/followorg", authMiddleware, followOrg);
router.delete("/unfolloworg", authMiddleware, unfollowOrg);
router.get("/getfollowedorgbyuseridandorgId", authMiddleware, getFollowedOrgByUserIdAndOrgId);

export default router;
