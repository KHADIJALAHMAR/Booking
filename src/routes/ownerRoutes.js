const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const upload = multer({ dest : path.join(__dirname, 'src' , 'public' , 'assets' , 'uploads' , 'images' , 'room_images')})

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

module.exports = router;
