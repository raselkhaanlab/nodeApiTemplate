const {check,body,header,query,param} = require('express-validator');
module.exports.userRegistrationValidation=()=>{
    let UserModel = process.app.service.use('UserModel');
  
     return [
      check('first_name').notEmpty().withMessage('first name field is required'),
      check('last_name').notEmpty().withMessage('last name field is required'),
      check('email').notEmpty().withMessage('email field is required').isEmail().withMessage('email must be a valid email address').custom(value=>{
       return UserModel.findUserByEmail(value).then(user=>{
         if(user){
          //  console.log(user);
           return Promise.reject("mail allready exists,use a different email");
         }
         return true;
       });
      }),
      check('number').notEmpty().withMessage('number is required'),
      check('password').notEmpty().withMessage("password is required").isLength({min:6,max:20})
      .withMessage("you must give a password within 6-20 charecter"),
      check('confirm_password').custom((value,{req,res,location,path})=>{
         if(value !== req.body.password){
         throw new Error("confirm password does not match");
         }
         return true;
      }),
     ];
  };
  
  module.exports.userLoginValidation = ()=>{
    return [
      check('email').notEmpty().withMessage('email is required').isEmail().withMessage('must be a valid email'),
      check('password').notEmpty().withMessage('password is required')
    ];
  }