angular.module("MyApp", ['ngRoute'])
		.config(function($routeProvider, $locationProvider) {
		  $routeProvider
		   .when('/About', {
		    controller: 'AboutController'
		  })
		  .when('/Blog', {
		    controller: 'BlogController'
		  });

		  // configure html5 to get links working on jsfiddle
		  //$locationProvider.html5Mode(true);
		})

		.controller("MainController", function($scope, $route, $routeParams, $location) {
		     $scope.$route = $route;
		     $scope.$location = $location;
		     $scope.$routeParams = $routeParams;
		 })

		.controller("AboutController", function($scope) {

		});
