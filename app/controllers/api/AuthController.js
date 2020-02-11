let Controller = require('./ApiController');
let __this ;
module.exports = class AuthController extends Controller{
	constructor(){
		super();
		__this =this;

	}
	async userRegistration(req,res) {
		let {body:receiveData} =req;
		let UserModel = process.app.service.use('UserModel');
		try{
			let user = await UserModel.userRegistration(receiveData);
			return res.status(200).json(receiveData);
		}
		catch(error){
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async userLogin(req,res){
		let{body:receiveData} = req;
		let UserModel = process.app.service.use('UserModel');
		try{
		let dataFromDb = await UserModel.userEmailPasswordCheck(receiveData);
		
		let {
			JWT_ACCESS_TOKEN_SECRET:tokenSecret,
			JWT_REFRESH_TOKEN_SECRET:refreshTokenSecret,
			JWT_ACCESS_TOKEN_EXPIRES:accessTokenExpiries,
			JWT_REFRESH_TOKEN_EXPIRES:refreshTokenExpires,
		} = process.env;
		
		let accessToken = await UserModel.
						generateAccessToken(dataFromDb,tokenSecret,accessTokenExpiries);
		let refreshToken = await UserModel.
						generateAccessToken(dataFromDb,refreshTokenSecret,refreshTokenExpires);
		let tokenSavingData = {
			"access_token":accessToken,
			"refresh_token":refreshToken,
			"user_id":dataFromDb.user_id
		};
		let isTokenSaved= await UserModel.saveToken(tokenSavingData);
		if(!isTokenSaved) return res.status(400).json({error:{message:"login Failed"}});
		
		let responseBody = {
			message:'save the refresh token for regenerate access token after the expriries of access token',
			access_token:accessToken,
			refresh_token:refreshToken,
			access_token_expiary_in:accessTokenExpiries
		};

		res.header('auth-token',accessToken);
		return res.status(200).json(responseBody);
		}
		catch(error){
			console.log(error);
			if(error.error){
				return res.status(422).json(error);
			}
			return res.status(500).json(error);
		}
	}

	async refreshToken(req,res){
		let UserModel = process.app.service.use('UserModel');
		 let token = req.refreshToken;
		 let payload = req.payload;
		 delete req.refreshToken;
		 delete req.payload;
		 try{
			let isRefreshTokenAvaiableOnDb= await UserModel.
											refreshTokenCheckAndValidate(token,payload);
			// console.log(isRefreshTokenAvaiableOnDb);
			if(!isRefreshTokenAvaiableOnDb) return res.status(422).json({error:{
				message:'refresh token is not valid'
			}});
		    let {
				JWT_ACCESS_TOKEN_SECRET:tokenSecret,
				JWT_REFRESH_TOKEN_SECRET:refreshTokenSecret,
				JWT_ACCESS_TOKEN_EXPIRES:accessTokenExpiries 
				} = process.env;

			let accessToken = await UserModel.
							generateAccessToken(payload,tokenSecret,accessTokenExpiries);
			let updateToken = await UserModel.
							updateToken({refresh_token:token},{access_token:accessToken});
			
			let responseBody = {
				message:'save the refresh token for regenerate access token after the expriries of access token',
				access_token:accessToken,
				refresh_token:token,
				access_token_expiary_in:accessTokenExpiries
			};
			res.header('auth-token',accessToken);
			return res.status(200).json(responseBody);
		}
		catch(error){
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async logout(req,res){
		try{
			let UserModel= process.app.service.use('UserModel');
			let logout = await UserModel.deleteToken(req.user);
			if(logout){
				return res.status(200).json({message:"log out success"});
			}
			return res.status(403).json({error:{
				message:'Log out unsuccessfull'
			}});
		}
		catch(error){
			 console.log(error);
			 return res.status(500).json(error);
		}
	}
};
