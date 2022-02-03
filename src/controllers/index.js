const Admins = require('./Admins');
const Bookings = require('./Bookings');
const Customers = require('./Customers'); 
const Hotels = require('./Hotels'); 
const Owners = require('./Owners'); 
const Rooms = require('./Rooms');
const Users = require('./Users');

// requiring multer
const path = require('path');
const multer = require('multer');

// filter function
const fFilter = (req, file, cb) =>{    
    // Allowed ext
     const filetypes = /jpeg|jpg|png/;
  
   // Check ext
    const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
   // Check mime
   const mimetype = filetypes.test(file.mimetype);
  
   if(mimetype && extname){
       return cb(null,true);
   } else {
       cb('Error: Images Only!');
   }
}

const roomUpload = multer({  fileFilter: fFilter , dest : path.join(path.dirname(__dirname) , 'public' , 'assets' , 'uploads' , 'images' , 'room_images')})

const hotelUpload = multer({ fileFilter: fFilter , dest : path.join(path.dirname(__dirname) , 'public' , 'assets' , 'uploads' , 'images' , 'hotel_images')})

module.exports = {
    Admins,
    Bookings,
    Customers,
    Hotels,
    Owners,
    Rooms,
    Users,
    roomUpload,
    hotelUpload
}