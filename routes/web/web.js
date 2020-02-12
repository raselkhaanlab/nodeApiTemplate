const express = require('express');
const router = express.Router();
const loadcontroller = require('./../../lib/loader/loadController'); 
const validate = require('./../../app/validation/validate');
const validation = require("./../../app//validation/validation_rules/validation");
/*
	laodcontroller return a function. which have 3 parameter.
	(controllername=required,controllertype=required,path=optional?if not given take it form laod config);
*/

router.get('/',loadcontroller('Welcome','web').showWelcome);

module.exports = router;