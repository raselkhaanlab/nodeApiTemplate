const service = require('./../../lib/ioc/iocContainer')();
const myService = require('./../../config/app-service-provider');
module.exports = function register(app) {
    app.service = service;
   //app.service.bind('serviceName',()=>new service());
   //app.service.singleton('serviceName',()=>new service());
  
   app.service.bind('UserModel',()=>new myService.UserModel());
};

