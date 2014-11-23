describe('Blog Controller ', function(){

	beforeEach(module('MyApp'));

	var scope, ctrl;
	beforeEach(inject(function($controller, $rootScope, $routeParams){
		scope = $rootScope.new;
		$routeParams.id = 'SomePost';

		ctrl = $controller('BlogController', {
			$scope: scope
		});
	}));

	it('should pass', function(){
		expect(true).toBe(true);
	});

	it('should fail', function(){
		expect(true).toBe(true);
	}); 
});