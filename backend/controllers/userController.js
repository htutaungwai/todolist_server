import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utilities/generateToken.js";

// @desc    REGISTER    Register a new user
// route    POST        /auth/users/register
// @access  PUBLIC

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ "credentials.email": email });

  // VALIDATING USER DATA
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("FAILED TO VALIDATE USER DATA");
  }

  // Checking whether if user already exists or not
  if (userExists) {
    res.status(400);
    throw new Error("E-mail already in use");
  }

  const user = await User.create({
    credentials: {
      name,
      email,
      password,
    },
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    AUTH    setting a token
// route    POST    auth/users/login
// @access  PUBLIC

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ "credentials.email": email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logoutUser = expressAsyncHandler((req, res) => {
  console.log("LOGGED OUT");
  res
    .status(200)
    .json({ message: "User logged out." })
    .cookie("todoist_jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
});

// @desc Get user profileb
// route Get /api/profile
// @access Private

const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);

  next();
});

// @desc    CHECK    check singup status
// route    GET      /auth/users/singup-status
// @access  PUBLIC

const authenticateUser = expressAsyncHandler((req, res, next) => {
  res.status(200).json({
    isAuthenticated: true,
  });
});

export { authUser, registerUser, logoutUser, getUserProfile, authenticateUser };
