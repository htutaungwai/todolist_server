import expressAsyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

// GET ALL POSTS
const getAllPosts = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id.toLocaleString();
    console.log(userId);
    console.log(typeof userId);
    const posts = await Post.find({ userId }); // Querying posts with the given user ID
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//
const createNewPost = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id.toLocaleString();
    const { title, checked, content, dateCreated, dateUpdated } = req.body;
    console.log(userId);

    const post = await Post.create({
      title,
      checked,
      content,
      dateCreated,
      dateUpdated,
      userId,
    });

    res.json(post);
  } catch (error) {
    console.log(error.message ? error.message : error);
    res.status(400);
    throw new Error();
  }
});

export { getAllPosts, createNewPost };
