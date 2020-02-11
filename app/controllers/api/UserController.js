let Controller = require('./ApiController');
let __this ;
module.exports = class AuthController extends Controller{
	constructor(){
		super();
		__this =this;
    }
    async getAllUsers(req,res){
		let UserModel =process.app.service.use('UserModel');
		try{
			let users = await UserModel.getAllUser();
			return res.status(200).json(users);
		}
		catch(error){
			console.log(error);
			return res.status(500).json(error);
		}
	}
};