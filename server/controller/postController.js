import Post from "../model/postModel.js";
import User from "../model/userModel.js";
import { getUserIdFromHeader } from "../helper/getUserId.js";

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req);
    let { media, caption } = req.body;

    if (!Array.isArray(media)) {
      media = media ? [media] : [];
    }

    if (!media.length) {
      return res.status(400).json({ message: "At least one media item is required" });
    }

    const post = new Post({
      media,
      caption,
      createdBy: userId,
    });

    await post.save();

    await User.findByIdAndUpdate(userId, {
      $push: { posts: post._id },
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET ALL POSTS (WITH USER INFO)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isDeleted: false })
      .populate("createdBy", "username email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET POST BY ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("createdBy", "username email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// LIKE / UNLIKE POST
export const likePost = async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req);
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likedBy.includes(userId);

    if (alreadyLiked) {
      post.likedBy = post.likedBy.filter(
        (id) => id.toString() !== userId
      );
      post.likeCount -= 1;
    } else {
      post.likedBy.push(userId);
      post.likeCount += 1;
    }

    await post.save();
    res.json({ likeCount: post.likeCount });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
