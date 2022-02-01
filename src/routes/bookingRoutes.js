const express = require('express');
const router = express.Router();
const ControllerBooking =require('../controllers/Bookings');



router.route("/")
.get(ControllerBooking.getBookings)
.delete(ControllerBooking.deleteBooking);


