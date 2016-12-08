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
				.when('/profile',{
					templateUrl: '/profile/profile.html',
					controller: 'profileController',
					controllerAs: 'profile'
				});
		});
})();