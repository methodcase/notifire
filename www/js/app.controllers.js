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

	$http.get('/rest/profile').
	  success(function(data, status, headers, config) {     
	  	$scope.profile = data;	  	
	  	$scope.pic = "http://graph.facebook.com/"+data.id+"/picture?type=small";
	  }).
	  error(function(data, status, headers, config) {
	});
    
    // Google Maps =======================================================================================
    var map;
    var markers = [];

    initialize();
    $scope.types = "['establishment']";

    $scope.placeChanged = function() {
      $scope.place = this.getPlace();
      setLocation($scope.place);
      console.log($scope.place.formatted_address)
      console.log($scope.place.geometry.location.A)
      console.log($scope.place.geometry.location.F)
    };

    function initialize() {
      console.info('initialize');
      var myLatlng = new google.maps.LatLng(10.302347504193767, 123.88662099838257);
      var map = new google.maps.Map(document.getElementById('map-canvas'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: myLatlng,
          zoom: 15
        });
    }	  

    function setLocation(details) {
      console.info(details);
      var A = details.geometry.location.A;
      var F = details.geometry.location.F;
      var myLatlng = new google.maps.LatLng(A, F);
      var map = new google.maps.Map(document.getElementById('map-canvas'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: myLatlng,
          zoom: 15
      });

      // This event listener will call addMarker() when the map is clicked.
      google.maps.event.addListener(map, 'click', function(event) {
          deleteMarkers();
          addMarker(event.latLng, map, details.formatted_address);
        });      
      }

      // Add a marker to the map and push to the array.
      function addMarker(location, map, formatted_address) {
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          title: formatted_address
        });
        console.info('location:', location)
        markers.push(marker);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }  

      function clearMarkers() {
        setAllMap(null);
      }

      // Sets the map on all markers in the array.
      function setAllMap(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }
    
})

.controller('ViewCtrl', function($scope, $http, $stateParams){
	$scope.uni = $stateParams.id;
	
	$http.get('/rest/view/article/'+$scope.uni).
	  success(function(data, status, headers, config) {     
	  	$scope.article = data;
	  	setLocation(data);
	  }).
	  error(function(data, status, headers, config) {
	  });	

	
})

.controller('LoginCtrl', function($scope, $http){
	
	  
})


.controller('LogoutCtrl', function($scope, $http){
		  
})

.directive('mapa', function(){	

	  
})

;

