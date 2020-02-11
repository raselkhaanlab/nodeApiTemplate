let jwt = require('jsonwebtoken');
module.exports = async function(req,res,next){
    let accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    let token=null;

    if(req.header('authorization')){
        let authorization =req.header('authorization').split(" ");
        let bearer = authorization[0];
        if(bearer ==="Bearer"){
            res.header('X-Token-Filed','Authorization');
            token = authorization[1];}
    }
    else if(req.header('auth-token')){
        res.header('X-Token-Filed','Header auth-token');
        token = req.header('auth-token');  
    }
    else if(req.body['auth-token']){
        res.header('X-Token-Filed','Body auth-token');
        token = req.body['auth-token'];
    }
    else{
        res.header('X-Token-Filed','None');
    }

    if(!token)
     {
        res.header('X-Auth-Fail','Token not given');
        return res.status(422).json({
        reason:"token not given",
        message:"access token is not given when request to server"
        });
     }
     
    try{
        let payload = jwt.verify(token,accessTokenSecret);
        let dbCheck = await dataBaseTokenValidity(token);
        if(!dbCheck) return res.status(403).json(
            {
                error:{
                    reason:"token is not valid",
                    message:"this token is invalidate by logging out with this token"
                }
            });
        req.user= payload;
        next();
    }
    catch(error){
        let {message} =error;
        res.header('X-Auth-Fail','Token verification failed');
        return res.status(422).json({reason:message,message:'invalid access token'});
    }
};

 async function dataBaseTokenValidity(token){
    {
        let UserModel = process.app.service.use("UserModel");
        let data =await UserModel.tokenCheckFromDb(token);
        if(!data) return false;
        return true;
   }
}