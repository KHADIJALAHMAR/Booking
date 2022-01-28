const express = require("express");

// user model
const { User, Room } = require("../models");

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

const createRoom = (req, res) => {
  let room = {
    number: req.body.number,
    room_quantity: req.body.room_quantity,
    description: req.body.description,
    price: req.body.price,
    hotel_id: req.body.hotel_id,
    room_type_id: req.body.room_type_id,
  };
  try {
    (async () => {
      await new Room({
        number: room.number,
        room_quantity: room.room_quantity,
        description: room.description,
        price: room.price,
        hotel_id: room.hotel_id,
        room_type_id: room.room_type_id,
      }).save();
      res.json({
        message: `new room created`,
      });
    })();
    } catch (error) {
    res.json(err);
  }
};

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
