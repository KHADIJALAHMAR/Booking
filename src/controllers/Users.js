const { User } = require('../models');
const { returnErrorAsResponse } = require('../functions')
// handling register
const handleRegister = (req,res) => {

    const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // validate the informations
    const infos = [
        /*[0]*/req.body.username, 
        /*[1]*/req.body.email, 
        /*[2]*/req.body.password, 
        /*[3]*/req.body.repeated_password, 
        /*[4]*/req.body.role, 
        /*[5]*/req.body.gender
    ];

    if (infos[0].length < 6 || infos[0].length > 20) {
        returnErrorAsResponse(res,'username must be between 6 and 20 characters');
    }else if (!infos[1].toLowerCase().match(email_regex)) {
        returnErrorAsResponse(res,'invalid email format');
    }else if (infos[2].length < 6 || infos[2].length > 30) {
        returnErrorAsResponse(res,'password must be between 6 and 30 characters');
    }else if (infos[2] !== infos[3]) {
        returnErrorAsResponse(res,'passwords are not Identical');
    }else if (infos[4] !== 'owner' || infos[4] !== 'admin' || infos[4] !== 'customer' ) {
        returnErrorAsResponse(res,'not a valid role');
    }else if (infos[5] !== 'male' || infos[5] !== 'female' ) {
        returnErrorAsResponse(res,'not a valid gender');
    }
    
    try{
        (async () =>{
            await User.create({
                username: infos[0], 
                email: infos[1], 
                password: infos[2], 
                gender: infos[5], 
                role: infos[4] === 'owner' ? {name: infos[4] , status: false } : {name: infos[4] }
            });
            res.status(201).json({message: 'User created successfully'});
        })();
    }catch(err) {
            res.status(400).json({error: err.message});
    }
}

// handling Login
const handleLogin = (req,res) => {
    
}

module.exports = {
    handleRegister,
    handleLogin,
}