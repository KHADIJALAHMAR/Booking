const { returnErrorAsResponse } = require("../functions");

// user model
const { User, RoomsGroup, Booking, BookingRoom } = require("../models");
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
// Pending Method
const acceptBooking = (req, res) => {
  // I must do function for changing status of booking from true to false
  let bookingId = req.body.bookingId;
  const roomId = req.body.roomId;
  try {
    // get rooms have the same booking_id
    BookingRoom.findOne(
      { booking_id: bookingId, room_id: roomId },
      function (err, room) {
        if (err) console.log(err);
        res.json({ room });
      }
    );
  } catch (error) {
    res.json(error.message);
  }
};
// Pending Method
const refuseBooking = (req, res) => {};

module.exports = {
  getAcceptedOwners,
  getRefusedOwners,
  getOwners,
  getPendingOwners,
  getBannedOwners,
  createRoom,
  updateRoom,
  deleteRoom,
  acceptBooking,
  refuseBooking,
  updateOwner,
};
