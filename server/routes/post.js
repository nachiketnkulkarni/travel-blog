const express = require("express");
cors = require("cors");
const {
  getAllPosts,
  getOnePost,
  addBlogPost,
  getAllPostsOfUser,
  deletePost,
  updatePost,
} = require("../controllers/post");
const { protect } = require("../middleware/protectAuth");

const router = express.Router();

router.route("/").get(getAllPosts);
router.route("/:id").get(getOnePost);
router.route("/add").post(protect, addBlogPost);
router.route("/getUserPost").post(protect, getAllPostsOfUser);
router.route("/deletePost/:id").delete(protect, deletePost);
router.route("/updatePost/:id").put(protect, updatePost);

module.exports = router;
