const { Hotel, Location, RoomsGroup, Booking } = require("../models");

// Get All The  Hotels acess by admin
// const getHotels = async (req, res) => {
//   const hotels = await Hotel.find();
// };

//Get the Hotels
const getHotels = async (req, res) => {
  // if (req.tokenData.role.name === "admin") {
    const hotels = await Hotel.find();
    try {
      res.json(hotels);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  // } else if (req.tokenData.role.name === "owner") {
  //   const hotelowner = req.tokenData.id;
  //   const getownerhotel = await Hotel.find({ userId: hotelowner });
  //   try {
  //     res.status(200).json(getownerhotel);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // } else {
  //   res.status(400).json({ error: "The Hotels is Not Yours !!" });
  // }
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
  if (req.tokenData.role.name === "admin") {
    try {
      const updatehotelbyadmin = await Hotel.findById(req.params.id);

      Object.assign(updatehotelbyadmin, req.body);
      updatehotel.save();
      res.status(201).json(updatehotelbyadmin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.tokenData.role.name === "owner") {
    const ownerhoteltoupdate = req.tokenData.id;
    const hotelownertoupdate = await Hotel.find({ userId: ownerhoteltoupdate });
    try {
      const updatehotel = await Hotel.findById(hotelownertoupdate);
      Object.assign(updatehotel, req.body);
      updatehotel.save();
      res.status(201).json(updatehotel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "The Hotels is Not Yours !!" });
  }
};

// Delete An Hotel
const deleteHotel = async (req, res) => {
  // if (req.tokenData.role.name === "admin") {
    try {
      const deletehotel = await Hotel.findByIdAndDelete(req.params.HotelId);
      if ((!deletehotel)) { res.status(404).json({ message: "No Hotel Found" })}
      else {res.status(200).json({ message: "Hotel Has deleted successfully !!" })};
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  // } else if (req.tokenData.role.name === "owner") {
  //   const ownerhotel = req.tokenData.id;
  //   const hotelOwner = await Hotel.find({ userId: ownerhotel });

  //   try {
  //     const deletehotel = await Hotel.findByIdAndDelete(hotelOwner);
  //     if (!deletehotel) res.status(404).json({ message: "No Hotel Found" });
  //     res.json({ message: "Hotel Has deleted  successfully !!" });
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // }
};

////////////////filters methods/////////////////

// Filter Hotel By Name
const getHotelsByName = async (req, res) => {
  try {
    const hotelbyname = await Hotel.find({ name: req.body.name }).exec();
    if (!hotelbyname) res.status(404).json({ message: "not hotel found" });
    res.status(200).json(hotelbyname);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Filtre Hotels By City
const getHotelsByCity = async (req, res) => {
  try {
    const hotelbycity = await Location.find({ city: req.body.city })
      .populate("hotel_id", "name")
      .exec();
    if (!hotelbycity) res.status(404).json({ message: "hotel not found" });
    res.status(200).json(hotelbycity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Filter Hotels By Stars
const getHotelsByStars = (req, res) => {
  const star = req.body.name;
  if (star && star >= 0 && star <= 5 && typeof star === "number") {
    Hotel.where({ star: star }).then(() => {
      res.json();
    });
  } else {
    res.status(400).send();
  }
};

const getRoomsByPrice = (req, res) => {
  RoomsGroup.find({ price: req.body.price })
    .populate("hotel_id", "name")
    .exec()
    .then((room) => {
      console.log(room);
      res.json(room);
    })
    .catch((error) => {
      res.json(error);
    });
};

// Fillter Hotels By Date
const getHotelsByDate = (req, res) => {
  const dateFrom = req.body.dateFrom;
  const dateTo = req.body.dateTo;

  console.log(dateFrom, dateTo);
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
  getHotelsByName,
  // getHotelsbyowner,
  getRoomsByPrice,
  getHotelsByDate,
};
