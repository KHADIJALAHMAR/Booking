const mongoose = require("mongoose");

// create booking schema

const BookingSchema = new mongoose.Schema({
  date_from: {
    type: Date,
    required: true,
    match : /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
  },

  date_to: {
    type: Date,
    required: true,
    match: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
  },

  total_price: {
    type: Number,
  },

  status: {
    type: String,
    enum: ["accepted", "refused", "pending"],
  },

  paid: {
    type: Boolean,
  },

  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// creating the model booking
const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
