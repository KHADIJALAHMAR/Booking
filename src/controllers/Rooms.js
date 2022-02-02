const {RoomType} = require('../models');


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