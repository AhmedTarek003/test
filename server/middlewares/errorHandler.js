const glogalErrorHandler = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "err";

  res.status(err.statuscode).json({
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = glogalErrorHandler;
