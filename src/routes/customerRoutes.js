const express = require('express');
const router = express.Router();

// Requering Customer Controller

const Customers = require ('../controllers/Customers')
const Admins    = require ('../controllers/Admins')

// routes______________________________________________//

router
.route('/customers/banned')
.get(Admins.getBannedCustomers);

router
.route('/customers')
.get(Customers.getCustomers);

router
.route('customers/booking')
.post(Customers.createBooking);

router
.route('/customers/booking/:bookingId')
.put(Customers.updateBooking);

router
.route('/customers/booking/pay')
.delete(Customers.payBooking);




module.exports = router