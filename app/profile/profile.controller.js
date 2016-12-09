(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('profileController', profileController);

	function profileController($http){
		var vm = this;

		vm.currentUser = {};
		vm.userEvents = [];

		vm.cancelEvent = cancelEvent;

		$http
			.get('/loggedIn')
			.then(function(response) {
				$http.get('/users/' + response.data)
						.then(function(response){
							vm.currentUser = response.data;
						      $http.get('/events').then(
						        function(response){
						          if (response.data){
						            vm.userEvents = response.data.filter(event=>{
						            	return vm.currentUser.accountid==event.accountid;
						            });
						          }
						        }
						      )
						});
			});
	      
	      $http.get('/events').then(
	        function(response){
	          if (response.data){
	            vm.userEvents = response.data.filter(event=>{
	            	return vm.currentUser.userid==event.userid;
	            });
	          }
	        }
	      )

	    function cancelEvent(event) {
	    	event.approved = 0;
	    	event.status = "Cancellation Pending";
	    	$http.put('/events/' + event.eventid, event)
	    		.then( function(response) {
	    			console.log(event);
	    			vm.userEvents = vm.userEvents.map(updateEvent=>{
	    				if(updateEvent.eventid==vm.userEvents.eventid){
	    					return vm.userEvents;
	    				} else {
	    					return updateEvent
	    				}
	    			})
	    		})
	    }

	}
})();