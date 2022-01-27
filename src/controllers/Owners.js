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
      let ownerAccepted = "";
      users.forEach((user) => {
        if (user.role.status == true) {
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

const getRefusedOwners = (req, res) => {
    User.find((err, users) => {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (users) {
          let owner = {};
          let ownerAccepted = "";
          users.forEach((user) => {
            if (user.role.status == false) {
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
