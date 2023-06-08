const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const { sendVerificationMail } = require("../services/emails")
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,

    },
    lastName: {
      type: String,
      required: true,
    },
    studentYear:  {
      type: String,
    },
    matriculationNumber:  {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// this is a cleaner method of hiding your user data... that needs to be protected
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  // delete userObject.password;
  delete userObject.tokens;

  userObject.isAdmin && delete userObject.isSuperAdmin; // not disclose information about hierachy to the user
  userObject.isSuperAdmin && delete userObject.isAdmin;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return user;
};

userSchema.statics.login = async (credentials) => {
  return new Promise(async (res, rej) => {
    const { password, ...credential } = credentials; // life is not hard (*_*)
    const user = await User.findOne(credential);

    if (!user) rej("pls provide valid credentials!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) rej("pls provide valid credentials!");

    const token = await user.generateAuthToken();
    const obscuredUser = user.toJSON();

    res({ ...obscuredUser, token });
  });
};

// userSchema.pre("save", async function (next) {
//   const user = this;
//   // hash the password, each time it gets updated
//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
// });

const User = mongoose.model("users", userSchema);
module.exports = User;