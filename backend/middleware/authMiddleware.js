import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.todoist_jwt;

  console.log("cookies: ", req.cookies);

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } else {
    res.status(401);
    throw new Error("INVALID TOKEN");
  }
});

export { protect };
