(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('reportController', reportController);

	function reportController($http){
		var vm = this;

			var today = new Date();
			vm.eventDetails = [];
			vm.upcomingEvents = [];

			$http.get('/eventsDetails')
				.then(function(response){
					if (response.data){
						vm.eventDetails = response.data;
					}
				}
			)

			$http.get('/eventsDetails')
				.then(function(response){
					if (response.data){
						vm.upcomingEvents = vm.upcomingEvents.filter(eventDate=>{
							return new Date(eventDate.reservationdate).getTime() > today.getTime(); 
						});
					}
				}
			)
	}
})();