const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
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
  timezone: {
  }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;
