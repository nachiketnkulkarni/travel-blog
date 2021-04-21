const express = require("express");
cors = require("cors");

const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpass").post(forgotPassword);
router.route("/resetpass/:resetToken").post(resetPassword);

module.exports = router;
