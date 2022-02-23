const jwt = require('jsonwebtoken');
const authorizeToken = async (req,res,next) => {
    const token = req.cookies.token;

    if (!token){ 
        res.status(401).json({ error: "no token found"}) 
    }else {
        try {
            const user =  await jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    
            req.tokenData = await {id: user.user_id , role: user.role};
            
            next()
        }catch(err) {
            res.status(400).json({error: err.message})
        }
    }
}

const authorizeWithRole = (...roles) => {

    return (req, res, next) => {
            if(!roles.includes(req.tokenData.role.name)) {
                res.status(401).json({ error: "you are not authorized" });
            } else {
                next()
            }   
    }

}

module.exports = {
    authorizeToken,
    authorizeWithRole
};