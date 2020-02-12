const express = require('express');
const router = express.Router();
const loadcontroller = require('./../../lib/loader/loadController'); 
const validate = require('./../../app/validation/validate');
const validation = require("./../../app//validation/validation_rules/validation");
/*
	laodcontroller return a function. which have 3 parameter.
	(controllername=required,controllertype=required,path=optional?if not given take it form laod config);
*/
let welcomeController = loadcontroller('Welcome','web');
router.get('/',welcomeController.showWelcome);

module.exports = router;