const mongoose = require("mongoose");

// create Shema
const RoomSchema = new mongoose.Schema({
  room_quantity: {
    type: Number,
  },
  description: {
    type: String,
  },
  images : [{
    type: String
  }],
  price: {
    type: Number,
  },
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
  },
  room_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomType",
  },
});

const RoomsGroup = mongoose.model("RoomsGroup", RoomSchema);

module.exports = RoomsGroup;
