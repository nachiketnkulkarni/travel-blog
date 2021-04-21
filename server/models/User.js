const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter a username."],
  },
  email: {
    type: String,
    required: [true, "Please enter a username."],
    unique: [
      true,
      "Email id already register. Please use forget password option to reset password.",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter password."],
    minlength: 6,
    select: false, //send password every time query passed for find user 'false:- don't send every time'
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Encrypting password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

//Create method for comparing password

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// userSchema.methods.getSignedToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
// };

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
