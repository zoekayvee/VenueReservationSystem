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
				vm.searchCategory = 'venuename';
				vm.searchFilter = '';
				vm.accounttype = '';

				vm.switchacct = switchacct;

	      vm.addVenue = addVenue;
				vm.deleteVenue = deleteVenue;
				vm.searchVenue = searchVenue;
	      
	      $http.get('/venues').then(
	        function(response){
	          if (response.data){
	            vm.venues = response.data;
							vm.allVenues = vm.venues;
	          }
	        }
	      )

				$http.get('/loggedIn').then(
					function(response) {
						$http
							.get('/users/' + response.data)
							.then(function(response) {
								vm.accounttype = response.data.accounttype;
							});
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

				function editVenue(id) {
					if (vm.editing) {
						return
					}

					vm.editing = true;
				}

				function deleteVenue(id) {
					$http
						.delete('/venues/'+id)
						.then(function(response) {
							vm.allVenues = vm.allVenues.filter(venue => {
								return venue.venueid != id;
							});

							vm.venues = vm.venues.filter(venue => {
								return venue.venueid != id;
							});


							console.log('Success deleting venue');
						}, function(response) {
							console.log('Error deleting venue');
						});
				}

				function searchVenue() {
						if (vm.searchFilter === '') {
							vm.venues = vm.allVenues;
						} else {
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

				function switchacct() {
					if (vm.accounttype === 'admin')
						vm.accounttype = 'normal_user';
					else
						vm.accounttype = 'admin';
				}
	}
})();