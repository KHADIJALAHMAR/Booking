const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const RoleSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      enum: ['admin', 'customer', 'owner']
    },
    status: {
      type: Boolean
    }
});

// create Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [5, 'the username must be greater than 5 characters'],
    maxlength: [20, 'the username must be less than 20 characters']
  },
  email: {
    type: String,
    required: true,
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'invalid email format']

  },
  password: {
    type: String,
    required: true,

    minlength: [5, 'the password must be greater than 5 characters'],
    maxlength: [20, 'the password must be less than 20 characters']

  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']

  },
  role: RoleSchema,
});

// methods
UserSchema.pre("save", function (next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10).then((hashedPass) => {
    user.password = hashedPass;
    next();
  });
});

UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
