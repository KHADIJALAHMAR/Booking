const express = require('express');
const router = express.Router();

// requiring controllers
const Admins = require('../controllers/Admins');

//  Routes

router
.route('/owner/accept')
.put( Admins.acceptOwner )

router
.route('/owner/refuse')
.put( Admins.refuseOwner )

router
.route('/owner/ban')
.put( Admins.banOwner )

router
.route('/owner/unban')
.put( Admins.unbanOwner )

router
.route('/customer/ban')
.put( Admins.banCustomer )

router
.route('/customer/unban')
.put( Admins.unbanCustomer )

router
.route('/hotel/accept')
.put( Admins.acceptHotel )

router
.route('/hotel/refuse')
.put( Admins.refuseHotel )

module.exports = router;