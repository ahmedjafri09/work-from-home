const User = require("../../models/User");

module.exports = async (req, res, next) => {
  try {
    const data = req.file;

    const profilePic = data.filename;

    console.log(`pic is: ${profilePic}`);

    const updated = await User.updateOne(
      {
        _id: req.user._id,
      },
      {
        $set: {
          profilePic,
        },
      }
    );

    return res.json({ updated });
  } catch (error) {
    next(error);
  }
};
