const ErrorResponse = require("../utils/errorResponse");

const errorHandles = (err, req, res, next) => {
  let error = { ...err };

  // console.log(err);
  error.message = err.message;
  if (err.code === 11000) {
    const message = capitalizeFirstLetter(
      `${Object.keys(err.keyValue)} duplicate field value entered.`
    );

    error = new ErrorResponse(message.replace(), 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server error." });
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = errorHandles;
