import express from "express";

import {
  followUser,
  getCurrentUser,
  getUserProfile,
  syncUser,
  updateProfile,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

//TODO: Public Routes
//? Get Routes
router.get("/profile/:username", getUserProfile);

//TODO: Protected Routes
//? Save Profile on DB
router.post("/sync", protectRoute, syncUser);

//? Get my Profile on DB
router.post("/me", protectRoute, getCurrentUser);

//? Update Profile
router.put("/profile", protectRoute, updateProfile);

//? Follow || Unfollow User
router.post("/follow/:targetUserId", protectRoute, followUser);

export default router;
