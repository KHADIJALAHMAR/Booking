const express = require("express");
const router = express.Router();
const { authorizeWithRole } = require("../middlewares/authorizeUser");

// controller
const { Owners, roomUpload, Rooms, Hotels } = require("../controllers");

// routes
router
  .route("/accepted")
  .get(authorizeWithRole("admin"), Owners.getAcceptedOwners);

router
  .route("/refused")
  .get(authorizeWithRole("admin"), Owners.getRefusedOwners);

router.route("/banned").get(authorizeWithRole("admin"), Owners.getBannedOwners);

router
  .route("/room")
  .post(
    roomUpload.array("room-image", 8),
    Rooms.createRoom
  );

router
  .route("/room")
  .put(authorizeWithRole("owner"), Rooms.updateRoom)
  .delete(authorizeWithRole("owner"), Rooms.deleteRoom);

router
  .route("/booking/accept")
  .put(authorizeWithRole("owner"), Owners.acceptBooking);

router
  .route("/booking/refuse")
  .put(authorizeWithRole("owner"), Owners.refuseBooking);

router
    .route("/:userId/hotels")
    .get(Hotels.getHotelsByOwner(false));

// route owner
router.route("/")
    .put(Owners.updateOwner);

module.exports = router;
