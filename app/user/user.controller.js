(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('userController', userController);

	function userController($http){
		var vm = this;

	      vm.user = [];
	      
	      $http.get('/users').then(
	        function(response){
	          if (response.data){
	            vm.user = response.data;
	          }
	        }
	      )
	}
})();