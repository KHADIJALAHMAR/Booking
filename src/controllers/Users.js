require('dotenv').config();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { returnErrorAsResponse , returnMessageAsResponse , returnRegisterError} = require('../functions');

// handling register
const handleRegister = (req,res) => {
    // validate the informations
    const infos = [
        /*[0]*/req.body.username, 
        /*[1]*/req.body.email, 
        /*[2]*/req.body.password, 
        /*[3]*/req.body.repeated_password, 
        /*[4]*/req.body.role, 
        /*[5]*/req.body.gender
    ];

    if (infos[2] !== infos[3]) { 
        returnErrorAsResponse(res,'passwords are not Identical') 
    }
    
    
        (async () =>{
            try{
                await User.create({
                    username: infos[0], 
                    email: infos[1], 
                    password: infos[2], 
                    gender: infos[5], 
                    role: infos[4] === 'owner' ? {name: infos[4] , status: false } : {name: infos[4] }
                });
                returnMessageAsResponse(res,'User created successfully');
            }catch(err) {
                returnRegisterError(res,err.message)
            }
        })();
    
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