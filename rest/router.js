module.exports = function(app, passport){  
	var LocalStrategy = require('passport-local').Strategy
	var FacebookStrategy = require('passport-facebook').Strategy
	var graph = require('fbgraph');

	// faceboook credentials
	var conf = {
		'client_id' : '131613223561516',
		'redirect_uri' : 'http://127.0.0.1:3100/fb',
		'client_secret' : 'b6f1dc0f079c5b085396ee10ff6eb322',
		'atoken': '',
		'scope':'email, user_about_me, user_birthday, user_location, manage_pages, user_groups'
	}

	passport.use(new FacebookStrategy({
		clientID: conf.client_id,
		clientSecret: conf.client_secret,
		callbackURL: conf.redirect_uri
		},
		function(accessToken, refreshToken, profile, done) {
			// asynchronous verification, for effect...
			conf.atoken = accessToken;
			graph.setAccessToken(accessToken);
			console.log(accessToken)
			// extending static access token
		   graph.extendAccessToken({
		   	   "access_token": accessToken,
		       "client_id":      conf.client_id
		     , "client_secret":  conf.client_secret
		   }, function (err, facebookRes) {
		   });
			process.nextTick(function () {
				// To keep the example simple, the user's Facebook profile is returned to
				// represent the logged-in user. In a typical application, you would want
				// to associate the Facebook account with a user record in your database,
				// and return that user instead.
				return done(null, profile);
			});
		}
	));

	// Serialized and deserialized methods when got from session
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, user);	
	});

	// Define a middleware function to be used for every secured routes
	var ensureAuth = function(req, res, next){
	  if (!req.isAuthenticated())
	  	res.sendStatus(401);
	  else
	  	next();
	};

	app.get('/', function(req, res){
	  res.render('index.html')
	});

	app.get("/rest/article", function(req, res){
	  var article = require('./article.api.js')				
	  article.show(res);		
	});

	
};