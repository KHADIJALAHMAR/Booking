
const {Hotel, Location} = require('../models')



// Get All The  Hotels
const getHotels = async (req, res) =>{

    const hotels = await  Hotel.find()
    
    try{
      res.json(hotels);
  } catch (error){
    res.status(400).json({error:error.message});
  } 
};


// Create An Hotel
const createHotel = async (req, res) => {
  
    const createhotel = await Hotel.create({

      name:req.body.name,
      description:req.body.description,
      mage_cover:req.body.mage_cover, 
      images:req.body.images,
      stars:req.body.stars,
      status:req.body.status,
      user_id:req.body.user_id,

    })
  try{
    res.json(createhotel);
  }catch(error){
    res.status(400).json({error:error.message})
  }
}


// Update An Hotel

const updateHotel = async (req, res) => {
  
  const updatehotel = await Hotel.findByIdAndUpdate({ _id: req.params.id},{name : req.body.name,slug: slugify(req.body.name),},{returnDocument: 'after'});
 try {
   res.json(updatehotel);
 } catch (error) {
   res.status(500).json(error);
 }
}


// Delete An Hotel
const deleteHotel = async (req, res) => { 
 
      await Hotel.findOneAndDelete({ id:req.params.id})

      try {
      res.status(200).json({message:"The Hotel was Deleted  with Success"})
    } catch (error) {
      res.status(400).json({error:error.message});
    }
};



////////////////filters methods/////////////////

// Filter Hotel By Name
const getHotelsByName = (req, res) => {
    
  const hotelsbyname = Hotel.find({where:{name:req.body.name}})

  try{
    res.json(hotelsbyname)
  }catch (error){
    res.status(400).json({error:error.message})
  }
    
}


// Filtre Hotels By City
const getHotelsByCity  = (req, res) => {
  Location.find({
    where:{
      city:req.body.name
  }}).then((hotelsbycity) => {
    res.json(hotelsbycity)
  })
}


// Filter Hotels By Stars
const getHotelsByStars = (req, res) =>{
  const star = req.body.name
  if(star &&   star >= 0 && star <= 5){
    Hotel.where({star:star})
    .then(() => {
      res.json()
    })
  }else{
    res.status(400).send();
  }
}



// This Method used To not export all The Methods, so in this case, 
// we will use one method in route to filter by name city and stars

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


module.exports = {
  getHotels,
  searchFilters,
  deleteHotel,
  createHotel,
  updateHotel
}