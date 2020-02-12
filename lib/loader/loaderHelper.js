let pathmodule = require('path');
module.exports.nameparamValidation = function nameparamValidation (name){
	if(name){
		return name;
	}
	throw new Error('you must specify name for load');
}

module.exports.pathParamValidation = function pathParamValidation(validateName,pathFromConfig,path){
	if(path && validateName)
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
	
	else if(!path && validateName &&  pathFromConfig)
	{	
		let validateNameDirname= pathmodule.dirname(validateName);
		// console.log(validateNameDirname);
		let validateNameBasename = pathmodule.basename(validateName,'.js');
		if(validateNameDirname !=="."){
			 path = pathmodule.join(global.__rootdir,validateNameDirname,validateNameBasename);
			 return path;
		}
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

module.exports.loadmodule = function loadmodule(modulepath){
	if(modulepath){
		 try{
			let resolveModule=  require(modulepath);
			return resolveModule;
		 }
		 catch(error){
			 throw error;
		 }
	}
	throw new Error('module path is invalid');
}

module.exports.createInstance = function createInstance(constructorParam){
if(constructorParam && constructorParam.prototype.constructor === constructorParam )
 {
 	try{
		let resolveInstance = new constructorParam();
		return resolveInstance;
	 }
	 catch(error){
		 throw error;
	 }
 }
 else {
 	throw new Error('invalid constructor');
 }
}
