require('dotenv').config();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { returnErrorAsResponse , returnMessageAsResponse } = require('../functions');

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

    // checking for username
    if(typeof infos[0] === 'undefined'){ 
        returnErrorAsResponse(res,'you must enter a username') 
    }
    else if (infos[0].length < 6 || infos[0].length > 20) { 
        returnErrorAsResponse(res,'username must be between 6 and 20 characters') 
    }
    // checking for email
    else if (typeof infos[1] === 'undefined') { 
        returnErrorAsResponse(res,'you must enter an email') 
    }
    else if (!infos[1].toLowerCase().match(email_regex)) { 
        returnErrorAsResponse(res,'invalid email format') 
    }
    // checking for password
    else if (typeof infos[2] === 'undefined') { 
        returnErrorAsResponse(res,'you must enter a password') 
    }
    else if (infos[2].length < 6 || infos[2].length > 30) { 
        returnErrorAsResponse(res,'password must be between 6 and 30 characters') 
    }
    else if (infos[2] !== infos[3]) { 
        returnErrorAsResponse(res,'passwords are not Identical') 
    }
    // checking for role
    else if (infos[4] !== 'owner' && infos[4] !== 'admin' && infos[4] !== 'customer' ) { 
        returnErrorAsResponse(res,'not a valid role') 
    }
    // checking for gender
    else if (infos[5] !== 'male' && infos[5] !== 'female' ) { 
        returnErrorAsResponse(res,'not a valid gender') 
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
            returnMessageAsResponse(res,'User created successfully');
        })();
    }catch(err) {
        returnErrorAsResponse(res,err.message)
    }
}

// handling Login
const handleLogin = (req,res) => {
    (async () =>{
        if(typeof req.body.email === 'undefined') { returnErrorAsResponse(res,'please enter an email') }
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            returnErrorAsResponse(res,'email is not found');
        }else if(typeof req.body.password === 'undefined'){
            returnErrorAsResponse(res,'please enter your password');
        }else{
            await user.comparePasswords(req.body.password).then((result) => {
                if (!result) {
                    returnErrorAsResponse(res,'password is incorrect');
                }else{
                    const id = user._id;
                    const role = user.role;
                    const accessToken = jwt.sign({id,role},process.env.JWT_ACCESS_SECRET);
                    res.cookie('token', accessToken, {httpOnly: true});
                    res.json({accessToken});
                }
            }).catch((err) => returnErrorAsResponse(res,err.message))
        }  
    })();
}

module.exports = {
    handleRegister,
    handleLogin,
}