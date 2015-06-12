angular.module('app.controllers',['ngMap'])

.controller('HomeCtrl', function($scope, $http){

	$http.get('/rest/article').
	  success(function(data, status, headers, config) {     
	  	$scope.articles = data;
	  }).
	  error(function(data, status, headers, config) {
	 });			
})
	
.controller('AddCtrl', function($scope, $http){

	
})

.controller('ViewCtrl', function($scope, $http, $stateParams){
	
})

.controller('LoginCtrl', function($scope, $http){
	
	  
})


.controller('LogoutCtrl', function($scope, $http){
	  
})

.directive('mapa', function(){	

	  
})

;

