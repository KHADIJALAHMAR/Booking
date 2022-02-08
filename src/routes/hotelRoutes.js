const express = require('express');
const router = express.Router();

// requiring controllers
const {Hotels, Owners , Admins} =require('../controllers');
const { authorizeWithRole } = require('../middlewares/authorizeUser');



router.route("/:id") 
.get(authorizeWithRole('owner'),Hotels.getHotelsbyowner)

router.route("/") 
.get(authorizeWithRole('admin', 'owner'),Hotels.getHotels)
.post(authorizeWithRole('admin', 'owner') ,Hotels.createHotel);

router.route("/accepted") 
.get(Admins.getAcceptedHotels);

router.route("/refused")
.get(Admins.getRefusedHotels);


router.route("/update") 
.put( Hotels.updateHotel)
// .delete( Owners.updateHotel);

// router.route("/filterByName")
// .post(Hotels.getHotelsByName);

// router.route("/filterByCity")
// .post(Hotels.getHotelsByCity);

// router.route("/filterByStars")
// .post(Hotels.getHotelsByStars);

router.route("/delete") 	
.delete(Hotels.deleteHotel);

module.exports = router;