let jwt = require('jsonwebtoken');
module.exports = async function(req,res,next){
    let refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
    let token=null;

    if(req.header('authorization')){
        res.header('X-Token-Filed','Authorization');
        let authorization =req.header('authorization').split(" ");
        let bearer = authorization[0];
        // console.log(bearer);
        if(bearer ==="Bearer") token = authorization[1];
    }
    else if(req.header('refresh-token')){
        res.header('X-Token-Filed','Header refresh-token');
        token = req.header('refresh-token');  
    }
    else if(req.body['refresh-token']){
        res.header('X-Token-Filed','Body refresh-token');
        token = req.body['refresh-token'];
    }
    else{
        res.header('X-Token-Filed','None');
    }

    if(!token)
    {
        res.header('X-Refresh-Token','Token not given');
        return res.status(422).json({
        reason:"token not given",
        message:"no refresh token provided"
    });
    }
    
    try{
        let payload = jwt.verify(token,refreshTokenSecret);
        req.refreshToken = token;
        req.payload = payload;
        next();
    }
    catch(error){
        let {message} =error;
        res.header('X-Refresh-Token','Token verification fail');
        return res.status(401).json({reason:message,message:'invalid refresh token'});
    }
};