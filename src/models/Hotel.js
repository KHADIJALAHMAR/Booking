
const mongoose =require('mongoose');

const HotelSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        maxlength: 20
    },
    images:[{
        type: String
    }],
    image_cover:{
        type: String
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
const Hotel = mongoose.model('Hotel',HotelSchema);



module.exports = Hotel ;
































