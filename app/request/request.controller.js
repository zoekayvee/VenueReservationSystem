(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('requestController', requestController);

	function requestController($http){
		var vm = this;

		vm.approveUsers = [];
		vm.approveEvents = [];

		vm.approveUser = approveUser;
	    
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

	    function approveUser(user) {
	    	user.approved = 1;
	    	$http.put('/users/' + user.accountid, user)
	    		.then( function(response) {
	    			vm.approveUsers = vm.approveUsers.filter(remainingUser=>{
	    				return remainingUser.accountid!=user.accountid;
	    			})
	    		})
	    }

	}
})();