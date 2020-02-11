const {mysql,knex} =require('./../providers/database-connection-provider');
const app = require('./../../app');
module.exports = class CoreModel {
	   constructor (){
		this.app = app;
	   	this.db = {
	   		mysql:mysql(),
	   		knex:knex()
	   	};
	   	this.data = {};
	   	this.table = {
			name:null,
			primaryKey:null,
			columns:[],
			foreignKey:null
		};
	   }
};
