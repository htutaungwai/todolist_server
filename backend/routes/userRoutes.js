import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  authenticateUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/").get(protect, getUserProfile);
router.route("/auth-status").get(protect, authenticateUser);

export default router;
