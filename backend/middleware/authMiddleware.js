import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.todoist_jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");

      const currentTime = Math.floor(Date.now() / 1000); // in seconds
      if (decoded.exp <= currentTime) {
        throw new Error("Token has expired");
      }

      console.log("success");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        isAuthenticated: false,
      });
      throw new Error("INVALID TOKEN");
    }
  } else {
    res.status(401).json({
      isAuthenticated: false,
    });
    throw new Error("INVALID TOKEN");
  }
});

export { protect };
