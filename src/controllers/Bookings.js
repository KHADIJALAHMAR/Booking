const {Booking, RoomsGroup, RoomType} = require('../models')

// Get all Booking
const getBookings = async (req, res ) =>{
  
  const bookings = await  Booking.find()

  try{
    res.json(bookings);
  } catch (error){
    res.status(400).json({error:error.message});
  }
};

const getBookingsByStatus = async (req, res ) =>{
  const status = req.params.status;

  try{
    await Booking.find({status: status}).exec().then(bookings => {
      res.status(200).json(bookings)
    });
  } catch (error){
    res.status(400).json({error:error.message});
  }
};

const getBookingsByPaidStatus = async (req, res ) =>{
  const isPaid = req.body.isPaid;

  try{
    await Booking.find({paid: isPaid}).exec().then(bookings => {
      res.status(200).json(bookings)
    });
  } catch (error){
    res.status(400).json({error:error.message});
  }
};

const createBooking = async (req,res) => {
  const dateFrom = new Date(req.body.dateFrom);
  const dateTo = new Date(req.body.dateTo);
  const bookingRooms = req.body.bookingRooms;

  if(dateFrom >= dateTo) {
    res.status(400).json({error: "the end date must be greater than the start date"})
  }
  
  const datesInterval = (dateTo.getTime() - dateFrom.getTime())/ (1000 * 60 * 60 * 24);

  if( datesInterval > 5 || datesInterval < 1) {
    res.status(400).json({error: "the dates interval must be between 1 day minimum to 5 days maximum"});
  }

  if(bookingRooms && bookingRooms.length === 0) {
    res.status(400).json({error: "you must enter at least one booking room"});
  }
  
  const validBookingRooms = [];
  const invalidBookingRooms = [];

  bookingRooms.forEach( async(bookingRoom,index) => {

    const roomtypeId = await RoomType.findOne({name: bookingRoom.roomType})._id;
    
    const roomGroupCount = await RoomsGroup.countDocuments({price: bookingRoom.price , room_type_id: roomtypeId});

    if(roomGroupCount !== 0) {
      validBookingRooms.push(bookingRoom);
    }else{
      invalidBookingRooms.push(bookingRoom);
    }
    
  });

  const total_price = 0;
  validBookingRooms.forEach(bookingRoom => {
    total_price += bookingRoom.price;
  })

  await Booking.create({date_from: dateFrom, date_to: dateTo, total_price: total_price  })
  


}


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