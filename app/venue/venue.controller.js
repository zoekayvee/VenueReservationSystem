(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('venueController', venueController);

	function venueController($http){
		var vm = this;

	      vm.newVenue = {};
	      vm.venues = [];
				vm.allVenues = [];
				vm.searchCategory = '';
				vm.searchFilter = '';

	      vm.addVenue = addVenue;
				vm.searchVenue = searchVenue;
	      
	      $http.get('/venues').then(
	        function(response){
	          if (response.data){
	            vm.venues = response.data;
							vm.allVenues = vm.venues;
	          }
	        }
	      )
	    
	      function addVenue(){
	        $http.post('/venues', vm.newVenue).then(
	            function(response){
	              var insertedVenue = {
	                "venueid": response.data.id,
	                "venuename": vm.newVenue.venuename,
	                "venuecapacity": vm.newVenue.venuecapacity,
	                "venuedetails": vm.newVenue.venuedetails
	              }
	              vm.allVenues.push(insertedVenue);
	              vm.newVenue = {};
	            },
	            function(response){
	              console.log("Error. Venue cannot be added!");
	            }
	          );
	      }

				function searchVenue() {
						vm.venues = vm.allVenues.filter(venue => {
								// for numbers, exact searching
								if (!isNaN(venue[vm.searchCategory])) {
									return venue[vm.searchCategory] == vm.searchFilter;
								} 
								// for strings, basta includes
								else {
									return venue[vm.searchCategory].toLowerCase().includes(vm.searchFilter.toLowerCase());
								}
						});
				}
	}
})();