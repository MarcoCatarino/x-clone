import express from "express";

import {
  getPost,
  getPosts,
  getUserPosts,
  likePost,
  createPost,
  deletePost,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// TODO: Public Routes
router.get("/", getPosts);
router.get("/:postId", getPost);
router.get("/:user/:username", getUserPosts);

// TODO: Private Routes
router.post("/", protectRoute, upload.single("image"), createPost);
router.post("/:postId/like", protectRoute, likePost);
router.delete("/:postId", protectRoute, deletePost);

export default router;
