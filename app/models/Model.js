const CoreModel = require('./../core/CoreModel');
module.exports = class Model extends CoreModel {
	constructor (){
		super();
		this.fillable = [];
	}

	getFillableProcessingData(data){
		if(typeof data !=='object')
			throw new Error('you should pass an object for get fillable process data');
			
			let keys = Object.keys(data);
			let dataAfterProcess = {};
			keys.map(value=>{
				 if(this.fillable.includes(value)){
					 dataAfterProcess[value]=data[value];
				 }
			});
			return dataAfterProcess;
	}
};
