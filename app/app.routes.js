(function(){
	'use strict'
	angular
		.module('mainApp')
		.config(function($routeProvider){
			$routeProvider
				.when('/venues',{
					templateUrl: '/venue/venue.html',
					controller: 'venueController',
					controllerAs: 'venue'
				})
				.when('/events',{
					templateUrl: '/event/event.html',
					controller: 'eventController',
					controllerAs: 'event'
				})
				.when('/users',{
					templateUrl: '/user/user.html',
					controller: 'userController',
					controllerAs: 'user'
				})
				.when('/requests',{
					templateUrl: '/request/request.html',
					controller: 'requestController',
					controllerAs: 'request'
				})
				.when('/',{
					templateUrl: '/profile/profile.html',
					controller: 'profileController',
					controllerAs: 'profile'
				})
				.when('/reports',{
					templateUrl: '/report/report.html',
					controller: 'reportController',
					controllerAs: 'report'
				});
		});
})();