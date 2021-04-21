const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const blogSchema = Schema({
  title: {
    type: String,
    required: [true, "Enter Blog Title"],
    minlength: 2,
  },
  location: {
    type: String,
    minlength: 2,
  },
  description: {
    type: String,
    required: [true, "Enter Blog Description"],
    minlength: 2,
  },
  videoLink: {
    type: String,
  },
  imageLink: {
    type: String,
  },
  date: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now,
  },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Blog = mongoose.model("Post", blogSchema);

module.exports = Blog;
