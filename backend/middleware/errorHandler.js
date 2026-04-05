const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid request format."
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error"
  });
};

module.exports = errorHandler;
