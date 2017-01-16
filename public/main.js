var app = angular.module('bedtime',['ngRoute','ngResource']);

app.config(function($routeProvider){

	$routeProvider.when('/getallstory', {
		templateUrl: './views/bedtime/storylist.html',
		controller: 'AllStoryController'
	});



	$routeProvider.otherwise({redirectTo:'/'});

});
