const { Room } = require("../models");

// search for room with param
const getRooms = (req, res) => {
  const hotelId = req.body.hotelId;
  try {
    Room.find({ id_hotel: hotelId }, function (err, rooms) {
      if (err) res.status(404).json({ err: err.message });
      res.status(200).json({
        rooms: rooms,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//
const getRoomsByPrice = (req, res) => {};

module.exports = {
  getRooms,
  getRoomsByPrice,
};

const { RoomType } = require("../models");

const createRoomType = async (req, res) => {
  let roomType = {
    name: req.body.name,
  };
  try {
    (async () => {
      await new RoomType({
        name: roomType.name,
      }).save();

      res.status(201).json({
        message: `created RoomType`,
      });
    })();
  } catch (error) {
    res.status(400).json(err);
  }
};

const getRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.find();
    res.status(201).json(roomType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRoomType = async (req, res) => {
  try {
    await RoomType.deleteOne(req.body.id);

    res.json("DELETE Room Type");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateRoomType = async (req, res) => {
  try {
    const roomType = await RoomType.findById(req.body.roomTypeId);
    Object.assign(roomType, req.body);
    roomType.save();
    res.json(roomType);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  createRoomType,
  getRoomType,
  deleteRoomType,
  updateRoomType,
};
