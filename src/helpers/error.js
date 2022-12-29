class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// err: instance của AppError
const handleErrors = (err, req, res, next) => {
  // Kiểm trả err có phải là instance của AppError hay không
  // Nếu err là instance của AppError, nghĩa là err là mình đã biết và đã xử lý
  // Nếu là những lỗi không phải là instance của AppError, thì có thể vì một lý do nào đó nó bị lỗi mà mình chưa biết đc
  if (!(err instanceof AppError)) {
    err = new AppError(500, "Internal Server");
  }

  const { message, statusCode } = err;
  res.status(statusCode).json({
    status: "error",
    message: message,
  });

  // Nếu có các middleware phía sau, gọi next() để có thể đi tới các middleware phía sau
  next();
};

module.exports = {
  AppError,
  handleErrors,
};
