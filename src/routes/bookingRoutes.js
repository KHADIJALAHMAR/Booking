const express = require('express');
const { get } = require('express/lib/response');
const router = express.Router();
const ControllerBooking =require('../controllers/Bookings');



router.rout("/bookings")
get(ControllerBooking.getBookings);
delete(ControllerBooking.deleteBooking);


