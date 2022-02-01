const { Hotel, User } = require("../models");

// create an owner
const createUser = (req, res) => {};

// update owner infos
const updateUser = (req, res) => {
  const ownerId = req.params.ownerId;
  const userInfos = {
    username: req.body.username,
    email: req.body.email,
    role: {
      name: req.body.role.name,
    },
  };
  try {
    if (userInfos.role.name == "admin") {
      res.json({
        message: "you canno't set the role admin!",
      });
    } else if (userInfos.role.name == "owner") {
      userInfos.role.status = "false";
      User.findByIdAndUpdate(ownerId, userInfos, function (err, ownerUpdated) {
        if (err) console.log(err);
        res.json({
          message: "owner is updated successfully !!",
          owner: ownerUpdated,
        });
      });
    } else {
      User.findByIdAndUpdate(ownerId, userInfos, function (err, ownerUpdated) {
        if (err) console.log(err);
        res.json({
          message: "owner is updated successfully !!",
          owner: ownerUpdated,
        });
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

// delete owner
const deleteUser = (req, res) => {
  const ownerId = req.body.ownerId;
  User.findOneAndDelete({ _id: ownerId }, function (err, result) {
    if (err) console.log(err);
    res.json({
      message: "owner is deleted successfully !",
      result: result,
    });
  });
};

// accept an Owner
const acceptOwner = (req, res) => {
  res.status(200).json({ message: "you are in accept owner callback" });
};

// refuse an Owner
const refuseOwner = (req, res) => {};

// ban an Owner account
const banUser = (req, res) => {};

// unban an Owner account
const unbanUser = (req, res) => {};

// accept an Hotel request
const acceptHotel = (req, res) => {};

// refuse an Hotel request
const refuseHotel = (req, res) => {};

// get banned users
const getBannedUsers = (req, res) => {};

// get accepted Hotels
const getAcceptedHotels = (req, res) => {};

// get refused Hotels
const getRefusedHotels = (req, res) => {};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  acceptOwner,
  refuseOwner,
  banUser,
  unbanUser,
  acceptHotel,
  refuseHotel,
  getBannedUsers,
  getAcceptedHotels,
  getRefusedHotels,
};
