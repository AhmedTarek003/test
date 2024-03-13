const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    return res.status(400).json({ msg: "user already exists" });
  }
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  });
  res.status(201).json({ name: user.name, email: user.email });
});

exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(404).json({ msg: "invalid email or password" });
  }
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_KEY, {
    expiresIn: "5m",
  });

  res.cookie("at", accessToken, {
    maxAge: "60000",
  });
  res.cookie("rt", refreshToken, {
    maxAge: "300000",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
  res.cookie("id", user._id, {
    maxAge: 5 * 60 * 1000,
    secure: true,
    sameSite: "strict",
  });
  const data = { id: user._id, email: user.email, name: user.name };
  res.status(200).json(JSON.stringify(data));
});

exports.getUserCtrl = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId, "-password");
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  res.status(200).json(user);
});

exports.logoutCtrl = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies;
  if (!refreshToken) {
    return res.status(403).json({ msg: "forbidden" });
  }
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ msg: "logout successful" });
});
