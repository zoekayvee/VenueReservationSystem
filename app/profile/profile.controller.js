(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('profileController', profileController);

	function profileController($http){
		var vm = this;

		vm.currentUser = {};
		vm.userEvents = [];

		$http
			.get('/loggedIn')
			.then(function(response) {
				$http.get('/users/' + response.data)
						.then(function(response){
							vm.currentUser = response.data;
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

	}
})();