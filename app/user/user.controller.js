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
	      vm.closeModal = closeModal;
	      vm.editUser = editUser;
	      vm.confirmEditUser = confirmEditUser;
	      vm.deleteUser = deleteUser;

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
					 closable: false
				})
				.modal('show');
		 }

		 function closeModal(id) {
			 $(id)
			 	.modal('hide');
			vm.newUser = {};	
		 }

		 function editUser(user) {
		 	vm.userToBeEdited = $.extend({}, user);
		 		console.log("HALU")
		 		openModal('#editUser-modal')

		 }

		 function deleteUser(id) {
			$http
				.delete('/users/'+id)
				.then(function(response) {
					vm.user = vm.user.filter(remainingUser=>{
						return remainingUser.accountid!=id;
					})
					console.log('Success deleting user');
				}, function(response) {
					console.log('Error deleting user');
				});
	    	}

		 function confirmEditUser() {
		 	console.log(typeof vm.userToBeEdited.accounttype);
		 	console.log(vm.userToBeEdited.accounttype);
		 	if (vm.userToBeEdited.accounttype===true) {
		 		vm.userToBeEdited.accounttype = 'admin';
		 	} else {
		 		vm.userToBeEdited.accounttype = 'normal_user';
		 	}

		 	$http.put('/users/'+ vm.userToBeEdited.accountid, vm.userToBeEdited)
		 		.then(function(response) {
		 			vm.user = vm.user.map(editedUser => {
		 				if(editedUser.accountid==vm.userToBeEdited.accountid){
		 					return vm.userToBeEdited;
		 				} else {
		 					return editedUser;
		 				}
		 			}
		 			)
		 		});

		 	closeModal('#editUser-modal');
		 }
	}
})();