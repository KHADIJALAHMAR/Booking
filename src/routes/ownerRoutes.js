const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const upload = multer({ dest : path.join(__dirname, 'src' , 'public' , 'assets' , 'uploads' , 'images' , 'room_images')})
const {authorizeWithRole} = require('../middlewares/authorizeUser');

// controller
const Owners = require("../controllers/Owners");

// routes
router.route("/accepted")
    .get(authorizeWithRole("admin"), Owners.getAcceptedOwners);

router.route("/refused")
    .get(authorizeWithRole("admin"), Owners.getRefusedOwners);

router.route("/banned")
    .get(authorizeWithRole("admin"), Owners.getBannedOwners);

router.route("/room")
    .post(authorizeWithRole("owner"), Owners.createRoom);

router.route("/room/:roomId")
    .put(authorizeWithRole("owner"), Owners.updateRoom)
    .delete(authorizeWithRole("owner"), Owners.deleteRoom);

router.route("/booking/accept")
    .put(authorizeWithRole("owner"), Owners.acceptBooking);

router.route("/booking/refuse")
    .put(authorizeWithRole("owner"), Owners.refuseBooking);

module.exports = router;
