(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('requestController', requestController);

	function requestController($http){
		var vm = this;

		vm.approveUsers = [];
		vm.approveEvents = [];
		vm.approveCancelledEvents = [];

		vm.approveUser = approveUser;
		vm.approveEvent = approveEvent;
		vm.cancelEvent = cancelEvent;
	    
	    $http.get('/users').then(
	        function(response){
	          	if (response.data){
	            	vm.approveUsers = response.data.filter(user=>{
	            		return user.approved==0;
	            	});
	          	}
	          	console.log(vm.approveUsers)
	        }
	    )

	    $http.get('/events').then(
	        function(response){
	          	if (response.data){
	            	vm.approveEvents = response.data.filter(event=>{
	            		return event.approved==0 && event.status==="Pending";
	            	});
	          	}
	          	console.log(vm.approveEvents);
	        }
	    )

	    $http.get('/events').then(
	        function(response){
	          	if (response.data){
	            	vm.approveCancelledEvents = response.data.filter(event=>{
	            		return event.approved==0 && event.status==="Cancellation Pending";
	            	});
	          	}
	          	console.log(vm.approveEvents);
	        }
	    )

	    function approveUser(user) {
	    	user.approved = 1;
	    	$http.put('/users/' + user.accountid, user)
	    		.then( function(response) {
	    			vm.approveUsers = vm.approveUsers.filter(remainingUser=>{
	    				return remainingUser.accountid!=user.accountid;
	    			})
	    		})
	    }

	    function approveEvent(event) {
	    	event.approved = 1;
	    	event.status = "Approved";
	    	$http.put('/events/' + event.eventid, event)
	    		.then( function(response) {
	    			console.log(event);
	    			vm.approveEvents = vm.approveEvents.filter(remainingEvent=>{
	    				return remainingEvent.eventid!=event.eventid;
	    			})
	    		})
	    }

	    function cancelEvent(event) {
	    	event.approved = 1;
	    	event.status = "Cancelled";
	    	$http.put('/events/' + event.eventid, event)
	    		.then( function(response) {
	    			console.log(event);
	    			vm.approveCancelledEvents = vm.approveCancelledEvents.filter(remainingEvent=>{
	    				return remainingEvent.eventid!=event.eventid;
	    			})
	    		})
	    }

	}
})();