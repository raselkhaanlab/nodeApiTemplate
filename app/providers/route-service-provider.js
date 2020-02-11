
function routeMapper(app){

	// ======== this is customiseable mapping ==== you can crate more route file and load here and just use as follow; 
	

	//==========route path config  for different route ========
	let path = require('path');
	let routeRootDir = path.join(global.__rootdir,'routes');
	let webRouteDir = path.join(routeRootDir,'web');
	let apiRouteDir = path.join(routeRootDir,'api');
	const webRoute = require(path.join(webRouteDir,'web'));
	const apiRoute = require(path.join(apiRouteDir,'api'));
	const noMatchRoute = require(path.join(routeRootDir,'no-match'));
	const errorHandle = require(path.join(routeRootDir,'error-handle'));

	//======== load the mapping route ==========================
	app.use(webRoute);
	app.use('/api',apiRoute);
	app.use(noMatchRoute);
	app.use(errorHandle);
}


module.exports = function routeInitialize(app){
	if(!app){
		throw new Error('you must pass app parameter for mapping the of route');
	}
	else if(! Object.keys(app).includes('locals') || ! Object.keys(app).includes('init') ){
			throw new Error('must be pass an express app object');	
	}
	else{
		routeMapper(app);
	}
};


