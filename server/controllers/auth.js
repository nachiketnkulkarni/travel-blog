const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  const { userName, password, email } = req.body;

  try {
    const user = await User.create({
      userName,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (error) {
    //console.log(error.message);
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password.", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials.", 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Please provide correct password.", 401));
    }
    sendToken(user, 200, res);
  } catch (error) {
    return next(error);
  }
};

exports.forgotPassword = (req, res, next) => {
  res.send("This is forgot password route");
};

exports.resetPassword = (req, res, next) => {
  res.send("This is reset password route");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
