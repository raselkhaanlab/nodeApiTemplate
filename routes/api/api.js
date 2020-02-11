const express = require('express');
const router = express.Router();
const {loadcontroller} = require('./../../util/loader'); 
const validate = require('./../../app/validation/validate');
const validation = require("./../../app//validation/validation_rules/validation");

/*
=========middleware ===========
*/
const authMiddleware = require('./../../app/middlewares/api-auth-middleware');
const refreshTokenMiddleware = require('./../../app/middlewares/refresh-token-middleware');
/*
	laodcontroller return a function. which have 3 parameter.
	(controllername=required,controllertype=required,path=optional?if not given take it form laod config);
*/
router.get('/',authMiddleware,loadcontroller('UserController','api').getAllUsers);
router.post('/register',validation.userValidation.userRegistrationValidation(),validate,loadcontroller('AuthController','api').userRegistration);

router.post('/login',validation.userValidation.userLoginValidation(),validate,loadcontroller('AuthController','api').userLogin);
router.post('/logout',authMiddleware,loadcontroller('AuthController','api').logout);

router.post('/refresh-token',refreshTokenMiddleware,loadcontroller('AuthController','api').refreshToken);

module.exports = router;