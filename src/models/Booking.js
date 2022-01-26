
const mogoose = require('mongoose');

// create booking schema

const BookingSchema = new mogoose.Schema({
  date_from :{
    type: Date,
    required: true
  },

  date_to:{
    type:Date,
    required: true
  },

  total_price:{
    type: Number,
  },

  status:{
    type:Boolean,
  },

  paid:{
    type:Number,
  },

  _user:{
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  }

})

// creating the model booking
const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking