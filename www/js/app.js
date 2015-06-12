angular.module('myApp', ['ui.router','app.controllers','app.service'])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
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
        },
        resolve: {
          loggedin: checkLoggedin
        }
      })
      
      .state('app.view', {
        url: "/view/:id",
        views: {
            "head": {templateUrl: "www/templates/header.html", controller: "HomeCtrl"},
            "body": {templateUrl: "www/templates/view.html", controller: 'ViewCtrl'}
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

