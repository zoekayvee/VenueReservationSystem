(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('venueController', venueController);

	function venueController($http){
		var vm = this;

				vm.currentUser = null;

	      vm.newVenue = {};
				vm.newEvent = {};
				vm.edittableVenue = {};
	      vm.venues = [];
				vm.allVenues = [];
				vm.searchCategory = 'venuename';
				vm.searchFilter = '';
				vm.accounttype = '';

				vm.editing = false;

				vm.switchacct = switchacct;

	      vm.addVenue = addVenue;
				vm.editVenue = editVenue;
				vm.editVenueConfirm = editVenueConfirm;
				vm.editVenueCancel = editVenueCancel;
				vm.deleteVenue = deleteVenue;
				vm.searchVenue = searchVenue;

				vm.reserveVenue = reserveVenue;
				vm.reserveVenueConfirm = reserveVenueConfirm;
				vm.reserveVenueCancel = reserveVenueCancel;
		  vm.openModal = openModal;
	      
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
								vm.currentUser = response.data;
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

				function editVenue(venue) {
						if (vm.editing) {
							return;
						}
						vm.edittableVenue = $.extend({}, venue);
						vm.edittableVenue.venuecapacity = Number(vm.edittableVenue.venuecapacity);
						vm.editing = true;
				}

				function editVenueConfirm() {
						$http
							.put('/venues/'+vm.edittableVenue.venueid, vm.edittableVenue)
							.then(function(response) {
								console.log('Success in editing event');

								vm.venues = vm.venues.map(venue => {
									if (venue.venueid === vm.edittableVenue.venueid) {
										return $.extend({}, vm.edittableVenue);
									} else {
										return venue;
									}
								});

								vm.allVenues = vm.allVenues.map(venue => {
									if (venue.venueid === vm.edittableVenue.venueid) {
										return $.extend({}, vm.edittableVenue);
									} else {
										return venue;
									}
								});
								vm.editing = false;
								vm.edittableVenue = {};
							}, function(response) {
								console.log('Error in editing event');
							});
				}

				function editVenueCancel() {
					vm.editing = false;
					vm.edittableVenue = {};
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

				function reserveVenue(venue) {
					openModal('reserveVenue-modal');
					vm.newEvent.eventdate = new Date();
					vm.newEvent.accountid = vm.currentUser.accountid;
					vm.newEvent.approved = false;
					vm.newEvent.status = 'Pending';
					vm.newEvent.venueid = venue.venueid;
				}

				function reserveVenueConfirm() {
					$http
						.post('/events', vm.newEvent)
						.then(function(response) {
							console.log('success in reserving venue');
							var eventHasVenue = {
								eventid: response.data.id,
								venueid: vm.newEvent.venueid,
								reservationdate: vm.newEvent.eventdate
							};

							$http
								.post('/events/venues/', eventHasVenue)
								.then(function(response) {
									console.log('Success added to event has venue');
									reserveVenueCancel();
								}, function(response) {
									console.log('Error added to event has venue');
								});


						}, function(response) {
							console.log('error in reserving venue');
						}); 
				}

				function reserveVenueCancel() {
					$('#reserveVenue-modal').modal('hide');
					vm.newEvent = {};
				}

				function switchacct() {
					if (vm.accounttype === 'admin')
						vm.accounttype = 'normal_user';
					else
						vm.accounttype = 'admin';
				}

		function openModal(id) {
			 $('#'+id)
			 	.modal('setting', {
					 closable: false
				})
				.modal('show');
		 }
		 
		 // function closeModal() {
			//  $('.ui.modal')
			//  	.modal('hide');
			// vm.newUser = {};	
		 // }
	}
})();