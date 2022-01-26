const express = require("express");
const router = express.Router();

// controller
const Owners = require("../controllers/Owners");

// routes
router.route("/owners/accepted")
    .get(Owners);

router.route("/owners/refused")
    .get(Owners);

router.route("/owners/banned")
    .get(Owners);

router.route("/owners/room")
    .post(Owners);

router.route("/owners/room/:roomId")
    .put(Owners);

router.route("/owners/room/:roomId")
    .delete(Owners);

router.route("/owners/booking/accept")
    .put(Owners);

router.route("/owners/booking/refuse")
    .put(Owners);
