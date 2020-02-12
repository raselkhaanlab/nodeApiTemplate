let pathConfig = require('./../../config/loader-config');
let{
	nameparamValidation,
	pathParamValidation,
	loadmodule,
	createInstance
}= require('./loaderHelper');
module.exports=function loadmodel(name,type="default",path=""){
	let pathKeys = Object.keys(pathConfig['model_path']);
		if(!pathKeys.includes(type)){
			path = type;
		}
	let validateName =nameparamValidation(name);
	let validPath = pathParamValidation(validateName,pathConfig['model_path'][type],path);
	try{
		let moduleGet = loadmodule (validPath);
		let resolveObject = createInstance(moduleGet);
		return resolveObject;
	}
	catch(error){
		throw error;
	}
}
