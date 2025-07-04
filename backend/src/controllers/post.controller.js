import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";

import User from "../models/user.model.js";
import Post from "../models/post.model.js";

import cloudinary from "../config/cloudinary.js";
import Notification from "../models/notification.model.js";

//  TODO: Get Posts
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });

  res.status(200).json({ posts });
});

// TODO: Get Specific Post
export const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId)
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });

  if (!post) return res.status(404).json({ error: "Post not found" });

  res.status(200).json({ post });
});

// TODO: Get User Posts
export const getUserPosts = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: "User not found" });

  const posts = await Post.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });

  res.status(200).json({ posts });
});

// TODO: Create Post
export const createPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { content } = req.body;
  const imageFile = req.file;

  //? Verify that there is something in the post
  if (!content && !imageFile) {
    return res
      .status(400)
      .json({ error: "Post most contain either text or an image" });
  }

  //? Verify that the User Exist
  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  //? Upload Image to Cloudinary
  let imageUrl = "";

  if (imageFile) {
    try {
      // Convert buffer to base64 for Cloudinary
      const base64Image = `
        data:${imageFile.mimetype};
        base64,
        ${imageFile.buffer.toString(base64)}
        `;

      // Type the image source
      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "social_media_posts",
        resource_type: "image",
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" },
          { format: "auto" },
        ],
      });

      imageUrl = uploadResponse.secure_url;
    } catch (uploadError) {
      console.error("Cloudinary upload error: ", uploadError);
      return res.status(400).json({ error: "Failed to Upload Image" });
    }
  }

  //? Create the Post
  const post = await Post.create({
    user: user._id,
    content: content || "",
    image: imageUrl,
  });

  res.status(201).json({ post });
});

// TODO: Like Post
export const likePost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;

  const user = await User.findOne({ clerkId: userId });
  const post = await Post.findById(postId);

  if (!user || !post)
    return res.status(404).json({ error: "User or Post not found" });

  //? Hanlder to like & dislike a post
  const isLiked = post.likes.includes(user._id);

  if (isLiked) {
    //* Unlike
    await Post.findByIdAndUpdate(postId, {
      $pull: { likes: user._id },
    });
  } else {
    //* Like
    await Post.findByIdAndUpdate(postId, {
      $push: { likes: user._id },
    });

    //* Create a Notification (Not our own post)
    if (post.user.toString() !== user._id.toString()) {
      await Notification.create({
        from: user._id,
        to: post.user,
        type: "like",
        post: postId,
      });
    }
  }

  res.status(200).json({
    message: isLiked ? "Post Unliked Successfully" : "Post Liked Successfully",
  });
});

// TODO: Delete Post
export const deletePost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;

  const user = await User.findOne({ clerkId: userId });
  const post = await Post.findById(postId);

  if (!user || !post)
    return res.status(404).json({ error: "User or Post not found" });

  if (post.user.toString() !== user._id.toString()) {
    return res
      .status(403)
      .json({ error: "You can only delete your own posts" });
  }

  //? Delete all comments on this post
  await Comment.deleteMany({ post: postId });

  //? Delete this post
  await Post.findByIdAndDelete(postId);

  res.status(200).json({ message: "Post Deleted Successfully" });
});
