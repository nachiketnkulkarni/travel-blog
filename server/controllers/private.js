exports.getPrivateData = (req, res, next) => {
  console.log(req.user);

  res.status(200).json({
    success: true,
    data: "You accessed private data.",
  });
};
