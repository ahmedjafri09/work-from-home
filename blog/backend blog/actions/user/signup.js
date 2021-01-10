const User = require("../../models/User");

module.exports = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await User.create(data);
    if (!user) {
      next({
        status: 401,
        message: "Invalid User",
      });
    }
    return res.json({ user });
  } catch (error) {
    next(error);
  }
};
