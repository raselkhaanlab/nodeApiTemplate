let Controller = require('./WebController');
let __this ;
module.exports = class Welcome extends Controller  {
	constructor(){
		super();
		__this =this;

	}
	async showWelcome(req,res){
		const welcomeMessage = {
								welcome_title:`welcome to our ${process.env.APP_NAME}`,
								instruction_message:""								
								};
		res.status(200).json(welcomeMessage);
		
	}
};