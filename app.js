var express  =  require('express');
var app = express();	
var bodyParser  =require('body-parser');
var router = require('./rest/router.js');
var passport = require('passport')
var session = require('express-session')
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")


// Middlewares ====================================================
app.use(express.static(__dirname));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(cookieParser());
app.use(session({ secret: 'anysecure' }));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views

router(app, passport); // call the router module where the routes are set.

app.listen(3100); // express server
console.log("Server running at http://localhost:3100/");	
