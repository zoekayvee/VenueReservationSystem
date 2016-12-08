(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('venueController', venueController);

	function venueController($http){
		var vm = this;

	      vm.newVenue = {};
	      vm.venue = [];
	      vm.addVenue = addVenue;
	      
	      $http.get('/venues').then(
	        function(response){
	          if (response.data){
	            vm.venue = response.data;
	          }
	        }
	      )
	    
	      function addVenue(){
	        console.log(vm.newVenue);
	        $http.post('/venues', vm.newVenue).then(
	            function(response){
	              var insertedVenue = {
	                "venueid": response.data.id,
	                "venuename": vm.newVenue.venuename,
	                "venuecapacity": vm.newVenue.venuecapacity,
	                "venuedetails": vm.newVenue.venuedetails
	              }
	              vm.venue.push(insertedVenue);
	              console.log(response.data);
	              console.log("Successfully added");
	              vm.newVenue = {};
	            },
	            function(response){
	              console.log("Error. Venue cannot be added!");
	            }
	          )
	      }
	}
})();