const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response");

const upload = () => {
  return async (req, res, next) => {
    const file = req.file;

    // Có thể validate loại file và kích thước bằng file.mimetype và file.size
    if (!file) {
      next(new AppError(400, "Please upload a file"));
    }

    const url = `http://localhost:4000/${file.path.replace(/\\/g, "/")}`;

    res.status(200).json(response(url));
  };
};

module.exports = { upload };
