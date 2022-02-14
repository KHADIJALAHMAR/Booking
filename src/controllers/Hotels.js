const { Hotel, Location, RoomsGroup, Booking } = require("../models");

// Get All The  Hotels acess by admin
const getHotels = async (req, res) => {
  const hotels = await Hotel.find();

  try {
    res.json(hotels);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get the Owner Hotel by id
const getHotelsbyowner = async (req, res) => {
  const hotels = await Hotel.find({ user_id: req.params.id });

  try {
    res.json(hotels);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create An Hotel
const createHotel = async (req, res) => {
  const createhotel = await Hotel.create({
    name: req.body.name,
    descreption: req.body.descreption,
    image_cover: req.body.mage_cover,
    images: req.body.images,
    stars: req.body.stars,
    status: req.body.status,
    userId: req.tokenData.id,
  });
  try {
    res.json(createhotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update An Hotel

const updateHotel = async (req, res) => {
  try {
    const updatehotel = await Hotel.findById(req.body.HotelId);
    Object.assign(updatehotel, req.body);
    updatehotel.save();
    res.status(201).json(updatehotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete An Hotel
const deleteHotel = async (req, res) => {
  try {
    const deletehotel = await Hotel.findByIdAndDelete(req.body.HotelId);
    if (!deletehotel) res.status(404).json({ message: "No Hotel Found" });
    res.json({ message: "Hotel was deleted with success !!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

////////////////filters methods/////////////////

// Filter Hotel By Name
const getHotelsByName = (req, res) => {
  const hotelsbyname = Hotel.find({ where: { name: req.body.name } });

  try {
    res.json(hotelsbyname);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Filtre Hotels By City
const getHotelsByCity = (req, res) => {
  Location.find({
    where: {
      city: req.body.name,
    },
  }).then((hotelsbycity) => {
    res.json(hotelsbycity);
  });
};

// Filter Hotels By Stars
const getHotelsByStars = (req, res) => {
  const star = req.body.name;
  if (star && star >= 0 && star <= 5) {
    Hotel.where({ star: star }).then(() => {
      res.json();
    });
  } else {
    res.status(400).send();
  }
}
const getRoomsByPrice = (req ,res )=>{
  RoomsGroup.find({price :req.body.price}).populate('hotel_id',"name").exec()
  .then((room) => {
    console.log(room);
    res.json(room)
  }).catch((error)=>{
    res.json(error);
  })
};

// Fillter Hotels By Date
const getHotelsByDate = (req, res) => {
  const dateFrom = new Date(req.body.dateFrom); //12
  const dateTo = new Date(req.body.dateTo); //15

  Booking.find(
    {
      $and: [
        {
          $or: [
            { date_from: { $lt: dateFrom } },
            { date_from: { $gt: dateTo } },
          ],
        },
        { $or: [{ date_to: { $gt: dateTo } }, { date_to: { $lt: dateFrom } }] },
      ],
    },
    function (err, data) {
      if (err) console.log(err);
      if (data) {
        res.json({ data });
      }
    }
  );
};

// This Method used To not export all The Methods, so in this case,
// we will use one method in route to filter by name city and stars

const searchFilters = (req, res) => {
  switch (req.body.type) {
    case "name":
      return getHotelsByName(req, res);
    case "city":
      return getHotelsByCity(req, res);
    case "star":
      return getHotelsByStars(req, res);
  }
};

module.exports = {
  getHotels,
  searchFilters,
  deleteHotel,
  createHotel,
  updateHotel,
  getHotelsbyowner,
  getRoomsByPrice,
  getHotelsByDate,
};
