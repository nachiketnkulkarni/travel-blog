const Blog = require("../models/Blog");
const ErrorResponse = require("../utils/errorResponse");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

exports.getAllPosts = async (req, res, next) => {
  try {
    await Blog.find((err, elements) => {
      if (err) {
        return next(new ErrorResponse("Server error.", 500));
      }
      sendData(elements, res);
    });
  } catch (error) {
    // res.status(500).json({ success: false, error: error.message });
    return next(error);
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    Blog.findById(postId, (err, element) => {
      if (err) {
        return next(new ErrorResponse("Wrong post serach.", 404));
      }
      sendData(element, res);
    });
  } catch (error) {
    return next(error);
  }
};

exports.addBlogPost = async (req, res, next) => {
  const { title, location, description, imageLink, videoLink } = req.body;

  const { success, link } = await uploadOnCLoudinary(imageLink);

  if (!success) {
    return next(new ErrorResponse(link, 505));
  }

  // const userId = ;
  const userId = req.user._id;

  try {
    await Blog.create({
      title,
      location,
      description,
      imageLink: link,
      videoLink,
      author: userId,
    });

    sendData("New Post Added", res);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.getAllPostsOfUser = async (req, res, next) => {
  try {
    const data = await Blog.find({ author: req.user._id });
    sendData(data, res);
  } catch (error) {
    return next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  //   console.log("here");
  try {
    Blog.deleteOne(
      { _id: req.params.id, author: req.user._id },
      (err, element) => {
        if (err) {
          return next(new ErrorResponse("Server error.", 500));
        }
        sendData("Deleted item successfully.", res);
      }
    );
  } catch (error) {
    return next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  const { title, location, description, videoLink, imageLink } = req.body;
  try {
    Blog.findByIdAndUpdate(
      { _id: req.params.id },
      { title, location, description, videoLink, imageLink },
      (err, result) => {
        if (err) {
          //   console.log(err.message);
          return next(new ErrorResponse(err.message, 500));
        } else {
          //   console.log(result);
          sendData("Post updated.", res);
        }
      }
    );
  } catch (error) {
    return next(error);
  }
};

const sendData = (data, res) => {
  res.status(200).json({
    success: true,
    data: data,
  });
};

const uploadOnCLoudinary = async (img) => {
  try {
    let res = {
      success: false,
      link: "",
    };

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    // console.log(cloudinary);
    // console.log(img);
    // const imgData = img;

    await cloudinary.uploader
      .upload(img, {
        upload_preset: "blog_website",
        folder: "blog_website",
      })
      .then((result) => {
        res.success = true;
        res.link = result.url;
      })
      .catch((error) => {
        res.success = false;
        res.link = error.message;
      });

    return res;
  } catch (error) {
    return next(error);
  }
};
