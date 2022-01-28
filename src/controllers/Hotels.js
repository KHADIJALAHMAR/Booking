
const db = require('../models')


// get All Hotels
const getHotels = (req, res) =>{
  db.Hotel.findAll().then(hotels =>
     res.send(hotels))
}