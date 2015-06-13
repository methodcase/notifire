module.exports = function(app, passport){  
	var LocalStrategy = require('passport-local').Strategy
	var FacebookStrategy = require('passport-facebook').Strategy
	var graph = require('fbgraph');

	// faceboook credentials
	var conf = {
		'client_id' : '131613223561516',
		'redirect_uri' : 'http://localhost:3100/fb/',
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

	app.post('/rest/add/article', function (req, res){
		var http = require('http');
		var post = req.body;
		var Firebase = require('firebase');
		var myRootRef = new Firebase('https://rentie.firebaseio.com/article');
		myRootRef.push(post);
		
	  	var wallPost = {
	  	  message: "Fire Notice at "+ post.location
	  	};
	  	graph.get("/oauth/access_token?client_id=131613223561516&client_secret=b6f1dc0f079c5b085396ee10ff6eb322&grant_type=client_credentials", function(err, res){
	  		console.log(res)
			// graph.setAccessToken(res.access_token)			
			// graph.get("/131613223561516",  function(err, res) {
			// 	console.log(res)	  		
			// });

	  		graph.post("/me/feed", wallPost, function(err, ress) {				
	  			console.log(ress.data)	  			
	  		});	
	  		
			graph.get("/me/accounts",  function(err, ress) {				
				console.log(ress.data)
				graph.post("/804124363028186/feed?access_token="+ress.data[0].access_token, wallPost,  function(err, res) {
					console.log(res)
					response.redirect('http://localhost:3100/#/home');	  
				}); 
			});	

	  	})

	  	res.redirect('http://localhost:3100/#/home');
	  	
	});
	
	app.get("/rest/view/article/:id", function(req, res){
	  var title = req.params.id
	  var article = require('./article.api.js')
	  article.view(res, title)
	});

	app.get('/facebook', passport.authenticate('facebook',{scope:'email, user_about_me, user_birthday, user_location, manage_pages, user_groups, publish_actions'}));

	app.get('/fb', passport.authenticate('facebook', { successRedirect: '/checkAuth', failureRedirect: '/#/app/login' }));

	// route to test on angualr side is authenticatred in node
	app.get('/loggedin', ensureAuth, function(req, res) {
	  res.send(req.isAuthenticated() ? req.user : '0');
	});

	app.get('/checkAuth', function(req, res){	
	  res.redirect('/#/app/add')
	});	

	// route to log out
	app.post('/logout', function(req, res){
	  req.logOut();
	  res.send(200);
	});

	app.get('/rest/profile', ensureAuth, function(req, response){
	  var data = "";
	  graph
	    .get("/me", function(err, res) {
	      response.send(res)
	  });
	});	


	app.get("/comment/:id", function(req, res) {
		var id = req.param('id');
		console.log(id);
		res.render('comment.html', { id: id });
	});	
};