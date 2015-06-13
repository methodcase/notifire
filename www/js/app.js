angular.module('myApp', ['ui.router','app.controllers','app.service'])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated        
        if (user !== '0')
          /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();

        // Not Authenticated
        else {        	
          
          $rootScope.message = 'You need to log in.';
          // $timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          window.location.href="/#/app/login"
        }
      });
      
      return deferred.promise;
    };
    //================================================
    
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success          
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            // $location.url('/login');
        	window.location.href="/#/app/login"
          return $q.reject(response);
        }
      };
    });
    //================================================

  // useStatesConfig($stateProvider);

  	$stateProvider

      .state('app',{
        url:"/app",
        bastract: true,
        templateUrl: "www/templates/parent.html",
      })

      .state('app.home', {
        url: "/home",        
        views: {
          "head": {templateUrl: "www/templates/header.html", controller: "HomeCtrl"},
          "body": {templateUrl:"www/templates/home.html", controller: "HomeCtrl"}
        }            
      })      

      .state('app.articles', {
        url: "/articles",        
        views: {
            "head": {templateUrl: "www/templates/header.html", controller: "HomeCtrl"},
            "body": {templateUrl: "www/templates/articles.html", controller: 'AddCtrl'}
        },
        resolve: {
          loggedin: checkLoggedin
        }
      })

      .state('app.add', {
        url: "/add",        
        views: {
            "head": {templateUrl: "www/templates/header.html", controller: "HomeCtrl"},
            "body": {templateUrl: "www/templates/add.html", controller: 'AddCtrl'}
        }
      })
      
      .state('app.view', {
        url: "/view/:id",
        views: {
            "head": {templateUrl: "www/templates/header.html", controller: "HomeCtrl"},
            "body": {templateUrl: "www/templates/view.html", controller: 'ViewCtrl'}
        }
      })

      .state('app.comment', {
        url: "/comment/:id",
        views: {
            "head": {templateUrl: "www/templates/header.html", controller: "HomeCtrl"},
            "body": {templateUrl: "www/templates/comment.html", controller: 'CommentCtrl'}
        }
      })

      .state('app.login', {
        url: "/login",
        views: {
            "head": {templateUrl: "www/templates/header.html", controller: "HomeCtrl"},
            "body": {templateUrl: "www/templates/login.html", controller: "LoginCtrl"}
        }
      })

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

})

.run(function() {
  
});

