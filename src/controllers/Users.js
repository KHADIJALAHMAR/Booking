const mongoose = require("mongoose");

// create Shema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "customer"
  },

});

const User = mongoose.model("User", UserSchema);

module.exports = User;