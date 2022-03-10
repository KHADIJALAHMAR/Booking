const { returnErrorAsResponse } = require("../functions");

// user model
const { User, RoomsGroup, Booking, Hotel } = require("../models");
// To optimize
const getAcceptedOwners = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    if (users) {
      let owners = [];
      users.forEach((user) => {
        if (user.role.status == "accepted") {
          let owner = {
            username: user.username,
            email: user.email,
            password: user.password,
            gender: user.gender,
            roleName: user.role.name,
            status: user.role.status,
          };
          owners.push(owner);
        }
      });
      res.json(owners);
    }
  });
};

// To optimize
const getRefusedOwners = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    if (users) {
      let owner = {};
      users.forEach((user) => {
        if (user.role.status == "refused") {
          owner = {
            username: user.username,
            email: user.email,
            password: user.password,
            gender: user.gender,
            roleName: user.role.name,
            status: user.role.status,
          };
        }
      });
      res.json(owner);
    }
  });
};

// get all owners
const getOwners = (req, res) => {
  try {
    User.find({ "role.name": "owner" }, function (err, owners) {
      if (err) res.status(404).json({ err: err.message });
      res.status(200).json({ owners });
    });
  } catch (error) {
    console.log(error);
  }
};

// get pending owners
const getPendingOwners = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    if (users) {
      let owners = [];
      users.forEach((user) => {
        if (user.role.status == "pending") {
          let owner = {
            username: user.username,
            email: user.email,
            password: user.password,
            gender: user.gender,
            roleName: user.role.name,
            status: user.role.status,
          };
          owners.push(owner);
        }
      });
      res.json(owners);
    }
  });
};

// Pending Method
const getBannedOwners = (req, res) => {};

// Pending Method
const acceptBooking = async (req, res) => {
  // I must do function for changing status of booking from true to false
  let bookingId = req.body.bookingId;
  const roomId = req.body.roomId;
  try {
    const hotel_id = await Booking.findById(bookingId).select("id_hotel")
      .id_hotel;
    const owner_id = await Hotel.findById(hotel_id).select("userId").userId;

    if (owner_id === req.tokenData.id) {
      const booking = await Booking.findByIdAndUpdate(bookingId, {
        status: "accepted",
      });
      if (!booking) res.status(404).json({ message: "no booking found" });
      res.json({ message: "booking accepted!!" });
    } else {
      res.json("you do not own an hotel with this booking");
    }
  } catch (error) {
    res.json(error.message);
  }
};

const refuseBooking = async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    const hotel_id = await Booking.findById(bookingId).select("id_hotel")
      .id_hotel;
    const owner_id = await Hotel.findById(hotel_id).select("userId").userId;

    if (owner_id === req.tokenData.id) {
      const booking = await Booking.findByIdAndUpdate(bookingId, {
        status: "refused",
      });
      if (!booking) res.status(404).json({ message: "no booking found" });
      res.json({ message: "booking refused!!" });
    } else {
      res.json("you do not own an hotel with this booking");
    }
  } catch (error) {
    res.json(error.message);
  }
};

const markAsPaid = async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    const hotel_id = await Booking.findById(bookingId).select("id_hotel")
      .id_hotel;
    const owner_id = await Hotel.findById(hotel_id).select("userId").userId;

    if (owner_id === req.tokenData.id) {
      const booking = await Booking.findByIdAndUpdate(bookingId, {
        paid: true,
      });
      if (!booking) res.status(404).json({ message: "no booking found" });
      res.json({ message: "booking paid!!" });
    } else {
      res.json("you do not own an hotel with this booking");
    }
  } catch (error) {
    res.json(error.message);
  }
};

const updateOwner = async (req, res) => {
  console.log("UpdateOwner method");
};

module.exports = {
  getAcceptedOwners,
  getRefusedOwners,
  getOwners,
  getPendingOwners,
  getBannedOwners,
  acceptBooking,
  refuseBooking,
  updateOwner,
};
