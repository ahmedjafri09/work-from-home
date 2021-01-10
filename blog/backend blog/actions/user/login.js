const User = require("../../models/User");

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return next({
        status: 401,
      });
    }

    const passwordVerfified = user.verifyPassword(password);

    if (!passwordVerfified) {
      return next({
        status: 401,
      });
    }

    const accessToken = user.generateJWT();

    return res.json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};
