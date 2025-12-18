import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { getUserIdFromHeader } from "../helper/getUserId.js";

const JWT_SECRET = process.env.JWT_SECRET;

// GET USER PROFILE (self or by id)
export const getUserProfile = async (req, res) => {
  try {
    let userId = req.params.id;

    if (!userId) {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token" });
      }
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.userId;
    }

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// UPDATE USER PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req);
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// FOLLOW USER
export const followUser = async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req);
    const { followerId } = req.body;

    if (userId === followerId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const user = await User.findById(userId);
    const follower = await User.findById(followerId);

    if (!user || !follower) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.followings.includes(followerId)) {
      return res.status(400).json({ message: "Already following" });
    }

    user.followings.push(followerId);
    user.followingCount = user.followings.length;

    follower.followers.push(userId);
    follower.followerCount = follower.followers.length;

    await user.save();
    await follower.save();

    res.json({ message: "Followed user" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UNFOLLOW USER
export const unfollowUser = async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req);
    const { followerId } = req.body;

    const user = await User.findById(userId);
    const follower = await User.findById(followerId);

    if (!user || !follower) {
      return res.status(404).json({ message: "User not found" });
    }

    user.followings = user.followings.filter(
      (id) => id.toString() !== followerId
    );
    user.followingCount = user.followings.length;

    follower.followers = follower.followers.filter(
      (id) => id.toString() !== userId
    );
    follower.followerCount = follower.followers.length;

    await user.save();
    await follower.save();

    res.json({ message: "Unfollowed user" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET LOGGED-IN USER POSTS (POPULATED)
export const getUserPosts = async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req);

    const user = await User.findById(userId).populate({
      path: "posts",
      populate: {
        path: "createdBy",
        select: "username email",
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
