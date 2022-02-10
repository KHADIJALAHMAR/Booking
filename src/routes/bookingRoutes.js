const express = require('express');
const router = express.Router();

// requiring controller
const {Bookings} = require('../controllers');

router.route("/")
.get(Bookings.getBookings)
.delete(Bookings.deleteBooking);


