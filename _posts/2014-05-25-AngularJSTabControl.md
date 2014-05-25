---
title: Angular JS Tab Control - An Experiment with Directives
tags: angularjs javascript tab-control directives
---

I've been working with [AngularJS](https://angularjs.org/) for some time now at work, and I'm finding I really like it. Of course, one of the things I did wrong when I first started working with it, was to think "jQuery". After some self study, and reading many blog posts and articles, I finally understood what I was doing wrong. Angular is not a jQuery clone. It is not a typical browser abstraction library that jQuery is. It's a powerful front end framework for building dymanic, and declarative web applications.

After coming to this realization, and having the requirement at work to turn a basic web application page into a printable report, I decided to learn more about directives. So here is my first attempt at creating a reusable angularJS directive, a basic tab control.

## The HTML

First, I had to decide what the HTML should look like, and I settled on something similar to:

	<tab-control id="MyFirstTabControl">
		<tab id="Tab1Content" name="Tab 1" route="/tab1" default>
			Tab 1 content goes here
		</tab>
		<tab id="Tab2Content" name="Tab 2" route="/tab2">
			Tab 2 content goes here
		</tab>
		<tab id="Tab3Content" name="Tab 3" route="/tab3">
			Tab 3 content goes here
		</tab>
	</tab-control>

The primary pieces of this, includes the main directive, the "tab-control". This is basically a container element that's used to scope the tabs together.

Then, the bread and butter of the control, the "tab" directive contains the content, and the meta-data about each tab, including a route attribute that will modify the browser history on navigation, and allow the user to link to a specific tab on the page.

## The Javascript

Next, we need to define the tab-control directive within my Angular application:

	var mainModule = angular.module("mainModule", []);

    mainModule.directive('tabControl', function($location, $rootScope) {
        return {
            restrict: 'E',
            template: '<ul id="{id}" ng-repeat="tab in tabs"><li><a href="#{{tab.route}}">{{tab.name}}</a></li></ul><section ng-transclude></section>',
            scope: {
                id: '@id'
            },
            transclude: true,
            controller: ['$scope', function($scope) {
                $scope.tabs = []

                this.addTab = function(tab){
                    
                    if(tab.IsDefault) {
                    	$location.path(tab.route);
                    	tab.selected = true;
                    }

                    $scope.tabs.push(tab);
                }

                $scope.selectTab = function(tab){
                	$location.path(tab.route);
                	$rootscope.$broadcast("TabChanged", tab);

                    for(var i=0; i<$scope.tabs.length; i++){
                    	$scope.tabs[i].selected = ( tab.name == $scope.tabs[i].name );
                    }
                }

                $rootScope.$on('$locationChangeSuccess', function () {
                    var hash = $location.path();
                    
                    for (var i = 0; i < $scope.tabs.length; i++) {
                    	$scope.tabs[i].selected = ( hash.indexOf($scope.tabs[i].route) >= 0 );
                    }
                });

                this.selectTab = $scope.selectTab;
            }]
        };
    });

The tab control directive is responsible for managing the list of tabs, as well as navigating between them. For this, we need access to the $location object, which allows us to control the browser history and the url. Because the tab control does not live inside a bubble, we also need to listen to the rootScope's locationChange event and select the appropriate tab. This allows other items on the page to navigate tabs, as well as the user to update the url in the browser window.

We're not done yet though, we still need another directive to define a "tab".

	mainModule.directive('tab', function () {
        return {
            restrict: 'E',
            template: '<article id={{id}} name="{{name}}" ng-if="selected" ng-transclude><header>{{name}}</header><section ng-transclude></section></article>',
            transclude: true,
            replace: false,
            scope: {
                id: '@',
                name: '@',
                route: '@',
                default: '@',
                selected: false
            },
            require: '^tabControl',
            link: function (scope, element, attrs, ctrl) {
                ctrl.addTab(scope);
            }
        };
    });

This directive is pretty straightforward, we define the template for the html, and populate the scope attributes from the meta data of the original tab element. _Note: In this example, we are using ng-if to hide the hidden tabs. This has the advantage of completely removing the tab content from the HTML when it's not visible. This may not be ideal depending on your requirements, just change it to ng-show_

The thing I like the most about this, is there's no dependency on the html. We can define tabs anywhere in our application, in a very declarative way. We also are doing 0 dom manipulations, making testing our directive straightforward, and simple.