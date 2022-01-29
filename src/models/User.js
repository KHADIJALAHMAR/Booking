const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

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

// methods
UserSchema.pre('save', function(next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, 10).then((hashedPass) => {
      user.password = hashedPass;
      next();
  });
});

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", UserSchema);

module.exports = User;