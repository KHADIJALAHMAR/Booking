const mongoose = require("mongoose");

// create Shema
const ReviewSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    max: 5,
    min: 0
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
  },

});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;