(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('venueController', venueController);

	function venueController($http){
		var vm = this;

	      vm.newVenue = {};
	      vm.venues = [];
	      vm.addVenue = addVenue;
	      
	      $http.get('/venues').then(
	        function(response){
	          if (response.data){
	            vm.venues = response.data;
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
	              vm.venues.push(insertedVenue);
	              vm.newVenue = {};
	            },
	            function(response){
	              console.log("Error. Venue cannot be added!");
	            }
	          );
	      }
	}
})();