const { Router } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const respond = require("../utils/respond");

const { verifyAuthToken } = require("../middleware/auth.middleware");

const {
  signup,
  login,
  getUserDetails,
  // requestForgetPassword,
} = require("../controllers/user.controller");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

// router.put("/login", login);
// router.post("/recovery/password-reset/request", requestForgetPassword);
// router.post("/recovery/password-reset", requestForgetPassword);

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// authenticated area
router.use(verifyAuthToken);
router.get("/profile", getUserDetails);
// router.post('/', updateUser);
// router.delete('/', deleteUser);

module.exports = router;
