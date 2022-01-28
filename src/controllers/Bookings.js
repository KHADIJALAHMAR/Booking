const db = require('../models')

// get all Booking
const getBookings = (req, res ) =>{
  db.Booking.findAll().then((bookings) =>
     res.send(bookings))

}


// 
const deleteBooking = (req, res) =>{
  db.Booking.destroy({
    where:{
      id: req.params.id
    }
  }).then(() => res.send('success'))
}