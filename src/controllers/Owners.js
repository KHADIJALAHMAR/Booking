const express = require("express");

// user model
const { User, Room } = require("../models");
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
        if (user.role.status == true) {
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

const updateRoom = async (req, res) => {
  const roomId = req.params.roomId;
  try {
    await Room.findByIdAndUpdate(roomId, req.body);
    const room = await Room.findOne({ _id: roomId });
    res.json({
      message: "room updated !!",
      room,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteRoom = async (req, res) => {
  const roomId = req.params.roomId;
  try {
    const room = await Room.findByIdAndDelete(roomId);
    if (!room) res.status(404).json({ message: "no room found" });
    res.json({ message: "room deleted successfully !!" });
  } catch (error) {
    res.json(error);
  }
};


const updateOwner = async (req, res )=>{
  try{
    const edite = await User.findById(req.body.ownerId)
    Object.assign(edite ,req.body)
    edite.save();
    res.status(201).json(edite);
  }catch(error){
    res.status(400).json({error :error.message});
  }
}

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
  updateOwner,
};
