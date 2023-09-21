import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    REGISTER    Register a new user
// route    POST        /api/user/register
// @access  PUBLIC

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.find({ email });

  // VALIDATING USER DATA
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("FAILED TO VALID USER DATA");
  }

  console.log(userExists);

  // CHECKING WHETHER IF USER ALREADY EXISTS OR NOT
  // if (userExists) {
  //   if (userExists.email) {
  //     res.status(400);
  //     throw new Error("E-mail already exists");
  //   } else if (userExists.name) {
  //     res.status(400);
  //     throw new Error("Username had already been choosen exists");
  //   }
  // }

  // CHECKING WEHTHER IF USER NAME ALREADY EXISTS OR NOT

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
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
