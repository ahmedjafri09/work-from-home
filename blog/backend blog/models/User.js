const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const constants = require("../constants/constants");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    profilePic: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      match: [/^\S+@\S+$/, "invalid email"],
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      set: hashPassword,
      required: [true, "password is required"],
    },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);

UserSchema.virtual("fullName").get(() => {
  return `${UserSchema.firstName} ${UserSchema.lastName}`;
});

function hashPassword(password) {
  const hashedPw = CryptoJS.MD5(password).toString();
  return hashedPw;
}

UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      profilePic: this.profilePic,
    },
    constants.tokenSecret,
    { expiresIn: constants.tokenExpiry }
  );
};

UserSchema.methods.verifyPassword = function (password) {
  return this.password === hashPassword(password);
};

UserSchema.plugin(uniqueValidator, { message: "is already taken." });
const User = mongoose.model("User", UserSchema);

module.exports = User;
