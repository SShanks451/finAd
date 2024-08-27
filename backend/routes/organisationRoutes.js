import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  createOrganisation,
  getOrganisationById,
  loginOrganisation,
  logoutOrganisation,
  updateFollowerCount,
} from "../controllers/organisationController.js";

const router = express.Router();

router.post("/signup", createOrganisation);
router.post("/signin", loginOrganisation);
router.post("/logout", logoutOrganisation);
router.get("/getorganisationbyid/:id", authMiddleware, getOrganisationById);
router.put("/updatefollowercount", authMiddleware, updateFollowerCount);

export default router;
