const mogoose = require('mongoose');

// create bookingroom schema

const BookingRoomSchema = new mogoose.Schema({
  id_booking :
  {
    type:mogoose.Schema.Types.ObjectId, ref: 'booking'
  },

  id_room
:{
    type:mongoose.Schema.ObjectId, ref: 'Room'
  },

  rooms_quantity:
  {
    type: Number,
  },

  price
:{
    type:Number,
  },

  total_price:
  {
    type:Number,
  },

  
})

// creating the model bookingroom
const BookingRoom = mongoose.model('BookingRoom', BookingRoomSchema);

module.exports = BookingRoom