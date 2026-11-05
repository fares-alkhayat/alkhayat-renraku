const mongoose = require("mongoose");
const uuidv7 = require("uuidv7")

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    default: () => uuidv7.uuidv7(),
    index: { unique: true }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  about: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  language: {
    type: String
  },
  timezone: {
    type: String
  }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;
