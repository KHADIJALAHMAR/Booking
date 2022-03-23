const express = require("express");
const router = express.Router();

// room controller
const { Rooms,Hotels } = require("../controllers");

// routes
router.route("/roomtype")
    .get(Rooms.getRoomType)
    .post(Rooms.createRoomType)
    .put(Rooms.updateRoomType)
    .delete(Rooms.deleteRoomType)

router.route("/").get(Rooms.getRooms(true));

router.route("/:hotelId").get(Rooms.getRooms(false));

router.route("/filterByPrice").post(Rooms.getRoomsByPrice);

router.route("/filterByPrice")
    .post(Hotels.getRoomsByPrice);

module.exports = router;
