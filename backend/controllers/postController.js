import expressAsyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import mongoose from "mongoose";

// GET ALL POSTS
const getAllPosts = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id.toLocaleString();
    const posts = await Post.find({ userId }); // Querying posts with the given user ID
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
    throw new Error(error);
  }
});

//
const createNewPost = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id.toLocaleString();
    const { title, checked, content, dateCreated, dateUpdated } = req.body;

    const post = await Post.create({
      title,
      checked,
      content,
      dateCreated,
      dateUpdated,
      userId,
    });

    res.status(200).json(post);
  } catch (error) {
    console.log(error.message ? error.message : error);
    res.status(400);
    throw new Error();
  }
});

const deletePost = expressAsyncHandler(async (req, res) => {
  try {
    let { postId } = req.body;
    postId = new mongoose.Types.ObjectId(postId);
    const userId = new mongoose.Types.ObjectId(req.user._id.toLocaleString());
    const post = await Post.findById(postId);
    if (post && userId.equals(post.userId)) {
      await Post.findByIdAndDelete(postId);
      res.status(200).json({
        message: "post deleted successfully.",
      });
    } else {
      res.status(201).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

export { getAllPosts, createNewPost, deletePost };
