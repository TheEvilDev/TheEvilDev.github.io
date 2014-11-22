angular.module("MyApp")
		.directive('box', ['$location', '$rootScope', function($location, $rootScope) {
			return {
	            restrict: 'E',
	            templateUrl: 'boxtemplate',
	            transclude: true,
	            replace: true,
	            scope: {
	                id: '@',
	                header: '@',
	                route: '@'
	            },
	            link: function (scope, element, attrs, ctrl) {
	            	scope.expanded = false;

	            	scope.expand = function(){
	            		scope.expanded = true;
	            		$location.path(scope.route);
	            	};

	            	scope.collapse = function(){
	            		scope.expanded = false;
	            		$location.path("/");
	            	};

	            	$rootScope.$on('$locationChangeSuccess', function () {
	                    var hash = $location.path();

	                    scope.expanded = (hash.indexOf(scope.route) >= 0);
	                });
	            }
	        };
	    }]);