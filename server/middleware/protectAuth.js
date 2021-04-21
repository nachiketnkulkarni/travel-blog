const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = async (req, res, next) => {
  let token;
  // console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access.", 406));
  }

  try {
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id);

    if (!user) {
      return next(new ErrorResponse("Wrong identification."), 404);
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Not authorized.", 401));
  }
};
