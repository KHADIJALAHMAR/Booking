const {User, Booking} =require('../models'); 
const express = require("express");








const createBooking  = (req ,res) => {

    const booking = {
        date_from :  req.body.date_from ,
        date_to:  req.body.date_to,
        total_price: req.body.total_price ,
        status: req.body.status,
        paid:  req.body.paid,
        id_user :req.body.id_user,
    };
    try {
        (async ()=> { 
            await new Booking ({
                date_from :  booking.date_from ,
                date_to:  booking.date_to,
                total_price: booking.total_price ,
                status: booking.status,
                paid:  booking.paid,
                id_user :booking.id_user,
            }).save();
            res.status(201).json({
                message: `created Booking`,
            });
        })();
    }
    catch (error) 
    {
            res.status(400).json(err);
    }

};




const updateBooking = (req ,res) =>{

}


const payBooking = (req ,res ) =>{

}


const getBannedUsers = (req, res) =>{



}





module.exports = {
    createBooking ,
    getBannedUsers,
    updateBooking,
    payBooking,


  }