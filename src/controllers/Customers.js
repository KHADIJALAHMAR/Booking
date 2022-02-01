const {user} =require('../models'); 






const getCustomers = (req, res) =>{
    user.findAll().then(user =>
       res.json(user))
  }