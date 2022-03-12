const mongoose = require('mongoose');

// create bookingroom schema

const BookingRoomSchema = new mongoose.Schema({
  id_booking :
  {
    type:mongoose.Schema.Types.ObjectId, ref: 'Booking'
  },

  id_room
:{
    type:mongoose.Schema.Types.ObjectId, ref: 'Room'
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