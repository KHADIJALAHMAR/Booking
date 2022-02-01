const {Booking} = require('../models')

// Get all Booking
const getBookings = async (req, res ) =>{
  
  const bookings = await  Booking.find()

  try{
    res.json(bookings);
  } catch (error){
    res.status(400).json({error:error.message});
  }
};


// Delete Booking
const deleteBooking = async (req, res) => { 

  await Booking.findOneAndDelete({id :req.params.id});  

  try {
      res.status(200).json({message:"The Booking was Deleted With Success"});
    } catch (error) {
      res.status(400).json({error:error.message});
    }
};

module.exports = {
  getBookings,
  deleteBooking
}