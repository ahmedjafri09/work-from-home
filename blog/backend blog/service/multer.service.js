const multer = require("multer");
const constants = require("../constants/constants");

const storage = multer.diskStorage({
  destination: constants.imageDestination,
  filename: function (req, file, cb) {
    newFileName = `${req.user.username}.${file.originalname.split(".")[1]}`;
    cb(null, newFileName);
  },
});

module.exports = storage;
