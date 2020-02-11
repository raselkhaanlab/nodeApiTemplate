let {loadmodel} = require('./../../util/loader');
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
};
