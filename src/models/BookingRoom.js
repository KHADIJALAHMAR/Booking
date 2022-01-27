
const mogoose = require('mongoose');

// create booking schema

const BookingRoomSchema = new mogoose.Schema({
  _booking :
  {
    type:mogoose.Schema.Types.ObjectId, ref: 'booking'
  },

  _room
:{
    type:mongoose.Schema.ObjectId, ref: 'room'
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

// creating the model booking
const BookingRoom = mongoose.model('BookingRoom', BookingRoomSchema);

module.exports = BookingRoom