(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('profileController', userController);

	function userController($http){
		var vm = this;

		vm.currentUser = {};

		$http
			.get('/loggedIn')
			.then(function(response) {
				$http.get('/users/' + response.data)
						.then(function(response){
							vm.currentUser = response.data;
						});
			});

	}
})();