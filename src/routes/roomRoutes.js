const express = require('express');
const router = express.Router();

// room controller
const Rooms = require('../controllers/Rooms');

// routes
router.route("/rooms")
    .get(Rooms.getRooms)

router.route("/rooms/filterByPrice")
    .post(Rooms.getRoomsByPrice);

router.route("/roomtype")
    .get(Rooms.getRoomType)
    .post(Rooms.createRoomType)
    .put(Rooms.updateRoomType)
    .delete(Rooms.deleteRoomType)

module.exports = router;
