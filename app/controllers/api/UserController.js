let Controller = require('./ApiController');
let _this ;
module.exports = class AuthController extends Controller{
	constructor(){
		super();
		_this =this;
    }
    async getAllUsers(req,res){
		let UserModel =process.app.service.use('UserModel');
		try{
			let users = await UserModel.getAllUser();
			return res.status(200)
			.json(_this.filterResponseField(users,["first_name","email"]));
		}
		catch(error){
			console.log(error);
			return res.status(500).json(error);
		}
	}
};