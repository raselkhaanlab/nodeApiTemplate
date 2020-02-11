// Update with your config settings.
let dotEnv = require("dotenv");
dotEnv.config();
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host:process.env.DEV_MYSQL_HOST||'localhost', 
			user:process.env.DEV_MYSQL_USER||"root", 
			database:process.env.DEV_MYSQL_DATABASE||'dev_demo_db',
			password:process.env.DEV_MYSQL_PASSWORD||'',
    },
    migrations:{
      directory:__dirname +"/database/migrations",
      tableName: 'migrations'
    },
    seeds:{
      directory:__dirname + "/database/seeds",
    }
  },

  test: {
    client: 'mysql2',
    connection: {
      host:process.env.TEST_MYSQL_HOST||'localhost', 
			user:process.env.TEST_MYSQL_USER||"root", 
			database:process.env.TEST_MYSQL_DATABASE||'test_demo_db',
			password:process.env.TEST_MYSQL_PASSWORD||'',
    },
    migrations:{
      directory:__dirname +"/database/migrations",
      tableName: 'migrations'
    },
    seeds:{
      directory:__dirname + "/database/seeds",
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host:process.env.MYSQL_HOST||'localhost', 
			user:process.env.MYSQL_USER||"root", 
			database:process.env.MYSQL_DATABASE||'demo_db',
			password:process.env.MYSQL_PASSWORD||'',
    },
    migrations:{
      directory:__dirname +"/database/migrations",
      tableName: 'migrations'
    },
    seeds:{
      directory:__dirname + "/database/seeds",
    }
  }

};
