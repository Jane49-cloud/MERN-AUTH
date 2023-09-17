import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@ public access
//used to login
//set token
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json(user);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc  register new user
//@ public access
//set token
export const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  const userExists = await user.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    email,
    name,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(200).json(user);
  } else {
    res.status(400).json();
    throw new Error("invalid user data");
  }
});

// @desc  login user
//@ public access
//set token
export const loginUser = asyncHandler(async (req, res) => {});

// @desc  Auth user
//@ user  access
//set token
export const LogoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc  get user profile
//@ private
//must have a valid jsonwebtoken
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).send(user);
});

// @desc  Auth user
//@ public access
//set token
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
