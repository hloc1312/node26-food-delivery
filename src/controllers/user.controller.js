// Controller nhận vào request, response
// Nhiệm vụ: chỉ parse request (params, body) sau đó chuyển xuống Service xử lý, nhận kết quả trả về từ Service và trả response về cho client
const { response } = require("../helpers/response");
const userService = require("../services/user.service");

const getUsers = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(response(users));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      // Chuyển tiếp cái error xuống middleware handleErrors
      next(error);
    }
  };
};

const getUserByID = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserByID(id);
      res.status(200).json(response(user));
    } catch (error) {
      next(error);
    }
  };
};

const createUser = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const createdUser = await userService.createUser(data);
      res.status(200).json(response(createdUser));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };
};

const updateUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedUser = await userService.updateUser(id, data);

      res.status(200).json(response(updatedUser));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };
};

const deleteUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const createdUser = await userService.deleteUser(id);
      res.status(200).json(response(true));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };
};

module.exports = {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};
