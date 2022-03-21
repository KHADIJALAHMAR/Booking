const { Rooms } = require(".");
const { RoomType,RoomsGroup} = require("../models");

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
  try{
  RoomsGroup.findByIdAndUpdate(roomId, req.body.data, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

const deleteRoom = async (req, res) => {
  const roomId = req.body.roomId;

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

// search for room with param
const getRooms = (all) => {
  return (req, res) => {
    const hotelId = req.params.hotelId;
    
      if (all) {
        console.log('getrooms');
        try {
          RoomsGroup.find({ id_hotel: hotelId }, function (err, rooms) {
            if (err) res.status(404).json({ err: err.message });
            res.status(200).json({
              rooms: rooms,
            });
          });
        } catch (error) {
          console.log(error);
        }
      }else if (!all) {
        try {
          RoomsGroup.find({}, function (err, rooms) {
            if (err) res.status(404).json({ err: err.message });
            res.status(200).json({
              rooms: rooms,
            });
          });
        } catch (error) {
          console.log(error);
        }
      }
      
  };
}


//
const getRoomsByPrice = (req, res) => {};


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
  console.log('getroomtype');
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

const getRoomById = async (req, res) => {
  const roomId = req.params.roomId;
  try {
    RoomsGroup.findById(roomId, function(err, room) {
      if (err) {
        console.log(err.message);
      }else {
        res.status(200).json(room);
      }
    })
  } catch (err) {
    res.status(400).json({err: err.message})
  }
}

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
  getRoomById
};
