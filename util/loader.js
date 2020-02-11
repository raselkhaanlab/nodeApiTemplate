let pathmodule = require('path');
let pathConfig = require('./../config/loader-config.js');
function loadmodel(name,path){
	let validateName =nameparamValidation(name);
	let validPath = pathParamValidation(path,validateName,pathConfig['model_path']);
	try{
		let moduleGet = loadmodule (validPath);
		let resolveObject = createInstance(moduleGet);
		return resolveObject;
	}
	catch(error){
		throw error;
	}
}
function loadcontroller (name,controllerType,path){
	 if(typeof controllerType ==='undefined'){
	 	throw new Error('you must specify the type of controller base on loader-config you want to resolve');
	 }
	 else{
		let validateName =nameparamValidation(name);
		let validPath = pathParamValidation(path,validateName,pathConfig['controller_path'][controllerType]);
		try{
			let moduleGet = loadmodule (validPath);
			let resolveObject = createInstance(moduleGet);
			return resolveObject;
		}
		catch(error){
			throw error;
		}
	 }
}

//module private function
function nameparamValidation (name){
	if(typeof name !== 'undefined'){
		return name;
	}
	throw new Error('you must specify name for load');
}

function pathParamValidation(path,validateName,pathFromConfig){
	if(typeof path !== 'undefined' && typeof validateName !=='undefined' )
	{
		let basedir = pathmodule.basename(path,'.js');
		if(basedir === validateName ){
			path = path.replace(validateName,'');
			path = pathmodule.join(global.__rootdir,path,validateName);
		}
		else{
			path = pathmodule.join(global.__rootdir,path,validateName);
		}
	}
	
	else if(typeof path === 'undefined' && typeof validateName !==' undefined' && typeof pathFromConfig !=='undefined')
	{
		let basedir = pathmodule.basename(pathFromConfig,'.js');
		if(basedir === validateName ){
			path = pathFromConfig.replace(validateName,'');
			path = pathmodule.join(global.__rootdir,path,validateName);
		}
		else{
			path = pathmodule.join(global.__rootdir,pathFromConfig,validateName);
		}
	}
	else {
		throw new Error('path resolve failed for module load');
	}
	return path;
}

function loadmodule(modulepath){
	if(typeof modulepath !== 'undefined'){
		 let resolveModule=  require(modulepath);
		 return resolveModule;
	}
	throw new Error('module path is invalid');
}

function createInstance(constructorParam){
if(typeof constructorParam !=='undefined' && constructorParam.prototype.constructor === constructorParam )
 {
 	let resolveInstance = new constructorParam();
 	return resolveInstance;
 }
 else {
 	throw new Error('invalid constructor');
 }
}

module.exports ={loadmodel,loadcontroller};