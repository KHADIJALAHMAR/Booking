const mongoose = require("mongoose");

// create Shema
const RoomSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  room_quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images : [{
    type: String
  }],
  price: {
    type: Number,
    required: true,
  },

  hotel_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  ],
  room_type_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomType",
      required: true,
    },
  ],
});

const RoomsGroup = mongoose.model("RoomsGroup", RoomSchema);

module.exports = RoomsGroup;
