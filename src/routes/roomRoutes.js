const express = require('express');
const router = express.Router();

// room controller
const Rooms = require('../controllers/Rooms');

// routes
router.route("/rooms")
    .get(Rooms.getRooms)

router.route("/rooms/filterByPrice")
    .post(Rooms.getRoomsByPrice)