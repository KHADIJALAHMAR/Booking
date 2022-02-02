const express = require("express");
const router = express.Router();

// room controller
const Rooms = require("../controllers/Rooms");

// routes
router.route("/").get(Rooms.getRooms);

router.route("/filterByPrice").post(Rooms.getRoomsByPrice);

module.exports = router;
