import express from "express";

import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

// TODO: Public Routes
router.get("/post/:postId", getComments);

// TODO: Private Routes
router.post("/post/:postId", protectRoute, createComment);
router.delete("/commentId", protectRoute, deleteComment);

export default router;
