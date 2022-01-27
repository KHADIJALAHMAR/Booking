const express = require('express');
const router = express.Router();

// Requering Customer Controller

const Customers = require ('../controllers/Customers')
const Admins    = require ('../controllers/Admins')

// routes______________________________________________//

router
.route('/banned')
.get(Admins.getBannedCustomers);

router
.route('/')
.get(Customers.getCustomers);

router
.route('/booking')
.post(Customers.createBooking);

router
.route('/booking/:bookingId')
.put(Customers.updateBooking);

router
.route('/booking/pay')
.delete(Customers.payBooking);




module.exports = router