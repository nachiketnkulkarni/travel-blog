require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

const port = process.env.PORT || 5000;

//connectdb
connectDB();

app.use(cors());
app.options("*", cors());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/post", require("./routes/post"));

//Error Handler
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log("Server started on port 5000");
});

process.on("unhandledRejection", (err, promise) => {
  console.log("Error:---", err);
  server.close(() => process.exit(1));
});
