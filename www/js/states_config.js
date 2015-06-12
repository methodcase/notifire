function useStatesConfig($stateProvider, checkLoggedin) {

	$stateProvider

    .state('app',{
      url:"/app",
      bastract: true,
      templateUrl: "www/templates/parent.html",
    })

    .state('app.home', {
      url: "/home",
      resolve: {
        loggedin: checkLoggedin
      },
      views: {
        "head": {templateUrl: "www/templates/header.html", controller: "HomeCtrl"},
        "body": {templateUrl:"www/templates/home.html", controller: "HomeCtrl"}
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

    .state('app.logout', {
      url: "/app/logout",
      templateUrl: "/logout",
      controller: "LogoutCtrl"
    })


}





