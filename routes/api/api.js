const express = require('express');
const router = express.Router();
const loadcontroller = require('./../../lib/loader/loadController'); 
const validate = require('./../../app/validation/validate');
const {
	 userValidation,
	} = require("./../../app//validation/validation_rules/validation");

/*
=========middleware ===========
*/
const authMiddleware = require('./../../app/middlewares/api-auth-middleware');
const refreshTokenMiddleware = require('./../../app/middlewares/refresh-token-middleware');
/*
	laodcontroller return a function. which have 3 parameter.
	(controllername=required,controllertype=required,path=optional?if not given take it form laod config);
*/
let userController = loadcontroller('UserController');
router.get('/',authMiddleware,userController.getAllUsers);

let authController = loadcontroller('AuthController');
router.post('/register',userValidation.userRegistrationValidation(),validate,authController.userRegistration);
router.post('/login',userValidation.userLoginValidation(),validate,authController.userLogin);
router.post('/logout',authMiddleware,authController.logout);
router.post('/refresh-token',refreshTokenMiddleware,authController.refreshToken);
module.exports = router;