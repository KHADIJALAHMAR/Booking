const express = require("express");
const router = express.Router();
const multer = require("multer");
// const upload = multer({ dest : })
const { authorizeWithRole } = require("../middlewares/authorizeUser");

// controller
const { Owners, roomUpload, Rooms } = require("../controllers");

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
    authorizeWithRole("owner"),
    roomUpload.array("room-image", 8),
    Rooms.createRoom
  );

router
  .route("/room/:roomId")
  .put(authorizeWithRole("owner"), Rooms.updateRoom)
  .delete(authorizeWithRole("owner"), Rooms.deleteRoom);

router
  .route("/booking/accept")
  .put(authorizeWithRole("owner"), Owners.acceptBooking);

router
  .route("/booking/refuse")
  .put(authorizeWithRole("owner"), Owners.refuseBooking);

// route owner
router.route("/")
    .put(Owners.updateOwner);

module.exports = router;
