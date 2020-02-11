const service = require('./../../lib/ioc/iocContainer')();
const myService = require('./../../config/app-service-provider');
module.exports = function register(app) {
    app.service = service;
   //ioc.bind('service',()=>new service());
   //ioc.singleton('service',()=>new service());
  
   app.service.bind('UserModel',()=>new myService.UserModel());
};

