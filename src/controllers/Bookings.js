const {Booking} = require('../models')

// Get all Booking
const getBookings = async (req, res ) =>{
  try{

    const bookings = await  Booking.find()
    res.json(bookings);

  } catch (error){
    res.status(400).json({error:error.message});
  }
};


// Delete Booking
const deleteBooking = async (req, res) => { 
  try {
      await Booking.deleteOne(req.body.id);

      res.json('DELETE Booking');
    } catch (error) {
      res.status(400).json({error:error.message});
    }
};

module.exports = {
  getBookings,
  deleteBooking
}