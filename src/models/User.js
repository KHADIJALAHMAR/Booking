const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    status: {
      type: Boolean
    }
});

// create Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
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
  role: RoleSchema,

});

const User = mongoose.model("User", UserSchema);

module.exports = User;