const Model = require('./Model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports = class User extends Model {
	constructor(){
		super();
		this.fillable =['first_name','last_name','email','password','number'];
	}

	async userRegistration(user){
		try{
			let userData = this.getFillableProcessingData(user);
			let userDataAfterHashing = await this.generateHash(userData,'password');
			let returnUser = this.db.knex('users').insert(userDataAfterHashing);
			return returnUser;
		}
		catch(error){
			return Promise.reject( error);
		}
	}

	async userEmailPasswordCheck (user){
		let errors = {};

		try{
			let {email,password} = user;
			let retriveUser = await this.findUserByEmail(email);
			if(!retriveUser){
					errors.error = "Email or password incorrect";
					return Promise.reject(errors);
			}
			
			let isMatchPassword = await bcrypt.
								compare(password.toString(),retriveUser.password);

			if(!isMatchPassword){
				errors.error = "Email or password incorrect";
				return Promise.reject(errors);
			}
			else{
				return retriveUser;
			}
		}
		catch(error){
			console.log(error);
			return Promise.resolve(error);
		}
	}
	async generateAccessToken(user,key,expireTime){
		try{  
			let token;
			let {user_id,email,first_name,last_name,number} = user;

			let payload= {user_id,email,first_name,last_name,number};

			if(expireTime){
				token = await jwt.sign(payload,key,{expiresIn:expireTime});
			}
			else{
				token = await jwt.sign(payload,key);
			}
			return token;
		}catch(error){
			return Promise.reject(error);
		}
	}

	async findUserByEmail(value) {
		 try{
			 let user =(await this.db.knex('users').where('email','=',value).first());
			 return user;
		 }
		 catch(error){
			return Promise.reject( error);
		 }
	}
	async getAllUser(){
		 try{
			 let users = await this.db.knex('users');
			return users;
		 }
		 catch(error){
			return Promise.reject( error);
		 }
	}
	
	async generateHash(object,filed){
		let value;
		let isObject =true;
		if(typeof object !=="object"){
			value =object;
			isObject= false;
		}
		else{
			value= object[filed];
		}
		try{
			let saltRound = await bcrypt.genSalt(10);
			let hash = await bcrypt.hash(value,saltRound);
			let genHash= isObject?(object[filed]=hash):hash;
			return isObject?object:genHash;
		}
		catch(error){
			return Promise.reject(error);
		}
	}

	async refreshTokenCheckAndValidate(token,payload){
		try{
			let retriveData =await this.db.knex('user_tokens as token')
							.innerJoin('users as user','token.user_id','user.user_id')
							.where('user.email',payload.email)
							.andWhere('token.refresh_token',token).first();
			return retriveData;
		}
		catch(error){
			console.log(error);
			return Promise.reject(error);
		}
	}
	async tokenCheckFromDb(token){
		try{
			let data =await this.db.knex('user_tokens').where('access_token',token).first();
			return data;
		}
		catch(error) {
			return Promise.reject(error);
		}
	}
	async saveToken(dataTosave){
		try{
		  let saveStatus = await this.db.knex('user_tokens')
		  .insert(dataTosave);

		  if(!saveStatus.length) return false;

		  return true;
		}
		catch(error){
			return Promise.reject(error);
		}
	}
	async updateToken(qeuryData,updatedata){
		 try{
			let udpateStatus = await this.db.knex('user_tokens')
			.where(qeuryData)
			.update(updatedata);

			return true;
		 }
		 catch(error){
			 return Promise.reject(error);
		 }
	}
	async deleteToken(payload){
		console.log(payload);
		try{
			let isDelete = await this.db.knex('user_tokens')
			.where('user_id',payload.user_id).del();
			
			return isDelete;
		}
		catch(error){
			console.log(error);
			return Promise.reject(error);
		}
	}
	};
	 