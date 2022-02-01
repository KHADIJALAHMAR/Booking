const express = require('express');
const router = express.Router();

// reuiring Authorization By Roles Middleware
const {authorizeWithRole} = require('../middlewares/authorizeUser')

// requiring controllers
const Admins = require('../controllers/Admins');

//  Routes

router
.route('/owner/accept')
.put( authorizeWithRole('customer'), Admins.acceptOwner )

router
.route('/owner/refuse')
.put( Admins.refuseOwner )

router
.route('/user/ban')
.put( Admins.banUser )

router
.route('/user/unban')
.put( Admins.unbanUser )

router
.route('/hotel/accept')
.put( Admins.acceptHotel )

router
.route('/hotel/refuse')
.put( Admins.refuseHotel )

module.exports = router;