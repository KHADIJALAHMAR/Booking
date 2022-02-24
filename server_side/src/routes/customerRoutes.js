const express = require('express');
const router = express.Router();

// Requering Customer Controller

const {Customers,Admins} = require ('../controllers')

// routes______________________________________________//

router
.route('/banned')
.get(Admins.getBannedUsers);

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