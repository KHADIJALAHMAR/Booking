const express = require('express');
const router = express.Router();
const Hotels =require('../controllers/Hotels');
const Owners =require ('../controllers/Owners');
const Admins =require('../controllers/Admins');






router.route("/hotels") 
.get(Hotels.getHotelsl)
.post(Hotels.createHotel);

router.route("/hotels/accepted") 
.get(Admins.getAcceptedHotels);

router.route("/hotels/refused")
.get(Admins.getRefusededHotels);

router.route("/hotels/:hotelId") 
put( Owners.updateHotel);
delete( Owners.updateHotel);

router.route("/hotels/filterByName")
post(Hotels.getHotelsByName);

router.route("/hotels/filterByCity")
post(Hotels.getHotelsByCity);

router.route("/hotels/filterByStars")
post(Hotels.getHotelsByStars);

router.route("/hotels/delete/hotelId") 	
delete(Hotels.deleteHotel);

module.exports = router;