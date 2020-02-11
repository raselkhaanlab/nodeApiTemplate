module.exports = function noMatch(req,res,next){
	try{
		return res.status(404).json({error:{
			message:`${req.url} on method ${req.method} not found`
		}});
	}
	catch(error){
		 next(error);
	}
};
