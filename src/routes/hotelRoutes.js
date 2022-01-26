const express = require('express');
const { get } = require('express/lib/response');
const router = express.Router();
const ControllerHotel =require('../controllers/Hotels');
const ControllerOwner =require ('../controllers/Owners');
const ControllerAdmin =require('../controllers/Admins');






router.route("/hotels") 
.get(ControllerHotel.getHotelsl)
.post(ControllerHotel.createHotel);

router.route("/hotels/accepted") 
.get(ControllerAdmin.getAcceptedHotels);

router.route("/hotels/refused")
.get(ControllerAdmin.getRefusededHotels);

router.route("/hotels/:hotelId") 
put(ControllerOwner.updateHotel);
// delete(ControllerOwner.updateHotel);

router.route("/hotels/filterByName")
poste(ControllerHotel.getHotelsByName);

router.route("/hotels/filterByCity")
poste(ControllerHotel.getHotelsByCity);

router.route("/hotels/filterByStars")
poste(ControllerHotel.getHotelsByStars);

router.route("/hotels/delete/hotelId") 	
// delete(ControllerHotel.deleteHotel);

