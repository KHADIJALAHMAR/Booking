const express = require("express");
const router = express.Router();

// requiring controllers
const { Hotels, Owners, Admins , hotelUpload} = require("../controllers");
const { authorizeWithRole, authorizeToken } = require("../middlewares/authorizeUser");

// router.route("/:id")
//     .get(authorizeWithRole("owner"), Hotels.getHotelsbyowner);

router
  .route("/")
  .get( Hotels.getHotels)
  .post(
    
    hotelUpload.array("hotel-image", 8),
    Hotels.createHotel);


router.route("/") 
.get(authorizeWithRole('admin', 'owner'),Hotels.getHotels)
.post(authorizeWithRole('admin', 'owner') ,Hotels.createHotel)


router.route("/:HotelId")
.put(
  // authorizeWithRole('admin', 'owner') ,
  Hotels.updateHotel)
.get(
  // authorizeWithRole('admin', 'owner') ,
Hotels.getHotelById)
.delete(
  // authorizeWithRole('admin', 'owner') ,
Hotels.deleteHotel);


router.route("/accepted") 
.get(Admins.getAcceptedHotels);


router.route("/refused")
    .get(Admins.getRefusedHotels);



router.route("/filterByName")
.post(Hotels.getHotelsByName);


// router.route("/filterByCity")   
// .post(Hotels.getHotelsByCity);


// router.route("/filterByStars")
// .post(Hotels.getHotelsByStars);

router.route("/hotelByDate")
.post(Hotels.getHotelsByDate);


// router.route("/search")
// .post(Hotels.searchFilters);


module.exports = router;
