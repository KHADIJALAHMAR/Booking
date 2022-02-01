
const {Hotel, Location} = require('../models')



// Get All Hotels
const getHotels = async (req, res) =>{

  try{
    const hotels = await  Hotel.find()
    res.json(hotels);
  } catch (error){
    res.status(400).json({error:error.message});
  } 
};


// Filter Hotel bY Name
const getHotelsByName = (req, res) => {
  Hotel.find({
    where:{
      name:req.body.name
    }
  }).then(() => {
    res.json()
  })
}


// Filtre Hotels  by City
const getHotelsByCity  = (req, res) => {
  Location.find({
    where:{
      city:req.body.name
  }}).then(() => {
    res.json()
  })
}


// Filter Hotels by Stars
const getHotelsByStars = (req, res) =>{
  const star = req.body.name
  if(star &&   star >= 0 && star <= 5){
    Hotel.where({star:star})
    .then(() => {
      send.json()
    })
  }else{
    res.status(400).send();
  }
}




const searchFilters = (req, res) =>{
  switch(req.body.type){
    case "name":
      return getHotelsByName(req, res)
    case "city":
      return getHotelsByCity(req, res)
    case "star":
      return getHotelsByStars(req, res)
  }
}

// Delete Hotel
const deleteHotel = async (req, res) => { 
  try {
      await Hotel.deleteOne(req.params.id);

      res.json('DELETE HOTEL');
    } catch (error) {
      res.status(400).send(error);
    }
};



module.exports = {
  getHotels,
  searchFilters,
  deleteHotel,
}