const {User} =require('../models'); 






const getCustomers = (req, res) =>{
    User.find( function (err, user) {
       console.log(user);
    });

  }

module.exports ={
    getCustomers,
}