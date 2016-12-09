(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('userController', userController);

	function userController($http){
		var vm = this;

	      vm.user = [];
          vm.allUser = [];
	      vm.userToBeEdited = {};
	      
          vm.searchFilter = '';
          vm.searchCategory = 'username';
          vm.searchYear = '1970';
          vm.searchMonth = '01';
          vm.searchDate = '01';

	      vm.openModal = openModal;
	      vm.closeModal = closeModal;
	      vm.editUser = editUser;
	      vm.confirmEditUser = confirmEditUser;
	      vm.deleteUser = deleteUser;
          vm.search = search;

	      $http.get('/users').then(
	        function(response){
	          if (response.data){
	            vm.user = response.data;
                vm.allUser = vm.user;
	          }
	        }
	      )

          function search() {
              if (vm.searchCategory !== 'dateadded') {
                  vm.user = vm.allUser.filter(user => {

                      return user[vm.searchCategory] && user[vm.searchCategory].toLowerCase().includes(vm.searchFilter.toLowerCase());
                  });
              } else {
                    if (vm.searchYear) var year = vm.searchYear;
                    else var year = '\\d{4}';

                    if (vm.searchMonth) var month = vm.searchMonth;
                    else var month = '\\d{2}';

                    if (vm.searchDate) var date = vm.searchDate;
                    else var date = '\\d{2}';

                    var re = new RegExp(year+'-'+month+'-'+date);
                    console.log(re);
                    vm.user = vm.allUser.filter(user => {
                        if (user.dateadded && user.dateadded.match(re))
                            return true;
                        return false;
                    });
              }
          }

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