const express = require("express");

// user model
const User = require("../models/User");

const getAcceptedOwners = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    if (users) {
      let owner = {};
      users.forEach((user) => {
        owner = {
          username: user.username,
          email: user.email,
          password: user.password,
          geder: user.gender,
          name: user.role.name,
          status: user.role.status,
        };
      });
      if (owner.name == "owner" || owner.status == true) {
        res.json({
          message: "This owner is accepted",
          owner,
        });
      } else if (owner.name == "owner" || owner.status == false) {
        res.json({
          message: "This owner is not accepted",
        });
      }
    }
  });
};

const getRefusedOwners = (req, res) => {};

const getBannedOwners = (req, res) => {};

const createRoom = (req, res) => {};

const updateRoom = (req, res) => {};

const deleteRoom = (req, res) => {};

const acceptBooking = (req, res) => {};

const refuseBooking = (req, res) => {};

module.exports = {
  getAcceptedOwners,
  getRefusedOwners,
  getBannedOwners,
  createRoom,
  updateRoom,
  deleteRoom,
  acceptBooking,
  refuseBooking,
};
