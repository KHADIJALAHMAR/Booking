const mongoose =require('mongoose');



const locationSchema = new mongoose.Schema({
    city :{
        type: String,
        minlength:[6 ,'should be atleast of 6 length'],
        maxlength:[14 , 'should not be more than 36 length'],
        required: true,
    },
    address :{
        type: String,
        minlength:[6 ,'should be atleast of 6 length'],
        maxlength:[60 , 'should not be more than 45 length'],
        required: true,
    },
    coordinats :{
        type: String,
        minlength:[6 ,'should be atleast of 6 length'],
        maxlength:[200 , 'should not be more than 145 length'],
        required: true,
    },
    });
    const location = mongoose.model("location",  locationSchema);

    module.exports = location;

    
