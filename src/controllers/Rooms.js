// const { RoomType } = require("../models");

const createRoom = (req, res) => {
  let room = {
    room_quantity: req.body.room_quantity,
    description: req.body.description,
    price: req.body.price,
    hotel_id: req.body.hotel_id,
    room_type_id: req.body.room_type_id,
    images: [],
  };

  req.files.map((file, index) => {
    room.images.push(file.originalname);
  });

  try {
    (async () => {
      await new RoomsGroup({
        room_quantity: room.room_quantity,
        description: room.description,
        images: room.images,
        price: room.price,
        hotel_id: room.hotel_id,
        room_type_id: room.room_type_id,
      }).save();
      res.json({
        message: `new room group created`,
      });
    })();
  } catch (error) {
    res.json(err);
  }
};

const updateRoom = async (req, res) => {
  const roomId = req.params.roomId;
  try {
    await RoomsGroup.findByIdAndUpdate(roomId, req.body);
    const roomsgroup = await RoomsGroup.findOne({ _id: roomId });
    res.json({
      message: "rooms group updated !!",
      roomsgroup,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteRoom = async (req, res) => {
  const roomId = req.params.roomId;

  try {
    const roomQte = await RoomsGroup.findById(roomId).select("room_quantity");
    console.log(roomQte, typeof roomQte);

    const room = await RoomsGroup.findByIdAndUpdate(roomId, {
      room_quantity: roomQte.room_quantity - 1,
    });
    if (!room) res.status(404).json({ message: "no room found" });
    res.json({ message: "room deleted successfully !!" });
  } catch (error) {
    res.json(error);
  }
};

const updateOwner = async (req, res) => {
  try {
    const edite = await User.findById(req.body.ownerId);
    Object.assign(edite, req.body);
    edite.save();
    res.status(201).json(edite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// search for room with param
const getRooms = (req, res) => {
  const hotelId = req.body.hotelId;
  try {
    RoomType.find({ id_hotel: hotelId }, function (err, rooms) {
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
  createRoom,
  updateRoom,
  deleteRoom,
  getRooms,
  getRoomsByPrice,
  createRoomType,
  getRoomType,
  deleteRoomType,
  updateRoomType,
};
