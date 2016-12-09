(function(){
	'use strict'
    
    var routeProvider = null;

    // thank you cliff.meyers
	angular
		.module('mainApp')
		.config(function($routeProvider) {
            routeProvider = $routeProvider;
		})
        .run(function($http) {
            $http
                .get('/loggedIn')
                .then(function(response) {
                    $http
                        .get('/users/'+response.data)
                        .then(function(response) {
                            console.log(response.data);
                            if (response.data.accounttype === 'admin') {
                                routeProvider
                                    .when('/',{
                                        templateUrl: '/profile/profile.html',
                                        controller: 'profileController',
                                        controllerAs: 'profile'
                                    })
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
                                    .when('/reports',{
                                        templateUrl: '/report/report.html',
                                        controller: 'reportController',
                                        controllerAs: 'report'
                                    })
                                    .otherwise({
                                        redirectTo: '/'    
                                    });
                            } else {
                                routeProvider
                                    .when('/',{
                                        templateUrl: '/profile/profile.html',
                                        controller: 'profileController',
                                        controllerAs: 'profile'
                                    })
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
                                    .otherwise({
                                        redirectTo: '/'    
                                    });
                            }
                        });
                });
        });
})();