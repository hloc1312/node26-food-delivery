const { response } = require("../helpers/response");
const authService = require("../services/auth.service");

// POST: /login - body: {email, password}
const login = () => {
  return async (req, res, next) => {
    try {
      const credentials = req.body;
      const user = await authService.login(credentials);
      res.status(200).json(response(user));
    } catch (error) {
      next(error);
    }
  };
};

const getProfile = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      res.status(200).json(response(user));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  login,
  getProfile,
};
