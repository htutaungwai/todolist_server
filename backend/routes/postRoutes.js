import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { getAllPosts, createNewPost } from "../controllers/postController.js";

const router = express.Router();

router.route("/").post(protect, createNewPost);
router.route("/").get(protect, getAllPosts);

export default router;
