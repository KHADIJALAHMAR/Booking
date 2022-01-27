const mongoose = require("mongoose");

// create shema
const RoomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const RoomType = mongoose.model("RoomType", RoomTypeSchema);

module.exports = RoomType;
