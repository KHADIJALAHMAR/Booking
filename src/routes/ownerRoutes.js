const express = require("express");
const router = express.Router();

// controller
const Owners = require("../controllers/Owners");

// routes
router.route("/owners/accepted")
    .get(Owners.getAcceptedOwners);

router.route("/owners/refused")
    .get(Owners.getRefusedOwners);

router.route("/owners/banned")
    .get(Owners.getBannedOwners);

router.route("/owners/room")
    .post(Owners.createRoom);

router.route("/owners/room/:roomId")
    .put(Owners.updateRoom)
    .delete(Owners.deleteRoom);

router.route("/owners/booking/accept")
    .put(Owners.acceptBooking);

router.route("/owners/booking/refuse")
    .put(Owners.refuseBooking);
