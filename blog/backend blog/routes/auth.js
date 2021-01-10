const express = require("express");
const router = express.Router();
const storage = require("../service/multer.service");
const multer = require("multer");
const upload = multer({ storage });
const signup = require("../actions/user/signup");
const login = require("../actions/user/login");
const avatar = require("../actions/user/avatar");
const onlineUsers = require("../actions/user/onlineUsers");
const authenticateToken = require("../middlewares/authenticateToken");
const changeCredentials = require("../actions/user/changeCredentials");
const changePassword = require("../actions/user/changePassword");
//signup
router.post("/signup", signup);
//login
router.post("/login", login);
//uploading picture
router.post("/upload", authenticateToken, upload.single("avatar"), avatar);
//getting logged in user from token
router.get("/me", authenticateToken, onlineUsers);
//updating credentials except password
router.post("/me", authenticateToken, changeCredentials);
//updating password
router.post("/change-password", authenticateToken, changePassword);

module.exports = router;
