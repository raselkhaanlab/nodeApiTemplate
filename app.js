const dotEnv = require('dotenv');
dotEnv.config(); 
const express = require('express');
const bodyParser = require('body-parser');
// const ejs =require('ejs');
const path = require('path');
const app  = express ();
// const expressSession =require('express-session');
const cookieParser = require('cookie-parser');
const appConfig = require('./config/app-config');
const appServiceProvider =require('./app/providers/application-service-provider.js');
const cors = require('cors');
// const expressFlash = require('express-flash');
const getMyEnv=process.env.NODE_ENV?process.env.NODE_ENV:'development';
const appConfigEnv = appConfig[getMyEnv];
const sessionConfig = appConfigEnv['session'];
const cookieConfig = appConfigEnv['cookie'];
// const sessionMiddleware = expressSession({
// 	name:sessionConfig['name'],
//     secret: sessionConfig['secret'],
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         originalMaxAge: parseInt(cookieConfig['maxAge']),
//         sameSite:true,
//         httpOnly:true,
//     }
// });
global.__rootdir = __dirname;
//configure app;
app.disable('x-powered-by');
// app.set('view engine','ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
// app.use(sessionMiddleware);
app.use(cookieParser());
// app.use(expressFlash());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//active service provider;
appServiceProvider(app);
process.app = app;
module.exports =app;