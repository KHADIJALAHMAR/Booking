const express = require('express');
const router = express.Router();

// requiring controllers
const {Users} = require('../controllers');

// authentication routes

router.route('/register')
.post( Users.handleRegister );

router.route('/login')
.post( Users.handleLogin );

module.exports = router;