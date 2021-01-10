const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../constants/constants");
const User = require("../models/User");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, tokenSecret, async (err, token) => {
      if (err) return res.sendStatus(401);
      if (!token) return res.sendStatus(401);

      token.user = await User.findOne(
        {
          _id: token._id,
        },
        { lean: true }
      );

      req.user = token;
      next();
    });
  } catch (error) {
    next(error);
  }
};
