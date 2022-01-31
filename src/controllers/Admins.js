const { Hotel , User } = require('../models');
// accept an Owner
const acceptOwner = (req,res) => {
    res.status(200).json({message: 'you are in accept owner callback'})
}

// refuse an Owner
const refuseOwner = (req,res) => {
    
}

// ban an Owner account
const banUser = (req,res) => {
    
}

// unban an Owner account
const unbanUser = (req,res) => {
    
}


// accept an Hotel request
const acceptHotel = (req,res) => {
    
}

// refuse an Hotel request
const refuseHotel = (req,res) => {
    
}

// get banned users
const getBannedUsers = (req,res) => {
    
}

// get accepted Hotels
const getAcceptedHotels = (req,res) => {
    
}

// get refused Hotels
const getRefusedHotels = (req,res) => {
    
}

module.exports = {
    acceptOwner,
    refuseOwner,
    banUser,
    unbanUser,
    acceptHotel,
    refuseHotel,
    getBannedUsers,
    getAcceptedHotels,
    getRefusedHotels
}