const databaseConfig = require('./../../config/database-config');
const getAppEnv = process.env.NODE_ENV?process.env.NODE_ENV:'development';
const env = databaseConfig[getAppEnv];
const mysql = function (){
	const config = env['mysql'];
	const mysql2 = require('mysql2');
	const connection = mysql2.createPool({
			host:config['host'], 
			user: config['user'], 
			database: config['database'],
			password:config['password'],
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0,
			multipleStatements:true
		});
		return connection.promise();
}
const knex = function(){
	const config = env['mysql'];
	const knexmodule = require('knex');
	 const knexConnection = knexmodule(
	 {
		client: 'mysql2',

		connection: {
			host:config['host'], 
			user: config['user'], 
			database: config['database'],
			password:config['password'],
			multipleStatements: true
  			}
		}
	);
	return knexConnection;
}
module.exports = {mysql,knex};