import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import chalk from "chalk";
import generateToken from "../utilities/generateToken.js";

// @desc    REGISTER    Register a new user
// route    POST        /api/user/register
// @access  PUBLIC

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  const nameExists = await User.findOne({ name });

  // VALIDATING USER DATA
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("FAILED TO VALID USER DATA");
  }

  // CHECKING WHETHER IF USER ALREADY EXISTS OR NOT
  if (userExists) {
    res.status(400);
    throw new Error("E-mail already exists");
  }

  if (nameExists) {
    res.status(400);
    throw new Error("Username had already been choosen ");
  }

  const user = await User.create({
    name,
    email,
    password,
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

// @desc    AUTH    user/set token
// route    POST    /api/user/auth
// @access  PUBLIC

const authUser = expressAsyncHandler(async (req, res) => {
  console.log(req.body.email);
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    console.log("Success~~");
  } else {
    console.log("MMSP");
  }

  //   if (user) {
  //     res.status(201).json({
  //       _id: user._id,
  //       name: user.name,
  //       email: user.email,
  //     });
  //   } else {
  //     res.status(400);
  //     throw new Error("Invalid email or password");
  //   }
});

export { authUser, registerUser };
