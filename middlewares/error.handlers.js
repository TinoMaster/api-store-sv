function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    console.log(err);
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
  next();
}

module.exports = { errorHandler, boomErrorHandler };
