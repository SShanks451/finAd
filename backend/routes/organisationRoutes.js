import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  createOrganisation,
  getOrganisationById,
  updateOrganisation,
  loginOrganisation,
  logoutOrganisation,
} from "../controllers/organisationController.js";

const router = express.Router();

router.post("/signup", createOrganisation);
router.post("/signin", loginOrganisation);
router.post("/logout", logoutOrganisation);
router.get("/getorganisationbyid/:id", authMiddleware, getOrganisationById);
router.put("/updateorganisation", authMiddleware, updateOrganisation);

export default router;
