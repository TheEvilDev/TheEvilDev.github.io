angular.module("MyApp", ['ngRoute'])
		.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		  $routeProvider
		   .when('/About', {
		    controller: 'AboutController'
		  })
		  .when('/Blog/:id', {
		    controller: 'BlogController'
		  });

		  // configure html5 to get links working on jsfiddle
		  //$locationProvider.html5Mode(true);
		}])
		.controller("MainController", ['$scope','$route','$routeParams', '$location', function($scope, $route, $routeParams, $location) {
		     $scope.$route = $route;
		     $scope.$location = $location;
		     $scope.$routeParams = $routeParams;
		}])
		.controller("AboutController", function($scope) {

		})
		.controller('BlogController', ['$scope', '$routeParams', function($scope, $routeParams){
  
		}]);