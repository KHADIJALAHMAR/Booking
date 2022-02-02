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



const getRoomType = async (req ,res ) =>{

    try{
        const roomType = await RoomType.find()
        res.status(201).json(roomType)
    }
    catch (error){
        res.status(400).json({error:error.message});
    }
}

const deleteRoom = async (req, res) => { 
    try {
        await RoomType.deleteOne(req.body.id);
  
        res.json('DELETE Room Type');
      } catch (error) {
        res.status(400).json({error:error.message});
      }
  };