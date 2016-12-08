(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('eventController', eventController);

	function eventController($http){
		var vm = this;

	      vm.event = [];
	      
	      $http.get('/events').then(
	        function(response){
	          if (response.data){
	            vm.event = response.data;
	          }
	        }
	      )
	}
})();