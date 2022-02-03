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
const roomUpload = multer({ dest : path.join(path.dirname(__dirname) , 'public' , 'assets' , 'uploads' , 'images' , 'room_images')})
const hotelUpload = multer({ dest : path.join(path.dirname(__dirname) , 'public' , 'assets' , 'uploads' , 'images' , 'hotel_images')})

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