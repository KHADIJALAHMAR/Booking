const express = require('express');
const router = express.Router();
const Hotels =require('../controllers/Hotels');
const Owners =require ('../controllers/Owners');
const Admins =require('../controllers/Admins');
const { authorizeWithRole } = require('../middlewares/authorizeUser');





 

router.route("/") 
.get(authorizeWithRole('admin', 'owner'),Hotels.getHotels)
.post(authorizeWithRole('admin', 'owner') ,Hotels.createHotel)


router.route("/:id")
.put(authorizeWithRole('admin', 'owner') ,Hotels.updateHotel)
.delete(authorizeWithRole('admin', 'owner') ,Hotels.deleteHotel);


router.route("/accepted") 
.get(Admins.getAcceptedHotels);


router.route("/refused")
.get(Admins.getRefusedHotels);


router.route("/filterByName")
.post(Hotels.getHotelsByName);


router.route("/filterByCity")   
.post(Hotels.getHotelsByCity);


// router.route("/filterByStars")
// .post(Hotels.getHotelsByStars);


// router.route("/search")
// .post(Hotels.searchFilters);


module.exports = router;