(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('userController', userController);

	function userController($http){
		var vm = this;

	      vm.user = [];
	      vm.userToBeEdited = {};
	      
	      vm.openModal = openModal;
	      vm.editUser = editUser;

	      $http.get('/users').then(
	        function(response){
	          if (response.data){
	            vm.user = response.data;
	          }
	        }
	      )

	      function openModal(id) {
			 $(id)
			 	.modal('setting', {
					 closable: true
				})
				.modal('show');
		 }

		 function editUser(user) {
		 	vm.userToBeEdited = $.extend({}, user);
		 		console.log("HALU")
		 		openModal('#editUser-modal')


		 }
	}
})();