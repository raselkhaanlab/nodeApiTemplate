const {check,body,header,query,param} = require('express-validator');

//example validation
exampleValidationRules =()=>{
  return [
    check('name').notEmpty().withMessage("can not be empty")
  ];
};
let userValidation = require('./userValidation');

//export all validation rules here;
module.exports = {
   exampleValidationRules,
   userValidation
};




