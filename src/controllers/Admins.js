const { Hotel, User } = require("../models");
const {
  returnErrorAsResponse,
  returnRegisterError,
  returnMessageAsResponse,
} = require("../functions/index");

// create an owner
const createUser = (req, res) => {
  const infos = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    repeated_password: req.body.repeated_password,
    gender: req.body.gender,
    role: req.body.role,
  };

  if (infos.password !== infos.repeated_password) {
    returnErrorAsResponse(res, "passwords are not Identical");
  }

  (async () => {
    try {
      await User.create({
        username: infos.username,
        email: infos.email,
        password: infos.password,
        gender: infos.gender,
        role:
          infos.role === "owner"
            ? { name: infos.role, status: false }
            : { name: infos.role },
      });
      returnMessageAsResponse(res, "User created successfully");
    } catch (error) {
      returnRegisterError(res, error.message);
    }
  })();
};

// update owner infos
const updateUser = (req, res) => {
  const userId = req.params.userId;
  let userInfos = [];

  try {
    if (req.body.username) {
      userInfos.push({ username: req.body.username });
    }
    if (req.body.email) {
      userInfos.push({ email: req.body.email });
    }

    if (userInfos.username !== "" && userInfos.email !== "") {
      User.updateOne(
        {
          _id: userId,
        },
        {
          username: userInfos.username,
          email: userInfos.email,
        }
      ).then((err, userUpdated) => {
        if (err) console.log(err);
        // res.status(200).json({
        //   message: "user updated successfully !!",
        //   user: userUpdated,
        // });
        console.log(userUpdated);
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

// delete owner
const deleteUser = (req, res) => {
  const userId = req.body.userId;
  User.findOneAndDelete({ _id: userId }, function (err, result) {
    if (err) console.log(err);
    res.json({
      message: "user is deleted successfully !",
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
