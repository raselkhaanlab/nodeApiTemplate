let loadmodel = require('./../../lib/loader/loadModel');
let {mysql,knex} =require('./../providers/database-connection-provider');
let validator = require('express-validator');
let app = require('./../../app');
module.exports = class CoreController {
	constructor(){
		this.app = app;
		this.data = {};
		this.loadmodel = loadmodel;
		this.db ={
			mysql:mysql(),
			knex:knex()
		};
	}
	filterResponseField(dataObject,[...field]){
		if(typeof dataObject !=='object'){
			throw new Error("dataObject pass to filterResponseField method is not a object");
		}
		else if(Array.isArray(dataObject)){
			let dataAfterProcess =[];
			dataObject.forEach((value,index)=>{
				let tempObj = {};
				let keys = Object.keys(value);
				keys.map(mapvalue=>{
					if(field.includes(mapvalue)){
						tempObj[mapvalue]=value[mapvalue];
					}
			   });
			   dataAfterProcess.push(tempObj);
		});
		return dataAfterProcess;
		}
		else{
			let keys = Object.keys(data);
			let dataAfterProcess = {};
			keys.map(value=>{
				 if(field.includes(value)){
					 dataAfterProcess[value]=data[value];
				 }
			});
			return dataAfterProcess;
		}
	}
};
