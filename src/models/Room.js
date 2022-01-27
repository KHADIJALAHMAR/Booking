const mongoose = require("mongoose");
// require Hotel model
const Hotel = require("./Hotel");
// require RoomType model
const RoomType = require("./RoomType");

// create Shema
const RoomSchema = new mongoose.Schema({
  number: {
    type: Number,
  },
  room_quantity: {
    type: Number,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  hotel_id: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
  },
  room_type_id: {
    type: Schema.Types.ObjectId,
    ref: "RoomType",
  },
});

const Room = mongoose.model("Romm", RoomSchema);

module.exports = Room;
