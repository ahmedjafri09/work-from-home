const User = require("../../models/User");

module.exports = async (req, res, next) => {
  const data = req.body;

  try {
    await User.updateOne(
      { username: req.user.username },
      { $set: { password: data.password } }
    );

    return res.json({ data });
  } catch (error) {
    next(error);
  }
};
