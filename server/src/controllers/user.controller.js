const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const respond = require("../utils/respond");

const getUserDetails = async (req, res) => {
  try {
    const userDetails = {
      user: req.user.toJSON(),
    };

    respond(res, 200, "Fetched user details", userDetails);
  } catch (e) {
    console.log(e);
    respond(res, 500, "something went wrong");
  }
};

const signup = async (req, res) => {
  try {
    const credentials = { ...req.body, isVerified: false };
    const user = User(credentials);
    await user.save();
    res.status(201).send(user);
    respond(res, 201, "successfully registered", user);
  } catch (e) {
    console.log(e);
    respond(res, 500, "something went wrong");
  }
};

const login = async (req, res) => {
  try {
    const credentials = req.body;
    try {
      const userDetails = await User.login(credentials);

      respond(res, 200, "successfully logged in", userDetails);
    } catch (err) {
      respond(res, 400, err);
    }
  } catch (e) {
    respond(res, 500, "something went wrong");
  }
};

//@protected
const updateUser = async (req, res) => {
  try {
    const _id = req.user._id;
    const user = await User.findByIdAndUpdate(_id, req.body);

    respond(res, 200, "successfully updated user credentials", user);
  } catch (e) {
    respond(res, 500, "something went wrong");
  }
};

module.exports = {
  signup,
  login,
  getUserDetails,
  updateUser,
};
