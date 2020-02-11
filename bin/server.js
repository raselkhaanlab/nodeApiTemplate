const app = require('./../app')
const http = require('http');
const appConfig = require('./../config/app-config');
const routeServiceProvider = require('./../app/providers/route-service-provider');
let server = http.createServer(app);
routeServiceProvider(app);
let port = parseInt(appConfig[process.env.NODE_ENV]['port']);
server.listen (port,()=>{
	console.log('application  run on port: '+ port);
});