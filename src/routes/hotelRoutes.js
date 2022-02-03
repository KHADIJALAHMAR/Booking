const express = require('express');
const router = express.Router();

// requiring controllers
const {Hotels, Owners , Admins} =require('../controllers');

router.route("/") 
.get(Hotels.getHotelsl)
.post(Hotels.createHotel);

router.route("/accepted") 
.get(Admins.getAcceptedHotels);

router.route("/refused")
.get(Admins.getRefusededHotels);

router.route("/:hotelId") 
.put( Owners.updateHotel)
.delete( Owners.updateHotel);

router.route("/filterByName")
.post(Hotels.getHotelsByName);

router.route("/filterByCity")
.post(Hotels.getHotelsByCity);

router.route("/filterByStars")
.post(Hotels.getHotelsByStars);

router.route("/delete/hotelId") 	
.delete(Hotels.deleteHotel);

module.exports = router;