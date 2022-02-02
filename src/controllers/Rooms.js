const res = require('express/lib/response');
const {RoomType} = require('../models');
const { find } = require('../models/Booking');


const createRoomType = async (req ,res) => {
    const roomType = {
        name =req.body.name ,
    };
    try{
    (async()=> {
        await new  RoomType ({
            name = roomType.name,
        }).save();

        res.status(201).json({
            message: `created RoomType`,
        });

    })();
    }
    catch (error) 
    {
        res.status(400).json(err);
    }
};



const getRoomType = async (req ,res ) =>{

    try{
        const RoomType = await RoomType.find()
        res.status(201).json(RoomType)
    }
    catch (error){
        res.status(400).json({error:error.message});
    }
}

