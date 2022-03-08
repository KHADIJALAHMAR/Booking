const  RoomsGroup    = require('./RoomsGroup');
const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        maxlength: 20
    },
    descreption: {
        type: String,
        required: true
    },
    images:[{
        type: String,
    }],
    image_cover:{
        type: String,
    },
    stars :{
        type: Number,
        default: 0
    },
    // status :{
    //     type: Boolean, 
    //     default: false
    // },
    userId :{
        type :mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

} );

HotelSchema.pre('remove', function(next) {
    RoomsGroup.remove({hotel_id: this._id}).exec();
    next();
});


const Hotel = mongoose.model('Hotel',HotelSchema);

module.exports = Hotel ;
































