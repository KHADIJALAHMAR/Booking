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
