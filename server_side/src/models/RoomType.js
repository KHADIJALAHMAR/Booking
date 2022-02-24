const mongoose = require("mongoose");

// create shema
const RoomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength:[6 ,'should be atleast of 6 length'],
    maxlength:[26 , 'should not be more than 36 length']
  },
});

const RoomType = mongoose.model("RoomType", RoomTypeSchema);

module.exports = RoomType;
