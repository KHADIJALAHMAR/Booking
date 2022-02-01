const {user} =require('../models'); 






const getCustomers = (req, res) =>{
    user.findAll({}, function (err, user) {
        user[user.role] = user;
    });

  }