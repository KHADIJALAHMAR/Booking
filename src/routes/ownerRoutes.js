const express = require("express");
const router = express.Router();

// controller
const Owners = require("../controllers/Owners");

// routes
router.route("/accepted")
    .get(Owners.getAcceptedOwners);

router.route("/refused")
    .get(Owners.getRefusedOwners);

router.route("/banned")
    .get(Owners.getBannedOwners);

router.route("/room")
    .post(Owners.createRoom);

router.route("/room/:roomId")
    .put(Owners.updateRoom)
    .delete(Owners.deleteRoom);

router.route("/booking/accept")
    .put(Owners.acceptBooking);

router.route("/booking/refuse")
    .put(Owners.refuseBooking);

// route owner
router.route("/")
    .put(Owners.updateOwner);

module.exports = router;
