const  Room    = require('./Room');
const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        maxlength: 20
    },
    images:[{
        data: Buffer,
        contentType: String,
    }],
    image_cover:{
        data: Buffer,
        contentType: String,
    },
    stars :{
        type: Number,
        default: 0
    },
    status :{
        type: Boolean, 
        default: false
    },
    userId :{
        type :mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
});

HotelSchema.pre('remove', function(next) {
    Room.remove({hotel_id: this._id}).exec();
    next();
});


const Hotel = mongoose.model('Hotel',HotelSchema);

module.exports = Hotel ;
































